import React, { Component } from 'react';
import MovieItem from './movieItem';

class Movies extends Component {

    render() {
        return this.props.movies.map( (movie)=>{
            return <MovieItem movie={movie}></MovieItem>
        })
    }
}

export default Movies;