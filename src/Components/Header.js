import React from 'react';
import './styles/Header.scss';
import { MdMenu } from 'react-icons/md';
// import FocusTrap from "focus-trap-react";

const Header = ({ onClick, isOpen }) => {
	return (
		<header className="header">
			<div>
				<button aria-label="Open menu" onClick={onClick} className="header__button">
					<MdMenu className="header__icon--Menu" />
				</button>
			</div>
		</header>
	);
};

export default Header;
