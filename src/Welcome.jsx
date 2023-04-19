import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Button.css';
import './Welcome.css';

function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    // daylight savings
    const puzzleIndex = Math.floor((Date.now() - 1661131800000) / (1000 * 60 * 60 * 24));
    const haveSavedData = Number(localStorage.getItem('currentDay')) === puzzleIndex + 1;
    if (haveSavedData) {
      navigate(`/play/${localStorage.getItem('currentMode') || "normal"}`)
    }
  }, []);

  return (
    <>
      <div className="welcome">Welcome to Anigrams!</div>
      <div className="welcomeEmojis">🦉🦒🐬🦜🐙🐐</div>
      <div className="welcomeBody">You can now choose to solve Anigrams with unlimited hints, six hints, or zero hints. Pick a game mode below to get started! Just one note: once you select a game mode, you won't be able to edit your selection until tomorrow's Anigrams drops. So choose carefully!
      </div>
      <div className="welcomeButtonWrapper">
        <div className="welcomeButtonContainer">
          <Link to="/play/normal" style={{ textDecoration: 'none' }}>
            <button className="button-84 welcomeButton">Normal Mode</button>
          </Link>
          <div>Solve with unlimited hints</div>
        </div>
        <div className="welcomeButtonContainer">
          <Link to="/play/hard" style={{ textDecoration: 'none' }}>
            <button className="button-84 welcomeButton">Hard Mode</button>
          </Link>
          <div>Solve with up to six hints</div>
        </div>
        <div className="welcomeButtonContainer">
          <Link to="/play/diabolical" style={{ textDecoration: 'none' }}>
            <button className="button-84 welcomeButton">Diabolical Mode</button>
          </Link>
          <div>Solve without hints</div>
        </div>
      </div >
      <div className="welcomeButtonContainer">
        <div className="welcomeAnigramsCopy">Access even more Anigrams goodness</div>
        <button className="button-84" onClick={() => window.open('https://www.patreon.com/user?u=65757168', '_blank')}>Join Patreon</button>
      </div>
    </>
  )
};

export default Welcome;
