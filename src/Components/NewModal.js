import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';

const newModal = ( props)=>{
    let message;
	if (props.point === 0) {
		message = 'Ooops..';
	} else if (props.point >= 1 && props.point <= 3) {
		message = 'Oh no...';
	} else if (props.point >= 4 && props.point <= 6) {
		message = 'Not bad!';
	} else if (props.point >= 7 && props.point <= 9) {
		message = 'Good job!';
	} else {
		message = 'You Rock!';
    }
    
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Result
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4> {message} </h4>
            <p>
            Your have {props.point}/10 questions correct!
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onRestart}>Restart</Button>
            <Button onClick={props.onRedirectHome}>Home</Button>
            <Button onClick={props.onRedirectStats}>View Stats</Button>
          </Modal.Footer>
        </Modal>
      );
    }


export default newModal;