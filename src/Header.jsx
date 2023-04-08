import React from 'react';
import './Header.css';
import './Modals.css';
import { emojiMapping } from './constants';
import { openModal, closeModal } from './utils';

function Header({ yesterdaySolution }) {
  return (
    <>
      <header className="site-header">
        <div className="header-wrapper">
          <div className="title">Anigrams</div>
          <div className="flex-container">
            <button className="link-button" onClick={() => openModal('rulesModal')}>Rules</button>
            <button className="link-button" onClick={() => openModal('yesterdayModal')}>Yesterday</button>
            <button className="link-button" onClick={() => openModal('patreonModal')}>Patreon</button>
          </div>
        </div>
      </header>
      <div id="yesterdayModal" class="modal">
        <div class="modal-content">
          <span class="close" onClick={() => closeModal('yesterdayModal')}>&times;</span>
          <div id="yesterdayContent">
            {yesterdaySolution.map(
              (solutionRow, i) =>
                <div key={solutionRow.toString()} className="solution-row no-justify">
                  {solutionRow[0].split("").map(
                    (letter, index) => <div key={index} className="solution-slot yesterday-slot">{letter}</div>
                  )}
                  <div className="emojiDiv">{emojiMapping[i]}</div>
                </div>
            )}
          </div>
        </div>
      </div>
      <div id="rulesModal" class="modal">
        <div class="modal-content">
          <span class="close" onClick={() => closeModal('rulesModal')}>&times;</span>
          <div class="rules-title">Rules</div>
          <div class="about-content">
            <div>Unscramble a word to reveal the next letter.</div><br />
            <div>Each word must use every available letter exactly once.</div><br />
            <div>There may be multiple acceptable words at any given level, but you only need to enter one to advance.
            </div><br />
            <div>Feeling stuck? Use the "Show next letter" button for a hint... But use it wisely, as you only get 6
              hints for the whole game!</div><br />
            <div>A new Anigrams puzzle will post every day at 9:30pm EST, 6:30pm PST.</div>
            <br /><br />
            <div>Created by Adam Wagner</div><br />
            <div>Developed by Rafael Musa</div><br />
            <div>Gameplay development by Jacob Goldberg</div><br />
            <div>Special thanks to Anna Goldberg Wagner</div><br />
            <div>Think we missed a word? Want to share some feedback? Have other questions? Hit us up at <a
              href="mailto:info@anigrams.us">info@anigrams.us</a></div>
          </div>
        </div>
      </div>
      <div id="patreonModal" class="modal">
        <div class="modal-content">
          <span class="close" onClick={() => closeModal('patreonModal')}>&times;</span>
          <div class="about-content">
            <div>Anigrams is on <a href="https://www.patreon.com/user?u=65757168">Patreon</a>!</div>
            <br />
            <div>By joining the community, you'll get access to bonus Anigrams challenges, early looks at/input in potential new features, the opportunity to submit puzzles (with your name in the byline!), occasional Q&As with me, and (coming
              next
              week!) a full, playable backlog of previous Anigrams puzzles.</div>
            <br />
            <div>Most importantly, you'll enable me to continue to grow this game and develop new ones within the Anigrams family. I hope you'll consider joining!</div>
            <br />
            <div>-Adam</div>
            <br />
            <button id="shareButton" class="button-84" onClick={() => window.open('https://www.patreon.com/user?u=65757168', '_blank')}>Go to Patreon</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
