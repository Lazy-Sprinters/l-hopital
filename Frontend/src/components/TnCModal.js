import {Button,Modal} from 'react-bootstrap';

function TnCModal(props) {
  return (
    <Modal
      show={props.show} 
      onHide={props.onHide}
      backdrop="static"
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title >
          Terms & Conditions
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Read The Terms And Conditions Carefully</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
          ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
           in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
           sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
           mollit anim id est laborum.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>
            Decline
          </Button>
          <Button variant="success" onClick={props.onAgree}>
            Agree
          </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default TnCModal;