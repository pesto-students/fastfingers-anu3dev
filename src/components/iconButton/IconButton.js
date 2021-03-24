import React from "react";
import "./IconButton.css";

export default function Button(props){
  function clickHandler() {
    !props.disabled && props.onClick && props.onClick();
  }

  return (
    <div
      onClick={clickHandler}
      className="App-Icon-Button"
      title={props.text}
    >
      {props.icon && (
        <img src={props.icon} alt={props.text} height={props.iconHeight} />
      )}

      {props.text && (
        <span
          style={{
            fontSize: props.fontSize,
            fontFamily: props.fontFamily
          }}
        >
          {props.text}
        </span>
      )}
    </div>
  );
};

