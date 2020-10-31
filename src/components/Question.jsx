import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
function score(correct, total) {
    let result = (correct / total) * 100;
    return result > 30 ? ( result> 80? "😎": "😅" ): "☹️"; 
}
function Question(props) {
    let history = useHistory()
    const { questions } = props;
    const maxQuestions = questions.length;
    let [availableQuestions, setAvailableQuestions] = useState([...questions]);
    let currentQuestion = availableQuestions[0];
    let questionCounter = useRef(0);
    let correctlyAnswered = useRef(0);
    let [result, setResult] = useState(-1);
   
    let checkAnswer = (index, choice) => {
        let selectedChoice = document.getElementById(choice);
        if (typeof currentQuestion !== undefined && availableQuestions.length >= 1) {
            let classToAdd;
            if (index === currentQuestion.answer) {
                correctlyAnswered.current++;
                classToAdd = "success";
            }
            else {
                classToAdd = "failure"
            }
            selectedChoice.firstChild.classList.remove("playOption");
            selectedChoice.firstChild.classList.add(classToAdd);
            setTimeout(() => {
                selectedChoice.firstChild.classList.remove(classToAdd);
                selectedChoice.firstChild.classList.add("playOption");
                questionCounter.current++;
                if (availableQuestions.length > 1) {
                    setAvailableQuestions(availableQuestions.splice(1,));
                }
                else {
                    setResult(correctlyAnswered.current);
                }
            }, 1000);
        }
   }
    return (
        <div >
            {
                result !== -1 ? <h1>{`${score(correctlyAnswered.current, maxQuestions )} You scored ${correctlyAnswered.current} out of ${maxQuestions}`}</h1> :
            <>
                <div className="head-up"><p id='counter'>{questionCounter.current + 1}</p><p id="max-ques">{maxQuestions}</p></div>
                <h3 id="question">{currentQuestion.question}</h3>
                <div id="play">
                        <div className="options">
                            {currentQuestion.options ? currentQuestion.options.map((option, index) => (
                                <div id={`choice${index}`} className="option"  key={index} onClick={()=> checkAnswer(index, `choice${index}`)}>
                                <p className="choice-text playOption" data-number={index}>{option}</p>
                            </div>)
                        ): null}
                        </div>
                    </div>
            </>
            }
        </div>
    )
}

export default Question;