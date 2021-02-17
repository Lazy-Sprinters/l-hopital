import React from 'react';
import Bounce from 'react-reveal/Bounce';
import { Link,Redirect } from 'react-router-dom';
import CardComponent from './CardComponent';
import CardComponent1 from './CardComponent1';
import {style1} from './CardData';
import './CentreCards.css';
import { TextField, LinearProgress,Select,MenuItem } from "@material-ui/core";
import Axios from "axios";

export class CentreCards extends React.Component {
  state = {
    centre:"0",
    selected:false,
    initial:true,
    origcode:"",
  };
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };
  show(centreList){          /* tochange */
    this.setState({initial:false});
    var len=centreList.length
    console.log(len);
    var i;
    var code='';
    // return(
      // <div>
        {/*<div className="home__hero-row">*/}
        // {
          for(i=0; i < len; i++){
          /*centreList!=undefined && centreList.map((value,i) =>{*/
            var value=centreList[i];
            // return(
              
            //   <>
            code+=`
                    <div className="home__hero-row">
                    <CardComponent img=${value.cen.FrontImage} Name=${value.cen.Name} Address=${value.cen.Address} Cost=${value.costing} Distance=${value.dis} OpeningTime=${value.cen.OpeningTime} ClosingTime=${value.cen.ClosingTime}  />
                  `

            if(i+1<len){
              var value1=centreList[i+1];
              code+=`<CardComponent img=${value1.cen.FrontImage} Name=${value1.cen.Name} Address=${value1.cen.Address} Cost=${value1.costing} Distance=${value1.dis} OpeningTime=${value1.cen.OpeningTime} ClosingTime=${value1.cen.ClosingTime}  />`
            }
              code+=`</div>`
              // </>
            // );
          }
        // }
        {/*</div>*/}
      // </div>
      // )
      this.setState({origcode:code});
  };
  render() {
    const { centreList} = this.props;        /* tochange */

    const{ 
      centre,
      selected,
      initial,
      origcode
    } = this.state;
    
    const values ={
      centre
    };
    return (
      <div>
        
        {/*initial && this.show(centreList)*/}        {/* tochange */}
        {initial && this.show(centreList)}        {/* tochange */}
        <div dangerouslySetInnerHTML={{__html:origcode}}></div>
       <div className="home__hero-row">

          <CardComponent1 {...style1}/>
          <CardComponent1 {...style1}/>
          </div>
          <div className="home__hero-row">
          <CardComponent1 {...style1}/>
          <CardComponent1 {...style1}/>
        </div>
        {selected && <Redirect to={{
                      pathname: "/selectionPage2", 
                      // data: {centre}           /* tochange */
                     }} />}
      </div>
    );
  }
}

export default CentreCards;
 