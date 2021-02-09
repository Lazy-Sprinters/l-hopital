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
    base64:0,
    access_key:0, 
    SearchFaulty:false,
    SearchSuccess:false,
    BufferValue:0,
    AccessLoad:false,
    SearchLoad:false,
    SearchText:false,
    EmptyDoc:false,
    BufferText:false,
    checkedId:[],
    deletebtn:false,
    assignAccess:true,
    assignAccess1:false,
    DeleteFaulty:false
  };

  initialize = () => {
    this.setState({SearchFaulty:false});
    this.setState({DeleteFaulty:false});
    this.setState({SearchSuccess:false});
    this.setState({AccessLoad:false});
    this.setState({SearchLoad:false});
    this.setState({SearchText:false});
    this.setState({EmptyDoc:false});
    this.setState({BufferText:false});
    this.setState({deletebtn:false});

  };

  handleChange = input => e => {
    this.setState({ [input]: parseInt(e.target.value) });
  };

  handleDeleteFaulty = () =>{
    this.initialize();
    this.setState({ DeleteFaulty: true });
  };

  handleDelete = () => {

  };

  handleBuffer = (value) =>{
    this.initialize();
    this.setState({ BufferValue : value });
    this.setState({BufferText: true});
    if(value.length==0){
      this.handleEmpty();
    }
  };
  handleEmpty = () =>{
    this.initialize();
    this.setState({ EmptyDoc: true });
  };

  handleSearchFaulty = () =>{
    this.initialize();
    this.setState({ SearchFaulty: true });
  };

  handleSearch = (data) => {
    this.initialize();
    this.setState({ AccessLoad: false });
    this.setState({ SearchLoad: true });
    this.setState({ SearchText: true });
    // console.log("1");

    Axios.post("http://localhost:5000/users/me/alldata",data)
         .then((res) => {
           res.status == 200 ? this.handleBuffer(res.data) : this.handleEmpty();
         })
         .catch((err) => {
           console.log("Axios", err);
           this.handleSearchFaulty()
         });  
  };


  handlePermission = data => {
    this.initialize();
    this.setState({ AccessLoad: true });
    // console.log("2");

    Axios.post("http://localhost:5000/users/me/check1", data)
         .then((res) => {

           res.status == 200 ? this.handleSearch(data) : this.handleSearchFaulty();
         })
         .catch((err) => {
           console.log("Axios", err);
           this.handleSearchFaulty();
         });
    this.setState({assignAccess1 : false})

  };

  handleEnter = (data) => (e) => {
    if(e.key === 'Enter'){
      this.handlePermission(data);
    }
  };

  handleDelete = (data) =>{
    // console.log(data);
     Axios.post("http://localhost:5000/users/me/deletesome", data)
              .then((res) => {
     
                res.status == 200 ? this.handlePermission(data) : this.handleDeleteFaulty();
              })
              .catch((err) => {
                console.log("Axios", err);
                this.handleDeleteFaulty();
              });
      this.setState({checkedId : []});
  };

  handleCheck = (data) => (e) =>{
    const extra = this.state.checkedId;
    let index;
    if (e.target.checked) {
      extra.push(data);
    } else {
      index = extra.indexOf(data);
      extra.splice(index, 1);
    }
     this.setState({ checkedId : extra });
     if(extra.length >0){
      this.setState({deletebtn : true});
     }
     else{
      this.setState({deletebtn : false});
     }
  };

  changeAccess = (values) => {
    this.setState({access_key : values.data.user.access_key});
    this.setState({assignAccess : false})
    this.setState({assignAccess1 : true})
  };

  display = (data) =>{
    return (
      <div className="doc-col" >

        <div className="doc-row">
          <div className="pres-col">
            <div className="view-head">
              CHECKBOX 
            </div>
          </div>
          <div className="pres-col">
            <div className="view-head">
              DATE 
            </div>
            <div className="view-head">
              <br />(yyyy-mm-dd) 
            </div>
          </div>
          <div className="pres-col">
            <div className="view-head">
              IMAGES
            </div>
          </div>
        </div>

        { data.map((value, i) => {
          return  (
                    <div className="doc-row">
                      <div className="pres-col">
                        <input 
                          type="checkbox" 
                          onChange={this.handleCheck(value._id)}
                        />
                      </div>
                      <div className="pres-col">
                        <div className="pres-date">
                        {value.date.toString()}
                        </div>
                      </div>
                      <div className="pres-col">
                        <div className="pres-img-wrapper">
                          <img className="pres-img" src={"data:image/jpg;base64,"+value.image_b64.toString()} />
                        </div>
                      </div>
                    </div>
                  )
        })}

        <br/>
        <br/>
      </div>
    )
  };

  render() {
    const {userInfo} = this.props;

  	const{ 
     	access_key,
    	base64,
      SearchFaulty,
      SearchSuccess,
      BufferValue,
      AccessLoad,
      SearchLoad,
      SearchText,
      EmptyDoc,
      BufferText,
      checkedId,
      deletebtn,
      assignAccess,
      assignAccess1,
      DeleteFaulty
    } = this.state;

    const values = { 
      access_key,
    	userInfo,
      checkedId
    };

		return (
		  <div>
        <br/> <br/> <br/>
          {assignAccess && this.changeAccess(userInfo)}
          {assignAccess1 && this.handlePermission(values)}
           
        {BufferText && 
          <div className="dlt-btn">
            <Button
              color="primary"
              variant="contained"
              onClick={() => this.handleDelete(values)}
              disabled= {!deletebtn}
            >
              Delete
            </Button>
          </div>
        }
		    <br /> <br />
        {SearchFaulty && (
          <div className="err-msg"> <h2> The access key is invalid or an error
          occured. Please try again. </h2> </div>
        )}
        {DeleteFaulty && (
          <div className="err-msg"> <h2> An error
          occured while deleting. Please try again. </h2> </div>
        )}
        {SearchText && (
          <div className="err-msg"> <h2> Searching..... </h2> </div>
        )}
        {EmptyDoc && (
          <div className="err-msg"> There are no documents<h2> </h2> </div>
        )}
		    <br />
        <br />
        {(AccessLoad || SearchLoad) && <LinearProgress />}
        {BufferText && (
          <div>
            
          </div>
          )}
        {BufferText && this.display(BufferValue)}
        
		  </div>

		);
  }
}

export default Login;
