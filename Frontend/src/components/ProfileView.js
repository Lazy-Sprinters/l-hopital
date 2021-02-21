import { Link,Redirect } from 'react-router-dom';
import React from "react";
import Axios from "axios";
import TnCModal from "./TnCModal";
import { Button } from "react-bootstrap";
import {
  Avatar,
  Typography,
  Switch,
  FormControlLabel,
  TextField,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,

}
  from '@material-ui/core';
import './ProfileView.css'
export class ProfileView extends React.Component {
  state = {
    editProfile:false,
    x:true,
    sendEmailOtp:false,
    sendPhoneOtp:false,
    verifiedEmailOtp:true,
    verifiedPhoneOtp:true,
    IdType:"",
    IdentificationIdNumber:"",
    NearestLandmark:"",
    City:"",
    Pincode:"",
    State:"",
    Country:"",
    Email:"",
    PhoneNumber:"",
    otp1:"",
    otp2:"",
    tempEmail:"",
    tempPhoneNumber:"",
    Validitypassword:"",
    testInfo1:"",
    succeed1:false
  };

  getInitials = (x) =>{
    let text = x.slice(0,1).toUpperCase();
    return text;
  };

   handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  handleEdit = input => e => {
    this.setState({ [input]: e.target.checked });
    this.setState({x:true});
  };

  copyToTemp = (data) => {
    this.setState({x:false})
    this.setState({IdType:data.IdType});
    this.setState({IdentificationIdNumber:data.IdentificationIdNumber});
    this.setState({NearestLandmark:data.NearestLandmark});
    this.setState({City:data.City});
    this.setState({Pincode:data.Pincode});
    this.setState({State:data.State});
    this.setState({Country:data.Country});
    this.setState({Email:data.Email});
    this.setState({PhoneNumber:data.PhoneNumber});
    this.setState({tempEmail:data.Email});
    this.setState({tempPhoneNumber:data.PhoneNumber});
  };
  handleOtp = () =>{
    
  };

  handleOtp = (id,value,flag) =>{
    if(flag==0){
      this.setState({sendEmailOtp:true});
      this.setState({verifiedEmailOtp:false});
      //AXIOS
    }
    else{
      this.setState({sendPhoneOtp:true});
      this.setState({verifiedPhoneOtp:false});
      //AXIOS
    }
    
  };
  verifyOtp = (otp,flag,id,value) => {
    if(flag==0){
      //AXIOS
      this.setState({verifiedEmailOtp:true});
      this.setState({tempEmail:value});
      this.setState({sendEmailOtp:false});
      this.setState({otp1:""});
    }
    else{
      //AXIOS
      this.setState({verifiedPhoneOtp:true})
      this.setState({tempPhoneNumber:value})
      this.setState({sendPhoneOtp:false});
      this.setState({otp2:""});
    }
  };
  EditDetails = (id,password) =>{
    const data={id,password}
    //AXIOS
  };
  getTests = (data) =>{
      Axios.post("http://localhost:5000/appointment/all",data)
      .then((res) => {
          this.setState({testInfo:res.data});   
          this.setState({['succeed1']:true});

      })
      .catch((err) => {
        console.log("Axios", err);
      });

  };
  render() {
    const { 
      editProfile,
      IdType,
      IdentificationIdNumber,
      NearestLandmark,
      City,
      Pincode,
      State,
      Country,
      Email,
      PhoneNumber,
      x,
      sendPhoneOtp,
      sendEmailOtp,
      otp1,
      otp2,
      verifiedPhoneOtp,
      verifiedEmailOtp,
      tempEmail,
      tempPhoneNumber,
      Validitypassword,
      testInfo,
      succeed1
    } = this.state;
    const { userInfo } = this.props; 
    const tempValues={
      IdType,
      IdentificationIdNumber,
      NearestLandmark,
      City,
      Pincode,
      State,
      Country,
      Email,
      PhoneNumber
    }
    const values ={
      userInfo,
      testInfo
    }
    return (
      <>
      {x && this.copyToTemp(userInfo.data)}
      {console.log(userInfo.data)}
      {console.log(Email)}
      <div className="row">
        <Avatar style={{width:'80px',height:'80px',backgroundColor:'orange' , marginLeft:'40px', marginTop:'20px'}}><h1>{this.getInitials(userInfo.data.UserName)}</h1></Avatar>
        <div >
            <Typography style={{width:'80px',height:'80px', marginLeft:'40px', marginTop:'20px',whiteSpace:'nowrap'}}><h1>{userInfo.data.UserName}</h1></Typography>
          <div className="row">
              <Typography style={{marginTop:'-30px',marginLeft:'40px'}}><h3>Age: {userInfo.data.Age}</h3></Typography>
              <Typography style={{marginTop:'-30px',marginLeft:'40px'}}><h3>Gender: {userInfo.data.Gender}</h3></Typography>
          </div>
        </div> 
      </div>
        <FormControlLabel
          style={{
            position: 'absolute',
            right: '20px',
            top: '55px',
          }}
          control={
            <Switch
              checked={editProfile}
              onChange={this.handleEdit('editProfile')}
              color="primary"
            />
          }
          label="Edit Profile"
        />
        <div  className="row">
          
          <div className="profile-details"> 
                
                <div className="txtfld2">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Id Type</FormLabel>
                  <RadioGroup row value={IdType} onChange={this.handleChange('IdType')}>
                    <FormControlLabel
                      value="Voter Id"
                      control={<Radio color="primary" />}
                      label="Voter Id"
                      labelPlacement="start"
                      disabled={!editProfile}
                    />
                    <FormControlLabel
                      value="Aadhaar Number"
                      control={<Radio color="primary" />}
                      label="Aadhaar Number"
                      labelPlacement="start"
                      disabled={!editProfile}
                    />
                    <FormControlLabel
                      value="PAN Card"
                      control={<Radio color="primary" />}
                      label="PAN Card"
                      labelPlacement="start"
                      disabled={!editProfile}
                    />
                    <FormControlLabel
                      value="Passport"
                      control={<Radio color="primary" />}
                      label="Passport"
                      labelPlacement="start"
                      disabled={!editProfile}
                    />
                  </RadioGroup>
                </FormControl>
                <br />
                </div>
                <div className="txtfld2">
                <TextField
                  disabled={!editProfile}
                  value={IdentificationIdNumber}
                  placeholder="Enter your Identification Id Number"
                  label="Identification Id Number"
                  variant="outlined"
                  onChange={this.handleChange('IdentificationIdNumber')}
                  type="text"
                  margin="normal"
                  size="small"
                  fullWidth
                />
                <br />
                </div>
                <div className="row">

                  <div className="txtfld1">
                  <TextField
                    disabled={!editProfile}
                    value={NearestLandmark}
                    size="small"
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
                  <div className="txtfld1">
                  <TextField
                    value={City}
                    disabled={!editProfile}
                    size="small"
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
                  <div className="txtfld1">
                  <TextField
                    value={Pincode}
                    disabled={!editProfile}
                    size="small"
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
                  <div className="txtfld1">
                  <TextField
                    value={State}
                    disabled={!editProfile}
                    size="small"
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
                  <div className="txtfld1">
                  <TextField
                    value={Country}
                    disabled={!editProfile}
                    size="small"
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
                </div>
                <div className="row">
                  <div className="txtfld1">
                  <TextField
                    value={Email}
                    disabled={!editProfile}
                    size="small"
                    placeholder="Enter you Email address"
                    label="Email address"
                    variant="outlined"
                    onChange={this.handleChange('Email')}
                    type="text"
                    margin="normal"
                    fullWidth
                  />
                  </div>
                  { !(Email==tempEmail) &&
                    <>
                    <div style={{marginLeft:'20px',marginTop:'10px'}}>
                      <Button
                        variant="success"
                        size="sm"
                        disabled={!editProfile && (Email==userInfo.data.Email)}
                        onClick={() => this.handleOtp(userInfo.data._id,Email,0)}
                      >
                      Send OTP
                      </Button>
                    </div>
                    { sendEmailOtp && 
                      <>
                        <div className="txtfld1">
                        <TextField
                          disabled={!editProfile}
                          size="small"
                          placeholder="Enter you Email OTP"
                          label="OTP"
                          variant="outlined"
                          onChange={this.handleChange('otp1')}
                          type="text"
                          margin="normal"
                          fullWidth
                        />
                        </div>
                        <div style={{marginLeft:'20px',marginTop:'10px'}}>
                          <Button
                            variant="success"
                            size="sm"
                            disabled={!editProfile || (otp1.length<=5)}
                            onClick={() => this.verifyOtp(otp1,0,userInfo.data._id,Email)}
                          >
                          Verify OTP
                          </Button>
                        </div>
                      </>
                    }
                    </>
                  }
                  </div>
                <div className="row">
                  <div className="txtfld1">
                  <TextField
                    value={parseInt(PhoneNumber)}
                    disabled={!editProfile}
                    size="small"
                    placeholder="Enter your Phone Number"
                    label="Phone Number"
                    variant="outlined"
                    onChange={this.handleChange('PhoneNumber')}
                    type="number" inputProps={{ min:1000000000, max: 9999999999, step: 1}}
                    margin="normal"
                    fullWidth
                  />
                  </div>
                  { !(PhoneNumber==tempPhoneNumber) &&
                    <>
                    <div style={{marginLeft:'20px',marginTop:'10px'}}>        
                       <Button
                         variant="success"
                         size="sm"
                         disabled={!editProfile}
                         onClick={() => this.handleOtp(userInfo.data._id,PhoneNumber,1)}
                       >
                       Send OTP
                       </Button>
                    </div>   
                    { sendPhoneOtp &&
                      <>
                        <div className="txtfld1">
                          <TextField
                            disabled={!editProfile}
                            size="small"
                            placeholder="Enter you Phone OTP"
                            label="OTP"
                            variant="outlined"
                            onChange={this.handleChange('otp2')}
                            type="text"
                            margin="normal"
                            fullWidth
                          />
                        </div>
                        <div style={{marginLeft:'20px',marginTop:'10px'}}>
                          <Button
                            variant="success"
                            size="sm"
                            disabled={!editProfile || (otp2.length<=5)}
                            onClick={() => this.verifyOtp(otp2,1,userInfo.data._id,PhoneNumber)}
                          >
                          Verify OTP
                          </Button>
                        </div>
                      </>
                    }
                    </>
                  }
                </div>
          </div>

          <div>
            <div style={{marginTop:'30px',marginLeft:'60px'}}>
              <Button
                variant="warning"
                size="lg"
                onClick={() => this.getTests(userInfo)}
              >
                View Your Tests  
              </Button>
            </div>
            { !editProfile || 
                  !(
                    userInfo.data.IdType==IdType &&
                    userInfo.data.IdentificationIdNumber==IdentificationIdNumber &&
                    userInfo.data.NearestLandmark==NearestLandmark &&
                    userInfo.data.City==City &&
                    userInfo.data.Pincode==Pincode &&
                    userInfo.data.State==State &&
                    userInfo.data.Country==Country &&
                    !(Email==tempEmail && tempEmail!=userInfo.data.Email) &&
                    !(PhoneNumber==tempPhoneNumber && tempPhoneNumber!=userInfo.data.PhoneNumber) 
                  )
                  &&
            <>
              <div className="txtfld3">
                  <TextField
                    placeholder="Enter your password" /*change as the password changes to old or nothing*/
                    label="Enter your password to edit"
                    variant="outlined"
                    onChange={this.handleChange('Validitypassword')}
                    type="password"
                    margin="normal"
                    disabled={!editProfile || 
                    (
                      userInfo.data.IdType==IdType &&
                      userInfo.data.IdentificationIdNumber==IdentificationIdNumber &&
                      userInfo.data.NearestLandmark==NearestLandmark &&
                      userInfo.data.City==City &&
                      userInfo.data.Pincode==Pincode &&
                      userInfo.data.State==State &&
                      userInfo.data.Country==Country &&
                      (Email==tempEmail && tempEmail!=userInfo.data.Email) &&
                      (PhoneNumber==tempPhoneNumber && tempPhoneNumber!=userInfo.data.PhoneNumber) 
                    )
                  }
                    size="small"
                    fullWidth
                  />
                  <br />
              </div>
              <div style={{marginTop:'30px',marginLeft:'60px'}}>
                <Button
                  variant="info"
                  size="lg"
                  disabled={!editProfile || Validitypassword.length<=7 ||
                    (
                      userInfo.data.IdType==IdType &&
                      userInfo.data.IdentificationIdNumber==IdentificationIdNumber &&
                      userInfo.data.NearestLandmark==NearestLandmark &&
                      userInfo.data.City==City &&
                      userInfo.data.Pincode==Pincode &&
                      userInfo.data.State==State &&
                      userInfo.data.Country==Country &&
                      (!(Email==tempEmail && tempEmail!=userInfo.data.Email) ||
                      !(PhoneNumber==tempPhoneNumber && tempPhoneNumber!=userInfo.data.PhoneNumber) )
                    )
                  }
                  onClick={() => this.EditDetails(userInfo.data._id,Validitypassword)}
                >
                  Edit Details  
                </Button>
              </div>
            </>
            }
          </div>
          {succeed1 && 
            <Redirect 
              to={{
                pathname: '/test', 
                data: values
              }} 
            />
          }
        </div>
      </>
    );
  }
}

export default ProfileView;
