import React, { Component } from "react";

/* 
    Small, round button positioned at bottom right corner of the screen.
    Smoothly scrolls to a specified element when clicked.

    @param {Ref} elRef The element to scroll to.
*/
class ScrollTo extends Component {
    constructor(props) {
        super();

        // This binding is necessary to make 'this' work in the callback
        this.scroll = this.scroll.bind(this);
    }

    scroll() {
        window.scrollTo({
            top: this.props.elRef.current.offsetTop,
            behavior: "smooth"
        });
    }

    render() {
        return (
            <button onClick={this.scroll} class="fixed bottom-0 right-0 w-16 h-16 lg:m-12 m-6 bg-red-500 hover:bg-red-700 text-white rounded-full shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                </svg>
            </button>
        );
    }
}

export default ScrollTo;