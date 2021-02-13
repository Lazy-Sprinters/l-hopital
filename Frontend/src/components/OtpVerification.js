import React, { Component } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Axios from "axios";
import {
  TextField,
  Button,
  Container,
  LinearProgress
} from "@material-ui/core";
import "./OtpVerification.css";

export class OtpVerification extends Component {

  state = {
    counter:30,
    otp1:0,
    otp2:0,
    complete:false,
    isLoading:false,
    isLoaded:false,
    isVerified:false,
    isFaulty:false
  };
  handleCounter = (x) =>{
    this.setState({ ['counter']: 30 });
    this.setState({['complete']: false});
     // Axios.post("http://localhost:5000/users/signup2", x)
    //       .then((res) => {
    //         ;

    //       })
    //       .catch((err) => {
    //         console.log("Axios", err);
    //       });
  };
   sendOtp = (x) =>{
    // Axios.post("http://localhost:5000/users/signup2", x)
    //       .then((res) => {
    //        ;

    //       })
    //       .catch((err) => {
    //         console.log("Axios", err);
    //       });
  };

  start = (x) => {
    this.setState({['counter']: 29})
    this.sendOtp(x);
    this.id = setInterval(this.initiate, 1000);
  };

  initiate = () => {
    if (this.state.counter !== 0) {
      this.setState((prevState, prevProps) => ({
        counter: prevState.counter - 1
      }));
      if (this.state.counter === 0) {
        clearInterval(this.id);
        this.setState({ complete: true });

      }
    }
  };

  handleLoad = () =>  {

    this.setState({ ['isLoading']: true });
    this.setState({ ['isFaulty']: false });

  };

  handleVerification = () =>  {
    this.setState({ ['isVerified']: true });
    this.setState({ ['isLoading']: false });
    this.setState({ ['isLoaded']: true });

  };
  

  handleFaulty = () =>  {
    this.setState({ ['isFaulty']: true });
    this.setState({ ['isLoading']: false });

  };

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });

  };
  verifyOtp = (data) =>{
    this.handleLoad();
    this.handleVerification();
    // Axios.post("http://localhost:5000/users/signup2", data)
    //       .then((res) => {
    //         // console.log("Hey this is your result", res);
    //         res.status==200 ? this.handleVerification() : this.handleFaulty();

    //       })
    //       .catch((err) => {
    //         console.log("Axios", err);
    //         this.handleFaulty();
    //       });
  }
  

  render() {
    const{email}=this.props;
     const{ 
      otp1,
      otp2,
      counter,
      complete,
      isLoading,
      isLoaded,
      isVerified,
      isFaulty
    } = this.state;
    const data = { 
      email,
      otp1,
      otp2
    };

    return (
       <div>
          <br/> <br/>
          {counter==30 ? this.start(email) : null}
          <div className="err-msg">
            <h2>Check your registered email id and phone number for the One-Time Passwords. Verification is needed for booking appointments for the site. You can either verify it now or skip to perform the verification later.</h2>
          </div>
          {/*<div className="txtfld1">
            <TextField
              placeholder="Enter the Email "
              label="Email "
              variant="outlined"
              onChange={this.handleChange('Email')}
              type="number"
              fullWidth
            />
            <br /> <br />
          </div>*/}
          <div className="txtfld1">
            <TextField
              placeholder="Enter the Email OTP"
              label="Email OTP"
              variant="outlined"
              onChange={this.handleChange('otp1')}
              type="number"
              fullWidth
            />
            <br /> <br />
          </div>
          <div className="txtfld1">
            <TextField
              placeholder="Enter the Phone Number OTP"
              label="Phone Number OTP"
              variant="outlined"
              onChange={this.handleChange('otp2')}
              type="number"
              fullWidth
            />
            <br /> <br />
            <br /> <br />
          </div>
          <div className="otp1btn">
            <Button
              color="primary"
              variant="contained"
              disabled={!complete}
              onClick={() => this.handleCounter(email)}
            >
              {parseInt(Object.values({counter}))==0 ? "Resend Otp" :"Resend Otp ( "+ parseInt(Object.values({counter})) + " sec )"}
            </Button>
          </div>
          <div className="otp2btn">
            <Button
              color="primary"
              variant="contained"
              disabled={!((data.otp1.length>=5 ) && (data.otp2.length>=5 ))}
              onClick={() => this.verifyOtp(data)}
            >
              Verify
            </Button>
          </div>
          <br /> <br />
           <div className="btn2">
              <Link to='/login' style={{textDecoration:'none'}}>
                <Button
                  color="primary"
                  variant="contained"
                >
                  Skip for now >>
                </Button>
              </Link>
            </div>
          <br /> <br />
          <br/>
          <br/>
          {isFaulty && <h2>All fields are not filled or there is an error in your input</h2>}
          <br/>
          <div className="no-chng">
            {isLoading && <LinearProgress />}                
          {isVerified && isLoaded && <h1>You hare verified</h1>}
          {!isVerified && isLoaded && <h1>The information provided is invalid. Please try again.</h1>}
          <br />
          {isVerified && isLoaded && 
            <div className="btn2">
              <Link to={{
                pathname: "/login", 
                state: {
                    Email: true
                }
               }}>
                <Button
                  color="primary"
                  variant="contained"
                >
                  Proceed to Login
                </Button>
              </Link>
            </div>
          }
          </div>
          <br />
          <br />
          </div>
    );
  }
}

export default OtpVerification;