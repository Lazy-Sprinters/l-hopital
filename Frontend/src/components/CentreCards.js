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
  SelectClick = (data) => {
    console.log(data);
  };
  show(centreList){          /* tochange */
    this.setState({initial:false});
    let len=centreList.length;
    console.log(len);
    let i;
    const code: JSX.Element[] = [];
    code.push(<CardComponent1 {...style1}/>)
    for(i=0; i < len-2; i+=3){
    let value=centreList[i];
    let value1=centreList[i+1];
    let value2=centreList[i+2];
      code.push(<div className="home__hero-row">
      <CardComponent1 SelectClick={this.SelectClick()} value={value} Tags={value.tags} img={value.cen.FrontImage} Name={value.cen.Name} Address={value.cen.Address} Cost={value.costing} Distance={value.dis} OpeningTime={value.cen.OpeningTime} ClosingTime={value.cen.ClosingTime}/>
      <CardComponent1 SelectClick={this.SelectClick()} value={value} Tags={value.tags} img={value1.cen.FrontImage} Name={value1.cen.Name} Address={value1.cen.Address} Cost={value1.costing} Distance={value1.dis} OpeningTime={value1.cen.OpeningTime} ClosingTime={value1.cen.ClosingTime}  />
      <CardComponent1 SelectClick={this.SelectClick()} value={value} Tags={value.tags} img={value2.cen.FrontImage} Name={value2.cen.Name} Address={value2.cen.Address} Cost={value2.costing} Distance={value2.dis} OpeningTime={value2.cen.OpeningTime} ClosingTime={value2.cen.ClosingTime}  />
      </div>);
    }
    let value=centreList[len-(3*(len/3))];
    let value1=centreList[len-(3*(len/3))+1];
    if((len%3)==1){
      code.push(<div className="home__hero-row">
      <CardComponent1 SelectClick={this.SelectClick()} value={value} Tags={value.tags} img={value.cen.FrontImage} Name={value.cen.Name} Address={value.cen.Address} Cost={value.costing} Distance={value.dis} OpeningTime={value.cen.OpeningTime} ClosingTime={value.cen.ClosingTime}/>
      </div>)
    }
    if((len%3)==2){
      code.push(<div className="home__hero-row">
      <CardComponent1 SelectClick={this.SelectClick()} value={value} Tags={value.tags} img={value.cen.FrontImage} Name={value.cen.Name} Address={value.cen.Address} Cost={value.costing} Distance={value.dis} OpeningTime={value.cen.OpeningTime} ClosingTime={value.cen.ClosingTime}/>
      <CardComponent1 SelectClick={this.SelectClick()} value={value} Tags={value.tags} img={value1.cen.FrontImage} Name={value1.cen.Name} Address={value1.cen.Address} Cost={value1.costing} Distance={value1.dis} OpeningTime={value1.cen.OpeningTime} ClosingTime={value1.cen.ClosingTime}  />
      </div>)
    }
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
        
        {initial && this.show(centreList)}        {/* tochange */}
        {origcode}
        {selected && <Redirect to={{
                      pathname: "/selectionPage2", 
                      // data: {centre}           /* tochange */
                     }} />}
      </div>
    );
  }
}

export default CentreCards;
 