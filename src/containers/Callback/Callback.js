import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Callback extends Component {
  constructor(props) {
    super(props);
    const accessToken = this.getAccessToken(this.props.location.hash);
    localStorage.setItem("twitter_accesstoken", accessToken);
  }

  getAccessToken(hash) {
    return hash.slice(hash.indexOf('=') + 1, hash.indexOf('&'));
  }
  
  render() {
    return (
      <Redirect to="/results" />
    )
  }
}

export default Callback;