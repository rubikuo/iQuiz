import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import {Redirect} from "react-router-dom";
import './styles/Quiz.scss';
import Modal from "./Modal"
import { playTimes$, updatePlayTimes, correctNum$, updateCorrectNum, inCorrectNum$, updateInCorrectNum, correctPercent$, updateCorrectPercent, userAnswers$, updateUserAnswers } from "./store.js";
import { TouchBallLoading } from 'react-loadingg';

const Quiz = ({ location }) => {
	const [datas, setDatas] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [dataPerPage, setDataPerpage] = useState(1);
	const [checkedValue, setCheckedValue] = useState('');
	const [isChecked, setIsChecked] = useState(false);
	const [correctAnswers, setCorrectAnswers] = useState([]);
	const [point, setPoint] = useState(0);
	const [playTimes, setPlayTimes] = useState(playTimes$.value);
	const [correctNum, setCorrectNum] = useState(correctNum$.value);
	const [inCorrectNum, setinCorrectNum] = useState(inCorrectNum$.value);
	const [correctPercent, setCorrectPercent] = useState(correctPercent$.value);
	const [userAnswers, setUserAnswers] = useState(userAnswers$.value);
	const [redirectStats, setRedirectStats] = useState(false);
	const [redirectHome, setRedirectHome] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [answers, setAnswers] = useState([]);



	//connect to localstorage once it's loaded
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


	let catagory = location.state.catagory;


	let url = `https://opentdb.com/api.php?amount=10&category=${catagory}&difficulty=medium&type=multiple`;

	const getData = useCallback(
		() => {
			let CancelToken = axios.CancelToken;
			let source = CancelToken.source();
			axios
				.get(url)
				.then((response) => {
					setTimeout(() => {
						setLoading(false);
					}, 3000)
					let datas = response.data.results;
					return datas;
				})
				.then((datas) => {
					let copyDatas = [...datas];
					let reEditedDatas = [];
					let allCorrectAnswers = [];
					copyDatas.map((data) => {
						let allAnswers = [...data.incorrect_answers, data.correct_answer];
						allCorrectAnswers.push(data.correct_answer)
						// console.log(allAnswers);
						let shuffledArr = shuffle(allAnswers);
						let newDatas = {
							options: shuffledArr,
							...data
						};
						return reEditedDatas.push(newDatas);
					});

					setCorrectAnswers(allCorrectAnswers)
					setDatas(reEditedDatas);
				}).catch((err) => {
					console.log(err)
				})
				return ()=>source.cancel();
		},

		[url]
	);

	useEffect(() => {
		getData();
	}, [getData]);


	const shuffle = (array) => {
		let shuffled = [];
		let cpy = [...array]; 
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
		// setAnswers([...answers, e.target.value]);
		// setIsChecked(true)
	};


	const toNext = () => {
		console.log(checkedValue)
		let copyAnswers = [...answers];

		copyAnswers.splice(currentPage-1, 1, checkedValue); 
		setAnswers(copyAnswers);
		
		if (checkedValue !=="") {
			// checkCorrect(answers)
			
			setCurrentPage(currentPage + 1)
			setCheckedValue(answers[currentPage])
	
		}
	
	}

	const checkCorrect = (data) => {
		console.log(point)
		let copyCorrects=[...correctAnswers];
	    let copyAll = [...answers];
		let correct = copyCorrects.filter(function (word) {
			return copyAll.includes(word);
		})
		console.log(correct);
		let points = correct.length;
		console.log(points)
		setPoint(points)
	}

	console.log(answers)


	// const toNext = () => {
	// 	console.log("hi")
	// 	if (isChecked) {
	// 		setIsChecked(false);
	// 		// let copyUserAnswers=[...userAnswers];
	// 		let eachAnswer = {
	// 			answer: checkedValue,
	// 			id: currentPage
	// 		}
	// 		updateUserAnswers(eachAnswer);

	// 		console.log(userAnswers$.value)



	// 		// setUserAnswers(copyUserAnswers)

	// 		setCurrentPage(currentPage + 1)

	// 	}
	// 	setIsChecked(true);

	// }
	// console.log(showModal)
	////demo for myself to see how to update the useranswers
	// let currentNum= 1;
	// let value = "ok";

	// let array = [{id:1, an:"hello"}, {id:2, an:"hi"}];
	//  let copyarr = [...array];
	// let result= copyarr.findIndex((x)=>x.id=== currentNum&& x.an!==value)


	// console.log(result)
	// array[result].an=value;
	// console.log(copyarr)

	const toPrev = () => {
	   
		setCurrentPage(currentPage - 1)

		setCheckedValue(answers[currentPage-2])

	}


	const showResult = () => {
		checkCorrect(answers)
		updatePlayTimes(playTimes +1) 
		setIsChecked(false)
		setShowModal(true)
	}

	console.log(playTimes$.value)


   const onCloseModal =()=>{
	setShowModal(false) 
	setRedirectStats(true)

   }
   
	if(redirectStats){
		return <Redirect to={{
	          pathname: '/stats'
	      }}/>
	}

	if(redirectHome){
		return <Redirect to={{
			pathname: '/'
		}}/>
	}


	// console.log(correctAnswers)

	return (

		<div className="quiz">
			<h1 className="quiz__title">Quiz</h1>
			<div className="quiz__container">
				{loading ? (
					<TouchBallLoading role="alert" aria-busy="true" className="quiz__text-loading" />

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
									<h3 className="quiz__text-question">
										{data.question.replace(/&#?\w+;/g, (match) => entities[match])}
									</h3>

									{data.options.map((opt, i) => {
										return (

											<label htmlFor={opt+i} className="quiz__radiobtn" key={opt}>
												<input
												    aria-labelledby={opt}
													type="radio"
													className="quiz__radiobtn-input"
													name={catagory}
													id={opt+i}
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
		
				{/* <Pagination dataPerPage={dataPerPage} totalDatas={datas.length} paginate={paginate} /> */}
			

				{loading ? null :
					<>
						{currentPage === 1 ? null :
							<button aria-label="Previous" onClick={toPrev} className="quiz__button quiz__button-prev"><MdNavigateBefore className="quiz__button-prev--fake" /></button>
						}

						{currentPage === lastPage ? null :  
							<button aria-label="Next" onClick={checkedValue? toNext: null} className="quiz__button quiz__button-next"> <MdNavigateNext className="quiz__button-next--fake" /> </button>
						}
					</>}    

				{currentPage === lastPage && <button aria-label="View result" className="quiz__button-result" onClick={showResult}>Result</button>}
				{showModal && <Modal showModal={showModal} onClose={onCloseModal} point={point} onRedirectHome={()=>setRedirectHome(true)} />}
			</div>
		</div>

		// </FocusTrap>
	);
};

export default Quiz;
