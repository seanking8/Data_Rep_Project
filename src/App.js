import './App.css';
import React, { Component } from 'react';
import Header from './components/header';
import Content from './components/content';
import Footer from './components/footer';
import Read from './components/read';
import Create from './components/create';
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
              </Nav>
            </Container>
          </Navbar>
          <Switch>
            <Route path="/Content">
              <Content />
            </Route>
            <Route path="/Create">
              <Create />
            </Route>
            <Route path="/Read">
              <Read />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;