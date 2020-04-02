import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './styles/Stats.scss';

const CircularProgress = ({correctPercent}) =>{
  
    // let progressValue = `${type} === "playTimes" && ${playTimes} === null ? 0 : ${playTimes}`
    // let progressValue = 
    //     type==="playTimes"? playTimes === null ? 0 : playTimes:
    //     type ==="corrects"? correctNum ===null? 0: correctNum:
    //     type ==="incorrects"? inCorrectNum === null? 0: inCorrectNum:
    //     correctPercent=== null? 0:correctPercent;

    return (       
					<CircularProgressbarWithChildren
                        role="progressbar"
                        styles ={buildStyles({pathColor:`rgb(77, 166, 255)`})}
                        aria-valuenow={correctPercent=== null? 0:correctPercent}
						// aria-valuemin={type==="correctRate"? null: 0}
						// aria-valuemax={type==="correctRate"? null: 100}
						value={correctPercent=== null? 0:correctPercent}
						className="stats__progress-icon"
					>
						{/* <img className="stats__progress--img" src="https://i.imgur.com/b9NyUGm.png" alt="doge" /> */}
						<p className="stats__progress--text" >
							<strong>{ correctPercent=== null? 0:correctPercent}</strong> %
						</p>
						<p className="stats__progress--text-sub" >Correct Rate</p>
					</CircularProgressbarWithChildren>
			
    )


}

export default CircularProgress;