import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import "./CenterLoginHome.css";
import * as actionTypes from './store/actions'
import {connect} from 'react-redux'
import Axios from "axios";
import StickyHeadTable from './StickyHeadTable'
import MuiAlert from '@material-ui/lab/Alert';
import Progress from './Progress';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export class CenterReviews extends Component {
  state= {
    val:100
  };
  render() {
    const{ 
      val
    } = this.state;
    return(
    <div>
    <div className="row">
      <div className="reviews">
      <h1>Your Reviews</h1>
        <StickyHeadTable arr={this.props.centerInfo.data.reviews.arr}/>
      </div>
      <div style={{marginLeft:'10vw', marginTop:'10vh'}}>
      {this.props.centerInfo.data.reviews.flag==0 
        ?
          <Alert severity="error">{this.props.centerInfo.data.reviews.comment}</Alert>
        :
          <Alert severity="success">{this.props.centerInfo.data.reviews.comment}</Alert>
      }
      <Progress value={this.props.centerInfo.data.reviews.posper}/>
      
      </div>
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
