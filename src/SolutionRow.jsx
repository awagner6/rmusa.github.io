import React, { useContext } from 'react';
import './SolutionRow.css';
import './IncorrectFeedback.css';
import { emojiMapping, FEEDBACK_TYPE } from './constants';
import { SolutionContext } from './SolutionContext';

const feedbackMessages = [
  "Hoo-ray!",
  "Neck-cellent!",
  "TeEEEEErrific!",
  "Caw-esome!",
  "Gr-eight!",
  "Maaa-arvelous",
]

function SolutionRow({ length, round }) {
  const { currentRound, currentWord, userSolution, showFeedback, isFeedbackVisible } = useContext(SolutionContext);
  const isCurrentRound = round === currentRound;
  const slots = [];
  let wordToShow = '';
  if (round < currentRound) {
    wordToShow = userSolution[round];
  } else if (isCurrentRound) {
    wordToShow = currentWord.padEnd(length);
  } else {
    wordToShow = ''.padEnd(length);
  }

  for (let i = 0; i < length; i++) {
    slots.push(
      <div key={i} className={`solution-slot${isCurrentRound && currentWord.length === i ? ' active-solution-slot' : ''}`}>
        {wordToShow[i]}
      </div>
    );
  }

  const shouldShowFeedback = isFeedbackVisible && ((showFeedback === FEEDBACK_TYPE.INCORRECT && isCurrentRound) || (showFeedback === FEEDBACK_TYPE.CORRECT && round === currentRound - 1));
  return (
    <div className="solution-row">
      <div className="solution-slot-container">
        {slots}
      </div>
      <div className={length === 9 ? "goat-tile-container" : ''}>
        <div className={`emojiDiv${length === 9 ? ' goat-tile' : ''}`}>
          {emojiMapping[round]}
          <div id={length === 9 ? "goat-row-feedback" : undefined} className="feedbackContainer">
            <div className={`incorrectFeedback${shouldShowFeedback ? ' showIncorrectFeedback' : ''}`}>
              {showFeedback === FEEDBACK_TYPE.CORRECT ? feedbackMessages[currentRound - 1] : "Incorrect word"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SolutionRow;
