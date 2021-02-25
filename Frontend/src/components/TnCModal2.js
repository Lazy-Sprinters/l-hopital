import React from 'react';
import Axios from "axios";
import {Button,Modal} from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';
import {Typography,Box,TextField} from '@material-ui/core';

function TnCModal(props) {
  const [otp, setOtp] = React.useState("");
  const [idnum, setIdnum] = React.useState("");
  const handlePost = (userid,appid,centerInfo,otp,idnum) =>{

    const data = {userid,appid,centerInfo,otp,idnum};
    Axios.post("http://localhost:5000/center/userverify", data)
    .then((res) => {
      props.onAgree()
      window.location.reload();
    })
    .catch((err) => {
      if(err.response.status==400){
          this.handleVerfiyErr(err.response.data);
      }
    });
  };
  return (
    <Modal
      show={props.show} 
      onHide={props.onHide}
      backdrop="static"
      dialogClassName="modal-60w"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title >
          {props.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{props.head}</h4>
        <p>
          {props.text}
          <TextField
                  placeholder="Enter your Suggestions/Comment"
                  label="Review"
                  variant="outlined"
                  value={otp}
                  onChange={e => setReview(e.target.value)}
                  type="text"
                  fullWidth
          />
          <br />
          <br />
          <TextField
                  placeholder="Enter your Suggestions/Comment"
                  label="Review"
                  variant="outlined"
                  value={idnum}
                  onChange={e => setIdnum(e.target.value)}
                  type="text"
                  fullWidth
          />
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>
            Cancel
          </Button>
          <Button variant="success" onClick={() => handlePost(props.userid,props.appid,centerInfo,otp,idnum)}>
            Verify
          </Button>
          <br/>
          <h2>{errmsg}</h2>
      </Modal.Footer>
    </Modal>
  );
}
export default TnCModal;