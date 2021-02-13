import React, { Component } from 'react';
import '../App.css';
import Navbar from './navbar';
import Footer from './Footer';
import OtpVerifyOrSkip from './OtpVerification';

export class Register extends Component {
	
	render(){
		const email=this.props.location.data;
		// console.log(email)
  return (
    <>

      <Navbar />
      <OtpVerifyOrSkip email={email}/>
      <Footer />
    </>
  );
}
}

export default Register;
