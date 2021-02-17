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
    var code=`<div>`;
    code+=`<CardComponent1 {...style1}/>`
      code+=`</div>`
      {console.log(code)}
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
        {/*{initial && this.show(centreList)}        {/* tochange */}
        {/*console.log(origcode)}
    <div dangerouslySetInnerHTML={{__html:origcode}}></div>}*/}
      <div className="home__hero-row">

          <CardComponent1 {...style1}/>
          <CardComponent1 {...style1}/>
          <CardComponent1 {...style1}/>
          </div>
          <div className="home__hero-row">
          <CardComponent1 {...style1}/>
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
 