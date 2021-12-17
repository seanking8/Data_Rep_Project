import React from "react";
import Albums from "./Albums";
import axios from 'axios';
import { Button, Form } from "react-bootstrap";

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
        // ascending: false
    };

    // Full function for readability
    orderByRatingDesc(a, b) {
        if (a.Rating < b.Rating) {
            return 1;
        }
        if (a.Rating > b.Rating) {
            return -1;
        }
        return 0;
    }

    // Full function for readability
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

        // axios.get('https://musicbrainz.org/ws/2/release?artist=9c9f1380-2516-4fc9-a3e6-f9f61941d090&inc=recordings+release-groups+ratings&limit=100&fmt=json')
        //     //fulfulled state
        //     .then(
        //         //updates movies array in state with data from json
        //         (response) => {
        //             // this.setState({ albums: response.data })
        //             console.log(response.data);
        //         })
        //     //rejected state, logs error message
        //     .catch((error) => {
        //         console.log(error);
        //     });



        // Code to search musicbrainz by artist showing their releases

        // /ws/2/release/59211ea4-ffd2-4ad9-9a4e-941d3148024a?inc=artist-credits+media&limit=0&fmt=json
        // /ws/2/release?label

        // axios.get('http://musicbrainz.org/ws/2/release?artist=f1b7101e-c968-4843-ad08-9ef5b846c915?inc=url-rels&fmt=json')
        //     //fulfulled state
        //     .then(
        //         //updates movies array in state with data from json
        //         (response) => {
        //             // this.setState({ albums: response.data })
        //             console.log(response.data);
        //         })
        //     //rejected state, logs error message
        //     .catch((error) => {
        //         console.log(error);
        //     });

        // Code for searching artist name (responds with all albums and their year of release)

        // var options = {
        //     method: 'GET',
        //     url: 'https://theaudiodb.p.rapidapi.com/discography.php',
        //     params: { s: 'the weeknd' },
        //     headers: {
        //         'x-rapidapi-host': 'theaudiodb.p.rapidapi.com',
        //         'x-rapidapi-key': '089bbbf25fmsh4c2becce25f5f03p1e1ccajsn4236d6277699'
        //     }
        // };

        // axios.request(options).then(function (response) {
        //     console.log(response.data);
        // }).catch(function (error) {
        //     console.error(error);
        // });


        // Code for searching for album covers

        // var options = {
        //     method: 'GET',
        //     url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI',
        //     params: {
        //         q: 'after hours album cover',
        //         pageNumber: '1',
        //         pageSize: '1',
        //         autoCorrect: 'true'
        //     },
        //     headers: {
        //         'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
        //         'x-rapidapi-key': '089bbbf25fmsh4c2becce25f5f03p1e1ccajsn4236d6277699'
        //     }
        // };

        // axios.request(options).then(function (response) {
        //     console.log(response.data);
        // }).catch(function (error) {
        //     console.error(error);
        // });
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
                    // this.state.albums.sort(orderByOrderValue);
                    console.log(this.state.albums)
                })
            //rejected state, logs error message
            .catch((error) => {
                console.log(error);
            });
    }

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

    ReloadDataDesc() {
        axios.get('http://localhost:4000/albums')
            //fulfulled state
            .then(
                //updates movies array in state with data from json
                (response) => {
                        this.setState({ albums: response.data.sort(this.orderByRatingDesc) })
                    // this.state.albums.sort(orderByOrderValue);
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
                <h1>List page</h1>
                <Button onClick={this.ReloadDataDesc}>Highest to Lowest</Button>
                <Button onClick={this.ReloadDataAsc}>Lowest to Highest</Button>
                <Albums albums={this.state.albums} ReloadData={this.ReloadData}></Albums>
            </div>
        );
    }
}

export default List;