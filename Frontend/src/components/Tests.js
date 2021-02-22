import React, { Component } from "react";
import "../App.css";
import LoginNavbar from "./LoginNavbar";
import TestView from "./TestView";
import Footer from "./Footer";
import * as actionTypes from './store/actions'
import {connect} from 'react-redux'

export class Tests extends Component {

  render() {

    // const data = this.props.location.data;
    return(
    <div>
      <LoginNavbar
        userInfo={this.props.userInfo}
      />
      <TestView userInfo={this.props.userInfo} testInfo={this.props.testInfo} />
    </div>
    );
  }
}
const mapStateToProps = state => {
  return{
    userInfo:state.userInfo,
    testInfo:state.testInfo
  };
};

const mapDispatchToProps = dispatch =>{
  return{
    onChangeUserInfo: (userInfo) => dispatch({type:actionTypes.CHANGE_STATE , userInfo:userInfo}),
    onChangeTestInfo: (testInfo) => dispatch({type:actionTypes.CHANGE_TESTINFO , testInfo:testInfo})
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Tests);
