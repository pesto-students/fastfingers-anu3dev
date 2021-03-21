import React from 'react';
import IconButton from '../iconButton/IconButton';
import ScoreBoard from '../scoreboard/ScoreBoard';
import './Left.css'
import playerIcon from '../../assets/playerIcon.svg';
import levelIcon from '../../assets/game.svg';
import crossIcon from '../../assets/cross.svg';

export default function Left(props){

  function stopGameClicked(){
    props.end && props.end();
  }

  function quitGameClicked(){
    props.end && props.quit();
  }

  function calculateLevel(){

    let difficultyFactor = props.difficultyFactor;

    if(!difficultyFactor){
      difficultyFactor = props.startGameDifficultyFactor
    }

    if (props.difficultyFactor < 1.5){
      return 'EASY'
    }

    if (props.difficultyFactor >= 1.5 && props.difficultyFactor < 2 ) {
      return 'MEDIUM'
    }

    if (props.difficultyFactor >= 2) {
      return 'HARD'
    }
  }

  return (
    <div className="App-left__panel">
      <div className="game-details">
        <IconButton 
          disabled={true}
          fontSize='44px'
          iconHeight='40px'
          text={props.playerName}
          icon={playerIcon}/>

        <IconButton 
          disabled={true}
          fontSize='44px'
          iconHeight='40px'
          text={calculateLevel()}
          icon={levelIcon} />
      </div>
      <div className="score-card-container">
        {props.screen === 'play' && <ScoreBoard scores={props.previousGames} bestGame={props.bestGame} />}
      </div>
      <div className="game-end">
        {props.screen === 'play' && 
        <IconButton
         onClick={stopGameClicked}
        text={'STOP'}
        fontSize='47px'
        icon={crossIcon}
          iconHeight='70px'/>}
        
        {props.screen === 'quit' &&
        <IconButton 
          onClick={quitGameClicked}
          fontSize='57px'
          text={'QUIT'} />}
      </div>
    </div>
  );
};
