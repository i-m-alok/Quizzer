import React, { useRef } from 'react'
import {useHistory, Link} from "react-router-dom"
import firebase from './FirebaseSDK'

function ShareQuiz() {
    let shareData = useRef();
    function sharePoll(){
        navigator.share(shareData.current)
    }
    return (
        <div>
            <div className="container">
                <center>
                    <div>Thanks for Creating Quiz :)</div>
                        <div>
                            <div className="submitBtn">
                                {/* <img src={CopyBtn} onClick={copyLink} />
                                <div className="tooltip">Copy Poll Link</div> */}
                                <button>Copy link</button>
                            </div>
                            <Link to="/AddPoll">
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