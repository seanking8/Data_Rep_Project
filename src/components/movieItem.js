import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class MovieItem extends Component {

    constructor() {
        super();

        this.DeleteMovie = this.DeleteMovie.bind(this);
    }

    DeleteMovie(e) {
        e.preventDefault();
        console.log("Delete " + this.props.movie._id);

        axios.delete("http://localhost:4000/api/movies/"+this.props.movie._id)
        .then(()=>{
            this.props.ReloadData();
        })
        .catch();
    }

    render() {
        return (
            <div>

                {/* Reads in the specific informataion from the movie object passed to it by Movies component */}
                {/* Builds a Bootstrap card which diaplays each film's title, poster and year of release */}

                <Card>
                    <Card.Header>{this.props.movie.Title}</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <img src={this.props.movie.Poster} width="200" height="200"></img>
                            <br></br>
                            <br></br>
                            <footer className="blockquote-footer">
                                {this.props.movie.Year}
                            </footer>
                        </blockquote>
                        <Link to={"/edit/" + this.props.movie._id} className="btn btn-secondary btn-sm">Edit</Link>
                        <Button variant="danger" onClick={this.DeleteMovie}>Delete</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default MovieItem;