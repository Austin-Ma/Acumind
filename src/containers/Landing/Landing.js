import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Button } from 'reactstrap';

import twitterLogo from '../../assets/twitter.svg';

import './Landing.css';

class Landing extends Component {
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
          <Button color="primary">Login to Twitter</Button>
        </div>
      </div>
    );
  }
}

export default Landing;
