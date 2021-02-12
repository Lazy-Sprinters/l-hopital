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
    Email:"0",
    otp1:0,
    opt2:0,
    complete:false,
    isLoading:false,
    isLoaded:false,
    isVerified:false,
    isFaulty:false
  };
  handleCounter = () =>{
    this.setState({ ['counter']: 30 });
    this.setState({['complete']: false});

  };
  start = () => {
    this.setState({['counter']: 29})
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
    // this.setState({['counter']: 29})
    // console.log("hey its here");

    // console.log(this.state.counter);
    // // while(this.state.counter>0){
    //     this.id = setInterval(this.setState({['counter']: this.state.counter-1}), 1000);

      
    // this.setState({['complete']: true});
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
    // Axios.post("http://localhost:5000/users", data)
    //       .then((res) => {
    //         // console.log("Hey this is your result", res);
    //         res.status==201 ? this.handleVerification() : this.handleFaulty();

    //       })
    //       .catch((err) => {
    //         console.log("Axios", err);
    //         this.handleFaulty();
    //       });
  }
  render() {
     const{ 
      Email,
      otp1,
      opt2,
      counter,
      complete,
      isLoading,
      isLoaded,
      isVerified,
      isFaulty
    } = this.state;
    const data = { 
      Email,
      otp1,
      opt2
    };
    {/*const onResendOtp = () => {
            setResendingOtp(true);
            setTimeout(() => setResendingOtp(false), 3000);
            setOtp("");
            setCounter(30);
        }
    
        useEffect(() => {
            if(counter > 0){
                setTimeout(() => setCounter(counter-1), 1000);
            }
        });*/}
    return (
       <div>
          <br/> <br/>
          {console.log(counter)}
          {counter==30 ? this.start() : null}
          <div className="err-msg">
            <h2>Check your registered email id and phone number for the One-Time Passwords. Verification is needed for booking appointments for the site. You can either verify it now or skip to perform the verification later.</h2>
          </div>
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
              onClick={() => this.handleCounter()}
            >
              {parseInt(Object.values({counter}))==0 ? "Resend Otp" :"Resend Otp ( "+ parseInt(Object.values({counter})) + " sec )"}
            </Button>
          </div>
          <div className="otp2btn">
            <Button
              color="primary"
              variant="contained"
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

          </div>
    );
  }
}

export default OtpVerification;