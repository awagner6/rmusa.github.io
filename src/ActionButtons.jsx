import React, { useContext, useState } from 'react';
import './ActionButtons.css';
import './Button.css';
import { SolutionContext } from './SolutionContext';

function ActionButtons() {
  const { shuffle, actionsDisabled, tileOrder, setTileOrder, solution, currentRound, setCurrentWord, currentLevelHints, setCurrentLevelHints, clear, goBack, totalHintsUsed, setTotalHintsUsed, puzzleIndex } = useContext(SolutionContext);
  const [hintClicked, setHintClicked] = useState(false);


  const onClickHint = () => {
    setHintClicked(true);
    setTimeout(() => setHintClicked(false), 3000);
  }

  const showNextLetter = (puzzleIndex) => {
    setHintClicked(false);
    const newWord = solution[currentRound][0].slice(0, currentLevelHints + 1);
    localStorage.setItem('currentDay', puzzleIndex + 1);
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

  return (
    <>
      <div className="button-menu">
        <button disabled={shouldDisable} id="clearButton" className="button-84" onClick={clear}>Clear</button>
        <button disabled={shouldDisable} className="emoji-button" onClick={shuffle}>🔄</button>
        <button disabled={shouldDisable} id="deleteButton" className="button-84" onClick={goBack}>Delete</button>
      </div>
      <div className="button-menu">
        {hintClicked
          ? <button disabled={shouldDisable} id="confirmButton" className="button-84 show-next-button" onClick={() => showNextLetter(puzzleIndex)}>Are you sure?</button>
          : <button disabled={shouldDisable} id="hintButton" className="button-84 show-next-button" onClick={onClickHint}>Show next letter</button>}
      </div>
      <div class="hints-used">{`Hints used: ${totalHintsUsed}`}</div>
    </>
  );
};

export default ActionButtons;
