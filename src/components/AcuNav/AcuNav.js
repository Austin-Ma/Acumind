import React, { Component } from 'react';
import { Button, Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import './AcuNav.css';

import logo from '../../assets/acumind-logo.png';

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
          <img className="logo" src={logo} alt="Twitter" />
        </NavItem>
      </Nav>
      <Nav className="ml-md-auto" navbar>
        <NavItem>
          {(this.props.isResultsPage) ? <Button outline color="primary" onClick={this.props.onClick}>Log Out</Button> : <Button outline color="info" onClick={this.props.onClick}>Get Started</Button>}
        </NavItem>
      </Nav>
    </Navbar>
    )
  }
}

export default AcuNav;