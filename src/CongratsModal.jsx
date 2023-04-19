import React, { useContext, useState } from 'react';
import { closeModal } from './utils';
import './CongratsModal.css';
import { SolutionContext } from './SolutionContext';

function CongratsModal() {
  const { puzzleIndex, mode } = useContext(SolutionContext);
  const [shareClicked, setShareClicked] = useState(false);
  const timeShareText = localStorage.getItem('shareHints') > 0 ? localStorage.getItem('shareTime') : `⭐${localStorage.getItem('shareTime')}⭐`;
  const textToShare = `🦉🦒🐬🦜🐙🐐\r\nAnigrams ${puzzleIndex + 1}\r\n${mode.charAt(0).toUpperCase() + mode.slice(1)} mode\r\n${timeShareText}\r\nHints used: ${localStorage.getItem('shareHints') || 0}\r\nStreak: ${localStorage.getItem('streak')}\r\n🦉🦒🐬🦜🐙🐐\r\nanigrams.us`;

  const onClickShare = () => {
    if (navigator.share) {
      navigator.share({
        text: textToShare,
      });
    } else {
      navigator.clipboard.writeText(textToShare)
      setShareClicked(true);
      setTimeout(() => setShareClicked(false), 1000);
    }
  }

  return (
    <div id="congratsModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => { document.querySelector('.goat-tile').remove(); closeModal('congratsModal'); }}>&times;</span>
        <div className="column-flex">
          <div className="goat">🐐</div>
          <div className="goat-text">You are the G.O.A.T. !!!</div>
        </div>
        <div id="shareableContent">
          <div className="share-content-row">
            <div>🐐</div>
            <div>🦉</div>
            <div>🦒</div>
            <div>🐬</div>
            <div>🦜</div>
            <div>🐙</div>
            <div>🐐</div>
          </div>
          <div className="share-content-row">
            <div>🐙</div>
            <div>{`Anigrams ${puzzleIndex + 1}`}</div>
            <div>🦉</div>
          </div>
          <div className="share-content-row">
            <div>🦜</div>
            <div id="shareNumber">{`${mode.charAt(0).toUpperCase() + mode.slice(1)} mode`}</div>
            <div>🦒</div>
          </div>
          <div className="share-content-row">
            <div>🐬</div>
            <div id="shareTime">{localStorage.getItem('shareTime')}</div>
            <div>🐬</div>
          </div>
          <div className="share-content-row">
            <div>🦒</div>
            <div id="shareHints">{`Hints: ${localStorage.getItem('shareHints') || 0}`}</div>
            <div>🦜</div>
          </div>
          <div className="share-content-row">
            <div>🦉</div>
            <div id="shareStreak">{`Streak: ${localStorage.getItem('streak') || 0}`}</div>
            <div>🐙</div>
          </div>
          <div className="share-content-row">
            <div>🐐</div>
            <div>🐙</div>
            <div>🦜</div>
            <div>🐬</div>
            <div>🦒</div>
            <div>🦉</div>
            <div>🐐</div>
          </div>
        </div>
        <div className="goat-modal-info-container">
          <div>
            <div>Next Anigram:</div>
            <div id="nextAnigram">XX</div>
          </div>
          <button id="shareButton" className="button-84" role="button" onClick={onClickShare}>{shareClicked ? "Copied to clipboard" : "Share"}</button>
        </div>
      </div>
    </div>
  )
}

export default CongratsModal;
