import React, { Component } from "react";

import PhotoCard from "./PhotoCard";

import nasa_api from "./nasa_api_info.json"

// import fakeData from "./test_data.json";

class PhotoCardGrid extends Component {
    constructor(props) {
      super(props)
  
      this.state = {
        error: null,
        sol: 0,
        page: 1,
        max_page: 1,
        photos: []
      };

      this.missionManifest = null;
      this.solIndex = new Map();

      // This binding is necessary to make `this` work in the callback
      this.handleScroll = this.handleScroll.bind(this);
    }
  
    componentDidMount() {
      this.getMissionManifest();
      this.getPhotos(); // TODO: may have to wait for getMissionManifest() to finish

      document.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
      document.removeEventListener("scroll", this.handleScroll);
    }
  
    getMissionManifest() {
      let url = `https://api.nasa.gov/mars-photos/api/v1/manifests/${this.props.rover}?api_key=${nasa_api.key}`
      fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
              this.missionManifest = result.photo_manifest;

              /* Indexing the sol because the indexes of the photo array in the mission manifest
              do not always line up with the sol. Indexing the sol allows for a O(1) search
              when user filters for a certain sol */
              let photos = this.missionManifest.photos;
              for(let i = 0; i < photos.length; i++) {
                this.solIndex.set(photos[i].sol, i);
              }

              this.updateMaxPage();
            },

            (error) => {
              this.setState({
                error: error
              });
            }
        )
    }

    updateMaxPage() {
      let maxPage = 1;

      if(this.solIndex.has(this.state.sol)) {
        let index = this.solIndex.get(this.state.sol);
        let solTotalPhotos = this.missionManifest.photos[index].total_photos;

        // 25 is the number of photos returned from the Mars Rover API per page
        maxPage = Math.ceil(solTotalPhotos / 25);
      }

      this.setState({
        max_page: maxPage
      });
    }

    getPhotos() {
      let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${this.props.rover}/photos?&sol=${this.state.sol}&page=${this.state.page}&api_key=${nasa_api.key}`;
      fetch(url)
        .then(res => res.json())
        .then(
          (result) => {
            let newPhotos = this.state.photos;
            newPhotos = newPhotos.concat(result.photos);
            this.setState({
              photos: newPhotos
            });
          },

          (error) => {
            this.setState({
              error: error
            });
          }
        )
    }

    // consider renaming for clarity
    getNextPhotos() {
      if(this.state.page >= this.state.max_page) {
        let nextSol = this.state.sol + 1;
        let maxSol = this.missionManifest.max_sol;

        while(nextSol < maxSol && !this.solIndex.has(nextSol)) {
          nextSol++;
        }
        
        this.setState({
          sol: nextSol,
          page: 1
        }, () => {
          this.updateMaxPage();
          this.getPhotos();
        });

      } else {
        let nextPage = this.state.page + 1;
        this.setState({
          page: nextPage
        }, () => {
          this.getPhotos();
        });
      }
    }

    handleScroll() {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop
  
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
    
      const scrolled = winScroll / height

      if(scrolled === 1) {
        this.getNextPhotos();
      }
    }
  
    render() {
      var listPhotos = null;
      if(this.state.photos) {
        listPhotos = this.state.photos.map((index) => 
          <div key={index.id}><PhotoCard {...index}/></div>
        );
      }
  
      return (
        <div>
          <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 lg:m-10 m-4">
            {listPhotos}
          </div>
        </div>
      );
    }
}

export default PhotoCardGrid;