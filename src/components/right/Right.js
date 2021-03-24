import React, { useContext } from 'react';
import { ResizeContext } from '../../context/resizeContext';
import './Right.css'

export default function Right(props){
  const {isWideScreen} = useContext(ResizeContext);

  return (
    <div className={`App-right__panel ${isWideScreen ? 'wide-screen' : ''}`}> 
      <span>FAST FINGERS</span>
      <h4>Score: 00:00</h4>
    </div>
  );
};
