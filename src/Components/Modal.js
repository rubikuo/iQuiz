import React from 'react';
import FocusTrap from 'focus-trap-react';
import ReactDOM from 'react-dom';
import "./styles/Modal.scss";



const Modal = ({onClose, showModal, point, onRedirectHome}) => {




	return ReactDOM.createPortal(
        <FocusTrap active={showModal} >
		<div className="modal">
			{/*same className for the modalContainer here and Create.js, same button classNames as well */}
			<div className="modal__box">
				<div className="modal__headline">
					
					<h5> Congratulations !</h5>
				</div>

				<p>
					Your have {point}/10 questions correct!
				</p>

				<div className="modal__button-ctn">
					<button
						onClick={onRedirectHome}
						className="modal__button modal__buttons--blue"
					>
						Restart
					</button>
					<button onClick={onClose} className="modal__button">
						Stats
					</button>
				</div>
			</div>
		</div>
        </FocusTrap>
        ,
		document.body
      
	);
  
};

export default Modal;
