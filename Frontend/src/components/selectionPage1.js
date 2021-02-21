import React, { Component } from 'react';
import '../App.css';
import LoginNavbar from "./LoginNavbar";
import Footer from './Footer';
import CentreCards from './CentreCards';

export class selectionPage1 extends Component {
	
	render(){
		const data =this.props.location.data;       /* tochange */
		console.log(data)
  return (
    <>

      <LoginNavbar            
      userInfo={data.userInfo}                  /* tochange */
      />
      <CentreCards 
      userInfo={data.userInfo}                  /* tochange */
      centreList={data.centreList}              /* tochange */
      />  
      <Footer />
    </>
  );
}
}

export default selectionPage1;
