import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GameProps } from "./types";
import { MdPause, MdPlayArrow } from "react-icons/md";
import { Word } from "./Word";
import "./Game.css";

export const Game = ({letter, participants, timer, resetGame}: GameProps) => {
  const [currentParticipantIndex, setCurrentParticipantIndex] = useState(0);
  const [words, setWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [showWords, setShowWords] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (participants.length == 0) { /* redirect to home after browser refresh */
      navigate("/");
    }

    if (timer != null) {
      setSeconds(timer);
    }
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

    if (currentWord.charAt(0).toLowerCase() != letter.toLowerCase()) {
      setErrorMessage("Wort muss mit " + letter + " anfangen");

      return;
    }

    if (words.includes(currentWord.toLowerCase())) {
      setErrorMessage("Wort wurde bereits genannt");

      return;
    }

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

    setWords([...words, currentWord.toLowerCase()]);
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

  const timerIcon = timerActive
    ? <MdPause id="game-pause-icon" onClick={() => setTimerActive(false)} />
    : <MdPlayArrow id="game-play-icon" onClick={() => setTimerActive(true)} />;

  return (
    <div id="game">
      <div id="game-body">
        <div className="game-headline">Finde Wörter mit dem</div>
        <div className="game-headline">Anfangsbuchstaben {letter}</div>
        <div id="game-current-participant-name">{participants[currentParticipantIndex]},</div>
        <div id="game-current-participant-headline">du bist dran!</div>
        {timer != null && <div id="game-timer">{timerIcon} {seconds}</div>}
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
        <button id="game-submit-button" onClick={handleSubmit}>Fertig</button>
        <button id="game-words-button" onClick={() => setShowWords(!showWords)}>Wörter {showWords ? "ausblenden" : "anzeigen"}</button>
        <div id="game-words">
          {showWords && words.map((word: string) => <Word word={word} />)}
        </div>
        <button id="game-restart-button" onClick={handleRestart}>Neustart</button>
      </div>
    </div>
  );
};
