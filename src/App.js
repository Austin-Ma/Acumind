import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>


        <Route exact path='/' />


        </div>
      </Router>
    );
  }
}

export default App;

/*
          <ul>
            <li><Link to="/">Login</Link></li>
            <li><Link to="/home">Home</Link></li>
            <Button primary> Test </Button>
          </ul>


                    <Route exact path="/" component={Login}/>
          <Route path="/home" component={Home}/>
*/