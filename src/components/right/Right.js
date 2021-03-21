import React, { useContext } from 'react';
import homeIcon from '../../assets/home.svg'
import { ResizeContext } from '../../context/resizeContext';
import IconButton from '../iconButton/IconButton';
import './Right.css'

export default function Right(props){

  const {isWideScreen} = useContext(ResizeContext);

  function homeIconClicked(){
    if(window.confirm('Are you sure to go back?')){
      props.goHome && props.goHome();
    }
  }

  return (
    <div className={`App-right__panel ${isWideScreen ? 'wide-screen' : ''}`}> 
      <span>FAST FINGERS</span>
      <IconButton icon={homeIcon} iconHeight={isWideScreen ? '66px': '30px'} onClick={homeIconClicked} />
    </div>
  );
};
