import React, { useContext } from 'react';
import SolutionRow from './SolutionRow';
import { SolutionContext } from './SolutionContext';

function SolutionArea() {
  const { solution } = useContext(SolutionContext);
  console.log(solution)
  return (
    <div>
      {solution.map(
        (solutionArray, index) =>
          <SolutionRow
            key={solutionArray[0]}
            length={solutionArray[0].length}
            round={index}
          />
      )}
    </div>
  );
}

export default SolutionArea;
