import React, { Component } from "react";
import "../App.css";
import BookAnAppointment from "./BookAnAppointment";
import LoginNavbar from "./LoginNavbar";
import { Link,Redirect } from 'react-router-dom';
import {
  Button,
} from "@material-ui/core";
import Footer from "./Footer";

export class VerifyWarning extends Component {
  state={
    check:1
  }
  render() {
    const{userInfo}=this.props;

    const{
      check
    }=this.state;
    const data={
      check,
    };
    return(
    <div>
    <div className="verify row" >
    <h5>The account is not verified. The user will not be able to book any appointments.To verify click here.</h5>
    
                <Link 
                  to={{
                      pathname: "/verify",
                      data: {"check":check,"Email":userInfo.data.Email,"userInfo":userInfo}
                     }}
                 style={{textDecoration:'none' ,fontSize:'18px'}}
                >                  
                    VERIFY
                </Link>
              </div>
              <br/>
              <br/>
              <br/>
              <br/>
    </div>
    );
  }
}

export default VerifyWarning;
