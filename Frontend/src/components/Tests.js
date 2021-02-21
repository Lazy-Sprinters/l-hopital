import React, { Component } from "react";
import "../App.css";
import LoginNavbar from "./LoginNavbar";
import TestView from "./TestView";
import Footer from "./Footer";

export class LoginHome extends Component {

  render() {

    const data = this.props.location.data;
    return(
    <div>
      <LoginNavbar
        userInfo={data.userInfo}
      />
      <TestView userInfo={data.userInfo} testInfo={data.testInfo} />
    </div>
    );
  }
}

export default LoginHome;
