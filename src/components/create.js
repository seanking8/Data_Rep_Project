import React, { Component } from 'react';

// Component to display a form where the user can submit a movie and its details
// Will be displayed when Create is seleted in nav bar
class Create extends Component {

    constructor() {
        //invoke parent constructor
        super();

        //bind events to this instance
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeYear = this.handleChangeYear.bind(this);
        this.handleChangePoster = this.handleChangePoster.bind(this);

        //set values in state to blank
        this.state = {
            Title: '',
            Year: '',
            Poster: ''
        }
    }

    //Updates value of Title in state when change is made to form
    handleChangeTitle(e) {
        this.setState({
            Title: e.target.value
        })
    }

    //Updates value of Year in state when change is made to form
    handleChangeYear(e) {
        this.setState({
            Year: e.target.value
        })
    }

    //Updates value of Poster in state when change is made to form
    handleChangePoster(e) {
        this.setState({
            Poster: e.target.value
        })
    }

    //Prints success message with movie details in console and alert. Resets state values to blank
    handleSubmit(e) {
        e.preventDefault();

        let success = this.state.Title + ' has been added!\nYear: ' + this.state.Year + '\nPoster URL: ' + this.state.Poster;
        alert(success)
        console.log(success)

        this.setState({
            Title: '',
            Year: '',
            Poster: ''
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
                                Movie Title:
                                <input type="text" value={this.state.Title} onChange={this.handleChangeTitle} />
                            </label>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col">
                            <label>
                                Year of Release:
                                <input type="text" value={this.state.Year} onChange={this.handleChangeYear} />
                            </label>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col">
                            <label>
                                Poster URL:
                                <input type="text" value={this.state.Poster} onChange={this.handleChangePoster} />
                            </label>
                        </div>
                    </div>
                    <input type="submit" value="Add Movie" className="btn btn-primary" />
                </form>
            </div>
        );
    }
}

export default Create;