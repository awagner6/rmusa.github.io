import React, { useContext, useState, useEffect } from 'react';
import { closeModal, openModal, processSolution } from './utils';
import { SolutionContext } from './SolutionContext';
import { FEEDBACK_TYPE, SOLUTIONS } from './constants';
import './ArchiveModal.css';

const hashCode = s => s.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0)

function ArchiveModal() {
  // daylight savings
  const todayIndex = Math.floor((Date.now() - 1661131800000) / (1000 * 60 * 60 * 24)) + 1
  const {
    setArchiveIndex,
    setTileOrder,
    setCurrentWord,
    setCurrentRound,
    setUserSolution,
    setCurrentLevelHints,
    setTotalHintsUsed,
    setIsFeedbackVisible,
    setShowFeedback,
    setActionsDisabled,
  } = useContext(SolutionContext);

  const [indexInput, setIndexInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [indexInvalid, setIndexInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);

  useEffect(() => {
    const indexInputValid = indexInput === '' || (indexInput % 1 === 0 && Number(indexInput) > 0 && Number(indexInput) < todayIndex);
    setIndexInvalid(!indexInputValid)
    setPasswordInvalid(false);
  }, [indexInput, passwordInput])

  const onClickPlayArchive = () => {
    if (hashCode(passwordInput) === 1120594901) {
      setArchiveIndex(indexInput - 1);
      // janky shuffle solution
      const newFourLetterSolutions = processSolution(SOLUTIONS.split("\n")[indexInput - 1])[0];
      let possibleOrder = newFourLetterSolutions[0].split('');
      while (true) {
        const newOrder = possibleOrder.sort(() => Math.random() - 0.5);
        if (!newFourLetterSolutions.flat().includes(newOrder.join(''))) {
          setTileOrder([...newOrder]);
          break;
        }
      }
      setCurrentWord('');
      setCurrentRound(0);
      setUserSolution([]);
      setCurrentLevelHints(0);
      setTotalHintsUsed(0);
      setIsFeedbackVisible(false);
      setShowFeedback(FEEDBACK_TYPE.NONE)
      setActionsDisabled(false);
      closeModal("archiveModal");
    } else {
      setPasswordInvalid(true);
    }
  };

  return (
    <div id="archiveModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => { closeModal('archiveModal'); openModal('congratsModal'); }}>&times;</span>
        <div className="archive-title">Archive</div>
        <div className="archive-body">To play an Anigrams puzzle from the backlog, enter the puzzle number and password* below.</div>
        <div className="archive-body">Today's game is number {todayIndex}</div>
        <div>
          <label className="archive-label" htmlFor="archive-index-input">Puzzle number:</label>
          <input id="archive-index-input" className={`${indexInvalid ? "archive-invalid-input" : ''}`} type="number" min="1" max={todayIndex - 1} value={indexInput} onChange={(e) => setIndexInput(e.target.value)} />
          {indexInvalid && (<div className="archive-error-text">{`Please enter a number between 1 and ${todayIndex - 1}`}</div>)}
        </div>
        <div>
          <label className="archive-label" htmlFor="archive-password-input">Password:</label>
          <input id="archive-password-input" className={`${passwordInvalid ? "archive-invalid-input" : ''}`} type="Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
          {passwordInvalid && (<div className="archive-error-text">Incorrect password</div>)}
        </div>
        <button className="button-84 archive-confirm" onClick={onClickPlayArchive} disabled={indexInvalid || !indexInput || !passwordInput}>Play</button>
        <div id="passwordDisclaimer">*The password to access archive puzzles is only available for Patreon members. Not a member yet?</div>
        <button className="button-84" onClick={() => window.open('https://www.patreon.com/adamwagner', '_blank')}>Join Patreon</button>
      </div>
    </div>
  )
}

export default ArchiveModal;
