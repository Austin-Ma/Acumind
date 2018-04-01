import React, { Component } from 'react';
import { Card, CardImg, CardText, CardTitle } from 'reactstrap';

import './NewCard.css';

class NewCard extends Component {
  render() {
    return (
      <Card>
      <div className="card-container">
        <CardImg top width="100%" src={this.props.cardImgSrc} alt="Card image cap" />
        <h5 className="card-title">{this.props.cardTitle}</h5>
        <p className="card-text">{this.props.cardText}</p>
      </div>
    </Card>
    )
  }
}
export default NewCard;
