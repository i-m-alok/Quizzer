import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link} from "react-router-dom"
import firebase from './FirebaseSDK'
import Question from './Question';

function ShareQuiz(props) {
    let quizId = props.match.params.id;
    const firebaseRef = firebase.database().ref("Quizes/");
    const [questionList, setquestionList] = useState([])
    useEffect(() => {
        firebaseRef.child(quizId).once("value").then(snap => setquestionList(snap.val()));
        }
        , [])
    
    function copyLink(){
        let copyInput = document.createElement("input");
        copyInput.value = "http://localhost:3000/Quiz/" + quizId;
        document.body.parentNode.appendChild(copyInput);
        copyInput.select();
        document.execCommand("copy")
        document.body.parentNode.removeChild(copyInput);
    }

    return (
        <center>
            <div className="container">
                {/* <div>Thanks for Creating Quiz :) {quizId}</div> */}
                <div className="questionBox">
                    {questionList.length > 0 ? <Question questions={questionList} /> : null }
                    
                    <div className="buttonSet">
                        <div className="submitBtn">
                            {/* <img src={CopyBtn} onClick={copyLink} />
                            <div className="tooltip">Copy Poll Link</div> */}
                            <button className="functionalBtn" onClick={copyLink}>Copy link</button>
                        </div>
                        <Link to="/createQuiz">
                            <div className="addPollBtn">
                                {/* <img src={AddPollBtn} />
                                <div className="tooltip">Create New Poll</div> */}
                                <button className="functionalBtn">Create New Quiz</button>
                            </div>
                        </Link>
                    </div>
                </div>
                
            </div>
        </center>
        
    )
}

export default ShareQuiz;