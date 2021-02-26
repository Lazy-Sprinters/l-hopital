import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import CenterLoginNavbar from "./CenterLoginNavbar";
import CenterReviews from "./CenterReviews";
import Footer from "./Footer";
import * as actionTypes from './store/actions'
import {connect} from 'react-redux'
import Axios from "axios";
import "./CenterLoginHome.css";
import {Button} from 'react-bootstrap';

export class CenterLoginHome extends Component {
  state= {
    auth:true,
    auth1:false,
    auth2:false,
     success:false,
    info:false,
    danger:false,
    reviews:""
  };
  handleButtonClick = (x) =>{
    switch(x){
      case "success": this.setState({success:true});break;
      case "info": this.setState({info:true});break;
      case "danger": this.setState({danger:true});break;

    }
  }
  authenticate = (data) =>{
    this.setState({auth:false});
    const centerInfo={centerInfo:data}
    Axios.post("http://localhost:5000/helper/check1",centerInfo)      
    .then((res) => {
      ;
      })
      .catch((err) => {
        console.log("Invalid Route");
        this.setState({auth1:true});
      }); 
    Axios.post("http://localhost:5000/center/reviewdet",centerInfo)      
    .then((res) => {
        this.setState({reviews:res.data});
        this.setState({auth2:true});
      })
      .catch((err) => {
        console.log("Axios", err);
      }); 
  };
  render() {
    const{ 
      auth,
      auth1,
      auth2,
      success,
      info,
      danger,
      reviews
    } = this.state;
    return(
    <div>
      {auth && this.authenticate(this.props.centerInfo)}
      {auth1 && <Redirect to={{
        pathname: "/login" 
      }} />}
      {auth2 && 
        <>
        <CenterLoginNavbar
          centerInfo={this.props.centerInfo}
        />
        <div className="Button-Body">
        <div className="quotes">
          <div className="card">
            <div className="box box1">
              <p>Don’t put off for tomorrow what you can do today because if you enjoy it today, you can do it again tomorrow.</p>
              <br/>
              <p>Send the results which are ready today itself.</p>
              <Button style={{marginLeft:'10vw'}}  className="act-btn" onClick={ () => this.handleButtonClick("success") } variant="success">Send Results</Button>
            </div>
            <div className="bg"></div>
          </div>
          <div className="card">
            <div className="box box2">
              <p>Be not afraid of growing slowly, be afraid only of standing still. </p>
              <br/>
              <p>View appointments for the day and Plan your day!.</p>
            <Button style={{marginLeft:'10vw'}}  className="act-btn" onClick={ () => this.handleButtonClick("info") } variant="info">Appointments for the day</Button>
            </div>
            <div className="bg"></div>
          </div>
          <div className="card">
            <div className="box box3">
              <p>Before anything else, preparation is the key to success. </p>
              <br/>
              <p>View all your future booking and plan your days.</p>
            <Button style={{marginLeft:'10vw'}}  className="act-btn" onClick={ () => this.handleButtonClick("danger") } variant="danger">Cancel Apointments</Button>
            </div>
            <div className="bg"></div>
          </div>
        </div>
        </div>
        <div>
          <CenterReviews reviews={reviews}/>
        </div>
        <Footer />
        {success && 
        <Redirect to='/centerSendResult'/>
        }
        {info && 
          <Redirect to='/centerAppOfDay'/>
        }
        {danger && 
          <Redirect to='/centerLogin'/>
        }
      </>
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

export default connect(mapStateToProps,mapDispatchToProps)(CenterLoginHome);
