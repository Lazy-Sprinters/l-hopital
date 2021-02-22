import React, { Component } from "react";
import "../App.css";
import LoginNavbar from "./LoginNavbar";
import ProfileView from "./ProfileView";
import Footer from "./Footer";
import * as actionTypes from './store/actions'
import {connect} from 'react-redux'


export class Profile extends Component {

  render() {

    // const {userInfo} = this.props.location.data;
    return(
    <div>
      <LoginNavbar
        userInfo={this.props.userInfo}
      />
      <ProfileView userInfo={this.props.userInfo} />
    </div>
    );
  }
}
const mapStateToProps = state => {
  return{
    userInfo:state.userInfo,
  };
};

const mapDispatchToProps = dispatch =>{
  return{
    onChangeUserInfo: (userInfo) => dispatch({type:actionTypes.CHANGE_STATE , userInfo:userInfo}),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
