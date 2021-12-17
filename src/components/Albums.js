import React, { Component } from 'react';
import AlbumInstance from "./AlbumInstance";

class Albums extends Component {

    render() {
        return this.props.albums.map((album, i) => {
            return <AlbumInstance key={i} album={album} ReloadData={this.props.ReloadData}></AlbumInstance>
        })
    }
}

export default Albums;