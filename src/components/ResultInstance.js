import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/Button';
import axios from "axios";

class ResultInstance extends Component {

    constructor() {
        super();

        // //bind events to this instance
        // this.DeleteAlbum = this.DeleteAlbum.bind(this);
    }

    // //Makes HTTP DELETE request to server to delete movie.
    // //Also calls ReloadData function which has been passed down from its grandparent, the Read component
    // DeleteAlbum(e) {
    //     e.preventDefault();
    //     console.log("Deleting " + this.props.album._id + "... ");

    //     axios.delete("http://localhost:4000/albums/" + this.props.album._id)
    //         //fulfulled state
    //         .then(() => {
    //             this.props.ReloadData();
    //         })
    //         //rejected state, logs error message
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }
    
    componentDidMount(){
        console.log(this.props.ReleaseIDs);
        console.log("anythign");
    }

    render() {
        console.log("anythign");

        return (
            <ListGroup.Item
                as="li" className="d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">idk</div>
                    Cras justo odio
                </div>
            </ListGroup.Item>
        );
    }
}

export default ResultInstance;