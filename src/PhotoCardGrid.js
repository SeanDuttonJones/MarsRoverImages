import React, { Component } from "react";

import PhotoCard from "./PhotoCard";
import LoadButton from "./LoadButton";

import fakeData from "./test_data.json";

class PhotoCardGrid extends Component {
    constructor(props) {
      super(props)
  
      this.state = {
        photos: [],
        page: props.page
      };
    }
  
    componentDidMount() {
      //this.getData();
      this.getFakeData();
    }
    
    componentDidUpdate(prevProps) {
      if(this.props.page !== prevProps.page) {
        this.setState({photos: [], page: this.props.page}, () => this.getData());
      }
    }
  
    getData() {
      var xhr = new XMLHttpRequest();
  
      xhr.addEventListener("load", () => {
        var data = JSON.parse(xhr.responseText);
  
        var photos = this.state.photos;
        photos = photos.concat(data.photos);
        this.setState({photos: photos});
      });
  
      var url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${this.props.rover}/photos?camera=${this.props.camera}&sol=${this.props.sol}&page=${this.state.page}&api_key=DEMO_KEY`;
      
      console.log(this.state.page);
  
      xhr.open("GET", url);
      xhr.send();
    }
  
    getFakeData() {
      this.setState({photos: fakeData.photos});
    }
  
    loadMore() {
      const nextPageNum = this.state.page + 1;
      this.setState({page: nextPageNum}, () => this.getData());
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
  
          <div class="mb-8 text-center">
            <LoadButton onClick={() => this.loadMore()}/>
          </div>
        </div>
      );
    }
}

export default PhotoCardGrid;