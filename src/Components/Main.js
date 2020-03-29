import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import FocusTrap from 'focus-trap-react';
import './styles/Main.scss';
import { BookIcon, MusicIcon, GameIcon, MovieIcon } from './ImgIcon.jsx';

const Main = ({ isOpen }) => {
	const [ catagories, setCatagory ] = useState([
		{ type: 'Books', id: 1, catagoryNum: 10 },
		{ type: 'Music', id: 2, catagoryNum: 12 },
		{ type: 'Video games', id: 3, catagoryNum: 15 },
		{ type: 'Film', id: 4, catagoryNum: 11 }
	]);
	const [ choice, setChoice ] = useState(null);
	const [ redirectToQuiz, setRedirectToQuiz ] = useState(false);
	const [ message, setMessage ] = useState('');
	// const [ cat, setCat ] = useState(null);

	const startQuiz = (e) => {
		console.log(choice);
		if (choice !== null) {
			setRedirectToQuiz(true);
		} else {
			setRedirectToQuiz(false);
			setMessage('Please select the catagory');
		}
	};
	if (redirectToQuiz) {
		return (
			<Redirect
				to={{
					pathname: '/quiz',
					state: { catagory: choice }
				}}
			/>
		);
	}

	return (
		<FocusTrap active={!isOpen}>
			<div className="main">
				<Helmet>
					<title>Main</title>
				</Helmet>
				<div className="main__radiobtn-group">
					{catagories.map((cat) => {
						return (
							<label
								aria-labelledby={cat.type}
								htmlFor={cat.type}
								id={cat.id}
								className="main__radiobtn"
								key={cat.type}
							>
								<input
									type="radio"
									className="main__radiobtn-input"
									name={cat.type}
									id={cat.type}
									value={cat.type}
									onChange={() => setChoice(cat.catagoryNum)}
									checked={cat === cat.catagoryNum}
								/>
								<div className="main__radiobtn--fake">
									{cat.type === 'Books' ? (
										<BookIcon size={150} className="main__img" />
									) : cat.type === 'Music' ? (
										<MusicIcon size={150} className="main__img" />
									) : cat.type === 'Video games' ? (
										<GameIcon size={150} className="main__img" />
									) : (
										<MovieIcon size={150} className="main__img" />
									)}
								</div>

								<span className="main__radiobtn-option">{cat.type}</span>
							</label>
						);
					})}
				</div>
				{message !== '' && <span role="alert">{message}</span>}
				<button className="main__button-start" onClick={startQuiz}>
					Start
				</button>
			
			</div>
		</FocusTrap>
	);
};

export default Main;
