import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { Redirect } from "react-router-dom";
import './styles/Quiz.scss';
import { playTimes$, updatePlayTimes, correctNum$, updateCorrectNum, inCorrectNum$, updateInCorrectNum, correctPercent$, updateCorrectPercent } from "./store.js";
import { TouchBallLoading } from 'react-loadingg';
import { BookIcon, MusicIcon, GameIcon, MovieIcon } from './ImgIcon.jsx';
import Button from 'react-bootstrap/Button';
import Modal from "./Modal";
import { Helmet } from 'react-helmet';


const Quiz = ({ location }) => {
	const [datas, setDatas] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [dataPerPage] = useState(1);
	const [checkedValue, setCheckedValue] = useState('');
	const [correctAnswers, setCorrectAnswers] = useState([]);
	const [point, setPoint] = useState(0);
	const [playTimes, setPlayTimes] = useState(playTimes$.value);
	const [correctNum, setCorrectNum] = useState(correctNum$.value);
	const [inCorrectNum, setInCorrectNum] = useState(inCorrectNum$.value);
	const [correctPercent, setCorrectPercent] = useState(correctPercent$.value);
	const [redirectStats, setRedirectStats] = useState(false);
	const [redirectHome, setRedirectHome] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [answers, setAnswers] = useState([]);
	const [message, setMessage] = useState("");


	let catagoryNum = location.state.catagory.catagoryNum;
	let catagoryType = location.state.catagory.type;

	//****** connect to localstorage once it's loaded ********//
	useEffect(() => {

		const subscriptions = [
			playTimes$.subscribe(times => {
				setPlayTimes(times);
			}),
			correctNum$.subscribe(num => {
				setCorrectNum(num);
			}),
			inCorrectNum$.subscribe(num => {
				setInCorrectNum(num);
			}),
			correctPercent$.subscribe(num => {
				setCorrectPercent(num);
			})
		]

		return () => subscriptions.forEach(x => x.unsubscribe());
	}, []);


	//******** control focus items when it's loaded ****/
	const questionRef = useRef(null);


	let focusTime = useCallback(
		() => {
			setTimeout(() => {
				if (!loading) {
					questionRef.current.focus();
				}

			}, 1000)
		},
		[loading],
	)

	useEffect(() => {
		focusTime()
		return () => clearTimeout(focusTime);

	}, [focusTime])

	 
	const firstAnswerRef = useRef(null);
	let focusFirstAnswer = () =>{
			firstAnswerRef.current.focus()
	}


	//********** */ loading icon * *********//
	const loadingTime = useCallback(() => {

		setTimeout(() => {
			setLoading(false);
		}, 3000)
	}, [])
   



	//************* fetching datas   ************* */
	let url = `https://opentdb.com/api.php?amount=10&category=${catagoryNum}&difficulty=medium&type=multiple`;

	useEffect(() => {
		loadingTime();
		return () => clearTimeout(loadingTime)
	})



	const getData = useCallback(
		() => {

		
			let CancelToken = axios.CancelToken;
			let source = CancelToken.source();
			axios
				.get(url)
				.then((response) => {
					loadingTime();
					let datas = response.data.results;
					let copyDatas = [...datas];
					let reEditedDatas = [];
					let allCorrectAnswers = [];
					copyDatas.map((data) => {
						let allAnswers = [...data.incorrect_answers, data.correct_answer];
						allCorrectAnswers.push(data.correct_answer)
						console.log("allAnswers");
						let shuffledArr = shuffle(allAnswers);
						let newDatas = {
							options: shuffledArr,
							...data
						};
						return reEditedDatas.push(newDatas);
					});

					setCorrectAnswers(allCorrectAnswers)
					setDatas(reEditedDatas);
				})
				.catch((err) => {
					console.log(err)
				})
			return () => source.cancel();
		},

		[url, loadingTime]
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
    // *************************
	const indexOfLastData = currentPage * dataPerPage;
	const indexOfFirstData = indexOfLastData - dataPerPage;
	const currentDatas = datas.slice(indexOfFirstData, indexOfLastData);
	const lastPage = Math.ceil(datas.length / dataPerPage);

	//************************* */


	const handleRadioBtn = (e) => {
		setCheckedValue(e.target.value);
		setMessage("")
		
	};
					

	const toNext = () => {
		// console.log(checkedValue)
		let copyAnswers = [...answers];
		copyAnswers.splice(currentPage - 1, 1, checkedValue); //target current value in the array(the reason with currentpage -1 is the currentpage starts with 1), remove only this one, and replace with new value
		setAnswers(copyAnswers);
	

		if (checkedValue !== "") {
			setCurrentPage(currentPage + 1)
			setCheckedValue(answers[currentPage])
		}

		
		focusTime();
		
	}

	console.log("correctAnswers", correctAnswers)
	console.log("answers", answers)


	const promise = ()=>{
		return new Promise((resolve)=>{
            setTimeout(()=>{
				resolve(focusFirstAnswer())
			}, 2500)

		})

	}
	
   // control focus to target back onto the first item of answer after showing message //
    const showMessage =()=>{
		setMessage("Please choose answer")
		promise()
		.then(()=>{
			setMessage("")
		})	
	}
	
	const showResult = () => {
		let copyAnswers = [...answers];
		copyAnswers.splice(currentPage - 1, 1, checkedValue); //target current value in the array(the reason with currentpage -1 is the currentpage starts with 1), remove only this one, and replace with new value
		setAnswers(copyAnswers);
		updatePlayTimes(playTimes + 1)
		checkPoints(answers)
		setShowModal(true)
	}

	const checkPoints = (data) => {
		console.log(point)
		let copyCorrects = [...correctAnswers];
		let copyAll = [...answers];
		let correct = copyCorrects.filter(function (word) {
			return copyAll.includes(word);
		})

		let points = correct.length;
		let newIncorrect = 10 - points;
		let newCorrect = correctNum + points;
		let newPlayTime = playTimes + 1;

		setPoint(points);
		updateCorrectNum(newCorrect);
		updateInCorrectNum(inCorrectNum + newIncorrect);
		let percentage = (newCorrect / newPlayTime * 10).toFixed(0)
		updateCorrectPercent(Number(percentage));

	}


	const toPrev = () => {
		setCurrentPage(currentPage - 1)
		setCheckedValue(answers[currentPage - 2])
	}


	// console.log("playTime", playTimes)

	//********** */ eventlistener's functions for buttons on Modal **********//

	const onRestart = () => {
		setShowModal(false);
		setCurrentPage(1);
		setAnswers([]);
		setDatas([]);
		setLoading(true);
		getData();
	}

	const onRedirectStats = () => {
		setShowModal(false)
		setRedirectStats(true)
	}

	const onRedirectHome = () => {
		setShowModal(false)
		setRedirectHome(true)
	}

	if (redirectStats) {
		return <Redirect to={{
			pathname: '/stats'
		}} />
	}

	if (redirectHome) {
		return <Redirect to={{
			pathname: '/'
		}} />
	}




	return (

		<main className="quiz">
			<Helmet>
				<title>iQuiz-{catagoryType}</title>
			</Helmet>

			<figure className="quiz__icon-catagory" role="region" aria-label={`${catagoryType} quiz`} tabIndex={0}>{catagoryType === 'Books' ? (
				<BookIcon size={85} className="quiz__img" />
			) : catagoryType === 'Music' ? (
				<MusicIcon size={85} className="quiz__img" />
			) : catagoryType === 'Video games' ? (
				<GameIcon size={85} className="quiz__img" />
			) : (
							<MovieIcon size={85} className="quiz__img" />
						)}
			</figure>
			<div className="quiz__container">
				{loading ? (
					<TouchBallLoading role="alert" aria-busy="true" style={{ height: "18rem" }} />

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

								<section className="quiz__section" key={data.question}>
									<h3 className="quiz__text-question" ref={questionRef} tabIndex={0}>
										{currentPage + "."} {data.question.replace(/&#?\w+;/g, (match) => entities[match])}
									</h3>

									{data.options.map((opt, i) => {
											/***label style */
				
										return (
                                           
	                             
											<label htmlFor={opt + i} className="quiz__radiobtn" key={opt} >
												<input
												    ref={i=== 0? firstAnswerRef:null}
													aria-labelledby={opt}
													type="radio"
													className="quiz__radiobtn-input"
													name={catagoryType}
													id={opt + i}
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
								</section>

							);
						})
					)}

				{loading ? null :
					<>
						{currentPage === lastPage ? null :
							<button aria-label="Next" onClick={checkedValue ? toNext : showMessage} className="quiz__button quiz__button-next"> <MdNavigateNext className="quiz__button-next--fake" /> </button>
						}
						{currentPage === 1 ? null :
							<button aria-label="Previous" onClick={toPrev} className="quiz__button quiz__button-prev"><MdNavigateBefore className="quiz__button-prev--fake" /></button>
						}


					</>}
                {message!=="" && <p role="alert" aria-live="assertive" className="quiz__text-alert">{message}</p>}
				{currentPage === lastPage && <Button aria-label="View result" className="quiz__button-result" onClick={checkedValue ?showResult : showMessage}>Result</Button>}
				{showModal && <Modal showModal={showModal} onRedirectStats={onRedirectStats} point={point} onRedirectHome={onRedirectHome}
					onRestart={onRestart} />}
			</div>
		</main>
	);
};

export default Quiz;
