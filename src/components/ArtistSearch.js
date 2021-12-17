import React, { Component } from "react";
import axios from "axios";
import { Form } from 'react-bootstrap';
import Result from "./Result";

class ArtistSearch extends Component {

    constructor() {
        //invoke parent constructor
        super();

        //bind events to this instance
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleChangeArtist = this.handleChangeArtist.bind(this);
        this.handleChangeRating = this.handleChangeRating.bind(this);
        this.handleChangeCoverArt = this.handleChangeCoverArt.bind(this);

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
        // this.setState({
        //     Artist: e.target.value
        // })
        if (e.target.value !== '') {
            this.setState({
                Artist: e.target.value
            })
        } else {
            this.setState({ Artist: '' })
        }

        //this.artist = this.state.Artist;
    }

    //Prints success message with movie details in console and alert. Resets state values to blank
    handleSearch(e) {
        e.preventDefault();

        if (this.state.Artist !== '') {
            //Returns Artist ArtistID
            axios.get('https://musicbrainz.org/ws/2/artist/?query=artist:' + this.state.Artist + '&fmt=json')
                //fulfulled state
                .then(
                    //updates movies array in state with data from json
                    (response) => {
                        // this.setState({ albums: response.data })

                        this.setState({
                            ArtistID: response.data.artists[0].id
                        })
                        //console.log(response.data.artists);

                        // if (this.state.ArtistID !== '' && this.state.ArtistID !== 'oldval') {
                        axios.get('https://musicbrainz.org/ws/2/release?artist=' + this.state.ArtistID + '&inc=recordings+release-groups+ratings&limit=100&fmt=json')
                            //fulfulled state
                            .then(
                                //updates movies array in state with data from json
                                (response) => {
                                    // this.setState({ results: response.data.releases })
                                    // console.log(this.state.results[0].title);
                                    // this.setState({
                                    //     ReleaseIDs: [],
                                    //     Titles: [],
                                    //     Dates: [],
                                    //     results: []
                                    // })
                                    for (let i = 0; i < response.data.releases.length; i++) {
                                        // this.state.results.push(new Result(response.data.releases[i].title, response.data.releases[i].date));
                                        // this.state.ReleaseIDs.push(response.data.releases[i].id);
                                        // this.state.Titles.push(response.data.releases[i].title);
                                        // this.state.Dates.push(response.data.releases[i].date);
                                        this.state.results.push(new Result(response.data.releases[i].title, response.data.releases[i].date))
                                    }
                                    // console.log(this.state.ReleaseIDs[6]);
                                    // console.log(this.state.Titles[6]);
                                    // console.log(this.state.Dates[6]);
                                    console.log(this.state.results[2].date);

                                    // this.setState({ ArtistID: 'oldVal'})
                                })
                            //rejected state, logs error message
                            .catch((error) => {
                                console.log(error);
                            });
                        // }

                    })
                //rejected state, logs error message
                .catch((error) => {
                    console.log(error);
                });
        }

    }

    handleChangeSelect(e) {
        // this.setState({
        //     Selection: ''
        // })
        // this.setState({
        //     Selection: e.target.value
        // })
        if (e.target.value !== '') {
            // var URL = this.getImgURL(e.target.value);

            let artist = this.state.Artist.replace(/\s/g, '_');
            let title = this.state.Selection.replace(/\s/g, '+');

            axios.get('https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=' + artist + '+' + title + '+official+album+cover&pageNumber=1&pageSize=1&autoCorrect=false',
                {
                    headers: {
                        'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
                        'x-rapidapi-key': '089bbbf25fmsh4c2becce25f5f03p1e1ccajsn4236d6277699'
                    }
                })
                .then(
                    //updates movies array in state with data from json
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
                // CoverArt: URL
            })

            //this.getImgURL(e.target.value);
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

    handleChangeCoverArt(URL) {
        this.setState({
            CoverArt: URL
        })
    }

    // getImgURL(albumName) {
    //     // var imgString = '';

    //     var options = {
    //         method: 'GET',
    //         url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI',
    //         params: {
    //             q: this.state.Artist + ' ' + albumName + ' official album cover',
    //             pageNumber: '1',
    //             pageSize: '1',
    //             autoCorrect: 'true'
    //         },
    //         headers: {
    //             'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
    //             'x-rapidapi-key': '089bbbf25fmsh4c2becce25f5f03p1e1ccajsn4236d6277699'
    //         }
    //     };

    //     axios.request(options).then(function (response) {
    //         // console.log(response.data.value[0].url);
    //         return response.data.value[0].url;
    //         //console.log('space' + this.state.CoverArt + 'space');
    //         // this.setState({ CoverArt: response.data.value[0].url })
    //     }).catch(function (error) {
    //         console.error(error);
    //     });
    //     // return imgString;

    // }

    // //Updates value of Rating in state when change is made to form
    // handleChangeCoverArt(e) {
    //     
    //     this.setState({ CoverArt: imgString });
    //     console.log(this.state.CoverArt);
    // }

    handleSubmit(e) {
        e.preventDefault();

        // var options = {
        //     method: 'GET',
        //     url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI',
        //     params: {
        //         q: this.state.Artist + ' ' + this.state.Title + ' official album cover',
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
        //     console.log(response.data.value[0].url);
        //     // return response.data.value[0].url;
        //     //console.log('space' + this.state.CoverArt + 'space');
        //     this.setState({ CoverArt: response.data.value[0].url })
        // }).catch(function (error) {
        //     console.error(error);
        // });




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
                                Your Rating:
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

export default ArtistSearch;

// https://musicbrainz.org/ws/2/artist/?query=artist:the_weeknd&fmt=json