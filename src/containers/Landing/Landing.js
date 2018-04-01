import React, { Component } from 'react';
import { Button, Container, Jumbotron } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import './Landing.css';

import twitterLogo from '../../assets/twitter.svg';
//import axios from 'axios';
import Auth from '../../components/Auth/Auth.js';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }

  authenticate() {
    const auth = new Auth();
    if (localStorage.getItem("auth0_accesstoken") === null) {
      // first time login
      console.log("first time login");
      auth.login();
    } else if (!auth.isAuthenticated()) {
      // access token exists but has expired, so renew
      console.log("renew token");
      auth.renewToken();
      this.setState({
        isLoggedIn: true
      })
    } else {
      // access token is valid; skip directly to result page
      console.log("valid token");
      this.setState({
        isLoggedIn: true
      })
    }

    /*
    console.log("hi")
    const postData = {
      oauth_callback: "http://localhost:3000/twittercallback"
    };
    const auth = "OAuth oauth_consumer_key="\"" + 

    axios.post("https://api.twitter.com/oauth/request_token", postData, {
      headers: {
        "Authorization": 
      }
    })
      .then(res => {
        const redirectURL = "https://api.twitter.com/oauth/authenticate?oauth_token=" + res.data.oauth_token;
        window.location = redirectURL;
      }).catch(error => {
        console.log(error);
      })
      */
  }

  render() {
    if (this.state.isLoggedIn) return (<Redirect to="/results" />)
    else return (
      <div>
        <div className="social-media-container clearfix">
          <img className="twitter" src={twitterLogo} alt="Twitter" />
        </div>

        <Jumbotron fluid>
          <Container fluid>
            <div className="main-title-container">
              <h1 className="main-title text-center">Acumind</h1>
            </div>
            <div className="description">
              <p className="lead">
                Estimating your mental health through your online presence.
              </p>
            </div>
            <div className="button-container">
              <Button color="primary" onClick={() => {this.authenticate()}}>Check My Mental Health</Button>
            </div>
          </Container>
        </Jumbotron>


      </div>
    );
  }
}

export default Landing;

/*
          <Button color="primary" onClick={() => {this.authenticate()}}>
            <img className="twitter" src={twitterLogo} alt="Twitter" />
            Login to Twitter
          </Button>*/