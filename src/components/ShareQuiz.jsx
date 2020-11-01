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
        async function fetchData() {
            await firebaseRef.child(quizId).once("value").then(snap => setquestionList(snap.val()));
        }
        fetchData()
        }
    , [])
    function copyLink(e){
        const copyInput = document.createElement("input");
        copyInput.value = "https://quizcreator.netlify.app/Quiz/" + quizId;
        document.body.parentNode.appendChild(copyInput);
        copyInput.select();
        document.execCommand("copy")
        document.body.parentNode.removeChild(copyInput);
    }

    return (
        <center>
            <div className="container">
                <div className="questionBox">
                    {questionList.length > 0 ? <Question questions={questionList} /> : <p>Loading...</p>}
                    
                    <div className="buttonSet">
                        <div className="submitBtn">
                            <button className="functionalBtn" onClick={copyLink}>Copy link</button>
                        </div>
                        <Link to="/createQuiz">
                            <div className="addPollBtn">
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