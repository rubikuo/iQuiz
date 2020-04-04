import React, { useState} from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import './styles/Main.scss';
import Button from 'react-bootstrap/Button';
import book from "../materials/book.svg";
import movie from "../materials/movie.svg";
import videoGame from "../materials/videoGame.svg";
import music from "../materials/music.svg";

const Main = () => {
	const [ catagories ] = useState([
		{ type: 'Books', id: 1, catagoryNum: 10 },
		{ type: 'Music', id: 2, catagoryNum: 12 },
		{ type: 'Video Games', id: 3, catagoryNum: 15 },
		{ type: 'Film', id: 4, catagoryNum: 11 }
	]);

	const [ choice, setChoice ] = useState(null);
	const [ redirectToQuiz, setRedirectToQuiz ] = useState(false);
	const [ message, setMessage ] = useState('');
   
	const startQuiz = (e) => {
		console.log(choice);
		if (choice !== null) {
			setRedirectToQuiz(true);
		} else {
			setRedirectToQuiz(false);
			setMessage('Please select the catagory');
		}
	};

	const chooseCat = (catagory)=>{
		setChoice(catagory);
		setMessage("")
	}


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
		<>
		<main className="main">
			<Helmet>
				<title>iQuiz-Home</title>
			</Helmet>

			<div role="radiogroup" aria-label="Please choose catatgory"  tabIndex={0} className="main__radiobtn-group">
			
				{catagories.map((cat, i) => {
					return (
						<label htmlFor={cat.type + i} className="main__radiobtn" key={cat.type}>
							<input
							    
								type="radio"
								className="main__radiobtn-input"
								name="catagory"
								id={cat.type + i}
								value={cat.type}
								onChange={() => chooseCat(cat)}
								checked={cat === cat.catagoryNum}
							/>
								<div className="main__radiobtn--fake">
								{cat.type === 'Books' ? (
									<img  className="main__img" src={book} alt="book catagory"/>
								) : cat.type === 'Music' ? (
									<img  className=" main__img main__img-movie" src={music} alt="music catagory"/>
								
								) : cat.type === 'Video Games' ? (
									<img  className=" main__img main__img-movie" src={videoGame} alt="video game catagory"/>
								) : (
										<img  className=" main__img main__img-movie" src={movie} alt="movie catagory"/>
								)}
							</div>

							<p id={cat.type} className="main__radiobtn-option">
								{cat.type}
							</p>
						</label>
					);
				})}
			</div>
			
			<Button aria-label="Start Game" className="main__button-start" onClick={startQuiz}>
				Start
			</Button>
			{message !== '' && <span role="alert" aria-live="assertive" className="main__text-alert" >{message}</span>}
		</main>
	
		</>
	);
};

export default Main;
