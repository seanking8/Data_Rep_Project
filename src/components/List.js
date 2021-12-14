import React from "react";
import Albums from "./Albums";
import axios from 'axios';

class List extends React.Component {

    constructor() {
        super();

        //bind events to this instance
        this.ReloadData = this.ReloadData.bind(this);
    }

    state = {
        albums: []
    };

    //Use axios in component life-cycle hook to get JSON data from server and update state values
    componentDidMount() {
        axios.get('http://localhost:4000/albums')
            //fulfulled state
            .then(
                //updates movies array in state with data from json
                (response) => {
                    this.setState({ albums: response.data })
                })
            //rejected state, logs error message
            .catch((error) => {
                console.log(error);
            });
    }

    // componentDidMount() {
    //     axios.get('/database/search?q={nirvana}&{?release,nirvana - nevermind,nevermind}')
    //         .then(
    //             (response) => {
    //                 this.setState({ albums: response.data.movies })
    //             })
    //         .catch(
    //             (error) => {
    //                 console.log(error);
    //             });
    // }

    //Sends a new get request to the server to reload all movie data on the page
    ReloadData() {
        axios.get('http://localhost:4000/albums')
            //fulfulled state
            .then(
                //updates movies array in state with data from json
                (response) => {
                    this.setState({ albums: response.data })
                })
            //rejected state, logs error message
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <h1>List page</h1>
                <Albums albums={this.state.albums} ReloadData={this.ReloadData}></Albums>
            </div>
        );
    }
}

export default List;