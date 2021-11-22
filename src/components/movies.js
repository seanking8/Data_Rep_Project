import React, { Component } from 'react';
import MovieItem from './movieItem';

class Movies extends Component {

    render() {
        // Reads in JSON data passed to it from Read component
        // Map function splits the data so that each film can be returned as its own MovieItem component
        return this.props.movies.map((movie) => {
            return <MovieItem movie={movie} ReloadData={this.props.ReloadData}></MovieItem>
        })
    }
}

export default Movies;