import React, { useState, useEffect } from 'react';
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
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import CircularProgress from "./CircularProgress";

const Stats = () => {
	const [ playTimes, setPlayTimes ] = useState(playTimes$.value);
	const [ correctNum, setCorrectNum ] = useState(correctNum$.value);
	const [ inCorrectNum, setInCorrectNum ] = useState(inCorrectNum$.value);
	const [ correctPercent, setCorrectPercent ] = useState(correctPercent$.value);
    const [ statsType] = useState([ "playTimes", "corrects", "incorrects", "correctRate"])
	
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

			<session className = "stats__progress">
				{statsType.map((type)=>{
					return(
						<div key="type" className={type==="correctRate"? "stats__progress-ctn stats__progress-ctn--correctRate": "stats__progress-ctn"}>
						<CircularProgress type={type} correctPercent={correctPercent} playTimes={playTimes} correctNum={correctNum} inCorrectNum={inCorrectNum} />
						</div>
					)
				})}
				
			</session>
			<Button className="stats__button stats__button-reset" onClick={resetStats}>
				Reset
			</Button>
			<Button href="/">Home</Button>
		</div>
	);
};

export default Stats;
