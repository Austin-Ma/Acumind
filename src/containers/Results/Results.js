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

    axios.get("https://us-central1-acumind-f0e34.cloudfunctions.net/getDataAlt?userID=" + localStorage.getItem("user_id"))
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
      case 1: //personality traits 
        result = <div><br /><Alert color="info">You seem to tend towards more negative thoughts in your tweets overall.
        Remember to always think positive!</Alert></div>;
        break;
      case 2: ////sentiment analysis
        result = <div><br /><Alert color="danger">Some notable personality traits we detected include: <b>sadness, fear, anxiety</b>.
        Consistently showing negative emotions like these could be a sign of possible depression.</Alert></div>;
        break;
      case 3:////timestamp 
        result = <div><br /><Alert color="warning">You appear to be most active around <b>3 am</b> and least active around <b>6 am</b>.
        Try not to stay up late on a consistent basis.</Alert></div>;
        break;
      default:
        result = <div><br /><Alert color="info">Click on any of the buttons above to see a more detailed breakdown.</Alert></div>;
    }

    return (

      <div>
        <AcuNav isResultsPage={true} onClick={() => {this.logout()}} />

        <Container className="result-container">
          <Row>
            <Col md="12">
              <Jumbotron className="results-jumbotron">
                <h3><b>You may be at a high risk for depression or another mental health disorder.</b></h3>
                <h4>While these results are by no means conclusive, they suggest that you should seek further council from a mental health provider.</h4>
              </Jumbotron>
            </Col>
          </Row>

          <Row>
            <Col md="4">
              <NewCard
                cardImgSrc="https://i.imgur.com/U024Hop.png"
                cardTitle="Personality Traits"
                cardText="What type of personality do you show online?"
                handler={this.handler}
                num={1} />
            </Col>
            <Col md="4">
              <NewCard
                cardImgSrc="https://i.imgur.com/u12hID9.png"
                cardTitle="Sentiment Analysis"
                cardText="What is the overall tone of your tweets? Are you more high-strung and easy to anger, or are you emotionally balanced?"
                handler={this.handler}
                num={2} />
            </Col>
            <Col md="4">
              <NewCard
                cardImgSrc="https://i.imgur.com/EYEzCsa.png"
                cardTitle="Time-of-day Analysis"
                cardText="When are you usually online? Are you a night owl?"
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