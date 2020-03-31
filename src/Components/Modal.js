import React from 'react';
import FocusTrap from 'focus-trap-react';
import ReactDOM from 'react-dom';
import './styles/Modal.scss';
import Button from 'react-bootstrap/Button';

const Modal = ({ onRedirectStats, showModal, point, onRedirectHome }) => {
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

	return ReactDOM.createPortal(
		<FocusTrap active={showModal}>
			<div className="modal">
				<div className="modal__box">
					<div
						role="dialog"
						aria-labelledby="dialogTitle"
						aria-describedby="dialogDesc"
						className="modal__headline"
					>
						<h5 id="dialogTitle"> {message} </h5>
					</div>

					<p id="dialogDesc">Your have {point}/10 questions correct!</p>

					<div className="modal__button-ctn">
						{/* <button
							aria-label="return home"
							onClick={onRedirectHome}
							className="modal__button modal__buttons--blue"
						>
							Home
						</button> */}

						<button
							aria-label="return home"
							onClick={onRedirectHome}
							className="modal__button modal__buttons--blue"
						>
							Home
						</button>
						<button aria-label="view stats" onClick={onRedirectStats} className="modal__button">
							Stats
						</button>
					</div>
				</div>
			</div>
		</FocusTrap>,
		document.body
	);
};

export default Modal;
