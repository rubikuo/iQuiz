import React from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './styles/Stats.scss';

const CircularProgress = ({type, correctPercent, correctNum, inCorrectNum, playTimes}) =>{
  
    // let progressValue = `${type} === "playTimes" && ${playTimes} === null ? 0 : ${playTimes}`
    let progressValue = 
        type==="playTimes"? playTimes === null ? 0 : playTimes:
        type ==="corrects"? correctNum ===null? 0: correctNum:
        type ==="incorrects"? inCorrectNum === null? 0: inCorrectNum:
        correctPercent=== null? 0:correctPercent;

    return (       
					<CircularProgressbarWithChildren
						role="progressbar"
                        aria-valuenow={progressValue}
                        strokeWidth={type ==="correctRate"? 8: 4}
						// aria-valuemin={type==="correctRate"? null: 0}
						// aria-valuemax={type==="correctRate"? null: 100}
						value={type==="correctRate"? progressValue: null}
						className="stats__progress-icon"
					>
						{/* <img className="stats__progress--img" src="https://i.imgur.com/b9NyUGm.png" alt="doge" /> */}
						<p className="stats__progress--text" >
							<strong>{ progressValue}</strong> {type==="correctRate"&& <span>%</span>}
						</p>
						<p className="stats__progress--text-sub" >{type}</p>
					</CircularProgressbarWithChildren>
			
    )


}

export default CircularProgress;