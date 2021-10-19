import React, { Component } from 'react';
import Movies from './movies';
import axios from 'axios';

class Read extends Component {

    // Create state array object and movies object to store JSON movie data
    state = {
        movies: []
    };

    //Use axios in component life-cycle hook to get information from JSON URL and update state values
    componentDidMount() {
        axios.get('https://jsonblob.com/api/jsonblob/894944504570986496')
            //fulfulled state
            .then(
                //updates movies array in state with data from json
                (response) => {
                    this.setState({ movies: response.data.movies })
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
                <Movies movies={this.state.movies}></Movies>
            </div>
        );
    }
}

export default Read;