import './App.css';
import React, { Component } from 'react';
import Home from './Components/Home';
import Add from './Components/Add';
import Edit from './Components/Edit';
import List from './Components/List';
import ArtistSearch from './Components/ArtistSearch';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import {
  BrowserRouter as BRouter,
  Switch,
  Route
} from "react-router-dom";

class App extends Component {

  // Routing is used to switch out which compnonent is being displayed,
  // based on which link in the Bootstrap NavBar is selected
  render() {
    return (
      <BRouter>
        <div className="App">
          <Navbar bg="dark" variant="dark">
            <Container><Navbar.Brand href="/home">
              <img
                alt=""
                src="/logo.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              Record-Scratch
            </Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/list">List</Nav.Link>
                <Nav.Link href="/add">Add</Nav.Link>
                <Nav.Link href="/edit">Edit</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <Switch>
            <Route path="/home" component={Home}>
            </Route>
            <Route path="/Add" component={Add}>
            </Route>
            <Route path="/List" component={List}>
            </Route>
            <Route path="/Edit/:id" component={Edit}>
            </Route>
            <Route path="/ArtistSearch" component={ArtistSearch}>
            </Route>
          </Switch>
        </div>
      </BRouter>
    );
  }
}

export default App;