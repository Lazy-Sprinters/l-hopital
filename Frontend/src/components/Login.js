import React, { Component } from "react";
import { Link,Redirect } from 'react-router-dom';
import "../App.css";
import Navbar from "./navbar";
import Footer from "./Footer";
import LoginHome from "./LoginHome";
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
    isLoggedIn:false,
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
    this.setState({ ["isLoggedIn"]: true });

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
  handleEnter = (data) => (e) => {
    if(e.key === 'Enter'){
      !(data.password!==0  && data.email!=="0")
        ?  this.handleLoginFaulty()
        :  this.login(data);
    }
  };
  render() {
    const { loggedOut } = this.props.location.data==undefined ? false : true ;

    const {
      email,
      password,
      isLoadingL,
      isLoggedIn,
      isLoadedL,
      isFaultyL,
      userInfo,
    } = this.state;
    const values = {
      email,
      password,
    };

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
                      onKeyPress={ this.handleEnter(values) }
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <TextField
                      onChange={this.handleLoginChange("password")}
                      type="password"
                      placeholder="password"
                      onKeyPress={ this.handleEnter(values) }
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
                    !(values.password!==0  && values.email!=="0")
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
              {loggedOut && (
                <div className="err-msg">
                  <h2>Logged Out</h2>
                </div>
              )}
              {!isFaultyL && <br />}{!isFaultyL && <br />}{!isFaultyL && <br />}{!isFaultyL && <br />}
            </div>
            </div>
            {isLoggedIn && <Redirect to={{
                      pathname: "/loginHome", 
                      data: userInfo
                     }} />}
            <Footer />
          </div>
        );
  }
}

export default Login;
