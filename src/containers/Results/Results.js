import React, { Component } from 'react';
import './Results.css';

import twitterLogo from '../../assets/twitter.svg';

import {
  Row,
  Button,
  Col,
  Card,
  CardImg,
  CardTitle,
  Container,
  Jumbotron
} from 'reactstrap';

import NewCard from '../NewCard/NewCard';

class Results extends Component {
  render() {
    return (
      <div>
        <div className="social-media-container clearfix">
          <img className="twitter" src={twitterLogo} alt="twitter logo" />
          <h1 className="header">Accumind</h1>
        </div>

        <Jumbotron>
          <h3 className="results">Results</h3>
        </Jumbotron>

        <Container>
          <Row>
            <Col xs="4">
              <NewCard
                cardImgSrc="https://i.imgur.com/U024Hop.png"
                cardTitle="Personality Traits"
              />
            </Col>
            <Col xs="4">
              <NewCard
                cardImgSrc="https://i.imgur.com/u12hID9.png"
                cardTitle="Sentiment Analysis"
              />
            </Col>
            <Col xs="4">
              <NewCard
                cardImgSrc="https://placeimg.com/640/480/tech"
                cardTitle="Altruism"
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Results;
