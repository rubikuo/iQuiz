import React from 'react';
import FocusTrap from 'focus-trap-react';
import ReactDOM from 'react-dom';
import './styles/Modal.scss';
import Button from 'react-bootstrap/Button';

const Modal = ({ onRedirectHome, onRedirectStats, onRestart, point, showModal }) => {
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
						aria-hidden={!showModal}
						className="modal__headline"
					>
						<h5 tabIndex={0} id="dialogTitle">
							{' '}
							{message}{' '}
						</h5>
					</div>

					<p id="dialogDesc">
						You have <span>{point}</span> / 10 questions correct!
					</p>

					<div className="modal__button-ctn">
						<Button
							aria-label="restart the game"
							className="modal__button modal__button-restart"
							onClick={onRestart}
						>
							Restart
						</Button>

						<Button
							aria-label="return homepage"
							className="modal__button modal__button-home"
							onClick={onRedirectHome}
						>
							Home
						</Button>
						<Button
							aria-label="view stats"
							className="modal__button modal__button-stats"
							onClick={onRedirectStats}
						>
							View Stats
						</Button>
					</div>
				</div>
			</div>
		</FocusTrap>,
		document.body
	);
};

export default Modal;
