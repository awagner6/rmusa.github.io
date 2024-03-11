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
      <div className="welcomeSubtitle">A daily word game</div>
      <div className="welcomeEmojis">🦉🦒🐬🦜🐙🐐</div>
      <div className="welcomeBody"><strong>UPDATE: </strong>
        Anigrams is coming to The Orca Awards: an annual celebration of the year's best crosswords! Join Anigrams creator Adam Wagner and developer Rafael Musa for a special, live-streamed game of Anigrams as part of the awards broadcast.
        <br />
        <br />
        Stream will go live <a href="https://twitch.tv/boswords">HERE</a> on Wednesday, March 6th at 9pm EST. See you there!
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
      </div>
      <div className="welcomeButtonContainer noWelcomeMargin">
        <button className="button-84 patreonButton" onClick={() => window.open('https://www.patreon.com/user?u=65757168', '_blank')}>Join Patreon</button>
        <div className="welcomeAnigramsCopy">Access the archive of previous Anigrams puzzles, suggest new features, and play bonus puzzles</div>
      </div>
    </>
  )
};

export default Welcome;
