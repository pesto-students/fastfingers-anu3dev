import React from "react";
import "./LineText.css";

export default function LineText(props){

  return (
    <div
      className="App-line-text">
      <span className="line"></span>
      <span className="text">{props.text}</span>
      <span className="line"></span>
    </div>
  );
};

