import React, { Component } from "react";

class PhotoCard extends Component {
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

export default PhotoCard;