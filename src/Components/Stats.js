import React from 'react';
import {playTimes$, updatePlayTimes} from "./store.js"; // need to subscrib in useeffect otherwise pass from parent
import "./styles/Stats.scss";
import {Redirect} from "react-router-dom";


 const Stats = ({location}) =>{
   const resetStats = ()=>{
       updatePlayTimes(null) //confirm with Andreas why i need to render the page again to see the updated number? 

   }
   const returnHome = ()=>{

   }
//    let redirectHome = location.state.redirectHome;
//    	if(redirectHome){
// 		return <Redirect to={{
// 			pathname: '/'
// 		}}/>
// 	}


    return (
        <div className="stats">
         <h1 className="stats__title">Stats</h1>
         <h3 className="stats__info">Play <span className="stats__info-playtimes">{playTimes$.value}</span> times in iQuiz</h3>
         <h3 className="stats__info stats__info-corrects">Corrects</h3>
         <h3 className="stats__info stats__info-incorrects">Incorrects</h3>
         <h3 className="stats__info stats__info-correctPercent">Percent</h3>
         <button onClick={resetStats}>Reset</button>
         {/* <button onClick={}>Back to home</button> make into link */}
        </div>
    )

}

export default Stats;

