import React, { Component } from "react";

class RoverImageFilter extends Component {
    render() {
      // return <button onClick={() => this.props.onClick(2)} class="px-4 py-1 text-lg text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Update</button>
      return <div>
        <select name="rovers" id="rovers">
          <option value="curiosity">Curiosity</option>
          <option value="opportunity">Opportunity</option>
          <option value="perseverance">Perseverance</option>
          <option value="spirit">Spirit</option>
        </select>

        <input type="number" name="sol" id="sol" min="1" max="3500"></input>

        <select name="camera" id="camera">
          <option value="FHAZ">FHAZ</option>
          <option value="RHAZ">RHAZ</option>
          <option value="MAST">MAST</option>
          <option value="CHEMCAM">CHEMCAM</option>
          <option value="MAHLI">MAHLI</option>
          <option value="MARDI">MARDI</option>
          <option value="NAVCAM">NAVCAM</option>
          <option value="PANCAM">PANCAM</option>
          <option value="MINITES">MINITES</option>
        </select>
      </div>
    }
}

export default RoverImageFilter;