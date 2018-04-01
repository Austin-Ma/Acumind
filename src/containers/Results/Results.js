import React, { Component } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import './Results.css';

import LoadingModal from '../../components/LoadingModal/LoadingModal.js';
import AcuNav from '../../components/AcuNav/AcuNav.js';
import Auth from '../../components/Auth/Auth.js';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    )
  }
}

export default Results;