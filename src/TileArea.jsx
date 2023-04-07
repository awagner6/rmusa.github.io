import React, { useContext } from 'react';
import { emojiMapping } from './constants'
import './TileArea.css';
import { SolutionContext } from './SolutionContext';

function isUpperCase(char) {
  return char === char.toUpperCase();
}


function TileArea() {
  const {
    tileOrder,
    onClickTile,
  } = useContext(SolutionContext);
  const tiles = [];
  for (var i = 0; i < tileOrder.length; i++) {
    tiles.push(<div key={i} onClick={onClickTile} className={`tile${isUpperCase(tileOrder[i]) ? ' used-tile' : ''}`}>{isUpperCase(tileOrder[i]) ? '' : tileOrder[i]}</div>);
  }
  for (let j = tileOrder.length; j < 9; j++) {
    tiles.push(
      <div key={j} className="tile flip-container emoji-tile">
        <div className="flipper">
          <div className="front">
            {emojiMapping[j - 4]}
          </div>
          <div className="back">
            X
          </div>
        </div>
      </div>
    );
  }
  return <div id="tileArea">{tiles}</div>;
}

export default TileArea;
