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
    loggedOut:false,
    GotTests:false,
    testInfo:"0",
    succeed:false
  };
  handleClick = (value) => {
    value==true ? this.setState({ ['click']: false }) : this.setState({ ['click']: true });
  };

  closeMobileMenu = () => {
    this.setState({ ['click']: false });
  };

  LogOut = (data) =>{
      Axios.post("http://localhost:5000/user/logout",data)
      .then((res) => {
        this.setState({['loggedOut']:true});
      })
      .catch((err) => {
        console.log("Axios", err);
      });
  };
  getTests = (data) =>{
      Axios.post("http://localhost:5000/appointment/all",data)
      .then((res) => {
          this.setState({testInfo:res.data});   
          this.setState({['succeed']:true});

      })
      .catch((err) => {
        console.log("Axios", err);
      });

  };
  render(){
    const {userInfo} = this.props;
    const {
      click,
      loggedOut,
      testInfo,
      GotTests,
      succeed
    }=this.state;
    const values={
      userInfo,
      testInfo
    }
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
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className='nav-links'
                  onClick={() => this.closeMobileMenu(),() => this.getTests(userInfo)}
                >
                  TESTS 
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to={{
                      pathname: '/profile', 
                      data: {userInfo}
                     }}
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
          {succeed && 
            <Redirect 
              to={{
                pathname: '/test', 
                data: values
              }} 
            />
          }
        </nav>
    );
  }
}

export default LoginNavbar;
