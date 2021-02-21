import React, { Component } from "react";
import "../App.css";
import LoginNavbar from "./LoginNavbar";
import ProfileView from "./ProfileView";
import Footer from "./Footer";

export class LoginHome extends Component {

  render() {

    const {userInfo} = this.props.location.data;
    return(
    <div>
      <LoginNavbar
        userInfo={userInfo}
      />
      <ProfileView userInfo={userInfo} />
    </div>
    );
  }
}

export default LoginHome;
