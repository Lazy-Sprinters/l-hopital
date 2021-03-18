import React from "react";
import "./preloader.css";

export class preloader extends React.Component {
  render() {
    return (
      <div className="wrap">
        <div className="loading">
          <div className="bounceball"></div>
          <div className="text">NOW LOADING</div>
        </div>
      </div>
    );
  }
}


