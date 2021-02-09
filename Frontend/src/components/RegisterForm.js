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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './RegisterForm.css'

export class RegisterForm extends Component {

  state = {
    UserName:"0",
    Age:0,
    Gender:"0",
    PhoneNumber:"0",
    IdType:"0",
    IdentificationIdNumber:"0",
    Email:"0",
    Password:"0",
    NearestLandmark:"0",
    City:"0",
    Pincode:"0",
    State:"0",
    Country:"0",
    otp1:0,
    opt2:0,
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

    // this.setState({ access_key: Math.floor(( Math.random() * 100000000)+1) });
  };
  register = (data) =>{
    this.handleLoad();
    // console.log(data);
    Axios.post("http://localhost:5000/user/signup1", data)
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
      UserName,
      Age,
      Gender,
      PhoneNumber,
      IdType,
      IdentificationIdNumber,
      Email,
      Password,
      NearestLandmark,
      City,
      Pincode,
      State,
      Country,
      otp1,
      opt2,
      isLoading,
      isLoaded,
      isRegistered,
      isFaulty
    } = this.state;
    const values = { 
      UserName,
      Age,
      Gender,
      PhoneNumber,
      IdType,
      IdentificationIdNumber,
      Email,
      Password,
      NearestLandmark,
      City,
      Pincode,
      State,
      Country
    };
    const data = { 
      Email,
      otp1,
      opt2
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
                  placeholder="Enter Your User Name"
                  label="User Name"
                  variant="outlined"
                  onChange={this.handleChange('UserName')}
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
                  onChange={this.handleChange('Age')}
                  type="number" inputProps={{ min: 1, max: 120, step: 1}}
                  helperText={(! errors.age && values.age) ? "Invalid": '' }
                  error={(! errors.age&& values.age)} 
                  fullWidth
                />
                <br />
                </div>
                <div className="txtfld">
                <TextField
                  placeholder="Enter your Phone Number"
                  label="Phone Number"
                  variant="outlined"
                  onChange={this.handleChange('PhoneNumber')}
                  type="number" inputProps={{ min:1000000000, max: 9999999999, step: 1}}
                  helperText={(! errors.PhoneNumber ) ? "Not a valid Phone Number": '' }
                  error={(! errors.PhoneNumber )} 
                  margin="normal"
                  fullWidth
                />
                <br />
                </div>
                <div className="drpdwn">
                <FormControl>
                  <InputLabel>
                    Id Type
                  </InputLabel>
                  <Select
                    onChange={this.handleChange('IdType')}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="" disabled>
                      <em>Enter your Id Type</em>
                    </MenuItem>
                    <MenuItem value={"Aadhaar"}>Aadhaar</MenuItem>
                    <MenuItem value={"VoterId"}>VoterId</MenuItem>
                    <MenuItem value={"PanCard"}>PanCard</MenuItem>
                  </Select>
                </FormControl>

                {/*<TextField
                                  placeholder="Enter your Id Type *change to dropdown*"
                                  label="Id Type"
                                  variant="outlined"
                                  onChange={this.handleChange('IdType')}
                                  type="text"
                                  margin="normal"
                                  fullWidth
                                />*/}
                <br />
                <br />
                <br />
                </div><div className="txtfld">
                <TextField
                  placeholder="Enter you Identification Id Number"
                  label="Identification Id Number"
                  variant="outlined"
                  onChange={this.handleChange('IdentificationIdNumber')}
                  type="text"
                  margin="normal"
                  fullWidth
                />
                <br />
                </div>
                <div className="txtfld">
                <TextField
                  placeholder="Enter you Email address"
                  label="Email address"
                  variant="outlined"
                  onChange={this.handleChange('Email')}
                  type="text"
                  margin="normal"
                  fullWidth
                />
                <br />
                </div>
                <div className="txtfld">
                <TextField
                  placeholder="Enter your Password"
                  label="Password"
                  variant="outlined"
                  onChange={this.handleChange('Password')}
                  helperText={(! errors.Password ) ? "The Password should be at least 8 characters long": '' }
                  error={(! errors.Password )} 
                  type="password"
                  margin="normal"
                  fullWidth
                />
                <br />
                </div>
                <div className="txtfld">
                <TextField
                  placeholder="Enter you Nearest Landmark"
                  label="Nearest Landmark"
                  variant="outlined"
                  onChange={this.handleChange('NearestLandmark')}
                  type="text"
                  margin="normal"
                  fullWidth
                />
                <br />
                </div>
                <div className="txtfld">
                <TextField
                  placeholder="Enter you City"
                  label="City"
                  variant="outlined"
                  onChange={this.handleChange('City')}
                  type="text"
                  margin="normal"
                  fullWidth
                />
                <br />
                </div>
                <div className="txtfld">
                <TextField
                  placeholder="Enter you Pincode"
                  label="Pincode"
                  variant="outlined"
                  onChange={this.handleChange('Pincode')}
                  type="text"
                  margin="normal"
                  fullWidth
                />
                <br />
                </div>
                <div className="txtfld">
                <TextField
                  placeholder="Enter you State"
                  label="State"
                  variant="outlined"
                  onChange={this.handleChange('State')}
                  type="text"
                  margin="normal"
                  fullWidth
                />
                <br />
                </div>
                <div className="txtfld">
                <TextField
                  placeholder="Enter you Country"
                  label="Country"
                  variant="outlined"
                  onChange={this.handleChange('Country')}
                  type="text"
                  margin="normal"
                  fullWidth
                />
                <br />
                </div>
                <div className="btn1">
                  {!isLoading && !isLoaded && <Button
                      color="primary"
                      variant="contained"
                    
                      onClick={!errors.final ? ()=> this.handleFaulty() : () => this.register(values)  }
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