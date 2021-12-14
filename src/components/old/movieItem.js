import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class MovieItem extends Component {

    constructor() {
        super();

        //bind events to this instance
        this.DeleteAlbum = this.DeleteAlbum.bind(this);
    }

    //Makes HTTP DELETE request to server to delete album.
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

                {/* Reads in the specific informataion from the album object passed to it by albums component */}
                {/* Builds a Bootstrap card which diaplays each film's title, Rating and Artist of release */}

                <Card>
                    <Card.Header>{this.props.album.Title}</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <h4>{this.props.album.Rating}</h4>
                            <br></br>
                            <br></br>
                            <footer className="blockquote-footer">
                                {this.props.album.Artist}
                            </footer>
                        </blockquote>
                        <Link to={"/edit/" + this.props.album._id} className="btn btn-secondary btn-sm">Edit</Link>
                        <Button variant="danger" onClick={this.DeleteAlbum} className="btn-sm">Delete</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default MovieItem;