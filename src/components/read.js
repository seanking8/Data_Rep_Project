import React, { Component } from 'react';
import Movies from './movies';
import axios from 'axios';

class Read extends Component {

    constructor(){
        super();

        this.ReloadData = this.ReloadData.bind(this);
    }

    // Create state array object and movies object to store JSON movie data
    state = {
        movies: []
    };

    //Use axios in component life-cycle hook to get JSON data from server and update state values
    componentDidMount() {
        axios.get('http://localhost:4000/api/movies')
            //fulfulled state
            .then(
                //updates movies array in state with data from json
                (response) => {
                    this.setState({ movies: response.data })
                })
            //rejected state, logs error message
            .catch((error) => {
                console.log(error);
            });
    }

    ReloadData(){
        axios.get('http://localhost:4000/api/movies')
            //fulfulled state
            .then(
                //updates movies array in state with data from json
                (response) => {
                    this.setState({ movies: response.data })
                })
            //rejected state, logs error message
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <h1>This is read Component</h1>

                {/* Embed Movies component and pass JSON data to it using movies object */}
                <Movies movies={this.state.movies} ReloadData={this.ReloadData}></Movies>
            </div>
        );
    }
}

export default Read;