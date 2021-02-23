import React from 'react';
import Bounce from 'react-reveal/Bounce';
import { Link,Redirect } from 'react-router-dom';
import './RegisterForm.css'
import { TextField, LinearProgress,Select,MenuItem } from "@material-ui/core";
import Axios from "axios";
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
    errmsg:""

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
  }
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
      <Select onChange={this.handleChange('test')}>
        {data!=undefined && data.map((value,i) => {
          return(
              <MenuItem value={value}>{value}</MenuItem >
            )
        })}
        </Select>
        </div>
      )
  }
  constructor(props) {
    super(props);
    this.state = { show: false, onOpen:true , recieved:false ,isProceedFaulty:false};
  }
  book() {
    this.setState({ show: true});
  }
  proceed(test,date,userInfo) {
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
  }
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
  }
  
  render() {
    // const { userInfo} = this.props;

    const{ 
      testList,
      test,
      date,
      centreList,
      recieved,
      isProceedFaulty,
      errmsg
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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>

      {this.state.onOpen==true ? this.retrieveTests(this.props.userInfo) : null}
        <div className="bkap-btn">
          <button 
            className="btn btn-success my-5"
            type="button"
            onClick={() => this.book()}
          >
            Book An Appointment
          </button>
        </div>
        <Bounce top opposite when={this.state.show}>
          <div className="form">
                  <div className="form-group">
                    <label htmlFor="username">Tests</label>
                    {this.dropdownShow(testList)}
                  </div>
                  <br />
                  <div className="form-group">
                    <label htmlFor="password">Date</label>
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
                    {/*<TextField
                                          onChange={this.handleChange("date")}
                                          type="date"
                                          placeholder="password"
                                          inputProps={{
                                            min: this.getTodayDate(1),
                                            max: this.getTodayDate(7)
                                          }}
                                        />*/}

                  </div>
                </div>
        </Bounce>
        <div className="bkap-btn">
          <button className="bkap-btn"
            className="btn btn-success my-5"
            type="button"
            onClick={() => this.proceed(test,date,this.props.userInfo)}
            disabled={!this.state.show}
          >
            Proceed
          </button>
        </div>
        <h2>{errmsg}</h2>
        {isProceedFaulty && <h2>No Test Centres Available for the desired test and date.Please select another date.</h2>}
        {recieved && <Redirect push to={{
                      pathname: "/selectionPage1", 
                      // data: data
                     }} />}
        </MuiPickersUtilsProvider>

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
 