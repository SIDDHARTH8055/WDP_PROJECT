import React, { useEffect, useRef, useState } from "react";
import questions from "./Questions"; // Import the questions
import "./Dino.css";

function Dino() {
  const dinoRef = useRef();
  const cactusRef = useRef();
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [questionVisible, setQuestionVisible] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question index

  const jump = () => {
    if (!!dinoRef.current && !dinoRef.current.classList.contains("jump")) {
      dinoRef.current.classList.add("jump");
      setTimeout(() => {
        dinoRef.current.classList.remove("jump");
      }, 300);
    }
  };

  useEffect(() => {
    const isAlive = setInterval(function () {
      if (gameOver || questionVisible || !gameStarted) return;

      const dinoTop = parseInt(getComputedStyle(dinoRef.current).getPropertyValue("top"));
      let cactusLeft = parseInt(getComputedStyle(cactusRef.current).getPropertyValue("left"));

      if (cactusLeft < 40 && cactusLeft > 0 && dinoTop >= 140) {
        setGameOver(true);
        setQuestionVisible(true);
        clearInterval(isAlive);
      } else {
        setScore(score + 1);
      }
    }, 10);

    return () => clearInterval(isAlive);
  }, [score, gameOver, questionVisible, gameStarted]);

  useEffect(() => {
    if (gameStarted) {
      document.addEventListener("keydown", jump);
      return () => document.removeEventListener("keydown", jump);
    }
  }, [gameStarted]);

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.correctAnswer) {
      setGameOver(false);
      setQuestionVisible(false);
      setAttemptsLeft(3);
      setScore(score + 10);
      nextQuestion();
    } else {
      const newAttempts = attemptsLeft - 1;
      if (newAttempts === 0) {
        alert("Incorrect answer! Game Over.");
        setGameOver(true);
        setQuestionVisible(false);
      } else {
        setAttemptsLeft(newAttempts);
      }
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("You have completed all questions! Game Over.");
      setGameStarted(false);
      setGameOver(true);
      setQuestionVisible(false);
    }
  };

  useEffect(() => {
    if (gameOver || questionVisible) {
      cactusRef.current.style.animation = "none";
    } else if (gameStarted) {
      cactusRef.current.style.animation = "block 2s infinite linear";
    }
  }, [gameOver, questionVisible, gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAttemptsLeft(3);
    setGameOver(false);
    setQuestionVisible(false);
  };

  return (
    <div className="game-container">
      <h1 className="game-title">Game for LAXMIPRIYA</h1>
      <div className="game">
        <div>
          Score: {score} | Question: {currentQuestionIndex + 1}/{questions.length}
        </div>
        <div id="dino" ref={dinoRef}></div>
        <div id="cactus" ref={cactusRef}></div>

        {!gameStarted && (
          <div className="start-button-container">
            <button className="start-button" onClick={startGame}>
              Start Game
            </button>
          </div>
        )}

        {questionVisible && (
          <div className="question-container">
            <p>{questions[currentQuestionIndex].question}</p>
            <p>Attempts left: {attemptsLeft}</p>
            <div className="options">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button key={index} onClick={() => handleAnswer(option)}>
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <footer className="game-footer">Designed by [JAGDEV PANDA]</footer>
    </div>
  );
}

export default Dino;
