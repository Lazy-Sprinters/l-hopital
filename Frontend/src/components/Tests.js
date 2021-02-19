import React, { Component } from "react";
import "../App.css";
import LoginNavbar from "./LoginNavbar";
import TestView from "./TestView";
import Footer from "./Footer";

export class LoginHome extends Component {

  render() {

    const data = this.props.location.data;
    console.log(data)
    return(
    <div>
      <LoginNavbar
        userInfo={data.userInfo}
      />
      <TestView userInfo={data.userInfo} testInfo={data.testInfo} />
      <Footer />
    </div>
    );
  }
}

export default LoginHome;
