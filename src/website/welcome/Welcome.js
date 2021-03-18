import React, { useState } from "react";
import IconButton from "../../components/iconButton/IconButton";
import LineText from "../../components/lineText/LineText";
import "./Welcome.css";
import keyboard from "./../../assets/keyboard.svg";
import Input from "../../components/input/Input";
import Dropdown from "../../components/dropdown/Dropdown";
import play from "../../assets/play.svg";

export default function Welcome(props) {
  const [state, setState] = useState({ name: "", difficultyLevel: {} });
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

  
  return (
    <div className="App-Home">
      <img className="App-logo" src={keyboard} alt={props.app.name} />
      <span className="App-name">{props.app.name}</span>
      <LineText className="App-tag" text={props.app.tag} />
      <Input
        onKeyUp={onInputKeyUp}
        placeholder={"Type Your Name"}
        tabIndex={0}
      />
      <Dropdown
        default={{ text: "DIFFICULTY LEVEL" }}
        options={props.difficultyLevels}
        onChange={onDifficultyLevelChange}
        tabIndex={0}
      />

      <IconButton
        onClick={startGame}
        icon={play}
        text={"Start Game"}
        tabIndex={0}
        disabled={!state.name || !state.difficultyLevel.difficultyFactor}
      />
    </div>
  );
}

