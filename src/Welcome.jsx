import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Button.css';
import './Welcome.css';

function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    // Adjust for daylight savings or other temporal shifts
    const puzzleIndex = Math.floor((Date.now() - 1661131800000) / (1000 * 60 * 60 * 24));
    const haveSavedData = Number(localStorage.getItem('currentDay')) === puzzleIndex + 1;
    if (haveSavedData) {
      navigate(`/play/${localStorage.getItem('currentMode') || "normal"}`);
    }
  }, [navigate]);

  return (
    <>
      <div className="welcome">Welcome to Anigrams!</div>
      <div className="welcomeSubtitle">A daily word game</div>
      <div className="welcomeEmojis">🦉🦒🐬🦜🐙🐐</div>
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
        <div className="welcomeButtonContainer">
          <button className="button-84 patreonButton" onClick={() => window.open('https://www.patreon.com/user?u=65757168', '_blank')}>Join Patreon</button>
          <div className="welcomeAnigramsCopy">Access the archive of previous Anigrams puzzles, suggest new features, and play bonus puzzles</div>
        </div>
        <div className="welcomeButtonContainer">
          <button className="button-84 OrderUpButton" onClick={() => window.open('https://www.orderup.games', '_blank')}>Order Up</button>
          <div className="welcomeAnigramsCopy">NEW: Adam's latest daily puzzle game has arrived! In Order Up, you have to arrange a list of items in order based on a hidden theme. Give it a try at the link above!</div>
        </div>
      </div>
    </>
  );
}

export default Welcome;
