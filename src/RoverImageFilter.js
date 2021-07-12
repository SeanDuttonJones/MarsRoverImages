import React, { Component } from "react";

class RoverImageFilter extends Component {
    render() {
      return <button onClick={() => this.props.onClick(2)} class="px-4 py-1 text-lg text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Update</button>
    }
}

export default RoverImageFilter;