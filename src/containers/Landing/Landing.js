import React, { Component } from 'react';
import { Button, Container } from 'reactstrap';
import './Landing.css';

import twitterLogo from '../../assets/twitter.svg';
//import axios from 'axios';
import Auth from '../../components/Auth/Auth.js';

class Landing extends Component {
  authenticate() {
    const auth = new Auth();
    auth.login();

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
    return (
      <div>
        <div className="social-media-container clearfix">
          <img className="twitter" src={twitterLogo} alt="" />
        </div>

        <div className="main-title-container">
          <h1 className="main-title text-center ">Accumind</h1>
        </div>

        <div>
          <Container fluid>
            <div className="description">
              <p className="lead">
                A chat visualizer generating data visualization and gives mental
                health results.
              </p>
            </div>
          </Container>
        </div>

        <div className="button-container">
          <Button color="primary" onClick={() => {this.authenticate()}}>Login to Twitter</Button>
        </div>
      </div>
    );
  }
}

export default Landing;
