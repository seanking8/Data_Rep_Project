import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

class MovieItem extends Component {

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
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default MovieItem;