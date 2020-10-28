import React, { useRef } from 'react'
import {useHistory} from 'react-router-dom'
import firebase from "./FirebaseSDK"

function AddQuiz() {
    const optionRef = useRef();
    let optionNum = 2
    let firebaseRef = firebase.database().ref().child("Quizes");
    let history = useHistory();
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
        // delete button 
        let deleteButton = document.createElement("img");
        deleteButton.className = "delete"
        deleteButton.src = "./delete.png"
        deleteButton.name= `op${optionNum}`
        deleteButton.addEventListener("click",(element)=>deleteOption(element)); 
        // option div
        let optionDiv = document.createElement("div");
        optionDiv.classList.add(...optionClasses);
        optionDiv.appendChild(optionCheckBox);
        optionDiv.appendChild(option);
        optionDiv.appendChild(deleteButton);
        optionRef.current.appendChild(optionDiv);
        optionNum++;
        
    }

    // delete option
    let deleteOption = (element) => {
        console.log(element.target.name);
        let deleteItemWithClass = element.target.name;
        if (document.getElementsByClassName("option").length > 2) {
            console.log(element.target);
            document.getElementsByClassName(deleteItemWithClass)[0].remove();
        }
        else {
            console.log("Minimum 2 Options are needed");
        }
    }

    // clear input
    let clearInput = () => {
        for (let i of document.getElementsByTagName("input")) {
            i.value="";
        }
        let options = document.getElementsByClassName("option");
        while (document.getElementsByClassName("option").length > 2) {
            document.getElementsByClassName("option")[options.length -1].remove()
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
        let isQuestionPresent = document.getElementsByClassName('inputQuestion')[0].value.trim() !== "";
        let haveOptions = optionList.length > 1;
        let isCorrectProvided = correctOption !== null
        if (isQuestionPresent && haveOptions && isCorrectProvided) {
            let data = {
                "question": document.getElementsByClassName('inputQuestion')[0].value.trim(),
                "options": optionList,
                "answer": correctOption
            };
            let questionList = JSON.parse(localStorage.getItem("questionList")) || [];
            questionList.push(data);
            localStorage.setItem("questionList", JSON.stringify(questionList));
            // firebaseRef.push(questionList);
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

    // create Quiz
    let createQuiz = () => {
        let questionList = JSON.parse(localStorage.getItem("questionList"));
        // firebaseRef.push(questionList);
        localStorage.clear();
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
                        <img className="delete" src="./delete.png"  name="op0" onClick={(element)=>deleteOption(element)}/>
                    </div>
                    <div className="option op1">
                        <input type="radio" id="op1" name="correctOption"/>
                        <input className="inputOption" placeholder="Edit Question..." />
                        <img className="delete" src="./delete.png" name="op1" onClick={(element)=>deleteOption(element)}/>
                    </div>
                </div>
                <button onClick={addOption}>Add Options</button>
                <button onClick={nextQuestion}>Next Question</button>
                <button onClick={createQuiz}>Create Quiz</button>
            </div>
        </center>
    )
}

export default AddQuiz; 