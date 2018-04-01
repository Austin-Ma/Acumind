import React, { Component } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import './Results.css';

import LoadingModal from '../../components/LoadingModal/LoadingModal.js';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false // handles the displaying of the modal
    };

    axios.get("localhost:3000/getData/" + localStorage.getItem("twitter_accesstoken"))
      .then(res => {
        this.setState({
          data: res.data,
          isLoading: true
        });
      }).catch(error => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="results">
        <h1>[RESULT]</h1>
        <h2>{this.state.userID}</h2>
        <div className="results-buttons">
          <Button color="primary">Personality</Button>
          <Button color="primary">Sentiment Analysis</Button>
          <Button color="primary">Keywords</Button>
        </div>
        <LoadingModal className="loading-modal" isOpen={this.state.isLoading} />
      </div>
    )
  }
}

export default Results;