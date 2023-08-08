import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import "../styles/portal.css";

export default function Portal() {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [attemptId, setAttemptId] = useState(null)
  const [progress, setProgress] = useState(0)

  const authContext = useContext(AuthContext);
  const userId = authContext.currentUser?.id;
  const isAuthenticated = !!authContext.currentUser;
  const isAuthChecked = authContext.isAuthChecked;

  useEffect(() => {
    console.log("1st USE EFFECT RAN")
    async function fetchData() {
      if(!isAuthChecked || !isAuthenticated) { return; }
      try {
        // Fetch questions
        const questionsResponse = await axios.get(`/api/quizzes/${quizId}`, { withCredentials: true });
        setQuestions(questionsResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    fetchData();
  }, [quizId, isAuthenticated, isAuthChecked]);

  useEffect(() => {
    console.log("2nd USE EFFECT RAN")
    async function fetchAttempt() {

      if (!isAuthChecked && !isAuthenticated || !userId){
        console.log("USERID NOT AVAILABLE or NOT AUTHENTICAED")
        return; // skip if userId is not available yet
      } 

      try {
        // Verify attempt and fetch progress
        const attemptResponse = await axios.get(`/api/users/${userId}/attempts/${quizId}`, { withCredentials: true });
        // console.log(attemptResponse.data)

        setAttemptId(attemptResponse.data.id);
        setProgress(attemptResponse.data.progress ?? 0);
      } catch (error) {
        // Only make the POST request if the error status is 404
        if (error.response && error.response.status === 404) {
            try {
                const postResponse = await axios.post(`/api/attempts/${userId}/${quizId}`, {}, { withCredentials: true });
                // Handle the response here
                console.log('Attempt created:', postResponse.data);
                setAttemptId(postResponse.data.id);
                setProgress(postResponse.data.progress ?? 0);
            } catch(postError) {
                console.error("Failed to create attempt:", postError);
            }
        } else {
            // If the error status is not 404, log the error
            console.error("Failed to fetch attempt:", error);
        }
      }
    }

    fetchAttempt();
  }, [userId, quizId, isAuthenticated, isAuthChecked]);  

  async function handleSubmission(userChoice){
    try {
      const getSubmissionResponse = await axios.get(`/api/submissions/${attemptId}/${questions[currentQuestion].id}`, { withCredentials: true })

      // If submission exists and userChoice is the same as the existing choice, do nothing
      if (getSubmissionResponse.data.submissionChoice === userChoice) {
        return;
      }

      // If submission exists but userChoice is different, update the existing submission
      await axios.patch(`/api/submissions/${attemptId}/${questions[currentQuestion].id}`, {
        submissionChoice: userChoice
      }, { withCredentials: true });

    } catch (error) {
      // If submission does not exist (status 404), create a new one
      if (error.response && error.response.status === 404) {
        console.log("ENTERED CATCH - SUBMISSION DOESN'T EXIST")
        try {
          const postResponse = await axios.post(`/api/submissions/${attemptId}/${questions[currentQuestion].id}`, {
            submissionChoice: userChoice
          }, { withCredentials: true });
          // If a submission is successfully created, increment progress
          if (postResponse.status === 201) {
            await axios.patch(`/api/attempts/${attemptId}`, {
              progress: progress+1
            }, { withCredentials: true })
            .then((response) => {
              // The progress value is assumed to be in the response data. Modify as per actual response structure.
              if (response.status === 200) {
                setProgress(response.data.progress);
              }
            })
            .catch((error) => {
              console.error("Failed to update progress:", error);
            });  

          }
        } catch(postError) {
          console.error("Failed to create submission:", postError);
        }
      }
      // For any other errors, log them
      else {
        console.error("Failed to handle submission:", error);
      }
    }
  }  

  return (
    <> 
      <h3>{progress} / {questions.length}</h3>
      <p>Attempt ID: {attemptId ?? "NONE"}</p>
      <p>User ID: {userId ?? "NONE"}</p>
      <h1 className="question-text">
        {questions[currentQuestion]?.questionText}
      </h1>
      <div className="answer-choices">
        {/* Multiple Choice Container */}
        {questions[currentQuestion]?.questionType === 0 && (
          questions[currentQuestion]?.answerChoices?.map((choice, index) => (
            <button key={index} onClick={() => handleSubmission(index)}>{choice}</button>
          ))
        )}
        {/* True/False Container */}
        {questions[currentQuestion]?.questionType === 1 && (
          <>         
            <button onClick={() => handleSubmission(1)}>True</button>
            <button onClick={() => handleSubmission(0)}>False</button>
          </>
        )}
        {/* Shore Answer Container */}
        {/* {questions[currentQuestion]?.questionType === 2 && (
          <>         
          <input type="text" /> 
          </>
        )} */}
      </div>
      {currentQuestion !== 0 && (
        <button onClick={() => setCurrentQuestion(currentQuestion - 1)}>
          Prev
        </button>
      )}
      {currentQuestion !== questions.length-1 && (
        <button onClick={() => setCurrentQuestion(currentQuestion + 1)}>
          Next
        </button>
      )}
    </>
  );
}