import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import "../App.css";
import CenterLoginNavbar from "./CenterLoginNavbar";
import CenterReviews from "./CenterReviews";
import Footer from "./Footer";
import * as actionTypes from './store/actions'
import {connect} from 'react-redux'
import Axios from "axios";

export class CenterLoginHome extends Component {
  state= {
  };
  render() {
    const{ 
    } = this.state;
    return(
    <div>
      
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
