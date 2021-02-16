import React, { Component} from 'react';
import { Link,Redirect } from 'react-router-dom';
import './LoginNavbar.css';
import Axios from "axios";
import {
  Button
} from "@material-ui/core";

class LoginNavbar extends Component {
  state = {
    click:false,
    loggedOut:false
  };
  handleClick = (value) => {
    value==true ? this.setState({ ['click']: false }) : this.setState({ ['click']: true });
  };

  closeMobileMenu = () => {
    this.setState({ ['click']: false });
  };

  LogOut = (data) =>{
      // this.props.handleLogout();
      Axios.post("http://localhost:5000/user/logout",data)
      .then((res) => {
        this.props.handleLogout();
      })
      .catch((err) => {
        console.log("Axios", err);
      });
      this.setState({['loggedOut']:true});
  };

  render(){
    const {userInfo} = this.props;
    const {
      click,
      loggedOut
    }=this.state;
    return (
        <nav className='navbar'>
          <div className='navbar-container'>
            <Link to='/login' className='navbar-logo' onClick={() => this.closeMobileMenu()}>
                MakeMyAppointment
            </Link>
            <div className='menu-icon' onClick={() => this.handleClick(click)}>
              <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                <Link
                  to={{
                      pathname: '/loginHome', 
                      data: {userInfo}
                     }}  className='nav-links' onClick={() => this.closeMobileMenu()}>
                  HOME
                  {console.log(userInfo)}
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/test'
                  className='nav-links'
                  onClick={() => this.closeMobileMenu()}
                >
                  TESTS 
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to="/profile"
                  className='nav-links'
                  onClick={() => this.closeMobileMenu()}
                >
                  PROFILE
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to="/login"
                  className='nav-links'
                  color="primary"
                  onClick={() => this.closeMobileMenu(),() => this.LogOut(userInfo)}
                >
                  LOGOUT
                </Link>
              </li>
              
            </ul>
          </div>
          {loggedOut && 
            <Redirect 
              to={{
                pathname: "/login", 
                data: loggedOut
              }} 
            />
          }
        </nav>
    );
  }
}

export default LoginNavbar;
