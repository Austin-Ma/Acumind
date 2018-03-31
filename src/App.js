import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Landing from './Components/Landing/Landing';

class App extends Component {
  render() {
    return (
      <div>
        <Landing />
      </div>
    );
  }
}

export default App;
