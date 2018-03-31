import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Landing from './containers/Landing/Landing.js';
import Results from './containers/Results/Results.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Route path="/results" component={Results} />
        </div>
      </Router>
    );
  }
}

export default App;
