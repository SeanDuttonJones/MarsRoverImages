import './App.css';
import fakeData from "./test_data.json"
import React, { Component } from 'react';

class PhotoCard extends React.Component {
  render() {
    return <div class="rounded-md shadow-md bg-gray-50">
        <a href={this.props.img_src} target="_blank" rel="noreferrer">
          <img class="rounded-t-md" alt="" src={this.props.img_src}/>
          </a>
        <div class="mt-5 pb-5 px-3">
          <div>
            <div class="text-xs text-gray-600 uppercase font-bold">{this.props.rover.name}</div>
            <div class="font-bold text-gray-700 leading-snug">{this.props.camera.full_name} ({this.props.camera.name})</div>
            <div class="mt-2 text-sm text-gray-600">Date: {this.props.earth_date} | Sol: {this.props.sol}</div>
          </div>
        </div>
    </div>
  }
}

class LoadButton extends React.Component {
  render() {
    return <button onClick={() => this.props.onClick()} class="px-4 py-1 text-lg text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Load more</button>
  }
}

class PhotoCardGrid extends React.Component {
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

class RoverImageFilter extends React.Component {
  render() {
    return <button onClick={() => this.props.onClick(2)} class="px-4 py-1 text-lg text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Update</button>
  }
}

class App extends Component {

  constructor() {
    super();

    this.state = {
        rover: "curiosity",
        camera: "MAST",
        sol: 1499,
        page: 1
      }
  }

  updateImageGrid = (value) => {
    this.setState({page: value});
  }

  render() {
    return <div>
        <RoverImageFilter onClick={this.updateImageGrid}/>
        {/* <PhotoCardGrid {...this.state}/> */}
      </div>
  }
}

export default App;
