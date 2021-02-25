import React, { Component} from 'react';
import { Link,Redirect } from 'react-router-dom';
import './LoginNavbar.css';
import Axios from "axios";
import {
  Button
} from "@material-ui/core";
import * as actionTypes from './store/actions'
import {connect} from 'react-redux'

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

  LogOut = (e,data) =>{
      e.preventDefault();
      this.closeMobileMenu();
      const userInfo = {userInfo:data}
      Axios.post("http://localhost:5000/user/logout",userInfo)
      .then((res) => {
        this.props.onChangeCheck(null);
        this.props.onChangeSlots(null);
        this.props.onChangeTestInfo(null);
        this.props.onChangeUserInfo(null);
        this.props.onChangeCentreValue(null);
        this.props.onChangeCenterList(null);
        window.localStorage.clear();
        this.setState({['loggedOut']:true});
      })
      .catch((err) => {
        console.log("Axios", err);
      });
  };
  getTests = (e,data) =>{
    e.preventDefault();
    this.closeMobileMenu();
    const userInfo = {userInfo:data}
      Axios.post("http://localhost:5000/user/allappointments",userInfo)
      .then((res) => {
          // this.setState({testInfo:res.data}); 
          this.props.onChangeTestInfo(res.data);
          this.setState({['succeed']:true});

      })
      .catch((err) => {
        console.log("Axios", err);
      });

  };
  render(){
    // const {userInfo} = this.props;
    const {
      click,
      loggedOut,
      testInfo,
      GotTests,
      succeed
    }=this.state;
    const values={
      // userInfo,
      testInfo
    }
    return (
        <nav className='navbar'>

          <div className='navbar-container'>
            <Link to='/loginHome' className='navbar-logo' onClick={() => this.closeMobileMenu()}>
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
                      // data: {this.props.userInfo}
                     }}  className='nav-links' onClick={() => this.closeMobileMenu()}>
                  HOME
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/test'
                  className='nav-links'
                  onClick={(e) => this.getTests(e,this.props.userInfo)}
                >
                  TESTS 
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to={{
                      pathname: '/profile', 
                      // data: {this.props.userInfo}
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
                  onClick={(e) => this.LogOut(e,this.props.userInfo)}
                >
                  LOGOUT
                </Link>
              </li>
              
            </ul>
          </div>
          {loggedOut && 
            <Redirect push
              to={{
                pathname: "/login", 
                // data: loggedOut
              }} 
            />
          }
          {succeed && 
            <Redirect push
              to={{
                pathname: '/test', 
                // data: values
              }} 
            />
          }
        </nav>
    );
  }
}
const mapStateToProps = state => {
  return{
    userInfo:state.userInfo,
    check:state.check,
    testInfo:state.testInfo,
    // CentreValue:state.CentreValue,
    // centreList:state.centreList,
    // slots:state.slots

  };
};

const mapDispatchToProps = dispatch =>{
  return{
    onChangeUserInfo: (userInfo) => dispatch({type:actionTypes.CHANGE_STATE , userInfo:userInfo}),
    onChangeTestInfo: (testInfo) => dispatch({type:actionTypes.CHANGE_TESTINFO , testInfo:testInfo}),
    onChangeCheck: (check) => dispatch({type:actionTypes.CHANGE_CHECK , check:check}),
    onChangeCentreValue: (CentreValue) => dispatch({type:actionTypes.CHANGE_CENTREVALUE , CentreValue:CentreValue}),
    onChangeCenterList: (centreList) => dispatch({type:actionTypes.CHANGE_CENTRELIST , centreList:centreList}),
    onChangeSlots: (slots) => dispatch({type:actionTypes.CHANGE_SLOTS , slots:slots})
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(LoginNavbar);
