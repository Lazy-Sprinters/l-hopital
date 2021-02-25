import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import "./CenterLoginHome.css";
import * as actionTypes from './store/actions'
import {connect} from 'react-redux'
import Axios from "axios";
import StickyHeadTable from './StickyHeadTable'
export class CenterReviews extends Component {
  state= {
  };
  render() {
    const{ 
    } = this.state;
    return(
    <div>
    <div className="row">
      <div className="reviews">
      <h1>Your Reviews</h1>
        <StickyHeadTable arr={this.props.centerInfo.data.reviews.arr}/>
      </div>
      {console.log(this.props.centerInfo.data.reviews.arr)}
      <div className="positive"></div>
      <div className="negative"></div>
    </div>
    <br/>
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

export default connect(mapStateToProps,mapDispatchToProps)(CenterReviews);
