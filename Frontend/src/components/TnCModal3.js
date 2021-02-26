import React from 'react';
import Axios from "axios";
import {Button,Modal} from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';
import {Typography,Box,TextField} from '@material-ui/core';

function TnCModal3(props) {
  const [reason, setReason] = React.useState("");
  const [errmsg, setErrmsg] = React.useState("");
  const handlePost = (appInfo,centerInfo,reason) =>{

    const data = {appInfo,centerInfo,reason};
    console.log(data);
    Axios.post("http://localhost:5000/center/sendcancelmail", data)
    .then((res) => {
      props.onAgree();
      window.location.reload();
    })
    .catch((err) => {
      if(err.response.status==400){
          setErrmsg(err.response.data);
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
                  placeholder="Enter Reason"
                  label="Reason"
                  variant="outlined"
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  type="text"
                  fullWidth
          />
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>
            Cancel the process
          </Button>
          <Button variant="success" onClick={() => handlePost(props.appInfo,props.centerInfo,reason)}>
            Confirm the cancellation
          </Button>
          <br/>
          <h2>{errmsg}</h2>
      </Modal.Footer>
    </Modal>
  );
}
export default TnCModal3;