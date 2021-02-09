import React, { Component } from "react";
import "../App.css";
import Navbar from "./navbar";
import Footer from "./Footer";
import LoginHome from "./LoginHome";
import validateInfo from "./loginError";
import Axios from "axios";
import { Link } from 'react-router-dom';
import "./Login.css";
import { TextField, LinearProgress,Button } from "@material-ui/core";

export class Login extends Component {

	state = {
    date:0,
    image:0,
    base64:0,
    UploadFaulty:false,
   	UploadSucess:false
  };

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  handleImage = input => e => {
  	// console.log(e.target.files[0]);
    this.setState({ [input]: e.target.files[0].type });
  	const reader=new FileReader();
  	reader.onload=this.handleBase64.bind(this);
  	reader.readAsBinaryString(e.target.files[0]);

  };

  handleBase64 = (e) =>{
  	let binaryString = e.target.result;
    this.setState({ base64: btoa(binaryString) });
    // console.log(btoa(binaryString));
  };

  handleUploadSucess = () =>{
    this.setState({ UploadFaulty: false });
    this.setState({ UploadSucess: true });
  };

  handleUploadFaulty = () =>{
    this.setState({ UploadSucess: false });
    this.setState({ UploadFaulty: true });
  };

  handleUpload = data => {
  	console.log(data);
  	 Axios.post("http://localhost:5000/users/me/upload", data)
    .then((res) => {
      res.status == 201 ? this.handleUploadSucess() : this.handleUploadFaulty();
    })
    .catch((err) => {
      console.log("Axios", err);
      this.handleUploadFaulty()
    });
  };

  render() {
    const {userInfo} = this.props;

  	const{ 
     	date,
    	image,
    	base64,
    	UploadFaulty,
   		UploadSucess
    } = this.state;

    const values = { 
      date,
    	image,
    	base64,
    	userInfo
    };
		return (
		  <div>
      <br/>
      <br/>
		  	<div className="txtfld1">
		    <TextField
		    	placeholder="Enter the Nearest approximate date"
          variant="outlined"
          onChange={this.handleChange('date')}
          type="date"
          fullWidth
		    />
		    <br />
        <br />
        </div>
        <div className="txtfld1">
		    <TextField
		    	placeholder="Upload the image of the prescription "
          variant="outlined"
          onChange={this.handleImage('image')}
          type="file"
          fullWidth
		    />
		    </div>
		    <br />
		    <br />
		    <div className="upld-btn">
            <Button
              color="primary"
              variant="contained"
              onClick={() => this.handleUpload(values)}
            >
              Upload
            </Button>
        </div>
		    <br />
		    <br />
        {UploadFaulty && (
          <div className="err-msg">
            <h2>
              The selected file is of wrong format. The file upload has been failed. Please try again.
            </h2>
          </div>
        )}
        {UploadSucess && (
          <div className="err-msg">
            <h2>
              The file has been uploaded succesfully.
            </h2>
          </div>
        )}
		    <br />
		    <br />

		  </div>
		);
  }
}

export default Login;
