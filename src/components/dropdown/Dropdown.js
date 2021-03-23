import React, { useContext, useEffect, useState } from "react";
import "./Dropdown.css";
import dropdown from "../../assets/dropdown.svg";
import { ResizeContext } from "../../context/resizeContext"

export default function Dropdown(props) {

  const {isWideScreen} = useContext(ResizeContext);

  const [state, setState] = useState({
    selectedText: "EASY",
    selectedIndex: 0,
    options: [],
    isOptionsOpen: false
  });

  useEffect(() => {
    setState({
      selectedText: props.default,
      selectedIndex: -1,
      options: props.options
    });
    // eslint-disable-next-line
  }, []);

  function optionClicked(option, index) {
    setState({
      ...state,
      selectedText: option.text,
      selectedIndex: index,
      isOptionsOpen: false
    });

    props.onChange && props.onChange(option, index);
  }

  function toggleOptions() {
    setState({
      ...state,
      isOptionsOpen: !state.isOptionsOpen
    });
  }

  function keyDowned(keyboardEvent) {
    if (keyboardEvent.keyCode === 13) {
      toggleOptions();
    }
  }

  function optionKeyDowned(keyboardEvent, option, index) {
    if (keyboardEvent.keyCode === 13) {
      setTimeout(() => {
        optionClicked(option, index);
      }, 100);
    }
  }

  return (
    <div
      className={`App-Dropdown ${isWideScreen ? 'wide-screen' : ''}`}
      tabIndex={props.tabIndex}
      onKeyDown={keyDowned}
    >
      <div className="dropdown-main" onClick={toggleOptions}>
        <span>{state.selectedText }</span>
        <img src={dropdown} alt="pp" />
      </div>
      <div className={`dropdown-options ${state.isOptionsOpen ? "show" : ""}`}>
        <div className="dropdown-options__content">
          {state.options.map((option, index) => (
            <span
              key={index}
              onKeyDown={(e) => optionKeyDowned(e, option, index)}
              tabIndex="0"
              className={`App-Dropdown__option ${
                index === state.selectedIndex ? "selected" : ""
              }`}
              onClick={(e) => {
                optionClicked(option, index);
              }}
            >
              {option.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
