import React from "react";
import "./ParticularCard.css";
import Axios from "axios";
import Ratings from "./StarRatingComponent";
import CollapsibleTable from "./CollapsibleTable";

export class TestView extends React.Component {
  state = {
  };
  
  render() {
    const {userInfo,testInfo} =this.props;

    return (
      <>
      <CollapsibleTable testInfo={testInfo}/>
      </>
    );
  }
}

export default TestView;
