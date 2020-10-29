import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {useHistory, Link} from "react-router-dom"
import firebase from './FirebaseSDK'
import Question from './Question';

function ShareQuiz(props) {
    // let quizId = props.match.params.id;
    let quizId = "-MKhm_8CmGIpHwib3yU4";
    // const firebaseRef = firebase.database().ref("Quizes/");
    // const [questionList, setquestionList] = useState([])
    const questionList = [{ answer: 1, options: ["bjkbiub", "kjknnjb"], question: "vvhvhjh" },
        { answer: 1, options: ["1755", "254"], question: "yfgjvghkv" },
        { answer: 1, options: ["hhjhhjj", "mkknknkmm"], question: "ghhvvhvvvvh" },
        { answer: 1, options: ["hjhjgh", "jhjhjgj"], question: "jhgjhgj" },
        {answer: 0, options: ["dsadsdsad", "dsaddsadsad", "hello"], question: "ddadasdsa"}
    ] 
    console.log(quizId);

    // useEffect(() => {
    //     firebaseRef.child(quizId).once("value").then(snap => setquestionList(snap.val()));
    //     }
    //     , [])
    function copyLink(){
        let copyInput = document.createElement("input");
        copyInput.value = "http://localhost:3000/Quiz/" + quizId;
        document.body.parentNode.appendChild(copyInput);
        copyInput.select();
        document.execCommand("copy")
        document.body.parentNode.removeChild(copyInput);
    }

    return (
        <div>
            <div className="container">
                <center>
                    <Question questions={questionList}/>
                    <div>Thanks for Creating Quiz :) {quizId}</div>
                        <div>
                            <div className="submitBtn">
                                {/* <img src={CopyBtn} onClick={copyLink} />
                                <div className="tooltip">Copy Poll Link</div> */}
                                <button onClick={copyLink}>Copy link</button>
                            </div>
                            <Link to="/createQuiz">
                                <div className="addPollBtn">
                                    {/* <img src={AddPollBtn} />
                                    <div className="tooltip">Create New Poll</div> */}
                                    <button>Create New Quiz</button>
                                </div>
                            </Link>
                        </div>
                </center>
            </div>
        </div>
    )
}

export default ShareQuiz;