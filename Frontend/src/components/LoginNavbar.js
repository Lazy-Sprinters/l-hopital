import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import './LoginNavbar.css';
import Axios from "axios";
import {
  Button
} from "@material-ui/core";

class LoginNavbar extends Component {
  state = {
    click:false
  };
  handleClick = (value) => {
    value==true ? this.setState({ ['click']: false }) : this.setState({ ['click']: true });
  };

  closeMobileMenu = (ch) => {
    this.setState({ ['click']: false });
    switch(ch){
      case 0: this.Home(this);break;
      case 1: this.Add(this);break;
      case 2: this.View(this);break;
      case 3: this.Delete(this);break;
    }
    
  };

  Home = (e) => {
    this.props.NavHome();
  };

  Add = (e) => {
    this.props.NavAdd();
  };

  View = (e) => {
    this.props.NavView();
  };

  Delete = (e) => {
    this.props.NavDelete();
  };

  LogOut = (data) =>{

      // this.props.handleLogout();
      Axios.post("http://localhost:5000/users/logout",data)
      .then((res) => {
        this.props.handleLogout();
      })
      .catch((err) => {
        console.log("Axios", err);
      });
  };

  render(){
    const {userValues,handleLogout,NavHome,NavAdd,NavView,NavDelete} = this.props;
    const {
      click
    }=this.state;
    return (
        <nav className='navbar'>
          <div className='navbar-container'>
            <Link to='/login' className='navbar-logo' onClick={() => this.closeMobileMenu(0)}>
                MEDICOS
            </Link>
            <div className='menu-icon' onClick={() => this.handleClick(click)}>
              <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                <Link
                  to='/login'  className='nav-links' onClick={() => this.closeMobileMenu(0)}>
                  HOME
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/login'
                  className='nav-links'
                  onClick={() => this.closeMobileMenu(1)}
                >
                  ADD 
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to="/login"
                  className='nav-links'
                  onClick={() => this.closeMobileMenu(2)}
                >
                  VIEW
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/login'
                  className='nav-links'
                  onClick={() => this.closeMobileMenu(3)}
                >
                  DELETE
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to="/login"
                  className='nav-links'
                  color="primary"
                  onClick={() => this.closeMobileMenu(4),() => this.LogOut(userValues)}
                >
                  LOGOUT
                </Link>
              </li>
              
            </ul>
          </div>
        </nav>
    );
  }
}

export default LoginNavbar;
