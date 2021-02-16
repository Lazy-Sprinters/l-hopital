import React from 'react';
import Bounce from 'react-reveal/Bounce';
import { Link,Redirect } from 'react-router-dom';
import './RegisterForm.css'
import { TextField, LinearProgress,Select,MenuItem } from "@material-ui/core";
import Axios from "axios";

export class BookAnAppointment extends React.Component {
  state = {
    testList:"0",
    test:"0",
    date:"0",
    centreList:"0"
  };
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };
  handleBooking = (x) =>{
    this.setState({['testList']:x.data});
  };
  handleSearch = (x) =>{
    this.setState({centreList : x.data});
    this.setState({recieved : true});
  }
  retrieveTests = (data) =>{
    this.setState({onOpen:false});
    Axios.post("http://localhost:5000/facility/all",data)
    .then((res) => {
      console.log(res);
      this.handleBooking(res);
    })
    .catch((err) => {
      console.log("Axios", err);
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
    this.state = { show: false, onOpen:true , recieved:false };
  }
  book() {
    this.setState({ show: true});
  }
  proceed(data) {
    this.setState({ show: false });
    console.log(data);
      // this.setState({recieved : true})    /* tochange */
      Axios.post("http://localhost:5000/center/match",data)
      .then((res) => {
        console.log(res);
        this.handleSearch(res);
      })
      .catch((err) => {
        console.log("Axios", err);
      }); 
  }
  getTodayDate = (num) =>{
    var tempDate = new Date();
    var date = tempDate.getFullYear() + '-' ;
    if((tempDate.getMonth()+1 )< 10)
      date = date + '0' + (tempDate.getMonth()+1) + '-' ;
    else
      date = date + (tempDate.getMonth()+1) + '-' ;
    if((tempDate.getDate()+num) < 10)
      date = date + '0' + (tempDate.getDate()+num);
    else
      date = date + (tempDate.getDate()+num);
    return date;
  }
  render() {
    const { userInfo} = this.props;

    const{ 
      testList,
      test,
      date,
      centreList,
      recieved
    } = this.state;
    
    const values = {
      userInfo,
      test,
      date
    };
    const data = {
      userInfo,
      centreList
    }
    return (
      <div>
      {this.state.onOpen==true ? this.retrieveTests(userInfo) : null}
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
                    <TextField
                      onChange={this.handleChange("date")}
                      type="date"
                      placeholder="password"
                      inputProps={{
                        min: this.getTodayDate(1),
                        max: this.getTodayDate(7)
                      }}
                    />
                  </div>
                </div>
        </Bounce>
        <div className="bkap-btn">
          <button className="bkap-btn"
            className="btn btn-success my-5"
            type="button"
            onClick={() => this.proceed(values)}
            disabled={!this.state.show}
          >
            Proceed
          </button>
        </div>
        {recieved && <Redirect to={{
                      pathname: "/selectionPage1", 
                      data: data
                     }} />}
      </div>
    );
  }
}

export default BookAnAppointment;
 