import { BehaviorSubject } from 'rxjs';


// save how many games 
export const playTimes$ = new BehaviorSubject(parseInt(localStorage.getItem('times')) || 0);

export function updatePlayTimes(time) {
	 if (time) {
		localStorage.setItem('times', time);
	} else {
		localStorage.removeItem('times');
	} 
	playTimes$.next(time);
}


// save how many correct 
export const correctNum$ = new BehaviorSubject(parseInt(localStorage.getItem('correctNum')) || 0);

export function updateCorrectNum(num) {
	 if (num) {
		localStorage.setItem('correctNum', num);
	} else {
		localStorage.removeItem('correctNum');
	} 
	correctNum$.next(num);
}

// save incorrect 
export const inCorrectNum$ = new BehaviorSubject(parseInt(localStorage.getItem('inCorrectNum')) || 0);

export function updateinCorrectNum(num) {
	 if (num) {
		localStorage.setItem('inCorrectNum', num);
	} else {
		localStorage.removeItem('inCorrectNum');
	} 
	inCorrectNum$.next(num);
}


// save percentage
export const correctPercent$ = new BehaviorSubject(parseInt(localStorage.getItem('correctPercent'))|| 0);

export function updateCorrectPercent(num) {
	 if (num) {
		localStorage.setItem('correctPercent', num);
	} else {
		localStorage.removeItem('correctPercent');
	} 
	correctPercent$.next(num);
}

// to save user's answers 
export const userAnswers$ = new BehaviorSubject(JSON.parse(localStorage.getItem('userAnswers') || '[]'));

export function updateUserAnswers(answerObj) {
    const newUserAnswers = [ ...userAnswers$.value ]; // to copy the array from localstorage

	if (newUserAnswers.find((x) => x.id === answerObj.id)) {
		// check if its in the array
        let index= newUserAnswers.findIndex((x) => x.id === answerObj.id);
        newUserAnswers[index].answer = answerObj.answer; 

		localStorage.setItem('userAnswers', JSON.stringify(newUserAnswers));
		userAnswers$.next(newUserAnswers); // update localstorage
	} else {
		newUserAnswers.push(answerObj); // if there is not then push answerObj({id: page , answer:check})
		localStorage.setItem('userAnswers', JSON.stringify(newUserAnswers));
		userAnswers$.next(newUserAnswers);
	}
}


export function clearUserAnswers() {
	userAnswers$.next([]);
	localStorage.removeItem("userAnswers");
}