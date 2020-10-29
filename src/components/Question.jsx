import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

function Question(props) {
    let history = useHistory()
    const { questions } = props;
    const maxQuestions = questions.length;
    let [availableQuestions, setAvailableQuestions] = useState([...questions]);
    let currentQuestion = availableQuestions[0];
    let questionCounter = useRef(0);
    let correctlyAnswered = useRef(0);
    let [result, setResult] = useState(-1);

   
    let checkAnswer = (index) => {
        let div = document.getElementById(`choice${index}`)
        // console.log(`${currentQuestion.answer} ${index}  ${correctlyAnswered} ${questionCounter}`)

        if (typeof currentQuestion !== undefined && availableQuestions.length >= 1) {
            if (index === currentQuestion.answer) {
                correctlyAnswered.current++;
            }
            questionCounter.current++;
            if (availableQuestions.length > 1) {
                setAvailableQuestions(availableQuestions.splice(1,));
            }
            else {
                setResult(correctlyAnswered.current);
                console.log(result);
            }
        }
   }
    return (
        <div className="container">
            {
                result !== -1 ? <p>{`You scored ${correctlyAnswered.current} out of ${maxQuestions}`}</p> :
            <>
                <div id="head-up"><p id='counter'>{questionCounter.current + 1}</p> / <p id="max-ques">{maxQuestions}</p></div>
                <div id="progress-bar"><div id="progress"></div></div>
                <div id="play" className="justify-center flex-column">
                    <h3 id="question">{currentQuestion.question}</h3>
                    {currentQuestion.options ? currentQuestion.options.map((option, index) => (
                        <div id={`choice${index}`} className="choice-container"  key={index} onClick={()=> checkAnswer(index)}>
                            <p className="choice-text" data-number={index}>{option}</p>
                            {console.log(result)}
                        </div>)
                    ): null}
                    </div>
            </>
            }
        </div>
    )
}

export default Question;