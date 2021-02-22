import React, { Component } from "react";
import "../App.css";
import BookAnAppointment from "./BookAnAppointment";
import VerifyWarning from "./VerifyWarning";
import LoginNavbar from "./LoginNavbar";
import Footer from "./Footer";
import * as actionTypes from './store/actions'
import {connect} from 'react-redux'

export class LoginHome extends Component {

  render() {
    return(
    <div>
      <LoginNavbar
        userInfo={this.props.userInfo}
      />
      {!this.props.userInfo.data.user.Status && <VerifyWarning userInfo={this.props.userInfo}/>}
      <BookAnAppointment userInfo={this.props.userInfo} />
      <Footer />
    </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    userInfo:state.userInfo
  };
};

const mapDispatchToProps = dispatch =>{
  return{
    onChangeUserInfo: (userInfo) => dispatch({type:actionTypes.CHANGE_STATE , userInfo:userInfo})
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(LoginHome);
