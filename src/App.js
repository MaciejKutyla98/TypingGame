import faker from 'faker';
import React, { useState, useEffect } from 'react';
import './App.css';

function Score(props) {
    return (
      <div className="current-score">
          <p>
                Your score after {props.counter} words is: {props.score.toFixed(2)}
          </p>
      </div>
    );
}

function DisplayWord(props){
    return (
        <div className="word-generator">
            <p>
                {props.word}
            </p>
        </div>
    );
}

function InputForm(props) {
    return (
        <div className='input-form'>
            <form>
                <input type="text"
                       className="user-input"
                       value={props.value}
                       autocomplete="off"
                       onChange={(e) => {
                    props.onChange(e.target.value);
                }} />
            </form>
        </div>
    );
}

function Timer(props) {
    return (
        <div className="reverse-timer">
            <div>
                {props.seconds.toFixed(1) + ' sec'}
            </div>
        </div>
    );
}

function Popup(props) {
    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Your score is: {props.score.toFixed(2)}</h2>
                <button className="close-btn"
                        onClick={() => props.onClick()}
                >Play again!</button>
            </div>
        </div>
    );
}

function App() {
    const generateWord = () => {
        return faker.random.word();
    }
    const [word, setWord] = useState(generateWord());
    const [enteredWord, setEnteredWord] = useState('');
    const [score, setScore] = useState(0);
    const [seconds, setSeconds] = useState(10);
    const [popup, setPopup] = useState(false);
    const [counter, setCounter] = useState(0);
    const [isGameInProgress, setIsGameInProgress] = useState(false);

    function handleCorrectWord() {
        setScore((prevScore) => prevScore + seconds);
        setEnteredWord('');
        setWord(generateWord());
        setSeconds(10);
        setCounter(counter + 1);
    }

    function handleEndTime() {
        setPopup(true);
        setSeconds(0);
        setIsGameInProgress(false);
    }

    function handleGameStart() {
        setScore(0);
        setSeconds(10);
        setEnteredWord('');
        setWord(generateWord());
        setCounter(0);
        setPopup(false);
    }

    useEffect(()  => {
        const timer =
            seconds > 0.1 && setTimeout(() => setSeconds(seconds - 0.1), 100);
        if (word === enteredWord) {
            handleCorrectWord();
        }
        if (seconds < 0.1) {
            handleEndTime();
        }
        if (isGameInProgress == true){
            handleGameStart();
        }
        return () => clearInterval(timer);
    }, [word, enteredWord, seconds, isGameInProgress]);

  return (
    <div className="Game">
        <Score score={score} counter={counter}/>
        <DisplayWord word={word}/>
        <InputForm value={enteredWord}
                   onChange={(newValue) => {
                       setEnteredWord(newValue)
                   }}
        />
        <Timer seconds={seconds}/>
        {popup &&
        (<Popup trigger={popup}
               score={score}
               onClick={() => {
                   setIsGameInProgress(true);
                   setPopup(false);
               }}
         />
        )}
    </div>
  );
}

export default App;
