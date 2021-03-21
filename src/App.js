import React, { useContext, useEffect, useState } from 'react';
import "./App.css";
import Welcome from "./website/welcome/Welcome";
import Play from "./website/play/Play";
import Quit from "./website/quit/Quit";
import { loadDictionary } from "./utility/dictionary";
import Left from './components/left/Left';
import Right from './components/right/Right';
import { ResizeContext } from './context/resizeContext';


//move constants to separate file

const WORD_MIN_LENGTH = 4;
const WORD_MAX_LENGTH = 12;


const DIFFICULTY_LEVELS = [
  { text: 'EASY', difficultyFactor: 1 },
  { text: 'MEDIUM', difficultyFactor: 1.5 },
  { text: 'HARD', difficultyFactor: 2 },
]
// eslint-disable-next-line
const MIN_DIFFICULTY_FACTOR = 1; //can't get easier than EASY
// eslint-disable-next-line
const MAX_DIFFICULTY_FACTOR = 3; // capping the difficulty

const APP_NAME = 'FAST FINGERS'
const TAG_LINE = 'the ultimate typing game'





export default function App() {

  const { isWideScreen } = useContext(ResizeContext);

  const [state, setState] = useState({
    playerName: 'Guest',
    gameName: '',
    gameStartDifficultyFactor: null,
    difficultyFactor: null,
    gameStartTime: null,
    screen: 'welcome',
    bestGame: ''
  })


  // eslint-disable-next-line
  const [isDictionaryLoading, setIsDictionaryLoading] = useState(false)

  const [previousGames, setPreviousGames] = useState([])

  useEffect(() => {
    fetchDictionary();
  }, [])


  async function fetchDictionary() {
    setIsDictionaryLoading(true)
    await loadDictionary(WORD_MIN_LENGTH, WORD_MAX_LENGTH);
    setIsDictionaryLoading(false)
  }


  function startGame(name = state.playerName, level = state.gameStartDifficultyFactor) {

    const gamesFromStorage = JSON.parse(localStorage.getItem(name));
    
    let gameNumber = previousGames.length;

    if(gamesFromStorage){
      setPreviousGames(gamesFromStorage)
      gameNumber = gamesFromStorage.length;
    }


    setState({
      ...state,
      screen: 'play',
      gameName: `Game ${gameNumber}`,
      gameStartTime: new Date().getTime(),
      playerName: name,
      difficultyFactor: level.difficultyFactor,
      gameStartDifficultyFactor: level
    })
  }

  function endGame() {

    const bestGame = appendToPreviousGames();
    setState({
      ...state,
      gameStartTime: null,
      difficultyFactor: null,
      screen: 'quit',
      bestGame
    })
  }


  function appendToPreviousGames() {
    const now = new Date().getTime();
    const gameTimeInMS = now - state.gameStartTime;
    const gameTime = `${parseInt(gameTimeInMS / 1000)}:${((gameTimeInMS % 1000) + '0').substring(0, 2)}` 
    const thisGame = {
      gameName: state.gameName,
      playerName: state.playerName,
      difficultyFactor: state.difficultyFactor,
      gameStartTime: state.gameStartTime,
      gameEndTime: now,
      gameTimeInMS,
      gameTime
    }

    const games = [...previousGames, thisGame]

    let bestGame = games[0]
    
    for(let i=1;i<games.length;i++){
      if (games[i].gameTimeInMS > bestGame.gameTimeInMS){
        bestGame = games[i]
      }
    }

    setPreviousGames([
      ...games
    ])
  
    localStorage.setItem(state.playerName, JSON.stringify(games)); //setting in localstorage

    return bestGame.gameName;
  }


  function quitGame() {
    //show alert
    // window.close();
    goToHome()
  }

  function goToHome() {

    setState({
      ...state,
      playerName: '',
      difficultyFactor: 1,
      screen: 'welcome'
    })
  }

  function successfulWord() {
    setState({
      ...state,
      difficultyFactor: state.difficultyFactor + 0.01
    })
  }

  return (
    <div className={`App ${isWideScreen ? 'wide-screen' : ''}`}>

      <div
        className="App-left">
        {state.screen !== 'welcome' && <Left
          previousGames={previousGames}
          screen={state.screen}
          playerName={state.playerName}
          bestGame={state.bestGame}
          difficultyLevels={DIFFICULTY_LEVELS}
          quit={quitGame}
          end={endGame}
          difficultyFactor={state.difficultyFactor}
          startGameDifficultyFactor= {state.gameStartDifficultyFactor} />}
      </div>


      <div className="App-middle" screen={state.screen}>

        {
          state.screen === 'welcome' &&
          <Welcome
            app={{ name: APP_NAME, tag: TAG_LINE }}
            difficultyLevels={DIFFICULTY_LEVELS}
            startGame={startGame}
          />
        }

        {
          state.screen === 'play' &&
          <Play
            difficultyFactor={state.difficultyFactor}
            onSuccess={successfulWord}
            onFailure={endGame}
          />
        }

        {
          state.screen === 'quit' &&
          <Quit
            game={previousGames[previousGames.length - 1]}
            bestGame={state.bestGame}
            goAgain={startGame}
          />
        }

      </div>


      <div className="App-right">
        {state.screen !== 'welcome' && <Right goHome={goToHome} screen={state.screen} />}
      </div>
    </div>
  );
}