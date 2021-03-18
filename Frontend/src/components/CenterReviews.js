import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import "./CenterLoginHome.css";
import * as actionTypes from './store/actions'
import {connect} from 'react-redux'
import Axios from "axios";
import StickyHeadTable from './StickyHeadTable'
import MuiAlert from '@material-ui/lab/Alert';
import Progress from './Progress';
import FullOption from './FullOption';
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
    const{reviews}=this.props;
    return(
    <div>
    <div className="row">
      <div className="reviews">
      <h1>Your Reviews</h1>
        <StickyHeadTable arr={reviews.arr}/>
      </div>
      <div style={{marginLeft:'10vw', marginTop:'0vh'}}>
      {reviews.flag==0 
        ?
          <Alert style={{border:"2px solid  bisque" , boxShadow: "-10px 25px 50px #a5a89f"}} severity="error">{reviews.comment}</Alert>
        :
          <Alert style={{border:"2px solid  bisque" , boxShadow: "-10px 25px 50px #a5a89f"}}  severity="success">{reviews.comment}</Alert>
      }
      {/*<Progress style={{border:"2px solid  bisque" , boxShadow: "-10px 25px 50px #a5a89f"}}  value={reviews.posper}/>
*/}
      {/*<PieChart
        data={[
          { label: 'Positive Feedback', value: reviews.posper, color: 'green' },
          { label: 'Negative Feedback', value: reviews.negper, color: 'red' },
        ]}
      />*/}
      {/*<PieChart
        style={{ marginTop:'1vw' , height: '15vw' }}
        data={[
          { label: 'Positive Feedback',value: 60, color: 'green' },
          { label: 'Negative Feedback', value: 40, color: 'red' },
        ]}
        radius={PieChart.defaultProps.radius - shiftSize}
        segmentsShift={(index) => (index === 0 ? shiftSize : 0.5)}
        label={({ dataEntry }) => dataEntry.label}
        labelStyle={(index) => ({
          fontSize: '5px',
          fontStyle: 'bold',
          fontFamily: 'sans-serif',
      })}
      />*/}
      <FullOption 
        data={[
          { label: 'Positive Feedback',value: 60, color: 'green' },
          { label: 'Negative Feedback', value: 40, color: 'red' },
        ]} />
      </div>
    </div>

    <br/>
    </div>
    )
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
