import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {Navbar,Nav,NavDropdown} from 'react-bootstrap'

function Navbar1() {
  return (
  <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand as={Link} to='/'>MakeMyAppointment</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse style={{backgroundColor: '#353A40', borderRadius:'10px', paddingLeft:'10px', margin:'0 -15px'}}id="responsive-navbar-nav">
      <Nav className="ml-auto" style={{marginRight:'30px'}}>
        <Nav.Link style={{marginRight:'50px'}} as={Link} to='/' >Home</Nav.Link>
        <NavDropdown style={{marginRight:'80px'}} title="Register" id="collasible-nav-dropdown">
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
