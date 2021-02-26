import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {Navbar,Nav,NavDropdown} from 'react-bootstrap'

function Navbar1() {
  return (
  <Navbar style={{backgroundColor:'#a5a89f' , fontColor:'bisque' ,opacity:'0.9'}} sticky="top" collapseOnSelect expand="lg" variant="dark">
    <Navbar.Brand as={Link} to='/'><b style={{fontSize:"30px"}}>M</b>ake <b style={{fontSize:"30px"}}>M</b>y <b style={{fontSize:"30px"}}>A</b>ppointment</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse style={{marginTop:'2vh',backgroundColor: '#a5a89f'}}id="responsive-navbar-nav">
      <Nav className="ml-auto" style={{marginRight:'30px'}}>
        <Nav.Link style={{marginRight:'50px'}} as={Link} to='/' >Home</Nav.Link>
        <NavDropdown style={{marginRight:'50px'}} title="Register" id="collasible-nav-dropdown">
          <NavDropdown.Item as={Link} to='/register' >User</NavDropdown.Item>
          <NavDropdown.Item as={Link} to='/centerRegister' >Test Center</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown style={{marginRight:'50px'}} title="Login" id="collasible-nav-dropdown">
          <NavDropdown.Item as={Link} to='/login' >User</NavDropdown.Item>
          <NavDropdown.Item as={Link} to='/centerLogin' >Test Center</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  );
}

export default Navbar1;
