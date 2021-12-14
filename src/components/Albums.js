import React, { Component } from 'react';
import AlbumInstance from "./AlbumInstance";

class Albums extends Component {

    render() {
        return this.props.albums.map((album) => {
            return <AlbumInstance album={album} ReloadData={this.props.ReloadData}></AlbumInstance>
        })
    }
}

export default Albums;