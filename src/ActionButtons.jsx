import React, { useContext, useState } from 'react';
import './ActionButtons.css';
import './Button.css';
import { SolutionContext } from './SolutionContext';
import { MODES } from './constants';

function ActionButtons() {
  const { shuffle, mode, actionsDisabled, tileOrder, setTileOrder, solution, currentRound, setCurrentWord, currentLevelHints, setCurrentLevelHints, clear, goBack, totalHintsUsed, setTotalHintsUsed, puzzleIndex, archiveIndex, isPaused, setIsPaused, setToLocalStorage } = useContext(SolutionContext);
  const [hintClicked, setHintClicked] = useState(false);


  const onClickHint = () => {
    setHintClicked(true);
    setTimeout(() => setHintClicked(false), 3000);
  }

  const showNextLetter = (puzzleIndex) => {
    setHintClicked(false);
    const newWord = solution[currentRound][0].slice(0, currentLevelHints + 1);
    if (!archiveIndex) {
      localStorage.setItem('currentDay', puzzleIndex + 1);
    }
    setCurrentLevelHints(currentLevelHints + 1);
    setTotalHintsUsed(totalHintsUsed + 1);
    const newOrder = tileOrder.map((v) => v.toLowerCase());
    newWord.split('').forEach((v) => {
      const index = newOrder.indexOf(v.toLowerCase());
      newOrder[index] = newOrder[index].toUpperCase();
    })
    setTileOrder(newOrder);
    setCurrentWord(newWord);
  }

  const shouldDisable = actionsDisabled || currentRound === 6;
  const hintsExhausted = mode === MODES.HARD && totalHintsUsed === 6;
  return (
    <>
      <div className="button-menu">
        <button disabled={shouldDisable} id="clearButton" className="button-84" onClick={clear}>Clear</button>
        <button disabled={shouldDisable} id="shuffleButton" className="emoji-button" onClick={shuffle}>🔄</button>
        <button disabled={shouldDisable} id="deleteButton" className="button-84" onClick={goBack}>Delete</button>
      </div>
      {mode !== MODES.DIABOLICAL && (
        <div className="button-menu">
          {hintClicked
            ? <button disabled={hintsExhausted || shouldDisable} id="confirmButton" className="button-84 show-next-button" onClick={() => showNextLetter(puzzleIndex)}>Are you sure?</button>
            : <button disabled={hintsExhausted || shouldDisable} id="hintButton" className="button-84 show-next-button" onClick={onClickHint}>Show next letter</button>}
        </div>
      )}
      {mode === MODES.NORMAL &&
        <div className="hints-used">{`Hints used: ${totalHintsUsed}`}</div>
      }
      {mode === MODES.HARD &&
        <div className="hints-used">{`Hints remaining: ${6 - totalHintsUsed}`}</div>
      }
      <div className="pauseButtonContainer">
        <button disabled={shouldDisable} id="pauseButton" className="button-84" onClick={() => { setToLocalStorage('currentDay', puzzleIndex + 1); setIsPaused(!isPaused); }}>Pause</button>
      </div>
    </>
  );
};

export default ActionButtons;
