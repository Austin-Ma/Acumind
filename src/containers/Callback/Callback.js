import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Auth from '../../components/Auth/Auth.js';

class Callback extends Component {
  constructor(props) {
    super(props);

    const auth = new Auth();
    /*if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication();
    }*/
    auth.handleAuthentication();

    /*
    const accessToken = this.getAccessToken(this.props.location.hash);
    if (accessToken !== undefined) {
      localStorage.setItem("twitter_accesstoken", accessToken);
    } else {

    }
    */


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