import React, { Component } from 'react';
import ResultInstance from "./ResultInstance";
import { ListGroup } from 'react-bootstrap';

class Results extends Component {

    // constructor(props){
    //     super(props);
    // }
    state = {
        results: [],
        titles: []
    }

    // componentDidMount(){
    //     console.log(this.props.results[0]);
    // }

    // render() {
    //     return (<div><h4>{this.props.results[0]}</h4></div>);

    //}
    // logResults() {
    //     console.log(this.props.results);
    // }


    render() {
        // //this.logResults();
        this.state.results = this.props;
        return this.state.results.map((ReleaseIDs, Titles, Dates) => {
            return <ResultInstance ReleaseIDs={ReleaseIDs} Titles={Titles} Dates={Dates} ReloadData={this.props.ReloadData}></ResultInstance>
            //return <h4>{this.props.results[0].title}</h4>
        })

        // let returnString = this.props.results[0].title;


        //console.log(this.props.results);
        //this.state.results = this.props.results;
        console.log(this.props.ReleaseIDs.length);

        // for (let i = 0; i < this.state.results.length; i++) {


        // }

        // this.setState.results = this.props.results
        // if (this.state.results.length > 0) {
        //     for (let i = 0; i < this.state.results.length; i++) {
        //         returnString = this.state.results[i].title;
        //         console.log(this.state.results[i].title);
        //     }
        // }


        if (this.props.Titles[0] != null) {
            for (let i = 0; i < this.props.ReleaseIDs.length; i++) {
                return (
                    <ListGroup.Item
                        as="li" className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{this.props.Titles[i]}</div>
                            {this.props.Dates[i]}
                        </div>
                    </ListGroup.Item>
                );
            }
        } else {
            return null;
        }

        // return (
        //     <ListGroup.Item
        //         as="li" className="d-flex justify-content-between align-items-start">
        //         <div className="ms-2 me-auto">
        //             <div className="fw-bold">idk</div>
        //             Cras justo odio
        //         </div>
        //     </ListGroup.Item>
        // );

    }
}

export default Results;