import React, { useEffect, useState } from "react";
import "./App.css";
import Play from "./website/play/Play";
import Welcome from "./website/welcome/Welcome";
import Quit from "./website/quit/Quit";
import { loadDictionary } from "./dictionary";

const WORD_MIN_LENGTH = 4;
const WORD_MAX_LENGTH = 12;

const DIFFICULTY_LEVELS = [
  { text: "EASY", difficultyFactor: 1 },
  { text: "MEDIUM", difficultyFactor: 1.5 },
  { text: "HARD", difficultyFactor: 2 }
];


const APP_NAME = "FAST FINGERS";

const TAG_LINE = "the ultimate typing game";

export default function App() {
  const [state, setState] = useState({
    playerName: "Guest",
    gameName: "",
    gameStartDifficultyFactor: null,
    difficultyFactor: null,
    gameStartTime: null,
    page: "welcome",
    bestGame: ""
  });

  // eslint-disable-next-line
  const [isDictionaryLoading, setIsDictionaryLoading] = useState(false);

  const [previousGames, setPreviousGames] = useState([]);

  useEffect(() => {
    fetchDictionary();
  }, []);

  async function fetchDictionary() {
    setIsDictionaryLoading(true);
    await loadDictionary(WORD_MIN_LENGTH, WORD_MAX_LENGTH);
    setIsDictionaryLoading(false);
  }


  function startGame(
    name = state.playerName,
    level = state.gameStartDifficultyFactor
  ) {
    const gamesFromStorage = JSON.parse(localStorage.getItem(name));

    let gameNumber = previousGames.length;

    if (gamesFromStorage) {
      setPreviousGames(gamesFromStorage);
      gameNumber = gamesFromStorage.length;
    }

    setState({
      ...state,
      page: "play",
      gameName: `Game ${gameNumber}`,
      gameStartTime: new Date().getTime(),
      playerName: name,
      difficultyFactor: level.difficultyFactor,
      gameStartDifficultyFactor: level
    });
  }

  function endGame() {
    const bestGame = appendToPreviousGames();
    setState({
      ...state,
      gameStartTime: null,
      difficultyFactor: null,
      page: "quit",
      bestGame
    });
  }


  function appendToPreviousGames() {
    const now = new Date().getTime();
    const gameTimeInMS = now - state.gameStartTime;
    const gameTime = `${parseInt(gameTimeInMS / 1000)}:${(
      (gameTimeInMS % 1000) +
      "0"
    ).substring(0, 2)}`;
    const thisGame = {
      gameName: state.gameName,
      playerName: state.playerName,
      difficultyFactor: state.difficultyFactor,
      gameStartTime: state.gameStartTime,
      gameEndTime: now,
      gameTimeInMS,
      gameTime
    };

    const games = [...previousGames, thisGame];

    let bestGame = games[0];

    for (let i = 1; i < games.length; i++) {
      if (games[i].gameTimeInMS > bestGame.gameTimeInMS) {
        bestGame = games[i];
      }
    }

    setPreviousGames([...games]);

    localStorage.setItem(state.playerName, JSON.stringify(games)); 

    return bestGame.gameName;
  }


  function successfulWord() {
    setState({
      ...state,
      difficultyFactor: state.difficultyFactor + 0.01
    });
  }

  return (
    <div className="App">
      <div className="App-left">

      </div>

      <div className="App-middle">
        {state.page === "welcome" && (
          <Welcome
            app={{ name: APP_NAME, tag: TAG_LINE }}
            difficultyLevels={DIFFICULTY_LEVELS}
            startGame={startGame}
          />
        )}

        {state.page === "play" && (
          <Play
            difficultyFactor={state.difficultyFactor}
            onSuccess={successfulWord}
            onFailure={endGame}
          />
        )}

        {state.page === "quit" && (
          <Quit
            game={previousGames[previousGames.length - 1]}
            goAgain={startGame}
          />
        )}
      </div>
      <div className="App-right">
        
      </div>
    </div>
  );
}
