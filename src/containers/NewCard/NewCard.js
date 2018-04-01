import React from 'react';
import { Card, CardImg, CardText, CardTitle } from 'reactstrap';

import './NewCard.css';

const NewCard = ({ cardImgSrc, cardTitle, cardText }) => (
  <Card>
    <div className="card-container">
      <CardImg top width="100%" src={cardImgSrc} alt="Card image cap" />
      <h5 className="card-title">{cardTitle}</h5>
      <p className="card-text">{cardText}</p>
    </div>
  </Card>
);

export default NewCard;
