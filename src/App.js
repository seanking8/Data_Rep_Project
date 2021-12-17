import './App.css';
import React, { Component } from 'react';
import Home from './Components/Home';
import Add from './Components/Add';
import Update from './Components/Update';
import List from './Components/List';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Logo from './Logo.svg'
import {
  BrowserRouter as BRouter,
  Switch,
  Route
} from "react-router-dom";

class App extends Component {

  // Using Routing to switch out which compnonent is being displayed,
  // based on which link in the Bootstrap NavBar is selected
  render() {
    return (
      <BRouter>
        <div className="App">
          <Navbar class="Navbar" expand="lg" bg="dark" variant="dark" >
            <Container bg="blue">
              <Navbar.Brand href="/home">
                <img
                  alt=""
                  src={Logo}
                  width="70"
                  height="70"
                  className="d-inline-block"
                />
                Record-Scratch
              </Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/list">List</Nav.Link>
                <Nav.Link href="/add">Add</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <Switch>
            <Route path="/home" component={Home}>
            </Route>
            <Route exact path="/" component={Home}>
            </Route>
            <Route path="/Add" component={Add}>
            </Route>
            <Route path="/List" component={List}>
            </Route>
            <Route path="/Update/:id" component={Update}>
            </Route>
          </Switch>
        </div>
      </BRouter>
    );
  }
}

export default App;