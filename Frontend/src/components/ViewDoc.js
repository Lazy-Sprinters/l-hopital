import React, { Component } from "react";
import "../App.css";
import Navbar from "./navbar";
import Footer from "./Footer";
import LoginHome from "./LoginHome";
import validateInfo from "./loginError";
import Axios from "axios";
import { Link } from 'react-router-dom';
import "./Login.css";
import { TextField, LinearProgress,Button } from "@material-ui/core";

export class Login extends Component {

	state = {
    base64:0,
    access_key:0, 
    SearchFaulty:false,
    SearchSuccess:false,
    Otp:false,
    OtpValue:0,
    OTPFaulty:false,
    BufferValue:0,
    OtpLoad:false,
    AccessLoad:false,
    SearchLoad:false,
    SearchText:false,
    EmptyDoc:false,
    BufferText:false
  };

  initialize = () => {
    this.setState({SearchFaulty:false});
    this.setState({SearchSuccess:false});
    this.setState({Otp:false});
    this.setState({OTPFaulty:false});
    this.setState({OtpLoad:false});
    this.setState({AccessLoad:false});
    this.setState({SearchLoad:false});
    this.setState({SearchText:false});
    this.setState({EmptyDoc:false});
    this.setState({BufferText:false});

  };

  handleChange = input => e => {
    this.setState({ [input]: parseInt(e.target.value) });
  };

  handleSearchFaulty = () =>{
    this.initialize();
    this.setState({ SearchFaulty: true });
  };

  handleOtp = () =>{
    this.initialize();
    this.setState({ Otp: true });
  };

  handleOTPFaulty = () =>{
    this.initialize();
    this.setState({ OTPFaulty: true });
  };

  handleBuffer = (value) =>{
    this.initialize();
    this.setState({ BufferValue : value });
    console.log(value);
    this.setState({BufferText: true});

  };
  handleEmpty = () =>{
    this.initialize();
    this.setState({ EmptyDoc: true });
  };
  
  handleSearch = (data) => {
    console.log(data);
    this.initialize();
    this.setState({ AccessLoad: false });
    this.setState({ SearchLoad: true });
    this.setState({ OtpLoad: false });
    this.setState({ SearchText: true });
    this.setState({ Otp: false });

    Axios.post("http://localhost:5000/users/me/alldata",data)
         .then((res) => {
           res.status == 200 ? this.handleBuffer(res.data) : this.handleEmpty();
         })
         .catch((err) => {
           console.log("Axios", err);
           this.handleSearchFaulty()
         });  
  };


  handlePermission = data => {
    this.initialize();
    this.setState({ AccessLoad: true });

     Axios.post("http://localhost:5000/users/me/check1", data)
         .then((res) => {

           res.status == 200 ? this.handleSearch(data) : this.handleOtp();
         })
         .catch((err) => {
           console.log("Axios", err);
           this.handleSearchFaulty();
         });
  };

  handleVerification = data => {
    this.initialize();
    this.setState({ OtpLoad: true });
     Axios.post("http://localhost:5000/users/me/check2", data)
         .then((res) => {
           res.status == 200 ? this.handleSearch(data) : this.handleOTPFaulty();
         })
         .catch((err) => {
           console.log("Axios", err);
           this.handleOTPFaulty()
         });
  };

  handleEnter = (data) => (e) => {
    if(e.key === 'Enter'){
      this.handlePermission(data);
    }
  };

  display = (data) =>{
    return (
      <div className="doc-col" >

        <div className="doc-row">
          <div className="pres-col">
            <div className="view-head">
              DATE 
            </div>
            <div className="view-head">
              <br />(yyyy-mm-dd) 
            </div>
          </div>
          <div className="pres-col">
            <div className="view-head">
              IMAGES
            </div>
          </div>
        </div>

        { data.map((value, i) => {
          return  (
                    <div className="doc-row">
                      <div className="pres-col">
                        <div className="pres-date">
                        {value.date.toString()}
                        </div>
                      </div>
                      <div className="pres-col">
                        <div className="pres-img-wrapper">
                          <img className="pres-img" src={"data:image/jpg;base64,"+value.image_b64.toString()} />
                        </div>
                      </div>
                    </div>
                  )
        })}

        <br/>
        <br/>
      </div>
    )
  };

  render() {
    const {userInfo} = this.props;

  	const{ 
     	access_key,
    	base64,
      Otp,
      SearchFaulty,
      SearchSuccess,
      OtpValue,
      OTPFaulty,
      BufferValue,
      OtpLoad,
      AccessLoad,
      SearchLoad,
      SearchText,
      EmptyDoc,
      BufferText
    } = this.state;

    const values = { 
      access_key,
    	userInfo
    };

    const Verifyvalue = {
      access_key,
      userInfo,
      OtpValue
    }
		return (
		  <div>
        <br/> <br/> <br/>
		  	<div className="txtfld1">
		    <TextField
          placeholder="Enter the Access Key to view uploaded documents"
          label="Access Key"
          variant="outlined"
          onChange={this.handleChange('access_key')}
          onKeyPress={ this.handleEnter(values) }
          type="number"
          fullWidth
		    />
		    <br /> <br />
        </div>
		    <div className="srch-btn">
            <Button
              color="primary"
              variant="contained"
              onClick={() => this.handlePermission(values)}
            >
              Search
            </Button>
        </div>
		    <br /> <br />
        {Otp && (
          <div>
          <br/> <br/>
          <div className="err-msg">
            <h2> Ask the authorised owner of the access key to get the OTP(One
            Time Password) and insert to proceed.  </h2>
          </div>
          <div className="txtfld1">
            <TextField
              placeholder="Enter the OTP"
              label="OTP"
              variant="outlined"
              onChange={this.handleChange('OtpValue')}
              type="number"
              fullWidth
            />
            <br /> <br />
          </div>
          <div className="srch-btn">
            <Button
              color="primary"
              variant="contained"
              onClick={() => this.handleVerification(Verifyvalue)}
            >
              Verify
            </Button>
          </div>
          <br /> <br />
          </div>
        )}
        {SearchFaulty && (
          <div className="err-msg"> <h2> The access key is invalid or an error
          occured. Please try again. </h2> </div>
        )}
        {OTPFaulty && (
          <div className="err-msg"> <h2> The OTP is invalid. Please try again.
          </h2> </div>
        )}
        {SearchText && (
          <div className="err-msg"> <h2> Searching..... </h2> </div>
        )}
        {EmptyDoc && (
          <div className="err-msg"> There are no documents<h2> </h2> </div>
        )}
		    <br />
        <br />
        {(AccessLoad || SearchLoad || OtpLoad ) && <LinearProgress />}
        {BufferText && (
          <div>
            
          </div>
          )}
        {BufferText && this.display(BufferValue)}
        
		  </div>

		);
  }
}

export default Login;
