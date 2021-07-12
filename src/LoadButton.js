import React, { Component } from "react";

class LoadButton extends Component {
    render() {
        return <button onClick={() => this.props.onClick()} class="px-4 py-1 text-lg text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Load more</button>
    }
}

export default LoadButton;