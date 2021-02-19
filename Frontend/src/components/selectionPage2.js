import React, { Component } from 'react';
import '../App.css';
import LoginNavbar from "./LoginNavbar";
import Footer from './Footer';
import ParticularCard from './ParticularCard';

export class selectionPage1 extends Component {
	
	render(){
		const data =this.props.location.data;       /* tochange */
		// console.log(email)
  return (
    <>

      <LoginNavbar            
      userInfo={data.userInfo}                  /* tochange */
      />
      {<ParticularCard 
                  // userInfo={data.userInfo}                  
                  // slots={data.slots}             
                  // CentreValue={data.CentreValue}             
            /> }
    </>
  );
}
}

export default selectionPage1;
