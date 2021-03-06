import React from 'react';
import FocusTrap from 'focus-trap-react';
import ReactDOM from 'react-dom';
import './styles/Modal.scss';
import Button from 'react-bootstrap/Button';

const Modal = ({ onRedirectHome, onRedirectStats, onRestart, point, showModal, type, resetStats, onClose }) => {
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
						{type === 'result' ? (
							<h5 tabIndex={0} id="dialogTitle" className="modal__text">
								{' '}
								{message}
							</h5>
						) : (
							<h5 tabIndex={0} id="dialogTitle" className="modal__text-warning">
								Warning
							</h5>
						)}
					</div>

					{type === 'result' ? (
						<p id="dialogDesc">
							You have <span>{point}</span> / 10 questions correct!
						</p>
					) : (
						<p id="dialogDesc">Are you sure to reset stats to zero?</p>
					)}

					{type === 'result' ? (
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
					) : (
						<div className="modal__button-ctn">
							<Button className="modal__button modal__button-reset" onClick={resetStats}>
								Reset
							</Button>
							<Button className="modal__button modal__button-close" onClick={onClose}>
								No
							</Button>
						</div>
					)}
				</div>
			</div>
		</FocusTrap>,
		document.body
	);
};

export default Modal;
