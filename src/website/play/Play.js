import React, { useContext, useEffect, useState } from "react";
import Input from "../../components/input/Input";
import Timer from "../../components/timer/Timer";
import Word from "../../components/word/Word";
import { getRandomWordFromDictionary } from "../../utility/dictionary";
import mapRange from "../../utility/mapRange";
import { ResizeContext } from '../../context/resizeContext'

import "./Play.css";

const GAME_STATES = {
  READY: 'ready',
  PLAY: 'play',
  SUCCESS: 'success',
  FAIL: 'fail'
}

const SUCCESS_TEXT = ['Ready for next!']


export default function Play(props) {

  const [state, setState] = useState({
    word: '',
    typedWord: '',
    gameState: GAME_STATES.READY,
    successText: '',
    introText: 1
  })

  const { isWideScreen } = useContext(ResizeContext);

  useEffect(() => {
    setTimeout(() => {
      giveNewWord();
    }, 3000);

    setTimeout(() => {
      setState({
        ...state,
        introText: 2
      })
    }, 1000)

    setTimeout(() => {
      setState({
        ...state,
        introText: 3
      })
    }, 2000)

    // eslint-disable-next-line
  }, [])


  function getRandomSuccessText() {
    const text = SUCCESS_TEXT[parseInt(Math.random() * 10) % SUCCESS_TEXT.length];
    return text;
  }

  function getWordLengthFromDifficultyFactor(diffFactor, minFactor, maxFactor, minLength, maxLength) {
    const mappedValue = mapRange(diffFactor, [minFactor, maxFactor], [minLength, maxLength]);
    return mappedValue;
  }

  
  function giveNewWord() {
    const word = getRandomWord();
    setState({
      ...state,
      word,
      typedWord: '',
      gameState: GAME_STATES.PLAY
    })
  }


  function inputChanged(value) {
    setState({
      ...state,
      typedWord: value
    })
  }


  function getRandomWord() {
    const wordLength = parseInt(getWordLengthFromDifficultyFactor(((props.difficultyFactor % 1) % 0.5) * 100, 0, 50, 4, 12))
    return getRandomWordFromDictionary(wordLength);
  }

  function onTimerComplete() {
    setState({
      ...state,
      gameState: GAME_STATES.FAIL
    })
    setTimeout(() => {
      props.onFailure && props.onFailure();
    }, 1000);

  }

  function onWordMatch() {

    setState({
      ...state,
      gameState: GAME_STATES.SUCCESS,
      successText: getRandomSuccessText()
    })
    props.onSuccess && props.onSuccess();

    setTimeout(() => {
      giveNewWord();
    }, 1000);
  }


  return (
    <div className={`App-Game ${isWideScreen ? 'wide-screen' : ''}`}>
      {
        state.gameState === GAME_STATES.READY &&
        <>
          {state.introText === 1 && <div className="intro-text">3</div>}
          {state.introText === 2 && <div className="intro-text">2</div>}
          {state.introText === 3 && <div className="intro-text">1</div>}
        </>
      }

      {
        state.gameState === GAME_STATES.PLAY &&
        <>
          <Timer onComplete={onTimerComplete} timeInSec={state.word.length / props.difficultyFactor} />
          <Word onMatch={onWordMatch} word={state.word} typedWord={state.typedWord} />
          <Input style={{ textAlign: 'center' }} onKeyUp={inputChanged} />
        </>
      }

      {
        state.gameState === GAME_STATES.SUCCESS &&
        <div>{state.successText}</div>
      }

      {
        state.gameState === GAME_STATES.FAIL &&
        <>
          <div>Oops!</div>
        </>
      }

    </div>
  )
}

