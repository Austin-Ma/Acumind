import React, { Component } from 'react';
import './Results.css';
import {
  Row,
  Col,
  Jumbotron,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container
} from 'reactstrap';

import NewCard from '../NewCard/NewCard';

class Results extends Component {
  render() {
    return (
      <div>
        <Jumbotron fluid>
          <h1 className="display-3">Accumind</h1>
          <p className="lead">Results</p>
        </Jumbotron>

        <Container>
          <Row>
            <Col xs="4">
              <NewCard
                cardImgSrc="https://placeimg.com/640/480/any"
                cardTitle="Itel"
                cardText="Domingo"
              />
            </Col>
            <Col xs="4">
              <NewCard
                cardImgSrc="https://placeimg.com/640/480/tech"
                cardTitle="Sentiment Analysis"
                cardText="Why we do what we do!"
              />
            </Col>
            <Col xs="4">
              <Card>
                <CardImg
                  top
                  width="100%"
                  src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                  alt="Card image cap"
                />
                <CardBody>
                  <CardTitle>Card title</CardTitle>
                  <CardSubtitle>Card subtitle</CardSubtitle>
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </CardText>
                  <Button>Button</Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Results;
