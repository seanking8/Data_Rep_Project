import React, { Component } from 'react';

// Component to display a heading
// Will be displayed when Create is seleted in nav bar
class Create extends Component {

    constructor() {
        //invoke parent constructor
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeYear = this.handleChangeYear.bind(this);
        this.handleChangePoster = this.handleChangePoster.bind(this);

        //initialise values set to blank
        this.state = {
            Title: '',
            Year: '',
            Poster: ''
        }
    }

    handleChangeTitle(e) {
        this.setState({
            Title: e.target.value
        })
    }

    handleChangeYear(e) {
        this.setState({
            Year: e.target.value
        })
    }

    handleChangePoster(e) {
        this.setState({
            Poster: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        let success = this.state.Title+' has been added!\nYear: '+this.state.Year+'\nPoster URL: '+this.state.Poster;
        alert(success)
        console.log(success)
    }

    render() {
        return (
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