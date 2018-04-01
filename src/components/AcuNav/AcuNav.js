import React, { Component } from 'react';
import { Button, Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import './AcuNav.css';

import twitterLogo from '../../assets/twitter.svg';

class AcuNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar className="navbar" expand="md">
      <NavbarBrand>Acumind</NavbarBrand>
      <Nav className="mx-auto logo" navbar>
        <NavItem>
          <img className="twitter" src={twitterLogo} alt="Twitter" />
        </NavItem>
      </Nav>
      <Nav className="ml-auto" navbar>
        <NavItem>
          {(this.props.isResultsPage) ? <Button outline color="danger" onClick={this.props.onClick}>Log Out</Button> : <Button outline color="primary" onClick={this.props.onClick}>Get Started</Button>}
        </NavItem>
      </Nav>
    </Navbar>
    )
  }
}

export default AcuNav;