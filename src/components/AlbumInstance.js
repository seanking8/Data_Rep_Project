import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from "axios";

class AlbumInstance extends Component {

    constructor() {
        super();

        //bind events to this instance
        this.DeleteAlbum = this.DeleteAlbum.bind(this);
    }

    //Makes HTTP DELETE request to server to delete movie.
    //Also calls ReloadData function which has been passed down from its grandparent, the Read component
    DeleteAlbum(e) {
        e.preventDefault();
        console.log("Deleting " + this.props.album._id + "... ");

        axios.delete("http://localhost:4000/albums/" + this.props.album._id)
            //fulfulled state
            .then(() => {
                this.props.ReloadData();
            })
            //rejected state, logs error message
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <h3>{this.props.album.Title}</h3>
                <p>{this.props.album.Artist}</p>
                <h4>{this.props.album.Rating} &#9733;</h4>
                <img alt='' src={this.props.album.CoverArt} width="150px" height="150px"/>
                <Link to={"/edit/" + this.props.album._id} className="btn btn-secondary btn-sm">Edit</Link>
                <Button variant="danger" onClick={this.DeleteAlbum} className="btn-sm">Delete</Button>
            </div>
        );
    }
}

export default AlbumInstance;