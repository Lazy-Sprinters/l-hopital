import React, { Component } from "react";
import "../App.css";
import BookAnAppointment from "./BookAnAppointment";
import VerifyWarning from "./VerifyWarning";
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
      {!userInfo.data.Status && <VerifyWarning userInfo={userInfo}/>}
      <BookAnAppointment userInfo={userInfo} />
      <Footer />
    </div>
    );
  }
}

export default LoginHome;
