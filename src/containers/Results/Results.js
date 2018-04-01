import React, { Component } from 'react';
import { Button, Container, Jumbotron, Row, Col } from 'reactstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
  }

  logout() {
    const auth = new Auth();
    auth.logout();
  }

  render() {
    return (

      <div>
        <AcuNav isResultsPage={true} onClick={() => {this.logout()}} />

        <Jumbotron fluid className="results-jumbotron">
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
                cardImgSrc="https://i.imgur.com/EYEzCsa.png"
                cardTitle="Time-of-day Analysis"
              />
            </Col>
          </Row>
        </Container>

        <div className="category-info">
          {return (this.state.onDisplay === 0) ? "" : null}
          {return (this.state.onDisplay === 1) ? "" : null}
          {return (this.state.onDisplay === 2) ? "" : null}
          {return (this.state.onDisplay === 3) ? "" : null}
        </div>
        
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