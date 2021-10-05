import './App.css';
import React, { Component } from 'react';
import Header from './components/header';
import Content from './components/content';
import Footer from './components/footer';
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

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar bg="primary" variant="dark">
            <Container>
              <Navbar.Brand href="/">Home</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/Header">Header</Nav.Link>
                <Nav.Link href="/Content">Content</Nav.Link>
                <Nav.Link href="/Footer">Footer</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <Switch>
            <Route path="/Header">
              <Header />
            </Route>
            <Route path="/Content">
              <Content />
            </Route>
            <Route path="/Footer">
              <Footer />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;