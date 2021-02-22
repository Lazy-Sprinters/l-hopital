import React, { Component } from 'react';
import '../App.css';
import LoginNavbar from "./LoginNavbar";
import Footer from './Footer';
import ParticularCard from './ParticularCard';
import * as actionTypes from './store/actions'
import {connect} from 'react-redux'

export class selectionPage1 extends Component {
	
	render(){
		// const data =this.props.location.data;       /* tochange */
		// console.log(data)
  return (
    <>

      <LoginNavbar            
      userInfo={this.props.userInfo}                  /* tochange */
      />
      <ParticularCard 
                  userInfo={this.props.userInfo}                  
                  slots={this.props.slots}             
                  CentreValue={this.props.CentreValue}             
            /> 
    </>
  );
}
}
const mapStateToProps = state => {
  return{
    userInfo:state.userInfo,
    slots:state.slots,
    CentreValue:state.CentreValue
  };
};

const mapDispatchToProps = dispatch =>{
  return{
    onChangeUserInfo: (userInfo) => dispatch({type:actionTypes.CHANGE_STATE , userInfo:userInfo})
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(selectionPage1);
