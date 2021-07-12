import "./App.css";

import RoverImageFilter from "./RoverImageFilter";
import PhotoCardGrid from "./PhotoCardGrid";

import React, { Component } from "react";

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
        <PhotoCardGrid {...this.state}/>
      </div>
  }
}

export default App;
