import React from "react";
import Albums from "./Albums";
import axios from 'axios';
import { Button } from "react-bootstrap";

class List extends React.Component {

    constructor() {
        super();

        //bind events to this instance
        this.ReloadData = this.ReloadData.bind(this);
        this.ReloadDataAsc = this.ReloadDataAsc.bind(this);
        this.ReloadDataDesc = this.ReloadDataDesc.bind(this);
    }

    state = {
        albums: [],
    };

    // Orders an array by Rating value, Descending
    orderByRatingDesc(a, b) {
        if (a.Rating < b.Rating) {
            return 1;
        }
        if (a.Rating > b.Rating) {
            return -1;
        }
        return 0;
    }

    // Orders an array by Rating value, Ascending
    orderByRatingAsc(a, b) {
        if (a.Rating < b.Rating) {
            return -1;
        }
        if (a.Rating > b.Rating) {
            return 1;
        }
        return 0;
    }

    //Use axios in component life-cycle hook to get JSON data from server and update state values
    componentDidMount() {

        axios.get('http://localhost:4000/albums')
            //fulfulled state
            .then(
                //updates albums array in state with data from json
                (response) => {
                    this.setState({ albums: response.data })

                    console.log(this.state.albums)
                })
            //rejected state, logs error message
            .catch((error) => {
                console.log(error);
            });
    }

    //Sends a new get request to the server to reload all album data on the page
    ReloadData() {
        axios.get('http://localhost:4000/albums')
            //fulfulled state
            .then(
                //updates movies array in state with data from json
                (response) => {
                    this.setState({ albums: response.data })
                    // this.state.albums.sort(orderByOrderValue);
                    console.log(this.state.albums)
                })
            //rejected state, logs error message
            .catch((error) => {
                console.log(error);
            });
    }

    //Sends a new get request to the server to reload all album data on the page in Ascending order
    ReloadDataAsc() {
        axios.get('http://localhost:4000/albums')
            //fulfulled state
            .then(
                //updates movies array in state with data from json
                (response) => {
                    this.setState({ albums: response.data.sort(this.orderByRatingAsc) })
                    // this.state.albums.sort(orderByOrderValue);
                    console.log(this.state.albums)
                })
            //rejected state, logs error message
            .catch((error) => {
                console.log(error);
            });
    }

    //Sends a new get request to the server to reload all album data on the page in Descending order
    ReloadDataDesc() {
        axios.get('http://localhost:4000/albums')
            //fulfulled state
            .then(
                //updates albums array in state with data from json
                (response) => {
                    this.setState({ albums: response.data.sort(this.orderByRatingDesc) })

                    console.log(this.state.albums)
                })
            //rejected state, logs error message
            .catch((error) => {
                console.log(error);
            });
    }


    render() {
        return (
            <div>
                <br />
                <h3>Order by rating</h3>
                <Button onClick={this.ReloadDataDesc}>Highest to Lowest</Button>
                <Button onClick={this.ReloadDataAsc}>Lowest to Highest</Button>
                <br />
                <br />
                <Albums albums={this.state.albums} ReloadData={this.ReloadData}></Albums>
            </div>
        );
    }
}

export default List;