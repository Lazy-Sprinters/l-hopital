import React, { Component } from "react";
import "../App.css";
import BookAnAppointment from "./BookAnAppointment";
import LoginNavbar from "./LoginNavbar";
import Footer from "./Footer";

export class LoginHome extends Component {

  render() {

    const { userInfo } = this.props.location.data;
    return(
    <div>
      <LoginNavbar
        userInfo={userInfo}
      />
      <BookAnAppointment userInfo={userInfo} />
      <Footer />
    </div>
    );
  }
}

export default LoginHome;
