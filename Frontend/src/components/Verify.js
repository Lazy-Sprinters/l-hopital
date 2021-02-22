import React, { Component } from 'react';
import './RegisterForm.css';
import Navbar from './navbar';
import LoginNavbar from "./LoginNavbar";
import Footer from './Footer';
import OtpVerifyOrSkip from './OtpVerification';
import * as actionTypes from './store/actions'
import {connect} from 'react-redux'

export class Verify extends Component {
	
	render(){
		// const data=this.props.location.data;
		// console.log(data)
  return (
    <>

      {this.props.check==0 ? <Navbar /> : <LoginNavbar userInfo={this.props.userInfo} />}
      {this.props.check==0 
        ? <OtpVerifyOrSkip userInfo={this.props.userInfo} check={this.props.check}/>
        : <OtpVerifyOrSkip userInfo={this.props.userInfo} check={this.props.check}/>
      }
      <Footer />
    </>
  );
}
}
const mapStateToProps = state => {
  return{
    userInfo:state.userInfo,
    check:state.check
  };
};

const mapDispatchToProps = dispatch =>{
  return{
    onChangeUserInfo: (userInfo) => dispatch({type:actionTypes.CHANGE_STATE , userInfo:userInfo}),
    onChangeCheck: (check) => dispatch({type:actionTypes.CHANGE_CHECK , check:check})
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Verify);
