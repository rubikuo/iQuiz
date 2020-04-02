import React from 'react';
import './styles/Header.scss';
import { MdMenu } from 'react-icons/md';


const Header = ({ onClick }) => {
	return (
		<header className="header">
			<div>
				<button aria-label="menu" onClick={onClick} className="header__button-menu">
					<MdMenu className="header__icon--Menu" />
				</button>
			</div>
		</header>
	);
};

const MemoHeader = React.memo(Header);

export default MemoHeader;
