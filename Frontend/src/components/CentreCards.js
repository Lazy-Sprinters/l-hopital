import React from 'react';
import Bounce from 'react-reveal/Bounce';
import { Link,Redirect } from 'react-router-dom';
import CardComponent from './CardComponent';
import {style1} from './CardData';
import './CentreCards.css';
import { TextField, LinearProgress,Select,MenuItem } from "@material-ui/core";
import Axios from "axios";

export class CentreCards extends React.Component {
  state = {
    centre:"0",
    selected:false,
    initial:true
  };
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };
  show(centreList){          /* tochange */
    // this.setState({initial:false})
    return(
      <div>
      {/*<div className="home__hero-row">*/}
        {centreList!=undefined && centreList.map((value,i) =>{
          // {console.log(value.cen.Image)}

          return(
            
            <>
            <CardComponent img={value.cen.FrontImage} Name={value.cen.Name} Address={value.cen.Address} Cost={value.costing} Distance={value.dis} OpeningTime={value.cen.OpeningTime} ClosingTime={value.cen.ClosingTime}  />
            {i%2==0 && i!=0 &&  <div className="home__hero-row"> </div>}
        
            </>
          );
        })}
        {/*</div>*/}
      </div>
      )
  };
  render() {
    const { centreList} = this.props;        /* tochange */

    const{ 
      centre,
      selected,
      initial
    } = this.state;
    
    const values ={
      centre
    };
    return (
      <div>
        
        {initial && this.show(centreList)}        {/* tochange */}
       {/* <div className="home__hero-row">

        //   <CardComponent {...style1}/>
        //   <CardComponent {...style1}/>
        //   <CardComponent {...style1}/>
        //   <CardComponent {...style1}/>
        // </div>*/}
        {selected && <Redirect to={{
                      pathname: "/selectionPage2", 
                      // data: {centre}           /* tochange */
                     }} />}
      </div>
    );
  }
}

export default CentreCards;
 