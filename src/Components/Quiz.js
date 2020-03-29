import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// import Pagination from './Pagination';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
// import FocusTrap from 'focus-trap-react';
import './styles/Quiz.scss';
import {playTimes$, updatePlayTimes} from "../store.js";

const Quiz = ({ location }) => {
	const [ datas, setDatas ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ currentPage, setCurrentPage ] = useState(1);
	const [ dataPerPage, setDataPerpage ] = useState(1);
	const [ checked, setChecked ] = useState('');
  const [ point, setPoint ] = useState(0);
  const  [playTimes, setPlayTimes] = useState(playTimes$.value);

 
  useEffect(() => {
    const subscribe = playTimes$.subscribe(times => {
        updatePlayTimes(times);
    })

    return () => subscribe.unsubscribe();
}, []);


	//  const [options, setOptions] = useState([]);

	let catagory = location.state.catagory;

	useEffect(() => {
		getData();
	}, []);

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
					copyDatas.map((data) => {
						let allAnswers = [ ...data.incorrect_answers, data.correct_answer ];
						console.log(allAnswers);
						let shuffledArr = shuffle(allAnswers);
						let newDatas = {
							options: shuffledArr,
							...data
						};
						return reEditedDatas.push(newDatas);
					});
					setDatas(reEditedDatas);
				});
		},
		[ url ]
	);
	// console.log(datas);

	// const paginate = (pageNum) => {
	// 	setCurrentPage(pageNum);
	// };

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

	const handleRadioBtn = (e) => {
		setChecked(e.target.value);
	};

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
										<label htmlFor={opt} className="quiz__radiobtn" key={opt}>
											<input
												type="radio"
												className="quiz__radiobtn-input"
												name={catagory}
												id={opt}
												value={opt}
												onChange={handleRadioBtn}
												checked={checked === opt}
											/>
											<span className="quiz__radiobtn--fake" />
											<span className="quiz__radiobtn-option">
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
         <div className="quiz__button-ctn quiz__button-ctn--left">
					<button className="quiz__button quiz__button-prev" />
					<MdNavigateBefore className="quiz__button-prev--fake" />
				</div>
				<div className="quiz__button-ctn quiz__button-ctn--right">
					<button className="quiz__button quiz__button-next" />
					<MdNavigateNext className="quiz__button-next--fake" />  
				</div> 
        </>}
			</div>
		</div>
	);
};

export default Quiz;
