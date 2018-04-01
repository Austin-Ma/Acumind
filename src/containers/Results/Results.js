import React, { Component } from 'react';
import { Button, Container, Jumbotron, Row, Col, Alert } from 'reactstrap';
import axios from 'axios';
import './Results.css';

import LoadingModal from '../../components/LoadingModal/LoadingModal.js';
import AcuNav from '../../components/AcuNav/AcuNav.js';
import Auth from '../../components/Auth/Auth.js';
import NewCard from '../../components/NewCard/NewCard.js';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onDisplay: 0, // handles what's being displayed
      isLoading: true // handles the displaying of the modal
    };

    axios.get("https://us-central1-acumind-f0e34.cloudfunctions.net/getDataAlt?userID=" + "orange"/*+ localStorage.getItem("user_id")*/)
      .then(res => {
        console.log(res.data);
        this.setState({
          data: res.data,
          isLoading: false
        });
      }).catch(error => {
        console.log(error);
        // stuck forever in a loading screen :(
      })

      this.handler = this.handler.bind(this);
  }

  logout() {
    const auth = new Auth();
    auth.logout();
  }

  handler(num) {
    console.log(num)
    this.setState({
      onDisplay: num
    });
  }

  render() {
    var result;
    switch (this.state.onDisplay) {
      case 1:
        result = <div></div>;
        break;
      case 2:
        result = <div></div>;
        break;
      case 3:
        result = <div></div>;
        break;
      default:
        result = <div><br /><Alert color="info">Click on any of the images to see a more detailed breakdown.</Alert></div>;
    }

    return (

      <div>
        <AcuNav isResultsPage={true} onClick={() => {this.logout()}} />

        <Container className="result-container">
          <Row>
            <Col md="12">
              <Jumbotron className="results-jumbotron">
                <h3 className="results">Results</h3>
              </Jumbotron>
            </Col>
          </Row>

          <Row>
            <Col md="4">
              <NewCard
                cardImgSrc="https://i.imgur.com/U024Hop.png"
                cardTitle="Personality Traits"
                cardText="Testing"
                handler={this.handler}
                num={1} />
            </Col>
            <Col md="4">
              <NewCard
                cardImgSrc="https://i.imgur.com/u12hID9.png"
                cardTitle="Sentiment Analysis"
                cardText="Testing"
                handler={this.handler}
                num={2} />
            </Col>
            <Col md="4">
              <NewCard
                cardImgSrc="https://i.imgur.com/EYEzCsa.png"
                cardTitle="Time-of-day Analysis"
                cardText="Testing"
                handler={this.handler}
                num={3} />
            </Col>
          </Row>

          <Row>
            <Col md="12">
              <div className="category-info">
                {result}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Results;

/*

      <div className="results">
        <AcuNav isResultsPage={true} onClick={() => {this.logout()}} />
        <h1>[RESULT]</h1>
        <h2>{this.state.userID}</h2>
        <div className="results-buttons">
          <Button color="primary">Personality</Button>
          <Button color="primary">Sentiment Analysis</Button>
          <Button color="primary">Keywords</Button>
        </div>
        <LoadingModal className="loading-modal" isOpen={this.state.isLoading} />
      </div>
*/