import React from "react";
import IconButton from "../../components/iconButton/IconButton";
import "./Quit.css";
import reload from "../../assets/reload.svg";

export default function Quit(props) {
  
    function playAgainClicked(){
      props.goAgain && props.goAgain();
    }
  
    return (
      <div className="App-EndGame">
        <span className="end__game-name">SCORE : {props.game.gameName}</span>
        <span className="end__game-time">{props.game.gameTime}</span>
        {props.bestGame === props.game.gameName && <span className="end__game-high">New High Score</span>}
        <IconButton 
          onClick={playAgainClicked}
          fontSize='54px'
          text={'PLAY AGAIN'}
          icon={reload}
          iconHeight='54px'/>
      </div>
    )
  }
