import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import Option from './option'
import { useEffect } from 'react';
import { useState } from 'react';

function AddQuiz() {
    const optionRef = useRef();
    let optionNum = 2

    // add option
    let addOption = () => {
        // option Checkbox
        let optionCheckBox = document.createElement('input');
        optionCheckBox.setAttribute('type', 'radio');
        optionCheckBox.id = `op${optionNum}`;
        optionCheckBox.name = "correctOption"
        // option input
        let option = document.createElement("input");
        const optionClasses = ["option", `op${optionNum}`];
        option.placeholder = "Edit Question..."
        option.id = optionClasses[1];
        option.className = "inputOption"
        // option div
        let optionDiv = document.createElement("div");
        optionDiv.classList.add(...optionClasses);
        optionDiv.appendChild(optionCheckBox);
        optionDiv.appendChild(option);
        optionRef.current.appendChild(optionDiv);
        optionNum++;
    }

    // delete option
    let deleteOption = () => {
        
    }

    // clear input
    let clearInput = () => {
        for (let i of document.getElementsByTagName("input")) {
            i.value="";
        }
    }

    // next question
    let nextQuestion = (e) => {
        let optionList = []
        let correctOption = null;
        for (let i of document.getElementsByClassName("inputOption")) {
            if (i.value.trim() !== "") {
                optionList.push(i.value.trim());
            }
        }
        for (let i of document.getElementsByName('correctOption')) {
            if (i.checked) {
                let id = i.id;
                correctOption = parseInt(id.slice(2,));
            }
        }
        if (document.getElementsByClassName('inputQuestion')[0].value.trim() !== "" && optionList.length > 1 && correctOption !== null) {
            let data = { "question": document.getElementsByClassName('inputQuestion')[0].value.trim(), "options": optionList, "answer": correctOption };
            let questionList = JSON.parse(localStorage.getItem("questionList")) || [];
            // if (localStorage.getItem("questionList")) {
            //     questionList.push(JSON.parse(localStorage.getItem("questionList")));
            // }
            questionList.push(data);
            localStorage.setItem("questionList", JSON.stringify(questionList));
            console.log(JSON.parse(localStorage.getItem("questionList")));
            clearInput();
        }
        else if (document.getElementsByClassName('inputQuestion')[0].value.trim() === "") {
            console.log("Question string cannt be null");
        }
        else if (optionList.length < 2) {
            console.log("Minimum Options are needed");
        }
        else {
            console.log("please provide the correct option");
        }
    }


    return (
        <center>
            <h1>Quizzer</h1>
            <div>
                <input className="inputQuestion" placeholder="Type Question..." />
                <div className="options" ref={optionRef}>
                    <div className="option op0">
                        <input type="radio" id="op0" name="correctOption"/>
                        <input className="inputOption" placeholder="Edit Question..." />
                    </div>
                    <div className="option op1">
                        <input type="radio" id="op1" name="correctOption"/>
                        <input className="inputOption" placeholder="Edit Question..."/>
                    </div>
                </div>
                <button onClick={addOption}>Add Options</button>
                <button onClick={nextQuestion}>Next Question</button>
            </div>
        </center>
    )
}

export default AddQuiz;


