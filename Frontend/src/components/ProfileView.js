import { Link,Redirect } from 'react-router-dom';
import React from "react";
import Axios from "axios";
import TnCModal from "./TnCModal";
import { Button } from "react-bootstrap";
import {
  Avatar,
  Typography,
  Switch,
  FormControlLabel
}
  from '@material-ui/core';

export class ProfileView extends React.Component {
  state = {
  };
  getInitials = (x) =>{
    let text = x.slice(0,1).toUpperCase();
    return text;
  }
  render() {
    const { 
    } = this.state;
    const { userInfo } = this.props; /* tochange */

    return (
      <>
      {console.log(userInfo.data)}
      <div className="row">
        <Avatar style={{width:'80px',height:'80px',backgroundColor:'orange' , marginLeft:'20px', marginTop:'20px'}}><h1>{this.getInitials(userInfo.data.UserName)}</h1></Avatar>
        <div >
          <div className="row">
            <Typography style={{width:'80px',height:'80px', marginLeft:'40px', marginTop:'20px',whiteSpace:'nowrap'}}>{userInfo.data.UserName}</Typography>
          </div>
          <div className="row">
              <Typography style={{width:'80px',marginLeft:'40px',height:'60px'}}>Age: {userInfo.data.Age}</Typography>
              <Typography style={{width:'80px',marginLeft:'40px',height:'60px'}}>Gender: {userInfo.data.Gender}</Typography>
          </div>
        </div> 
        <Typography style={{width:'80px',height:'80px',whiteSpace:'nowrap'}}>Tests Booked</Typography>
        <FormControlLabel
          control={
            <Switch
              name="checkedB"
              color="primary"
            />
          }
          label="Edit Profile"
        />
      </div>
     
      </>
    );
  }
}

export default ProfileView;
