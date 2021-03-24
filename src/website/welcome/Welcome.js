import React, { useContext, useState } from "react";
import IconButton from "../../components/iconButton/IconButton";
import LineText from "../../components/lineText/LineText";
import "./Welcome.css";
import keyboard from "./../../assets/keyboard.svg";
import Input from "../../components/input/Input";
import Dropdown from "../../components/dropdown/Dropdown";
import play from "../../assets/play.svg";
import { ResizeContext } from '../../context/resizeContext'

export default function Welcome(props) {

  const [state, setState] = useState({ name: "", difficultyLevel: {}, errorInputMessage: "" });
  const {isWideScreen} = useContext(ResizeContext);

  function startGame() {
    props.startGame && props.startGame(state.name, state.difficultyLevel);
  }
  function onDifficultyLevelChange(difficultyLevel) {
    setState({
      ...state,
      difficultyLevel: { ...difficultyLevel }
    });
  }
  function onInputKeyUp(name) {
    setState({
      ...state,
      name: name.toUpperCase()
    });
  }
  function errorMessage (errorInputMessage) {
    setState({
      ...state,
      error: errorInputMessage
    });
    }
  
  return (
    <div className={`App-Home ${isWideScreen ? 'wide-screen': ''}`}>
      <img className="App-logo" src={keyboard} alt={props.app.name} />
      <span className="App-name">{props.app.name}</span>
      <LineText className="App-tag" text={props.app.tag} />
      <div>
      <Input
        onKeyUp={onInputKeyUp}
        placeholder={"Type Your Name"}
        tabIndex={0}
      />
      <p> {state.error} </p>
      <Dropdown
        default="EASY"
        options={props.difficultyLevels}
        onChange={onDifficultyLevelChange}
        tabIndex={0}
      />
      </div>
      <IconButton
        onClick={startGame}
        icon={play}
        fontSize={isWideScreen ? '48px' : '24px'}
        iconHeight={isWideScreen ? '71px' : '35px'}
        text={"Start Game"}
        tabIndex={0}
        disabled={!state.name || !state.difficultyLevel.difficultyFactor}
        callBack={errorMessage}
        player={state.name}
      />
    </div>
  );
}

