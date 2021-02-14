import React from 'react';
import Bounce from 'react-reveal/Bounce';
import './RegisterForm.css'
import { TextField, LinearProgress,Select,MenuItem } from "@material-ui/core";
import Axios from "axios";

export class BookAnAppointment extends React.Component {
  state = {
    onOpen:true,
    testList:"0",
    test:"0",
    date:"0"
  };
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };
  retrieveTests = (data) =>{
    Axios.post("http://localhost:5000/user/login",data)
    // .then((res) => {
    //   this.handleLoginUser(res);
    //   // console.log(res);
    //   res.status == 200 ? this.setState([testList]:res.alloptions);
    // })
    // .catch((err) => {
    //   console.log("Axios", err);
    // });
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
    this.state = { show: false };
  }
  book() {
    this.setState({ show: true});
  }
  proceed() {
    this.setState({ show: false });
  }
  render() {
    const { userInfo} = this.props;

    const{ 
      onOpen,
      testList,
      test,
      date
    } = this.state;
    
    const values ={
      test,
      date
    };
    return (
      <div>
      {onOpen==true ? this.retrieveTests(userInfo) : null}
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
                      // onKeyPress={ this.handleEnter(values) }
                    />
                  </div>
                </div>
        </Bounce>
        {console.log(values)}
        <div className="bkap-btn">
          <button className="bkap-btn"
            className="btn btn-success my-5"
            type="button"
            onClick={() => this.proceed()}
          >
            Proceed
          </button>
        </div>
      </div>
    );
  }
}

export default BookAnAppointment;
 