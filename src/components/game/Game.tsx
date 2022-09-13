import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GameProps, Scores } from "./types";
import { MdPause, MdPlayArrow, MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Word } from "./Word";
import { Score } from "./Score";
import "./Game.css";

export const Game = ({letter, participants, timer, resetGame, verifyWords, availableWords}: GameProps) => {
  const [currentParticipantIndex, setCurrentParticipantIndex] = useState(0);
  const [mentionedWords, setMentionedWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [showWords, setShowWords] = useState(false);
  const [scores, setScores] = useState<Scores>({});
  const [showScore, setShowScore] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (participants.length == 0) { /* redirect to home after browser refresh */
      navigate("/");
    }

    if (timer != null) {
      setSeconds(timer);
    }

    participants.forEach((participant) => {
      scores[participant] = {participant: participant, score: 0};
    });
  }, []);

  useEffect(() => {
    if (timer != null) {
      let interval: number | undefined = undefined;

      if (timerActive) {
        interval = setInterval(() => {
          setSeconds(seconds => seconds - 1);
        }, 1000);
      } else if (!timerActive && seconds != 0) {
        clearInterval(interval);
      }

      if (seconds <= 0) {
        setSeconds(timer);

        if (currentParticipantIndex < participants.length - 1) {
          setCurrentParticipantIndex(currentParticipantIndex => currentParticipantIndex + 1);
        } else {
          setCurrentParticipantIndex(0);
        }
      }
  
      return () => clearInterval(interval);
    }
  }, [seconds, timerActive]);

  const validateAndSetCurrentWord = (word: string) => {
    const wordRegex = /^$|[a-zA-Z]/g;
    if (wordRegex.test(word)) {
      setCurrentWord(word);
    }
  };

  const handleSubmit = () => {
    if (currentWord.length <= 1) {
      setErrorMessage("Mindestens zwei Buchstaben notwendig");

      return;
    }

    if (currentWord.toLowerCase().charAt(0) != letter.toLowerCase()) {
      setErrorMessage("Wort muss mit " + letter + " anfangen");

      return;
    }

    const lowerCaseMentionedWords = mentionedWords.map((mentionedWord: string) => mentionedWord.toLowerCase());
    if (lowerCaseMentionedWords.includes(currentWord.toLowerCase())) {
      setErrorMessage("Wort wurde bereits genannt");

      return;
    }

    if (verifyWords && !availableWords.includes(currentWord.toLowerCase())) {
      setErrorMessage("Wort wurde nicht gefunden");

      return;
    }

    let newScores: Scores = scores;
    newScores[participants[currentParticipantIndex]].score++;
    setScores(newScores);

    setCurrentWord("");
    setErrorMessage("");

    if (timer != null) {
      setSeconds(timer);
    }

    if (currentParticipantIndex < participants.length - 1) {
      setCurrentParticipantIndex(currentParticipantIndex => currentParticipantIndex + 1);
    } else {
      setCurrentParticipantIndex(0);
    }

    setMentionedWords([...mentionedWords, currentWord]);
  };

  const handleKeyDown = (event: any) => {
    if (event.key == "Enter") {
      handleSubmit();
    }
  };

  const handleRestart = () => {
    resetGame();

    navigate("/group-selection");
  };

  const toggleShowWords = () => {
    setShowScore(false);
    setShowWords(!showWords);
  };

  const toggleShowScore = () => {
    setShowWords(false);
    setShowScore(!showScore);
  };

  const timerIcon = timerActive
    ? <MdPause id="game-pause-icon" onClick={() => setTimerActive(false)} />
    : <MdPlayArrow id="game-play-icon" onClick={() => setTimerActive(true)} />;

  let scoreNodes: any = [];
  Object.keys(scores).forEach((participant: string, index: number) => {
    scoreNodes.push(<Score key={index} score={scores[participant]} />);
  });

  return (
    <div id="game">
      <div id="game-body">
        <p id="game-headline">Finde Wörter mit dem<br/>Anfangsbuchstaben {letter}</p>
        <div id="game-current-participant-name">{participants[currentParticipantIndex]},</div>
        <div id="game-current-participant-headline">du bist dran!</div>
        {timer != null && <div id="game-timer">
          <div>{timerIcon}</div>
          <div>{seconds}</div>
        </div>}
        <input 
          id="game-word-input" 
          type="text" 
          placeholder="Wort" 
          value={currentWord} 
          onChange={event => validateAndSetCurrentWord(event.target.value)} 
          onKeyDown={handleKeyDown}
          ref={input => input && input.focus()} 
        />
        <div id="game-error">{errorMessage}</div>
        <button id="game-submit-button" onClick={handleSubmit}>FERTIG</button>
        <div>
          <button id="game-words-button" onClick={toggleShowWords}>WÖRTER {showWords ? "AUS" : "EIN"}</button>
          <button id="game-score-button" onClick={toggleShowScore}>SCORE {showScore ? "AUS" : "EIN"}</button>
        </div>
        <div>
          <div className="game-evaluation-container">
            {showWords && mentionedWords.map((word: string, index: number) => <Word key={index} word={word} />)}
          </div>
          <div className="game-evaluation-container">
            {showScore && scoreNodes}
          </div>
        </div>
        <button id="game-restart-button" onClick={handleRestart}>NEUSTART</button>
      </div>
    </div>
  );
};
