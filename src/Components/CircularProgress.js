import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './styles/Stats.scss';

const CircularProgress = ({correctPercent}) =>{
  

    return (       
					<CircularProgressbarWithChildren
                        role="progressbar"
                        styles ={buildStyles({pathColor:`rgb(77, 166, 255)`})}
                        aria-valuenow={correctPercent=== null? 0:correctPercent}
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