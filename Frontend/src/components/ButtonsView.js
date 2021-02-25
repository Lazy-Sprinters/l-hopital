import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import "./CenterLoginHome.css";
import CenterLoginNavbar from "./CenterLoginNavbar";
import CenterReviews from "./CenterReviews";
import Footer from "./Footer";
import * as actionTypes from './store/actions';
import {connect} from 'react-redux';
import Axios from "axios";
import {Button} from 'react-bootstrap';

export class CenterLoginHome extends Component {
  state= {
    success:false,
    info:false,
    danger:false,
  };
  handleButtonClick = (x) =>{
    switch(x){
      case "success": this.setState({success:true});break;
      case "info": this.setState({info:true});break;
      case "danger": this.setState({danger:true});break;

    }
  }
  render() {
    const{ 
      success,
      info,
      danger
    } = this.state;

    return(
      <>

    <div className="center-btn row">
      {console.log(this.props.centerInfo)}
      <>
      <Button style={{marginLeft:'14vw'}}  className="act-btn" onClick={ () => this.handleButtonClick("success") } variant="success">Send Results</Button>
      <div className="act-btn1 act"> HEY HERE IS SOME INFO
      </div>
      </>
      <>
      <Button style={{marginLeft:'14vw'}}  className="act-btn" onClick={ () => this.handleButtonClick("info") } variant="info">Appointments for the day</Button>
      <div className="act-btn2 act"> HEY HERE IS SOME INFO
      </div>
      </>
      <>
      <Button style={{marginLeft:'14vw'}}  className="act-btn" onClick={ () => this.handleButtonClick("danger") } variant="danger">Cancel Apointments</Button>
      <div className="act-btn3 act"> HEY HERE IS SOME INFO
      </div>
      </>
    </div>
    {success && 
      <Redirect to='/centerLogin'/>
    }
    {info && 
      <Redirect to='/centerLogin'/>
    }
    {danger && 
      <Redirect to='/centerLogin'/>
    }
    </>
    );
  }
}

const mapStateToProps = state => {
  return{
    centerInfo:state.centerInfo
  };
};

const mapDispatchToProps = dispatch =>{
  return{
    onChangeCenterInfo: (centerInfo) => dispatch({type:actionTypes.CHANGE_CENTERINFO , centerInfo:centerInfo}),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(CenterLoginHome);
