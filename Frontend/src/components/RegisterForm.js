import React, { Component } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import validateInfo from './error.js';
import { Link } from 'react-router-dom';
import Axios from "axios";
import {
  TextField,
  Button,
  Container,
  LinearProgress
} from "@material-ui/core";
import './RegisterForm.css'

export class RegisterForm extends Component {

  state = {
    name:"0",
    age:0,
    phoneNum:0,
    access_key:0,
    AadhaarNo:0,
    email:"0",
    password:0,
    cpassword:0,
    isLoading:false,
    isLoaded:false,
    isRegistered:false,
    isFaulty:false
  };

  handleLoad = () =>  {

    this.setState({ ['isLoading']: true });
    this.setState({ ['isFaulty']: false });

  };

  handleRegister = () =>  {
    this.setState({ ['isRegistered']: true });
    this.setState({ ['isLoading']: false });
    this.setState({ ['isLoaded']: true });

  };
  

  handleFaulty = () =>  {
    this.setState({ ['isFaulty']: true });
    this.setState({ ['isLoading']: false });

  };

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });

    this.setState({ access_key: Math.floor(( Math.random() * 100000000)+1) });
  };
  register = (data) =>{
    this.handleLoad();
    Axios.post("http://localhost:5000/users", data)
          .then((res) => {
            // console.log("Hey this is your result", res);
            res.status==201 ? this.handleRegister() : this.handleFaulty();

          })
          .catch((err) => {
            console.log("Axios", err);
            this.handleFaulty();
          });
  }
  render() {
     const{ 
      name,
      age,
      access_key,
      phoneNum,
      AadhaarNo,
      email,
      password,
      cpassword,
      isLoading,
      isRegistered,
      isLoaded,
      isFaulty
      

    } = this.state;
    const values = { 
      name,
      age,
      phoneNum,
      AadhaarNo,
      email,
      password,
      cpassword
    };
    const data = { 
      name,
      age,
      phoneNum,
      AadhaarNo,
      email,
      password,
      access_key
    };
    const  errors = validateInfo(values);

    return (
      <div  className="form_input">
          
          <div className="terms"> 
            <br/> 
            <h1>Registration Form</h1>
            <br />
            <br />
            <div className="reg-row">
              <div className="reg-col">
                <div className="reg-img">
                  <img src="/images/register.gif" />  
                </div>
              </div>
              <div className="reg-col">
                <div className="txtfld">
                <TextField
                  placeholder="Enter Your Name"
                  label="Name"
                  variant="outlined"
                  onChange={this.handleChange('name')}
                  type="text"
                  fullWidth
                />
                <br />
                <br />

                </div>
                <div className="txtfld">
                <TextField
                  placeholder="Enter Your Age"
                  label="Age"
                  variant="outlined"
                  onChange={this.handleChange('age')}
                  type="number" inputProps={{ min: 1, max: 120, step: 1}}
                  helperText={(! errors.age && values.age) ? "Invalid": '' }
                  error={(! errors.age&& values.age)} 
                  fullWidth
                />
                <br />
                </div>
                <div className="txtfld">
                <TextField
                  placeholder="Enter your mobile number"
                  label="Phone Number"
                  variant="outlined"
                  onChange={this.handleChange('phoneNum')}
                  type="number" inputProps={{ min:1000000000, max: 9999999999, step: 1}}
                  helperText={(! errors.phoneNum && values.phoneNum) ? "Not a valid Phone Number": '' }
                  error={(! errors.phoneNum && values.phoneNum)} 
                  margin="normal"
                  fullWidth
                />
                <br />
                </div>
                <div className="txtfld">
                <TextField
                  placeholder="Enter your Aadhaar Number"
                  label="Aadhaar Number"
                  variant="outlined"
                  onChange={this.handleChange('AadhaarNo')}
                  type="number" 
                  helperText={(! errors.AadhaarNo && values.AadhaarNo) ? "Invalid AadhaarNo": '' }
                  error={(! errors.AadhaarNo && values.AadhaarNo)} 
                  margin="normal"
                  fullWidth
                />
                <br />
                </div>
                <div className="txtfld">
                <TextField
                  placeholder="Enter you email address"
                  label="email address"
                  variant="outlined"
                  onChange={this.handleChange('email')}
                  type="text"
                  margin="normal"
                  fullWidth
                />
                <br />
                </div>
                <div className="txtfld">
                <TextField
                  placeholder="Enter your password"
                  label="Password"
                  variant="outlined"
                  onChange={this.handleChange('password')}
                  helperText={(! errors.password && values.password) ? "The password should be at least 8 characters long": '' }
                  error={(! errors.password && values.password)} 
                  type="password"
                  margin="normal"
                  fullWidth
                />
                <br />
                </div>
                <div className="txtfld">
                <TextField
                  placeholder="Re-enter your password"
                  label="Confirm Password"
                  variant="outlined"
                  onChange={this.handleChange('cpassword')}
                  helperText={(! errors.cpassword && values.cpassword) ? "The password doesn't match": '' }
                  error={(! errors.cpassword && values.cpassword)} 
                  type="password"
                  margin="normal"
                  fullWidth
                />
                <br />
                </div>
                <div className="btn1">
                  {!isLoading && !isLoaded && <Button
                      color="primary"
                      variant="contained"
        
                      onClick={!errors.final ? ()=> this.handleFaulty() : () => this.register(data)  }
                    >
                      Register
                    </Button>}
                </div>
                <br/>
                <br/>
                {isFaulty && <h2>All fields are not filled or there is an error in your input</h2>}
                <br/>
                <div className="no-chng">
                  {isLoading && <LinearProgress />}                
                {isRegistered && isLoaded && <h1>You have Registered Successfully.Check your registered email address for further instructions.Click the button to proceed to login page.</h1>}
                {!isRegistered && isLoaded && <h1>The information provided is invalid. Please try again.</h1>}
                <br />
                {isRegistered && isLoaded && 
                  <div className="btn2">
                    <Link to='/login'>
                      <Button
                        color="primary"
                        variant="contained"
                      >
                        Move to Login Page
                      </Button>
                    </Link>
                  </div>
                }
                </div>
                <br />
                <br />
                <br />
                <br />
              </div>

            </div>

          </div>

      </div>
    );
  }
}

export default RegisterForm;