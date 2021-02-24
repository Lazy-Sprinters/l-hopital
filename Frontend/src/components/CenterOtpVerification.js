import React, { Component } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { Link,Redirect } from 'react-router-dom';
import Axios from "axios";
import {
  TextField,
  Button,
  Container,
  LinearProgress
} from "@material-ui/core";
import "./OtpVerification.css";
import * as actionTypes from './store/actions'
import {connect} from 'react-redux'

export class CenterOtpVerification extends Component {

  state = {
    counter:30,
    otp1:0,
    otp2:0,
    complete:false,
    isLoading:false,
    isLoaded:false,
    isVerified:false,
    isOtpFaulty:false,
    indicate:false,
    x:""
  };
  handleCounter = (x) =>{
    this.setState({ ['counter']: 30 });
    this.setState({['complete']: false});
    //  this.sendOtp(x);
  };
   sendOtp = (x) =>{
    const data={userInfo:x};
     console.log(data)
  Axios.post("http://localhost:5000/user/newotps", data)
      .then((res) => {
        ;

      })
      .catch((err) => {
        console.log("Axios", err);
        this.handleOtpFaulty();
      });
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
    this.setState({ ['isOtpFaulty']: false });

  };

  handleVerification = (res) =>  {
    this.setState({ ['isVerified']: true });
    this.setState({ ['isLoading']: false });
    this.setState({ ['isLoaded']: true });
    // this.setState({ ['x']: res });
    this.props.onChangeUserInfo(res);
    // if(this.props.check==0)
    //   window.localStorage.clear();
    setTimeout(
      () => this.setState({['indicate']:true}), 3000
    );
    
  };
  

  handleFaulty = () =>  {
    this.setState({ ['isLoading']: false });
    this.setState({ ['isLoaded']: true });

  };
  handleOtpFaulty = () =>  {
    this.setState({ ['isOtpFaulty']: true });
    this.setState({ ['isLoading']: false });

  };

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });

  };
  verifyOtp = (otp1,otp2,userInfo) =>{
    const data={userInfo,otp1,otp2}
    this.handleLoad();
    console.log(data)
    // this.handleVerification();                  
    Axios.post("http://localhost:5000/user/signup2", data)
    .then((res) => {
      // console.log("Hey this is your result", res);
      res.status==200 ? this.handleVerification(res) : this.handleFaulty();

    })
    .catch((err) => {
      console.log("Axios", err);
      this.handleFaulty();
    });
  }
  

  render() {
    // const{userInfo,check}=this.props;
     const{ 
      otp1,
      otp2,
      counter,
      complete,
      isLoading,
      isLoaded,
      isVerified,
      isFaulty,
      isOtpFaulty,
      indicate,
      x
    } = this.state;
    const data = { 
      // userInfo,
      otp1,
      otp2
    };

    return (
       <div>
          <br/> <br/>
          {counter==30 ? this.start(this.props.userInfo) : null}
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
              disabled={!((data.otp1.length>=5 ) && (data.otp2.length>=5 ))}
              onClick={() => this.verifyOtp(otp1,otp2,this.props.userInfo)}
            >
              Verify
            </Button>
          </div>
          <br /> <br />
          <br /> <br />
          {isOtpFaulty && <div>
            <br />
            <br />
            <br />
            <br />
            <div className="err-msg">
            <h2>There is an error in sending the OTP to the desired email or phone number.You must have reloaed the page ,please login to verify your account.</h2>
            </div>
            <br />
            </div>
          }
          <br/>
          <div className="no-chng">
            {isLoading && <LinearProgress />}                
          {isVerified && isLoaded && <h1>You are verified</h1>}
          {!isVerified && isLoaded && <h1>The information provided is invalid. Please try again.</h1>}
          <br />
          {this.props.check==0 && 
            <div>
            {isVerified && isLoaded && 
              <div className="btn2">
                <Link 
                  to={{
                      pathname: "/centerLogin"
                     }}
                 style={{textDecoration:'none'}}
                >
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
          }
          </div>
          <br />
          <br />
          </div>
    );
  }
}
const mapStateToProps = state => {
  return{
    userInfo:state.userInfo,
    check:state.check
  };
};

const mapDispatchToProps = dispatch =>{
  return{
    onChangeUserInfo: (userInfo) => dispatch({type:actionTypes.CHANGE_STATE , userInfo:userInfo}),
    onChangeCheck: (check) => dispatch({type:actionTypes.CHANGE_STATE , check:check})
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(CenterOtpVerification);