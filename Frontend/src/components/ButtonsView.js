import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import "./CenterLoginHome.css";
import Footer from "./Footer";
import * as actionTypes from './store/actions';
import {connect} from 'react-redux';
import Axios from "axios";
import {Button} from 'react-bootstrap';

export class ButtonsView extends Component {
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
      <div className="Button-Body">
      <div class="quotes">
        <div class="card">
          <div class="box box1">
            <p>The first step toward success is taken when you refuse to be a captive of the environment in which you first find yourself. </p>
            <Button style={{marginLeft:'10vw'}}  className="act-btn" onClick={ () => this.handleButtonClick("success") } variant="success">Send Results</Button>
          </div>
          <div class="bg"></div>
        </div>
        <div class="card">
          <div class="box box2">
            <p>Your smile will give you a positive countenance that will make people feel comfortable around you. </p>
          <Button style={{marginLeft:'10vw'}}  className="act-btn" onClick={ () => this.handleButtonClick("info") } variant="info">Appointments for the day</Button>
          </div>
          <div class="bg"></div>
        </div>
        <div class="card">
          <div class="box box3">
            <p>Before anything else, preparation is the key to success. </p>
          <Button style={{marginLeft:'10vw'}}  className="act-btn" onClick={ () => this.handleButtonClick("danger") } variant="danger">Cancel Apointments</Button>
          </div>
          <div class="bg"></div>
        </div>
      </div>
    {/*<div className="center-btn row">
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
        </div>*/}
    {success && 
      <Redirect to='/centerLogin'/>
    }
    {info && 
      <Redirect to='/centerLogin'/>
    }
    {danger && 
      <Redirect to='/centerLogin'/>
    }
    </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(ButtonsView);
