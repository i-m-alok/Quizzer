import React, {useRef} from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

function AddQuiz() {
    const optionRef = useRef();
    let optionNum = 3
    const [question, setQuestion] = useState();
    const [optionList, setOptionList] = useState();

    // useEffect(() => {
    //     let op
    // });

    // add option
    let addOption = () => {
        let optionDiv = document.createElement("div");
        let option = document.createElement("input");
        const optionClasses = ["option", `op${optionNum}`];
        option.placeholder = "Edit Question..."
        option.id = optionClasses[1];
        option.className = "inputOption"
        optionDiv.classList.add(...optionClasses);
        optionDiv.appendChild(option);
        optionRef.current.appendChild(optionDiv);
        optionNum++;
    }

    // delete option
    let deleteOption = () => {
        
    }

    // next question
    let nextQuestion = () => {
        let optionList = []

        for (let i of document.getElementsByClassName("inputOption")) {
            // optionList.push(i.value);
            if (i.value.trim() !== "") {
                optionList.push(i.value.trim())
            }
        }
        if (document.getElementsByClassName('inputQuestion')[0].value.trim() !== "" && optionList.length>1) {
            console.log(optionList);
        }
        else if (document.getElementsByClassName('inputQuestion')[0].value.trim() === "") {
            console.log("Question string cannt be null");
        }
        else {
            console.log("Minimum Options are needed");
            console.log(optionList);
            console.log("still some error");
        }
    }
    return (
        <center>
            <h1>Quizzer</h1>
            <div>
                <input className="inputQuestion" placeholder="Type Question..." />
                <div className="options" ref={optionRef}>
                    <div className="option op0">
                        <input id="op1" className="inputOption" placeholder="Edit Question..." />
                    </div>
                    <div className="option op1">
                        <input id="op2" className="inputOption" placeholder="Edit Question..." />
                    </div>
                </div>
                <button onClick={addOption}>Add Options</button>
                <button onClick={nextQuestion}>Next Question</button>
            </div>
        </center>
    )
}

export default AddQuiz;


