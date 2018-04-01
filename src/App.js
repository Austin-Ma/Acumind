import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Landing from './containers/Landing/Landing.js';
import Results from './containers/Results/Results.js';
import Callback from './containers/Callback/Callback.js';

import history from './history.js';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Route path="/results" component={Results} />
          <Route path="/twittercallback" component={Callback} />
        </div>
      </Router>
    );
  }
}

export default App;

// (/:expires_in)(/:token_type)(/:state)(/:id_token)