import React, { useRef } from "react";
import "./Input.css";

export default function Input(props) {
  const inputRef = useRef();
  function onKeyUpHandler() {
    const currentValue = inputRef.current.value;
    props.onKeyUp && props.onKeyUp(currentValue);
  }

  return (
    <input
      className="App-Input"
      ref={inputRef}
      tabIndex={props.tabIndex}
      placeholder={props.placeholder}
      onKeyUp={onKeyUpHandler}
      type="text"
      style={props.style}
      autoFocus
    />
  );
}



