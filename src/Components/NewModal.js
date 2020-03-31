import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';

const newModal = ({onRedirectHome, onRedirectStats, onRestart, point, show})=>{
    let message;
	if (point === 0) {
		message = 'Ooops..';
	} else if (point >= 1 && point <= 3) {
		message = 'Oh no...';
	} else if (point >= 4 && point <= 6) {
		message = 'Not bad!';
	} else if (point >= 7 && point <= 9) {
		message = 'Good job!';
	} else {
		message = 'You Rock!';
    }
    
    return (
        <Modal
          show={show}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Result
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4> {message} </h4>
            <p>
            Your have {point}/10 questions correct!
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onRestart}>Restart</Button>
            <Button onClick={onRedirectHome}>Home</Button>
            <Button onClick={onRedirectStats}>View Stats</Button>
          </Modal.Footer>
        </Modal>
      );
    }


export default newModal;