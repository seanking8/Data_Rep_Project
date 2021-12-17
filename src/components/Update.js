import React, { Component } from 'react';
import axios from 'axios';

// Component to display a form where the user can submit an album
class Update extends Component {

    constructor() {
        //invoke parent constructor
        super();

        //bind events to this instance
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeArtist = this.handleChangeArtist.bind(this);
        this.handleChangeRating = this.handleChangeRating.bind(this);

        //set values in state to blank
        this.state = {
            Title: '',
            Artist: '',
            Rating: 0
        }
    }

    //When component becomes active, pass id from URL server to identify and read album document from DB
    componentDidMount() {
        console.log(this.props.match.params.id);

        //Async call which returns promise
        axios.get('http://localhost:4000/albums/' + this.props.match.params.id)
            //fulfilled state, adds response to state
            .then(response => {
                this.setState({
                    _id: response.data._id,
                    Title: response.data.Title,
                    Artist: response.data.Artist,
                    Rating: response.data.Rating
                })
            })
            //rejected state, logs error
            .catch((error) => {
                console.log(error);
            });
    }

    //Updates value of Title in state when change is made to form
    handleChangeTitle(e) {
        this.setState({
            Title: e.target.value
        })
    }

    //Updates value of Artist in state when change is made to form
    handleChangeArtist(e) {
        this.setState({
            Artist: e.target.value
        })
    }

    //Updates value of Rating in state when change is made to form
    handleChangeRating(e) {
        this.setState({
            Rating: e.target.value
        })
    }

    //Prints success message with album details in console and alert. Resets state values to blank
    //Now uses Axios to POST state values to server
    handleSubmit(e) {
        e.preventDefault();

        let success = this.state.Title + ' has been Updated!\nArtist: ' + this.state.Artist + '\nRating: ' + this.state.Rating;
        alert(success)
        console.log(success)

        //Pass new album info from the state to the server where it will be written to the DB
        axios.put('http://localhost:4000/albums/' + this.state._id, this.state)
            //fulfilled state, logs response
            .then(res => {
                console.log(res.data);
            })
            //rejected state, logs error
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (

            //Form for user to input the movie data. Any change will update the state. Submit calls above function

            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <div className="col">
                            <label>
                                Album Title:
                                <input type="text" value={this.state.Title} onChange={this.handleChangeTitle} />
                            </label>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col">
                            <label>
                                Artist:
                                <input type="text" value={this.state.Artist} onChange={this.handleChangeArtist} />
                            </label>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col">
                            <label>
                                Rating:
                                <input type="text" value={this.state.Rating} onChange={this.handleChangeRating} />
                            </label>
                        </div>
                    </div>
                    <input type="submit" value="Edit Album" className="btn btn-primary" />
                </form>
            </div>
        );
    }
}

export default Update;