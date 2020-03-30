import React, {useState, useEffect} from 'react';
import { playTimes$, updatePlayTimes, correctNum$, updateCorrectNum, inCorrectNum$, updateInCorrectNum, correctPercent$, updateCorrectPercent } from "./store.js"; // need to subscrib in useeffect otherwise pass from parent
import "./styles/Stats.scss";
import {Link} from "react-router-dom";


 const Stats = () =>{
    const [playTimes, setPlayTimes] = useState(playTimes$.value);
	const [correctNum, setCorrectNum] = useState(correctNum$.value);
	const [inCorrectNum, setinCorrectNum] = useState(inCorrectNum$.value);
	const [correctPercent, setCorrectPercent] = useState(correctPercent$.value);
    const [userAnswers, setUserAnswers] = useState(userAnswers$.value);
    const [isPressed, setIsPressed] = useState(false);

   const resetStats = ()=>{
       updatePlayTimes(null) //confirm with Andreas why i need to render the page again to see the updated number? 
   }

 
   useEffect(() => {

    const subscriptions = [
        playTimes$.subscribe(times => {
            setPlayTimes(times);
        }),
        correctNum$.subscribe(num => {
            setCorrectNum(num);
        }),
        inCorrectNum$.subscribe(num => {
            setinCorrectNum(num);
        }),
        correctPercent$.subscribe(num => {
            setCorrectPercent(num);
        }),
        userAnswers$.subscribe(answers => {
            setUserAnswers(answers)
        })
    ]


    return () => subscriptions.forEach(x => x.unsubscribe());
}, []);


    return (
        <div className="stats">
         <h1 className="stats__title">Stats</h1>
         <h3 className="stats__info">Play <span className="stats__info-playtimes">{playTimes$.value ===null? 0: playTimes}</span> times in iQuiz</h3>
         <h3 className="stats__info stats__info-corrects">Corrects</h3>
         <h3 className="stats__info stats__info-incorrects">Incorrects</h3>
         <h3 className="stats__info stats__info-correctPercent">Percent</h3>
         <button onClick={resetStats}>Reset</button>
         <Link to="/" role="button">Return to Home</Link>
        </div>
    )

}

export default Stats;

