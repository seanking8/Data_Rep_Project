import React, { Component } from "react";
import axios from "axios";
import { Form } from 'react-bootstrap';
import Result from "./Result";

class Add extends Component {

    constructor() {
        //invoke parent constructor
        super();

        //bind events to this instance
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleChangeArtist = this.handleChangeArtist.bind(this);
        this.handleChangeRating = this.handleChangeRating.bind(this);

        //set values in state to blank
        this.state = {
            Artist: '',
            ArtistID: '',
            results: [],
            Selection: '',
            Rating: 0,
            CoverArt: ''
        }
    }

    //Updates value of Artist in state when change is made to form
    handleChangeArtist(e) {
        this.setState({
            Artist: '',
            results: []
        })
        if (e.target.value !== '') {
            this.setState({
                Artist: e.target.value
            })
        } else {
            this.setState({ Artist: '' })
        }
    }

    // Searches MusicBrainz API for the artist input by user, gets their musicbrainz ID, then searches for their catalogue with the id 
    // Updates state with results and prints success message with album details in console
    handleSearch(e) {
        e.preventDefault();

        if (this.state.Artist !== '') {
            //Returns Artist's ArtistID
            axios.get('https://musicbrainz.org/ws/2/artist/?query=artist:' + this.state.Artist + '&fmt=json')
                //fulfulled state
                .then(
                    //updates results in state with data from json
                    (response) => {

                        this.setState({
                            ArtistID: response.data.artists[0].id
                        })

                        //
                        axios.get('https://musicbrainz.org/ws/2/release?artist=' + this.state.ArtistID + '&inc=recordings+release-groups+ratings&limit=100&fmt=json')
                            //fulfulled state
                            .then(
                                //populates results array with new instances of the result class
                                (response) => {
                                    for (let i = 0; i < response.data.releases.length; i++) {
                                        this.state.results.push(new Result(response.data.releases[i].title, response.data.releases[i].date))
                                    }
                                })
                            //rejected state, logs error message
                            .catch((error) => {
                                console.log(error);
                            });
                    })
                //rejected state, logs error message
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    // When the user chooses an album, GET request is sent to rapid-api Image search, to locate a link to the albums's cover art
    // Resulting link is set in state along with the artist name
    handleChangeSelect(e) {
        if (e.target.value !== '') {

            //Replace spaces for GET request URL
            let artist = this.state.Artist.replace(/\s/g, '_');
            let title = this.state.Selection.replace(/\s/g, '+');

            axios.get('https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=' + artist + '+' + title + '+official+album+cover&pageNumber=1&pageSize=1&autoCorrect=false',
                {
                    headers: {
                        // My Authorisation
                        'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
                        'x-rapidapi-key': '089bbbf25fmsh4c2becce25f5f03p1e1ccajsn4236d6277699'
                    }
                })
                .then(
                    (response) => {
                        console.log(response.data.value[0].url);
                        this.setState({
                            CoverArt: response.data.value[0].url
                        })
                        console.log(this.state.CoverArt);

                        let success = this.state.Selection + ' has been added!\nArtist: ' + this.state.Artist + '\nRating: ' + this.state.Rating + '\nCover URL: ' + this.state.CoverArt;
                        console.log(success)
                    })
                //rejected state, logs error message
                .catch((error) => {
                    console.log(error);
                });

            this.setState({
                Selection: e.target.value,
            })
        } else {
            this.setState({ Selection: '' })
        }

    }

    //Updates value of Rating in state when change is made to form
    handleChangeRating(e) {
        this.setState({
            Rating: e.target.value
        })
    }

    //When submit button is hit, make post request to add state to DB
    handleSubmit(e) {
        e.preventDefault();

        const newAlbum = {
            Title: this.state.Selection,
            Artist: this.state.Artist,
            Rating: this.state.Rating,
            CoverArt: this.state.CoverArt
        }

        axios.post('http://localhost:4000/albums', newAlbum)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="App">
                <br />
                <form onSubmit={this.handleSearch}>
                    <div className="form-group row">
                        <div className="col">
                            <label>
                                Artist:
                                <input type="text" value={this.state.Artist} onChange={this.handleChangeArtist} />
                            </label>
                        </div>
                    </div>
                    <input type="submit" value="Search" className="btn btn-primary" />
                </form>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Select onChange={this.handleChangeSelect} aria-label="Default select example">
                        <option>Select Album</option>
                        {this.state.results.map((result, i) => (
                            <option key={i} value={result.title}>{result.title} - {result.date}</option>
                        ))}
                    </Form.Select>
                    <div className="form-group row">
                        <div className="col">
                            <label>
                                Your Rating /10:
                                <input type="Number" min="0" max="10" value={this.state.Rating} onChange={this.handleChangeRating} />
                            </label>
                        </div>
                    </div>
                    <input type="submit" value="Add Album" className="btn btn-primary" />
                </Form>
            </div>
        );
    }
}


export default Add;