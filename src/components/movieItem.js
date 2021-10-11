import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

class MovieItem extends Component {

    render() {
        return (
            <div>
                <h4></h4>
                <p></p>

                <Card>
                    <Card.Header>{this.props.movie.Title}</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <img src={this.props.movie.Poster} width="200" height="200"></img>
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