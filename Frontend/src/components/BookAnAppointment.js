import React from 'react';
import Bounce from 'react-reveal/Bounce';
import { Link,Redirect } from 'react-router-dom';
import './RegisterForm.css'
import { TextField, LinearProgress,Select,MenuItem } from "@material-ui/core";
import Axios from "axios";
import {Button} from 'react-bootstrap'
import * as actionTypes from './store/actions'
import {connect} from 'react-redux'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import moment from 'moment';
import { format} from 'date-fns';

export class BookAnAppointment extends React.Component {
  state = {
    testList:"0",
    test:"0",
    date:"0",
    centreList:"0",
    errmsg:"",
    show: false, onOpen:true , recieved:false ,isProceedFaulty:false,
    onClose:false

  };
  handleDate = (date) =>{
    // console.log(moment(date).format("YYYY-MM-DD"))
    this.setState({date:date})
  };
  handleChange = (input) => (e) => {
    console.log(e.target.value)
    this.setState({ [input]: e.target.value });
  };
  handleBooking = (x) =>{
    this.setState({['testList']:x.data});
    this.setState({onClose:true})
  };
  handleSearch = (x) =>{
    // this.setState({centreList : x.data});
    this.props.onChangecentreList(x.data);
    this.setState({recieved : true});
  };
  handleProceedFaulty = () =>  {
    this.setState({ ['isProceedFaulty']: true });
  };
  handleVerfiyErr = (x) => {
    this.setState ({errmsg : x });
  };
  retrieveTests = (data) =>{
    this.setState({onOpen:false});
    const userInfo={userInfo:data}
    Axios.post("http://localhost:5000/user/getallfacilities",userInfo)
    .then((res) => {
      this.handleBooking(res);
    })
    .catch((err) => {
      console.log("Axios", err);
        this.handleProceedFaulty();
    });
  };

  dropdownShow = (data) => {
    return(
      <div>
      <Select displayEmpty required defaultValue = "" onChange={this.handleChange('test')} style={{margin:'20px',minWidth:'120px'}} variant="outlined">
        <MenuItem value="" disabled><em>None</em></MenuItem>
        {data.length>0 && data.map((value,i) => {
          return(
              <MenuItem value={value}>{value}</MenuItem >
            )
        })}
        </Select>
        </div>
      )
  };

  book = () =>{
    this.setState({ show: true});
  };
  proceed = (test,date,userInfo) => {
    this.setState({ show: false });
    this.setState({ ['isProceedFaulty']: false });
    const data={test,date,userInfo}
    console.log(data);
      Axios.post("http://localhost:5000/user/match",data)
      .then((res) => {
        console.log(res);
        this.handleSearch(res);
      })
      .catch((err) => {
        if(err.response.status==403){
          this.handleVerfiyErr(err.response.data);
        }
        else{
          console.log("Axios", err.message);
          this.handleProceedFaulty();
        }
      }); 
  };
  getTodayDate = (num) =>{
    var tempDate = new Date();
    var ans=new Date(tempDate.getTime()+(parseInt(num)*24*60*60*1000));
    var date = ans.getFullYear() + '-' ;
    if((ans.getMonth()+1 )< 10)
      date = date + '0' + (ans.getMonth()+1) + '-' ;
    else
      date = date + (ans.getMonth()) + '-' ;
    if((ans.getDate()) < 10)
      date = date + '0' + (ans.getDate());
    else
      date = date + (ans.getDate());
    return date;
  };
  
  render() {
    // const { userInfo} = this.props;

    const{ 
      testList,
      test,
      date,
      centreList,
      errmsg,
      show, onOpen , recieved ,isProceedFaulty,onClose
    } = this.state;
    
    const values = {
      // userInfo,
      test,
      date
    };
    const data = {
      // userInfo,
      centreList
    }
    return (
      <div>

      {onOpen && this.retrieveTests(this.props.userInfo) }
      {onClose && <>
        <div className="bkap-btn">
          <button 
            className="btn btn-success my-5"
            type="button"
            onClick={() => this.book()}
          >
            Book An Appointment
          </button>
        </div>
        <Bounce top opposite when={show}>
          <div className="form">
                  <div className="form-group">
                    <label >Tests</label>
                    {this.dropdownShow(testList)}
                  </div>
                  <div className="form-group">
                    <label >Date</label>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    {<KeyboardDatePicker
                                          disableToolbar
                                          variant="inline"
                                          format="MM/dd/yyyy"
                                          margin="normal"
                                          id="date-picker-inline"
                                          maxDate={this.getTodayDate(7)}
                                          minDate= {this.getTodayDate(1)}
                                          variant="static"
                                          openTo="date"
                                          label="Date picker inline"
                                          value={date}
                                          onChange={ (date) => this.handleDate(format(date,'yyyy-MM-dd'))}
                                          KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                          }}
                                        />}
        </MuiPickersUtilsProvider>



                  </div>
                </div>
        </Bounce>
        <div className={show ? "bkap-btn" :"bkap-btn2"}>
          <Button 
            variant="success"
            onClick={() => this.proceed(test,date,this.props.userInfo)}
            disabled={!show}
          >
            Proceed
          </Button>
        </div>
        <h2>{errmsg}</h2>
        </>}
        {isProceedFaulty && <h2>No Test Centres Available for the desired test and date.Please select another date.</h2>}
        {recieved && <Redirect push to={{
                      pathname: "/selectionPage1", 
                      // data: data
                     }} />}

      </div>
    );
  }
}
const mapStateToProps = state => {
  return{
    userInfo:state.userInfo
  };
};

const mapDispatchToProps = dispatch =>{
  return{
    onChangeUserInfo: (userInfo) => dispatch({type:actionTypes.CHANGE_STATE , userInfo:userInfo}),
    onChangecentreList: (centreList) => dispatch({type:actionTypes.CHANGE_CENTRELIST , centreList:centreList})
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(BookAnAppointment);
 