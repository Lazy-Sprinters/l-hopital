import React, { Component } from 'react';
import { ThemeProvider as MuiThemeProvider  } from '@material-ui/core/styles';
import validateInfo from './error.js';
import { Link,Redirect } from 'react-router-dom';
import Axios from "axios";
import TnCModal from "./TnCModal";
import {
  TextField,
  Button,
  Container,
  LinearProgress,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Checkbox,
  FormGroup,
  FormHelperText,
  Select
} from "@material-ui/core";
import './RegisterForm.css'
import * as actionTypes from './store/actions'
import {connect} from 'react-redux'
import Table from 'react-bootstrap/Table'

export class RegisterForm extends Component {

  state = {
    step:0,
    Name:"0",
    PhoneNo:"0",
    Email:"0",
    Password:"0",
    NearestLandmark:"0",
    City:"0",
    Pincode:"0",
    State:"0",
    Country:"0",
    OpeningTime:"0",
    ClosingTime:"0",
    FrontImage:"0",
    FrontImageType:"0",
    LicenseNum:"0",
    isLoading:false,
    isLoaded:false,
    isRegistered:false,
    isFaulty:false,
    indicate:false,
    radioControl:"0",
    ModalShow:false,
    centerInfo:"",
    Monday:false,
    Tuesday:false,
    Wednesday:false,
    Thursday:false,
    Friday:false,
    Saturday:false,
    Sunday:false,
    facilities:[],
    FacilityName:"",
    CapacityperSlot:"",
    Price:"",
    facilityShow:"",
    dropdown:["Diabetes","Thyroid","Thypoid","CT Scan","MRI","Thermal Scan","COVID-19"]

  };

  handleLoad = () =>  {

    this.setState({ ['isLoading']: true });
    this.setState({ ['isFaulty']: false });

  };

  handleRegister = (data) =>  {
    this.setState({ ['isRegistered']: true });
    this.setState({ ['isLoading']: false });
    this.setState({ ['isLoaded']: true });
    // this.setState({centerInfo : data});
    this.props.onChangeUserInfo(data);
    this.props.onChangeCheck(0);
    setTimeout(
      () => this.setState({['indicate']:true}), 3000
    );
    
  };
  
  handleModal = (x) => {
    this.setState({ModalShow:x})
  };
  handleFaulty = () =>  {
    this.setState({ ['isFaulty']: true });
    this.setState({ ['isLoading']: false });

  };

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };
  handleAddAnother = (FacilityName,CapacityperSlot,Price,facilities) =>{
    const Facility = {FacilityName,CapacityperSlot,Price};
    const PseudoFacilities=[];
    console.log(facilities.length)
    if(facilities.length>0){
      facilities.map(value => PseudoFacilities.push(value));
    }
    PseudoFacilities.push(Facility);
    this.setState({FacilityName:""})
    this.setState({CapacityperSlot:""})
    this.setState({Price:""})
    this.setState({facilities:PseudoFacilities});
    var code=[];
        code.push(<Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Facility Name</th>
                      <th>Capacity per Slot</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PseudoFacilities.map((value,i) => (
                    <tr>
                      <td>{i+1}</td>
                      <td>{value.FacilityName}</td>
                      <td>{value.CapacityperSlot}</td>
                      <td>{value.Price}</td>
                    </tr>
                    ))}
                  </tbody>
                </Table>
      )
        this.setState({facilityShow:code})
    };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  register = (data) =>{
    this.handleModal(false);
    this.handleLoad();
    // this.handleRegister();
    console.log(data);
    Axios.post("http://localhost:5000/user/signup1", data)
    .then((res) => {
      // console.log("Hey this is your result", res);
      res.status==201 ? this.handleRegister(res) : this.handleFaulty();

    })
    .catch((err) => {
      console.log("Axios", err);
      this.handleFaulty();
    });
  };
  handleImage = input => e => {
    // console.log(e.target.files[0]);
    this.setState({ FrontImageType: e.target.files[0].type });
    const reader=new FileReader();
    reader.onload=this.handleBase64.bind(this);
    reader.readAsBinaryString(e.target.files[0]);

  };

  handleBase64 = (e) =>{
    let binaryString = e.target.result;
    this.setState({ FrontImage: btoa(binaryString) });
    // console.log(btoa(binaryString));
  };
  handleOffdays = x => e =>{
    console.log(x)
    console.log(e.target.checked)
    this.setState({ [x]:e.target.checked })
  };
  dropdownShow = (data) => {
    return(
      <>
      <Select displayEmpty onChange={this.handleChange('FacilityName')} style={{margin:'20px',minWidth:'120px'}} variant="outlined">
        <MenuItem value="" disabled><em>None</em></MenuItem>
        {data!=undefined && data.map((value,i) => {
          return(
              <MenuItem value={value}>{value}</MenuItem >
            )
        })}
      </Select>
      </>
      )
  }
  render() {
     const{ 
      step,
      Name,
      PhoneNo,
      Email,
      Password,
      NearestLandmark,
      City,
      Pincode,
      State,
      Country,
      OpeningTime,
      ClosingTime,
      FrontImage,
      FrontImageType,
      LicenseNum,
      isLoading,
      isLoaded,
      isRegistered,
      isFaulty,
      indicate,
      radioControl,
      ModalShow,
      centerInfo,
      Monday,
      Tuesday,
      Wednesday,
      Thursday,
      Friday,
      Saturday,
      Sunday,
      facilities,
      FacilityName,
      CapacityperSlot,
      Price,
      facilityShow,
      dropdown
    } = this.state;
    const offdays ={
      Monday,
      Tuesday,
      Wednesday,
      Thursday,
      Friday,
      Saturday,
      Sunday
    };
    const values = { 
      Name,
      PhoneNo,
      Email,
      Password,
      NearestLandmark,
      City,
      Pincode,
      State,
      Country,
      OpeningTime,
      ClosingTime,
      FrontImage,
      FrontImageType,
      LicenseNum,
      offdays,
      facilities
    };
    
    const data = { 
      centerInfo,
    };

    // const  errors = validateInfo(values);
    switch (step) {
      case 0:
        return(
        <> 
        <div  className="form_input">
            <div className="terms"> 
              <br/> 
              <h1>Center Registration Form</h1>
              <br />
              <br />
              <div className="reg-row">
                <div className="reg-col">
                  <div className="reg-img">
                    <img src="/images/register.gif" />  
                  </div>
                </div>
                <div className="reg-col">
                  <div className="txtfld">
                  <TextField
                    placeholder="Enter Your Name"
                    label="Name"
                    variant="outlined"
                    value={Name}
                    onChange={this.handleChange('Name')}
                    type="text"
                    fullWidth
                  />
                  <br />
                  <br />

                  </div>
                  <div className="txtfld">
                  <TextField
                    placeholder="Enter your Phone Number"
                    label="Phone Number"
                    value={PhoneNo}
                    variant="outlined"
                    onChange={this.handleChange('PhoneNo')}
                    type="number" inputProps={{ min:1000000000, max: 9999999999, step: 1}}
                    // helperText={(! errors.PhoneNo  && parseInt(values.PhoneNo)) ? "Not a valid Phone Number": '' }
                    // error={(! errors.PhoneNo && parseInt(values.PhoneNo))} 
                    margin="normal"
                    fullWidth
                  />
                  <br />
                  <br />
                  </div>
                  <div className="txtfld">
                  <TextField
                    placeholder="Enter you Email address"
                    label="Email address"
                    value={Email}
                    variant="outlined"
                    onChange={this.handleChange('Email')}
                    type="text"
                    margin="normal"
                    fullWidth
                  />
                  <br />
                  </div>
                  <div className="txtfld">
                  <TextField
                    placeholder="Enter your Password"
                    label="Password"
                    variant="outlined"
                    onChange={this.handleChange('Password')}
                    // helperText={(! errors.Password && parseInt(values.Password)) ? "The Password should be at least 8 characters long": '' }
                    // error={(! errors.Password && parseInt(values.Password))} 
                    type="password"
                    margin="normal"
                    fullWidth
                  />
                  <br />
                  </div>
                  <div className="txtfld">
                  <TextField
                    placeholder="Enter your Opening Time"
                    label="Opening Time"
                    value={OpeningTime}
                    variant="outlined"
                    onChange={this.handleChange('OpeningTime')}
                    type="time"
                    margin="normal"
                    fullWidth
                  />
                  <br />
                  </div>
                  <div className="txtfld">
                  <TextField
                    placeholder="Enter your Closing Time"
                    label="Closing Time"
                    value={ClosingTime}
                    variant="outlined"
                    onChange={this.handleChange('ClosingTime')}
                    type="time"
                    margin="normal"
                    fullWidth
                  />
                  <br />
                  </div>
                  <div className="txtfld">
                  <TextField
                    placeholder="Enter you Nearest Landmark"
                    label="Nearest Landmark"
                    variant="outlined"
                    onChange={this.handleChange('NearestLandmark')}
                    type="text"
                    margin="normal"
                    fullWidth
                  />
                  <br />
                  </div>
                  <div className="txtfld">
                  <TextField
                    placeholder="Enter you City"
                    label="City"
                    variant="outlined"
                    onChange={this.handleChange('City')}
                    type="text"
                    margin="normal"
                    fullWidth
                  />
                  <br />
                  </div>
                  <div className="txtfld">
                  <TextField
                    placeholder="Enter you Pincode"
                    value={Pincode}
                    label="Pincode"
                    variant="outlined"
                    onChange={this.handleChange('Pincode')}
                    type="text"
                    margin="normal"
                    fullWidth
                  />
                  <br />
                  </div>
                  <div className="txtfld">
                  <TextField
                    placeholder="Enter you State"
                    label="State"
                    value={State}
                    variant="outlined"
                    onChange={this.handleChange('State')}
                    type="text"
                    margin="normal"
                    fullWidth
                  />
                  <br />
                  </div>
                  <div className="txtfld">
                  <TextField
                    placeholder="Enter you Country"
                    value={Country}
                    label="Country"
                    variant="outlined"
                    onChange={this.handleChange('Country')}
                    type="text"
                    margin="normal"
                    fullWidth
                  />
                  <br />
                  </div>
                  <div className="txtfld">
                  <TextField
                    placeholder="Upload the Image of the Center "
                    variant="outlined"
                    onChange={this.handleImage('FrontImage')}
                    type="file"
                    fullWidth
                  />
                  </div>
                  
                  <div className="txtfld">
                  <TextField
                    placeholder="Enter you License Number"
                    value={LicenseNum}
                    label="License Number"
                    variant="outlined"
                    onChange={this.handleChange('LicenseNum')}
                    type="number"
                    margin="normal"
                    fullWidth
                  />
                  <br />
                  </div>
                  <div className='txtfld'>
                  <FormLabel component="legend">Offdays</FormLabel>
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                      value="Monday"
                      control={<Checkbox color="primary" onChange={this.handleOffdays('Monday')} checked={Monday}/>}
                      label="Monday"
                      labelPlacement="bottom"
                    />
                    <FormControlLabel
                      value="Tuesday"
                      control={<Checkbox color="primary" onChange={this.handleOffdays('Tuesday')} checked={Tuesday}/>}
                      label="Tuesday"
                      labelPlacement="bottom"
                    />
                    <FormControlLabel
                      value="Wednesday"
                      control={<Checkbox color="primary" onChange={this.handleOffdays('Wednesday')} checked={Wednesday}/>}
                      label="Wednesday"
                      labelPlacement="bottom"
                    />
                    <FormControlLabel
                      value="Thursday"
                      control={<Checkbox color="primary" onChange={this.handleOffdays('Thursday')} checked={Thursday}/>}
                      label="Thursday"
                      labelPlacement="bottom"
                    />
                    <FormControlLabel
                      value="Friday"
                      control={<Checkbox color="primary" onChange={this.handleOffdays('Friday')} checked={Friday}/>}
                      label="Friday"
                      labelPlacement="bottom"
                    />
                    <FormControlLabel
                      value="Saturday"
                      control={<Checkbox color="primary" onChange={this.handleOffdays('Saturday')} checked={Saturday}/>}
                      label="Saturday"
                      labelPlacement="bottom"
                    />
                    <FormControlLabel
                      value="Sunday"
                      control={<Checkbox color="primary" onChange={this.handleOffdays('Sunday')} checked={Sunday}/>}
                      label="Sunday"
                      labelPlacement="bottom"
                    />
                  </FormGroup>
                  </div>
                  <div className="btn1">
                    {!isLoading && !isLoaded && <Button
                        color="primary"
                        variant="contained"
                      
                        onClick={() => this.nextStep()}
                      >
                        Proceed
                      </Button>}
                  </div>
                  
                  <br/>
                  <br/>
                  {isFaulty && <h2>All fields are not filled or there is an error in your input</h2>}
                  <br/>
                  <div className="no-chng">
                    {isLoading && <LinearProgress />}                
                  {isRegistered && isLoaded && <h1>You have Registered Successfully.Redirecting to Verification page.</h1>}
                  {!isRegistered && isLoaded && <h1>The information provided is invalid. Please try again.</h1>}
                  <br />
                  {indicate && <Redirect to={{
                        pathname: "/centerVerify", 
                        // data: data
                       }} />}
                  </div>
                  <br />
                  <br />
                  <br />
                  <br />
                </div>

              </div>

            </div>
          </div>
        </>
        );
      case 1:
        return(
        <>
          <TnCModal
            size="lg"
            name="Terms & Conditions"
            head="Read The Terms And Conditions Carefully"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
                        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                         in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
                         sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
                         mollit anim id est laborum."
            show={ModalShow}
            onHide={() => this.handleModal(false)}
            onAgree={() => this.register(values)}
          />
          <div  className="form_input">
            <div className="terms"> 
              <br/> 
              <h1>Add Facility</h1>
              <br />
              <br />
              <br /><br />
                {facilityShow}
                <br /><br /><br />
              <div className="reg-row">
                <div className="reg-col">
                  <div className="reg-img">
                    <img src="/images/register.gif" />  
                  </div>
                </div>

                <div className="reg-col">
                  <div className="txtfld">
                    <label htmlFor="username">Facility Name</label>
                    {this.dropdownShow(dropdown)}
                  </div>
                  
                  <div className="txtfld">
                  <TextField
                    placeholder="Enter the Capacity per Slot"
                    label="Capacity per Slot"
                    variant="outlined"
                    value={CapacityperSlot}
                    onChange={this.handleChange('CapacityperSlot')}
                    type="number" 
                    margin="normal"
                    fullWidth
                  />
                  <br />
                  <br />
                  </div>
                  <div className="txtfld">
                  <TextField
                    placeholder="Enter the Price"
                    label="Price"
                    variant="outlined"
                    value={Price}
                    onChange={this.handleChange('Price')}
                    type="currency"
                    margin="normal"
                    fullWidth
                  />
                  <br />
                  </div>
                  <div className="btn2">
                  {!isLoading && !isLoaded && <Button
                        color="primary"
                        variant="contained"
                      
                        onClick={() => this.handleAddAnother(FacilityName,CapacityperSlot,Price,facilities)}
                      >
                        Add Another Facility
                      </Button>}
                  </div>
                  <br /><br /><br />
                  <div className="btn1">
                    {!isLoading && !isLoaded && <Button
                        color="primary"
                        variant="contained"
                      
                        onClick={() => this.handleModal(true)}
                      >
                        Proceed
                      </Button>}
                  </div>
                  <div className="btn2">
                    {!isLoading && !isLoaded && <Button
                        color="primary"
                        variant="contained"
                      
                        onClick={ () => this.prevStep()}
                      >
                        Back
                      </Button>}
                  </div>
                  <br/>
                  <br/>
                  {isFaulty && <h2>All fields are not filled or there is an error in your input</h2>}
                  <br/>
                  <div className="no-chng">
                    {isLoading && <LinearProgress />}                
                  {isRegistered && isLoaded && <h1>You have Registered Successfully.Redirecting to Verification page.</h1>}
                  {!isRegistered && isLoaded && <h1>The information provided is invalid. Please try again.</h1>}
                  <br />
                  {indicate && <Redirect to={{
                        pathname: "/centerVerify", 
                        // data: data
                       }} />}
                  </div>
                  <br />
                  <br />
                  <br />
                  <br />
                </div>

              </div>

            </div>
          </div>
        </>
        );
    }
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
    onChangeCheck: (check) => dispatch({type:actionTypes.CHANGE_CHECK , check:check})
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(RegisterForm);