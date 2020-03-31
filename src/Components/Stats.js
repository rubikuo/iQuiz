import React, { useState, useEffect } from 'react';
import {
	playTimes$,
	updatePlayTimes,
	correctNum$,
	updateCorrectNum,
	inCorrectNum$,
	updateInCorrectNum,
	correctPercent$,
    updateCorrectPercent,
    
} from './store.js'; // need to subscrib in useeffect otherwise pass from parent
import './styles/Stats.scss';
import Button from 'react-bootstrap/Button';
import { CircleProgress } from 'react-gradient-progress';

const Stats = () => {
	const [ playTimes, setPlayTimes ] = useState(playTimes$.value);
	const [ correctNum, setCorrectNum ] = useState(correctNum$.value);
	const [ inCorrectNum, setInCorrectNum ] = useState(inCorrectNum$.value);
	const [ correctPercent, setCorrectPercent ] = useState(correctPercent$.value);

	const resetStats = () => {
		updatePlayTimes(null); //confirm with Andreas why i need to render the page again to see the updated number?
		updateCorrectNum(null);
		updateInCorrectNum(null);
		updateCorrectPercent(null);
	};

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

	return (
		<div className="stats">
			<h1 className="stats__title">Stats</h1>
			<h3 className="stats__info">
				Play <span className="stats__info-playtimes">{playTimes$.value === null ? 0 : playTimes}</span> times in
				iQuiz
			</h3>
			<h3 className="stats__info stats__info-corrects">{correctNum$.value === null ? 0 : correctNum}Corrects</h3>
			<h3 className="stats__info stats__info-incorrects">
				{inCorrectNum$.value === null ? 0 : inCorrectNum} Incorrects
			</h3>
			<h3 className="stats__info stats__info-correctPercent">
				{correctPercent$.value === null ? 0 : correctPercent}Percent
			</h3>
            <CircleProgress role="progressbar" aria-valuenow={correctPercent===null? 0: correctPercent} aria-valuemin="0" aria-valuemax="100" percentage={correctPercent===null? 0: correctPercent} strokeWidth={8} secondaryColor="#f0f0f0" primaryColor={['#002EC7', '#00FAD2']}/>
			<Button className="stats__button stats__button-reset" onClick={resetStats}>
				Reset
			</Button>
			<Button href="/">Home</Button>
		</div>
	);
};

export default Stats;
