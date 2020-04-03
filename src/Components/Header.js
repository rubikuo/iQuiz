import React from 'react';
import './styles/Header.scss';
import { MdMenu } from 'react-icons/md';

const Header = ({ onClick }) => {
	return (
		<header className="header">
			<button aria-label="menu" onClick={onClick} className="header__button-menu">
				<MdMenu className="header__icon--Menu" />
			</button>
		</header>
	);
};

const MemoHeader = React.memo(Header);

export default MemoHeader;
