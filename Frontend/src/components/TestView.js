import React from "react";
import "./ParticularCard.css";
import Axios from "axios";
import Ratings from "./StarRatingComponent";
import CollapsibleTable from "./CollapsibleTable";
import * as actionTypes from './store/actions'
import {connect} from 'react-redux'

export class TestView extends React.Component {
  state = {
  };
  
  render() {
    // const {userInfo,testInfo} =this.props;

    return (
      <>
      <CollapsibleTable testInfo={this.props.testInfo}/>
      </>
    );
  }
}
const mapStateToProps = state => {
  return{
    userInfo:state.userInfo,
    testInfo:state.testInfo
  };
};

const mapDispatchToProps = dispatch =>{
  return{
    onChangeUserInfo: (userInfo) => dispatch({type:actionTypes.CHANGE_STATE , userInfo:userInfo}),
    onChangeTestInfo: (testInfo) => dispatch({type:actionTypes.CHANGE_TESTINFO , testInfo:testInfo})
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(TestView);
