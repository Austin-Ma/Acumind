import React, { Component } from 'react';
import './Results.css';

import acumindLogo from '../../assets/acumind-logo.png';

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
          <img className="acumind" src={acumindLogo} alt="acumind logo" />
          <h1 className="header">Results</h1>
          <div className="signout">
            <Button outline color="info">
              Sign Out
            </Button>{' '}
          </div>
        </div>

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
                cardImgSrc="https://i.imgur.com/QnzBASD.png"
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
