import React, { useContext } from 'react';
import { closeModal, openModal } from './utils';
import './PauseScreen.css';
import './Button.css';
import { SolutionContext } from './SolutionContext';

function PauseScreen() {
  const { setIsPaused } = useContext(SolutionContext);
  return (
    <div id="paused">
      <div className="pausedContainer">
        <div className="pausedTitle">The game is paused!</div>
        <button id="unpause" className="button-84" onClick={() => setIsPaused(false)}>Continue</button>
      </div>
    </div>
  )
}

export default PauseScreen;
