import React, { useState, useEffect, useRef } from 'react';
import {
	playTimes$,
	updatePlayTimes,
	correctNum$,
	updateCorrectNum,
	inCorrectNum$,
	updateInCorrectNum,
	correctPercent$,
	updateCorrectPercent
} from './store.js'; // need to subscrib in useeffect otherwise pass from parent
import './styles/Stats.scss';
import Button from 'react-bootstrap/Button';
import 'react-circular-progressbar/dist/styles.css';
import CircularProgress from './CircularProgress';
import { Helmet } from 'react-helmet';
import Modal from "./Modal";

const Stats = () => {
	const [ playTimes, setPlayTimes ] = useState(playTimes$.value);
	const [ correctNum, setCorrectNum ] = useState(correctNum$.value);
	const [ inCorrectNum, setInCorrectNum ] = useState(inCorrectNum$.value);
	const [ correctPercent, setCorrectPercent ] = useState(correctPercent$.value);
	const [ statsType ] = useState([ 'Play Times', 'Corrects', 'Incorrects' ]);
	const [ showModal, setShowModal ] = useState(false);

	const showWarning = (e) =>{
		setShowModal(true)
		e.target.blur();
	     focusOnHome();

	}
	
	const resetStats = () => {
		updatePlayTimes(null); 
		updateCorrectNum(null);
		updateInCorrectNum(null);
		updateCorrectPercent(null);
		setShowModal(false)
		focusOnHome();
	};

	const closeModal = () =>{
	
		setShowModal(false);
		focusOnHome();
	}

	useEffect(() => {
		const subscriptions = [
			playTimes$.subscribe((times) => {
				setPlayTimes(times);
			}),
			correctNum$.subscribe((num) => {
				setCorrectNum(num);
			}),
			inCorrectNum$.subscribe((num) => {
				setInCorrectNum(num);
			}),
			correctPercent$.subscribe((num) => {
				setCorrectPercent(num);
			})
		];

		return () => subscriptions.forEach((x) => x.unsubscribe());
	}, []);

	const homeRef = useRef();
	
	const focusOnHome = () =>{
		homeRef.current.focus();
	}




	

	return (
		<main className="stats">
			<Helmet>
				<title>iQuiz-Stats</title>
			</Helmet>
			<section className="stats__section">
				<div className="stats__section-wrap">
					{statsType.map((type) => {
						let progressValue =
							type === 'Play Times'
								? playTimes === null ? 0 : playTimes
								: type === 'Corrects'
									? correctNum === null ? 0 : correctNum
									: type === 'Incorrects'
										? inCorrectNum === null ? 0 : inCorrectNum
										: correctPercent === null ? 0 : correctPercent;
						return (
							<div key={type} className="stats__section-ctn" tabIndex={0}>
								<p className="stats__section--text">
									<strong>{progressValue}</strong> {type === 'correctRate' && <span>%</span>}
								</p>
								<p className="stats__section--text-sub">{type}</p>
							</div>
						);
					})}
				</div>
				<div className="stats__progress">
					<CircularProgress
						type="Correct Rate"
						correctPercent={correctPercent}
						playTimes={playTimes}
						correctNum={correctNum}
						inCorrectNum={inCorrectNum}
					/>
				</div>
			</section>
			<div className="stats__container-btn">
			
				<Button className="stats__button stats__button-reset" aria-label="reset stats"  onClick={showWarning}>
					Reset
				</Button>
				{showModal && <Modal type="reset" showModal={showModal} resetStats={resetStats}   onClose={closeModal} />}
				<Button className="stats__button stats__button-home" ref={homeRef} role="button" aria-label="return to home page" tabIndex={0} href="/">
					Home
				</Button>
			</div>
		</main>
	);
};
export default Stats;
