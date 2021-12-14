import React, { Component } from 'react';
import axios from 'axios';

// Component to display a form where the user can submit a movie and its details
// Will be displayed when Create is seleted in nav bar
class Create extends Component {

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
            Rating: ''
        }
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

    //Prints success message with movie details in console and alert. Resets state values to blank
    //Now uses Axios to POST state values to server
    handleSubmit(e) {
        e.preventDefault();

        let success = this.state.Title + ' has been added!\nArtist: ' + this.state.Artist + '\nRating: ' + this.state.Rating;
        alert(success)
        console.log(success)

        axios.post('http://localhost:4000/albums', this.state)
            //fulfilled state, logs response
            .then((res) => {
                console.log(res);
            })
            //rejected state, logs error
            .catch((err) => {
                console.log(err);
            });

        this.setState({
            Title: '',
            Artist: '',
            Rating: 0
        })
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
                                Your Rating:
                                <input type="number" value={this.state.Rating} onChange={this.handleChangeRating} />
                            </label>
                        </div>
                    </div>
                    <input type="submit" value="Add Album" className="btn btn-primary" />
                </form>
            </div>
        );
    }
}

export default Create;