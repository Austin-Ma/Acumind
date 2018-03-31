import React, { Component } from 'react';

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';

import twitterLogo from '../../assets/twitter.svg';

import './Landing.css';

class Landing extends Component {
  render() {
    return (
      <div>
        <img className="twitter" src={twitterLogo} align="right" alt="" />
        <h1>Accumind</h1>
        <Card>
          <CardImg
            top
            width="70%"
            src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
            alt="Card"
          />
          <CardBody>
            <CardTitle>Card title</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </CardText>
            <Button color="primary">Login to Twitter</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Landing;
