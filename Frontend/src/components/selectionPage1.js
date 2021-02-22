import React, { Component } from 'react';
import '../App.css';
import LoginNavbar from "./LoginNavbar";
import Footer from './Footer';
import CentreCards from './CentreCards';
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
      <CentreCards 
      userInfo={this.props.userInfo}                  /* tochange */
      centreList={this.props.centreList}              /* tochange */
      />  
      <Footer />
    </>
  );
}
}
const mapStateToProps = state => {
  return{
    userInfo:state.userInfo,
    centreList:state.centreList
  };
};

const mapDispatchToProps = dispatch =>{
  return{
    onChangeUserInfo: (userInfo) => dispatch({type:actionTypes.CHANGE_STATE , userInfo:userInfo})
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(selectionPage1);
