import React from 'react';
import Axios from "axios";
import {Button,Modal} from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';
import {Typography,Box,TextField} from '@material-ui/core';

function TnCModal(props) {
  const [value, setValue] = React.useState(2);
  const [review, setReview] = React.useState("");
  const handlePost = (_id,rating,review) =>{
    const data = {_id,rating,review};
    console.log(data)
    // Axios.post("http://localhost:5000/user/signup1", data)
    // .then((res) => {
    //   // console.log("Hey this is your result", res);
    //   props.onAgree()
    // })
    // .catch((err) => {
    //   console.log("Axios", err);
    // });
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
                  onChange={(event, newValue) => {
                            setReview(newValue);
                          }}
                  type="text"
                  fullWidth
          />
          <br />
          <br />
          <Box component="fieldset" mb={3} borderColor="transparent">
            <Typography component="legend">Rating :</Typography>
            <Rating
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </Box>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>
            Cancel
          </Button>
          <Button variant="success" onClick={() => handlePost(props.id,value,review)}>
            Post
          </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default TnCModal;