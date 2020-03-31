import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { Redirect } from "react-router-dom";
import './styles/Quiz.scss';
// import Modal from "./Modal"
import { playTimes$, updatePlayTimes, correctNum$, updateCorrectNum, inCorrectNum$, updateInCorrectNum, correctPercent$, updateCorrectPercent } from "./store.js";
import { TouchBallLoading } from 'react-loadingg';
import NewModal from "./NewModal";

const Quiz = ({ location }) => {
	const [datas, setDatas] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [dataPerPage, setDataPerpage] = useState(1);
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
				setInCorrectNum(num);
			}),
			correctPercent$.subscribe(num => {
				setCorrectPercent(num);
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
			return () => source.cancel();
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
	const indexOfFirstData = indexOfLastData - dataPerPage;
	const currentDatas = datas.slice(indexOfFirstData, indexOfLastData);
	const lastPage = Math.ceil(datas.length / dataPerPage);

	const handleRadioBtn = (e) => {
		setCheckedValue(e.target.value);
	};

	const toNext = () => {
		console.log(checkedValue)
		let copyAnswers = [...answers];
		copyAnswers.splice(currentPage - 1, 1, checkedValue);
		setAnswers(copyAnswers);

		if (checkedValue !== "") {
			setCurrentPage(currentPage + 1)
			setCheckedValue(answers[currentPage])
		}
	}

	console.log(correctAnswers)


	const showResult = () => {
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
		// console.log("new correct", newCorrect);
		let newPlayTime = playTimes + 1;
		// console.log("newPlayTime", newPlayTime)

		// console.log("after point", points);
		setPoint(points);
		updateCorrectNum(newCorrect);
		updateInCorrectNum(inCorrectNum + newIncorrect);

		let percentage = (newCorrect / newPlayTime * 10).toFixed(0)
		// console.log("after correct", correctNum);
		// console.log("after point", points);
		// console.log(parseInt(percentage))


		updateCorrectPercent(Number(percentage));

	}


	const toPrev = () => {
		setCurrentPage(currentPage - 1)
		setCheckedValue(answers[currentPage - 2])
	}


	console.log("playTime", playTimes$.value)

	const onRestart = () =>{
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

											<label htmlFor={opt + i} className="quiz__radiobtn" key={opt}>
												<input
													aria-labelledby={opt}
													type="radio"
													className="quiz__radiobtn-input"
													name={catagory}
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
							<button aria-label="Next" onClick={checkedValue ? toNext : null} className="quiz__button quiz__button-next"> <MdNavigateNext className="quiz__button-next--fake" /> </button>
						}
					</>}

				{currentPage === lastPage && <button aria-label="View result" className="quiz__button-result" onClick={showResult}>Result</button>}
				{/* {showModal && <Modal showModal={showModal} onClose={onCloseModal} point={point} onRedirectHome={()=>setRedirectHome(true)} />} */}
				<NewModal
					show={showModal}
					onRedirectStats={onRedirectStats} point={point} onRedirectHome={onRedirectHome} onRestart={onRestart}/>
			</div>
		</div>
	);
};

export default Quiz;
