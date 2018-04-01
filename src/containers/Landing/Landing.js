import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Container } from 'reactstrap';

import twitterLogo from '../../assets/twitter.svg';

import './Landing.css';

class Landing extends Component {
  render() {
    return (
      <div>
        <div className="social-media-container clearfix">
          <img className="twitter" src={twitterLogo} alt="twitter logo" />
        </div>

        <div className="main-title-container">
          <h1 className="main-title text-center ">Acumind</h1>
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

        <Link to="/results">
          <div className="login-button">
            <ButtonGroup>
              <Button color="primary">
                <i className="fab fa-twitter" />
              </Button>
              <Button color="primary">Login with Twitter</Button>
            </ButtonGroup>
          </div>
        </Link>
      </div>
    );
  }
}

export default Landing;
