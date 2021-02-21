import {Button,Modal} from 'react-bootstrap';

function TnCModal(props) {
  return (
    <Modal
      show={props.show} 
      onHide={props.onHide}
      backdrop="static"
      size={props.size}
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
        </p>
      </Modal.Body>
      <Modal.Footer>
        {!props.btnshow && <Button variant="danger" onClick={props.onHide}>
                    Decline
                  </Button>}
          <Button variant="success" onClick={props.onAgree}>
            {!props.btntext ? "Agree" : "Continue"}
          </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default TnCModal;