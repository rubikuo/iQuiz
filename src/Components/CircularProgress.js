import React from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './styles/Stats.scss';

const CircularProgress = ({type, correctPercent, correctNum, inCorrectNum, playTimes}) =>{
    // const [ statsType] = useState([ "Play Times", "Total Corrects", "Total Incorrects", "Correct Rate"])
    // let progressValue = `${type} === "playTimes" && ${playTimes} === null ? 0 : ${playTimes}`
    let progressValue = 
        type==="Play Times"? playTimes === null ? 0 : playTimes:
        type ==="Corrects"? correctNum ===null? 0: correctNum:
        type ==="Incorrects"? inCorrectNum === null? 0: inCorrectNum:
        correctPercent=== null? 0:correctPercent;

    return (       
					<CircularProgressbarWithChildren
						role="progressbar"
                        aria-valuenow={progressValue}
                        strokeWidth={type ==="Correct Rate"? 8: 4}
						value={type==="Correct Rate"? progressValue: 100}
						className="stats__progress-icon"
					>
						{/* <img className="stats__progress--img" src="https://i.imgur.com/b9NyUGm.png" alt="doge" /> */}
						<p className="stats__progress--text" >
							<strong>{ progressValue}</strong> {type==="Correct Rate"&& <span>%</span>}
						</p>
						<p className="stats__progress--text-sub" >{type}</p>
					</CircularProgressbarWithChildren>
			
    )


}

export default CircularProgress;