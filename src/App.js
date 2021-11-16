import './App.css';
import React, { Component } from 'react';
import Header from './components/header';
import Content from './components/content';
import Footer from './components/footer';
import Read from './components/read';
import Create from './components/create';
import Edit from './components/edit';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {

  // Routing is used to switch out which compnonent is being displayed,
  // based on which link in the Bootstrap NavBar is selected
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar bg="primary" variant="dark">
            <Container>
              <Navbar.Brand href="/">Home</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/Content">Content</Nav.Link>
                <Nav.Link href="/Create">Create</Nav.Link>
                <Nav.Link href="/Read">Read</Nav.Link>
                <Nav.Link href="/Edit">Edit</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <Switch>
            <Route path="/Content" component={Content}>
            </Route>
            <Route path="/Create" component={Create}>
            </Route>
            <Route path="/Read" component={Read}>
            </Route>
            <Route path="/Edit/:id" component={Edit}>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;