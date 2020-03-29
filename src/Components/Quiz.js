import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// import Pagination from './Pagination';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import FocusTrap from 'focus-trap-react';
// import {Redirect} from "react-router-dom";
import './styles/Quiz.scss';
import Modal from "./Modal"
import {playTimes$, updatePlayTimes, correctNum$, updateCorrectNum, inCorrectNum$, updateInCorrectNum, correctPercent$, updateCorrectPercent, userAnswers$, updateUserAnswers} from "./store.js";

const Quiz = ({ location }) => {
const [ datas, setDatas ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ currentPage, setCurrentPage ] = useState(1);
	const [ dataPerPage, setDataPerpage ] = useState(1);
  const [ checkedValue, setCheckedValue ] = useState('');
  const [isChecked, setIsChecked] =useState(false);
  const [ correctAnswers, setCorrectAnswers] = useState([]);
  const [ point, setPoint ] = useState(0);
  const [playTimes, setPlayTimes] = useState(playTimes$.value);
  const [correctNum, setCorrectNum] = useState(correctNum$.value);
  const [inCorrectNum, setinCorrectNum] = useState(inCorrectNum$.value);
  const [correctPercent, setCorrectPercent] = useState(correctPercent$.value);
  const [userAnswers, setUserAnswers] = useState(userAnswers$.value);
  const [redirect, setRedirect] = useState(false);
  const [showModal, setShowModal] = useState(false)
  

 
  //connect to localstorage once it's loaded
  useEffect(() => {
    const subscriptions = [
      playTimes$.subscribe(times => {
        setPlayTimes(times);
    }),
      correctNum$.subscribe(num =>{
        setCorrectNum(num);
      }),
      inCorrectNum$.subscribe(num =>{
        setinCorrectNum(num);
      }),
      correctPercent$.subscribe(num =>{
        setCorrectPercent(num);
      }),
      userAnswers$.subscribe(answers =>{
        setUserAnswers(answers)
      })
    ]
       

    return () => subscriptions.forEach(x =>x.unsubscribe());
}, []);


	//  const [options, setOptions] = useState([]);

	let catagory = location.state.catagory;


	let url = `https://opentdb.com/api.php?amount=10&category=${catagory}&difficulty=medium&type=multiple`;

	const getData = useCallback(
		() => {
			axios
				.get(url)
				.then((response) => {
					let datas = response.data.results;
					setLoading(false);

					return datas;
				})
				.then((datas) => {
					let copyDatas = [ ...datas ];
          let reEditedDatas = [];
          let allCorrectAnswers = [];
					copyDatas.map((data) => {
            let allAnswers = [ ...data.incorrect_answers, data.correct_answer ];
            allCorrectAnswers.push(data.correct_answer)
						console.log(allAnswers);
						let shuffledArr = shuffle(allAnswers);
						let newDatas = {
							options: shuffledArr,
							...data
						};
						return reEditedDatas.push(newDatas);
          });
          
          setCorrectAnswers(allCorrectAnswers)
					setDatas(reEditedDatas);
				}).catch((err)=>{
          console.log(err)
        })
		},
		[ url ]
  );
  
	useEffect(() => {
		getData();
	}, [getData]);


	const shuffle = (array) => {
		let shuffled = [];
		let cpy = [ ...array ]; // make a copy for the array because the array is only one level  the we dont want to alter the original array
		while (cpy.length > 0) {
			let randomIndex = Math.floor(Math.random() * cpy.length);
			let value = cpy[randomIndex];
			shuffled.push(value);
			cpy.splice(randomIndex, 1);
		}
		return shuffled;
	};

	const indexOfLastData = currentPage * dataPerPage;
	// console.log("indexLastData", indexOfLastData);
	const indexOfFirstData = indexOfLastData - dataPerPage;
	// console.log("indexFirstData", indexOfFirstData);
  const currentDatas = datas.slice(indexOfFirstData, indexOfLastData);
  
  const lastPage = Math.ceil(datas.length / dataPerPage);

	const handleRadioBtn = (e) => {
    setCheckedValue(e.target.value);
    setIsChecked(true)
  };

  const toNext = () =>{
    console.log("hi")
    if(isChecked ){
      setIsChecked(false);
      // let copyUserAnswers=[...userAnswers];
      let eachAnswer ={
        answer:checkedValue,
        id:currentPage
      }
      updateUserAnswers(eachAnswer);
      setIsChecked(true);
      console.log(userAnswers$.value)
   
      // setUserAnswers(copyUserAnswers)

      setCurrentPage(currentPage+1)

    }
   
  }
  console.log(showModal)
  ////demo for myself to see how to update the useranswers
  // let currentNum= 1;
  // let value = "ok";

  // let array = [{id:1, an:"hello"}, {id:2, an:"hi"}];
  //  let copyarr = [...array];
  // let result= copyarr.findIndex((x)=>x.id=== currentNum&& x.an!==value)
  

  // console.log(result)
  // array[result].an=value;
  // console.log(copyarr)

  const toPrev = () =>{
    console.log("hello")
      if(!isChecked){
        setIsChecked(true)
        
      }else{
        setIsChecked(false)
      }
  
      setCurrentPage(currentPage-1)
    
  }
  

  const showResult = () =>{
	console.log("hi")
    setShowModal(true)

  } 
  // if(redirect){
	// 	return <Redirect to={{
  //           pathname: '/stats'
  //       }}/>
  // }
  



  // console.log(correctAnswers)

	return (
	
		<div className="quiz">
			<h1 className="quiz__title">Quiz</h1>
			<div className="quiz__container">
				{loading ? (
					<h2 className="quiz__text-loading">Loading...</h2>
				) : (
					currentDatas.map((data, index) => {
						const entities = {
							'&#039;': "'",
							'&quot;': '"',
							'&ntilde;': 'ñ',
							'&eacute;': 'é',
							'&amp;': '&',
							'&uuml;': 'ü',
							'&ldquo;': '“',
							'&hellip;': '…',
							'&rdquo;': '”'
						};
						return (
						
							<div className="quiz__section" key={data.question}>
								<h1 className="quiz__text-question">
									{data.question.replace(/&#?\w+;/g, (match) => entities[match])}
								</h1>

								{data.options.map((opt) => {
									return (
									
										<label aria-labelledby={opt} htmlFor={opt} className="quiz__radiobtn" key={opt}>
											<input
												type="radio"
												className="quiz__radiobtn-input"
												name={catagory}
												id={opt}
												value={opt}
												onChange={handleRadioBtn}
												checked={checkedValue === opt}
											/>
											<span className="quiz__radiobtn--fake" />
											<span id={opt} className="quiz__radiobtn-option">
												{opt.replace(/&#?\w+;/g, (match) => entities[match])}
											</span>
										</label>
									
									);
								})}
							</div>
							
						);
					})
				)}
				{/* <FocusTrap active={!isOpen}> */}
				{/* <Pagination dataPerPage={dataPerPage} totalDatas={datas.length} paginate={paginate} /> */}
				{/* </FocusTrap> */}

        {loading? null:
        <>
        { currentPage === 1? null:
         
					<button onClick={toPrev} className="quiz__button quiz__button-prev"><MdNavigateBefore className="quiz__button-prev--fake" /></button>
		}
		
         { currentPage === lastPage? null:
	        // <div onClick={toNext} className="quiz__button-ctn quiz__button-ctn--right">
					<button   onClick={toNext}  className="quiz__button quiz__button-next"> <MdNavigateNext  className="quiz__button-next--fake" /> </button>
					
			}
        </>}

        {currentPage === lastPage && <button onClick={showResult}>Result</button>}
        {showModal && <Modal showModal={showModal} onClose={()=>setShowModal(false)}/>}
			</div>
		</div>

		// </FocusTrap>
	);
};

export default Quiz;
