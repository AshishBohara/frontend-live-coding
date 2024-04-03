import React, { useState } from "react";

import { QUESTIONS } from '../utility/QuestionList';

const Exam = () => {
    const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null)); // Store the answers
    const [avgScore, setAvgScore] = useState(0); // store the average score
    const [score, setScore] = useState(0); // store the score

    // Call the calculate function for calculate the score and average score also store the score onto local storage.
    const caculate = async (e) => {
        e.preventDefault();
        let countAnswer = answers.filter(item => item === 'yes').length;
        let allRun = localStorage.getItem("allRun");
        let numberOfRun = 1;
        if (allRun !== null) {
            allRun = +allRun;
        }
        let overallRunApp = allRun + numberOfRun;
        localStorage.setItem("allRun", overallRunApp);
        let oldScore = 0;

        // Get the previous score data
        if (allRun > 0) {
            for (let i = 1; i <= allRun; i++) {
                oldScore += +localStorage.getItem(`score${i}`);
            }
        }
        // Calculate the score
        let scoreNo = 100 * countAnswer / QUESTIONS.length;
        setScore(scoreNo);
        localStorage.setItem(`score${overallRunApp}`, scoreNo);

        // Calculate the avg score
        oldScore += scoreNo;
        setAvgScore(Math.round(oldScore / overallRunApp * 100) / 100)
    }

    // call the function for add the answer into local state
    const handleAnswer = (index, value) => {
        const data = [...answers];
        data[index] = value;
        setAnswers(data);
    }

    return (<>
        <h2>Score : {score}</h2>
        <h2>Average Score : {avgScore}</h2>
        <form onSubmit={(e) => caculate(e)}>
            {QUESTIONS.map((item, index) => (
                <div key={index} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <p>{`${index + 1}. ${item}`}</p>
                    <label>
                        Yes
                        <input type="radio" name={`question${index}`}
                            value="yes" checked={answers[index] === 'yes'}
                            onChange={() => handleAnswer(index, 'yes')} />
                    </label>
                    <label>
                        No
                        <input type="radio" name={`question${index}`}
                            value="no" checked={answers[index] === 'no'}
                            onChange={() => handleAnswer(index, 'no')} />
                    </label>
                </div>
            ))}
            <button type="submit" >Submit</button>
        </form >
    </>)
}

export default Exam;