import React, { Component } from 'react';

import {
  Button,
  Container,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from 'reactstrap';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';

// importing external css files
import './Landing.css';

// importing image files
import twitterIcon from '../../assets/twitter.svg';

class Landing extends Component {
  render() {
    return (
      <div>
        <Container>
          <h1 className="title">Accumind</h1>

          <div className="icon-container col">
            <a href="https://twitter.com/iteldomingo">
              <img
                src={twitterIcon}
                alt="twitter icon"
                title="twitter"
                className="icon-twitter"
              />
            </a>
          </div>

          <p>
            A chat visualizer generating data visualization and gives mental
            health results. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </p>
        </Container>

        {/*How to use the card example*/}
        <Card className="card-small">
          <CardImg
            src="https://placeimg.com/200/200/people"
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle>Something</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </CardText>

            <Button>Login with Twitter</Button>
          </CardBody>
        </Card>
        <FontAwesomeIcon icon={['fab', 'twitter']} />
      </div>
    );
  }
}

export default Landing;
