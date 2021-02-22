import React, { Component } from 'react';
import './RegisterForm.css';
import Navbar from './navbar';
import LoginNavbar from "./LoginNavbar";
import Footer from './Footer';
import OtpVerifyOrSkip from './OtpVerification';

export class Verify extends Component {
	
	render(){
		const data=this.props.location.data;
		// console.log(data)
  return (
    <>

      {data.check==0 ? <Navbar /> : <LoginNavbar userInfo={data.userInfo} />}
      {data.check==0 
        ? <OtpVerifyOrSkip userInfo={data.userInfo1} check={data.check}/>
        : <OtpVerifyOrSkip userInfo={data.userInfo} check={data.check}/>
      }
      <Footer />
    </>
  );
}
}

export default Verify;
