import React, { Component } from 'react';

// Contains the main content for the page
class Content extends Component {

    render() {
        return (
            <div>
                <h1>Movie App</h1>
                <h2>It is {new Date().toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

export default Content;