import React, { Component } from 'react';
import { Card, CardImg, CardText, CardTitle, CardBody, Button, CardImgOverlay } from 'reactstrap';

import './NewCard.css';

class NewCard extends Component {
  render() {
    return (
      <div className="card-container">
        <Card>
          <CardImg top width="100%" className="image" src={this.props.cardImgSrc} alt={this.props.cardAlt} />
          <CardBody>
            <CardTitle>{this.props.cardTitle}</CardTitle>
            <CardText>{this.props.cardText}</CardText>
            <Button color="secondary" onClick={() => {this.props.handler(this.props.num)}}>Display</Button>
          </CardBody>
        </Card>
      </div>
    )
  }
}
export default NewCard;
