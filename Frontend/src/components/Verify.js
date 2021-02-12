import React from 'react';
import '../App.css';
import Navbar from './navbar';
import Footer from './Footer';
import OtpVerifyOrSkip from './OtpVerification';

function Register() {

  return (
    <>

      <Navbar />
      <OtpVerifyOrSkip/>
      <Footer />
    </>
  );
}

export default Register;
