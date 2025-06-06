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
      <div id="yesterdayModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => closeModal('yesterdayModal')}>&times;</span>
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
      <div id="rulesModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => closeModal('rulesModal')}>&times;</span>
          <div className="rules-title">Rules</div>
          <div className="about-content">
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
      <div id="patreonModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => closeModal('patreonModal')}>&times;</span>
          <div className="about-content">
            <div>Anigrams is on <a href="https://www.patreon.com/adamwagner">Patreon</a>!</div>
            <br />
            <div>By joining the community, you'll get access to bonus Anigrams challenges, early looks at/input in potential new features, the opportunity to submit puzzles (with your name in the byline!), occasional Q&As with me, and (coming
              next
              week!) a full, playable backlog of previous Anigrams puzzles.</div>
            <br />
            <div>Most importantly, you'll enable me to continue to grow this game and develop new ones within the Anigrams family. I hope you'll consider joining!</div>
            <br />
            <div>-Adam</div>
            <br />
            <button className="button-84" onClick={() => window.open('https://www.patreon.com/adamwagner', '_blank')}>Go to Patreon</button>
          </div>
        </div>
      </div>
      <div id="newFeatureModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => closeModal('newFeatureModal')}>&times;</span>
          <div className="about-content">
            <div className="new-feature-title">NEW: Spacebar shuffle</div>
            <br />
            <div>You can now shuffle letter tiles by hitting the spacebar when playing Anigrams on your desktop computer. Thanks to Patreon member Slugbiker for the suggestion!</div>
            <br />
            <div>If you'd like to give feedback, please reach out at info@anigrams.us, or consider joining my Patreon community using the button below.</div>
            <br />
            <div className="new-feature-title">COMING SOON: Modes</div>
            <br />
            <div>Thank you to everyone who has reached out with feedback about the Unlimited Hints experiment. With so much support for both the 6-hints version of Anigrams and the unlimited-hint version, I've decided the best way forward is to allow players to choose from multiple game modes.</div>
            <br />
            <div>Coming soon, you'll be able to choose from three options before playing: "Unlimited Mode" (unlimited hints), "Challenging Mode" (6 hints) and "Diabolical Mode" (zero hints). Stay tuned!</div>
            <br />
            <div>-Adam</div>
            <br />
            <span className="new-feature-start-button"><button className="button-84" onClick={() => closeModal('newFeatureModal')}>Start Puzzle</button></span>
            <button className="button-84" onClick={() => window.open('https://www.patreon.com/adamwagner', '_blank')}>Join Patreon</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
