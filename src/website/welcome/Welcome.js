import React, { useContext, useState, useRef } from "react";
import "./Welcome.css";
import keyboard from "./../../assets/keyboard.svg";
import Dropdown from "../../components/dropdown/Dropdown";
import play from "../../assets/play.svg";
import { ResizeContext } from '../../context/resizeContext'

export default function Welcome(props) {
  const inputRef = useRef();
  const [state, setState] = useState({ name: "", difficultyLevel: {}, error:""});
  const {isWideScreen} = useContext(ResizeContext);

  function startGame() {
    if(!state.name || !state.difficultyLevel){
      Error();
    } else{
      props.startGame && props.startGame(state.name, state.difficultyLevel);
    }
  }
  function Error(error){
    setState({
      ...state,
      error: "Player name is missing."
    });
  }
  function onDifficultyLevelChange(difficultyLevel) {
    setState({
      ...state,
      difficultyLevel: { ...difficultyLevel }
    });
  }
  function onKeyUpHandler() {
    const playerName = inputRef.current.value.toUpperCase();
    props.onKeyUp && props.onKeyUp(playerName);
    setState({
          ...state,
          name: playerName
        });
  }
  return (
    <div className={`App-Home ${isWideScreen ? 'wide-screen': ''}`}>
      <img className="App-logo" src={keyboard} alt={props.app.name} />
      <span className="App-name">{props.app.name}</span>
      <span className="App-tag App-line-text">
        <span className="line"></span>
        <span className="text">{props.app.tag}</span>
        <span className="line"></span>
      </span>
      <input type="text"
        className={`App-Input ${isWideScreen ? 'wide-screen' : ''} `}
        ref={inputRef}
        tabIndex={0}
        placeholder={"Type Your Name"}
        onKeyUp={onKeyUpHandler}
        style={props.style}
        autoFocus
      />
      <p>{state.error}</p>
      <Dropdown
        default="EASY"
        options={props.difficultyLevels}
        onChange={onDifficultyLevelChange}
        tabIndex={0}
      />
      <button
        className="App-Icon-Button"
        onClick={startGame}
      >
        <img src={play} alt=""/>Start Game
      </button>
    </div>
  );
}

