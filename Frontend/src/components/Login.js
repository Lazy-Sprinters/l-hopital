import React, { Component } from "react";
import "../App.css";
import Navbar from "./navbar";
import Footer from "./Footer";
import LoginHome from "./LoginHome";
import validateInfo from "./loginError";
import Axios from "axios";
import "./Login.css";
import { TextField, LinearProgress } from "@material-ui/core";

export class Login extends Component {
  state = {
    step: 0,
    success: false,
    email: "0",
    password: 0,
    isLoadingL: false,
    isLoadedL: false,
    isFaultyL: false,
    isLoggedOutL:false,
    userInfo: 0,
  };

  handleLoginChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };
  handleLoginUser = (input) => {
    this.setState({ ["userInfo"]: input });
  };

  handleLoginLoad = () => {
    this.setState({ ["isLoadingL"]: true });
    this.setState({ ["isFaultyL"]: false });
  };
  handleLogin = () => {
    this.setState({ ["isLoadingL"]: false });
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };
  handleLogout = () => {
    this.setState({ ["isFaultyL"]: false });
    this.setState({ ["isLoggedOutL"]: true });
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };
  handleLoginFaulty = () => {
    this.setState({ ["isFaultyL"]: true });
    this.setState({ ["isLoadingL"]: false });
  };
  
  login = (data) => {
    this.handleLoginLoad();
    // this.handleLogin();  
    Axios.post("http://localhost:5000/user/login", data)
    .then((res) => {
      this.handleLoginUser(res);
      // console.log(res);
      res.status == 200 ? this.handleLogin() : this.handleLoginFaulty();
    })
    .catch((err) => {
      console.log("Axios", err);
      this.handleLoginFaulty();
    });
  };
  handleEnter = (data,cond) => (e) => {
    if(e.key === 'Enter'){
      !cond
        ?  this.handleLoginFaulty()
        :  this.login(data);
    }
  };
  render() {
    const {
      step,
      email,
      password,
      isLoadingL,
      isLoggedOutL,
      isLoadedL,
      isFaultyL,
      userInfo,
    } = this.state;
    const values = {
      email,
      password,
    };

    const userValues = {
      userInfo,
      step
    };

    const errorsL = validateInfo(values);
    switch (step) {
      case 0:
        return (
          <div>
            <Navbar />
            <div className="Login-bg" style={{backgroundImage: "url(" + "/images/Login6-min.jpg"+")"}}>
            <div className="base-container">
              <div className="header">Login</div>
              <div className="content">
                <div className="image">
                  <img src="images/login.svg" />
                </div>
                <div className="form">
                  <div className="form-group">
                    <label htmlFor="username">Email</label>
                    <TextField
                      onChange={this.handleLoginChange("email")}
                      type="text"
                      placeholder="username"
                      onKeyPress={ this.handleEnter(values,errorsL.final) }
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <TextField
                      onChange={this.handleLoginChange("password")}
                      type="password"
                      placeholder="password"
                      onKeyPress={ this.handleEnter(values,errorsL.final) }
                    />
                  </div>
                </div>
              </div>
              <br />
              {!isFaultyL && <br />}{!isFaultyL && <br />}
              <div className="footer">
                {isLoadingL && <LinearProgress />}
                <button
                  type="submit"
                  className="btn"
                  onClick={
                    !errorsL.final
                      ? () => this.handleLoginFaulty()
                      : () => this.login(values)
                  }
                >
                  Login
                </button>
                {isLoadingL && <LinearProgress />}
              </div>
              {isFaultyL && (
                <div className="err-msg">
                  <h2>
                    All fields are not filled or there is an error in your input
                  </h2>
                </div>
              )}
              {isLoggedOutL && (
                <div className="err-msg">
                  <h2>Logged Out</h2>
                </div>
              )}
              {!isFaultyL && <br />}{!isFaultyL && <br />}{!isFaultyL && <br />}{!isFaultyL && <br />}
            </div>
            </div>
            
            <Footer />
          </div>
        );
      case 1:
        return (
		  <>

	     <LoginHome handleLogout={this.handleLogout} userValues={userValues} userInfo={userInfo} />
	    </>
        );
    }
  }
}

export default Login;
