import React from 'react';
import homeIcon from '../../assets/home.svg'
import IconButton from '../iconButton/IconButton';
import './Right.css'

export default function Right(props){

  function homeIconClicked(){
    if(window.confirm('Are you sure to go back?')){
      props.goHome && props.goHome();
    }
  }

  return (
    <div className="App-right__panel"> 
      <span>FAST FINGERS</span>
      <IconButton icon={homeIcon} iconHeight='66px' onClick={homeIconClicked} />
    </div>
  );
};
