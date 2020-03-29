import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {Redirect} from "react-router-dom";
import FocusTrap from "focus-trap-react";
// import main from "./main";
import './styles/Main.scss';
import { BookIcon, MusicIcon, GameIcon, MovieIcon } from './ImgIcon.jsx';
import axios from 'axios';

const Main = ({isOpen}) => {
	const [ catagories, setCatagory ] = useState([
		{ type: 'Books', id: 1, catagoryNum: 10 },
		{ type: 'Music', id: 2, catagoryNum: 12 },
		{ type: 'Video games', id: 3, catagoryNum: 15 },
		{ type: 'Film', id: 4, catagoryNum: 11 }
	]);
	const [ choice, setChoice ] = useState(null);
	const [ redirectToQuiz, setRedirectToQuiz ] = useState(false);
	const [ message, setMessage ] = useState('');
	 
	const chooseCatagory =(cat)=>{
		console.log(cat)
		setChoice(cat)
	}
	const startQuiz = (e) => {

		console.log(e.target)
		if (choice !== null) {
			setRedirectToQuiz(true);
		} else {
			setRedirectToQuiz(false);
			setMessage('Please select the catagory');
		}
	};
   
	if(redirectToQuiz){
		return <Redirect to={{
            pathname: '/quiz',
            state: { catagory: choice }
        }}/>
	}


	return (
        <FocusTrap active={!isOpen} >
		<div className="main">
			<Helmet>
				<title>Main</title>
			</Helmet>
			<div className="main__card-group">
				{catagories.map((cat) => {
					return (
						<div
							onClick={() => chooseCatagory(cat.catagoryNum)}
							key={cat.type}
							id="cat.type"
							className="main__card"
						>
							<div className="main__card-head">
								{cat.type === 'Books' ? (
									<BookIcon size={150} className="main__card-img" />
								) : cat.type === 'Music' ? (
									<MusicIcon size={150} className="main__card-img" />
								) : cat.type === 'Video games' ? (
									<GameIcon size={150} className="main__card-img" />
								) : (
									<MovieIcon size={150} className="main__card-img" />
								)}
							</div>
							<div className="main__card-title">{cat.type}</div>
						</div>
					);
				})}
			</div>
			{message !== '' && <span role="alert">{message}</span>}
			<button onClick={startQuiz}>Start</button>
			{/* <main catagories={catagories}/> */}
		</div>
		</FocusTrap>
	);
};

export default Main;
