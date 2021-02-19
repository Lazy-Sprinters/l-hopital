import React from "react";
import "./ParticularCard.css";
import Axios from "axios";
import Ratings from "./StarRatingComponent";
import CollapsibleTable from "./CollapsibleTable";

export class ParticularCard extends React.Component {
  state = {
  };
  
  render() {
    
    return (
      <>
      <CollapsibleTable/>
      </>
    );
  }
}

export default ParticularCard;
