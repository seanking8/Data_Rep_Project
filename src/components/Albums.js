import React, { Component } from 'react';
import AlbumInstance from "./AlbumInstance";

class Albums extends Component {

    render() {

        // Reads in JSON data passed to it from List component
        // Map function splits the data so that each album can be returned as its own AlbumInstance component
        return this.props.albums.map((album, i) => {
            return <AlbumInstance key={i} album={album} ReloadData={this.props.ReloadData}></AlbumInstance>
        })
    }
}

export default Albums;