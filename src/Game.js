import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import './Game.css';
import Header from './Header';
import SolutionArea from './SolutionArea';
import TileArea from './TileArea';
import ActionButtons from './ActionButtons';
import { SolutionContext } from './SolutionContext';
import { FEEDBACK_TYPE, SOLUTIONS, BAD_WORDS } from './constants';
import { processSolution, openModal, startTimeCounter, checkTime } from './utils';
import CongratsModal from './CongratsModal';
import PauseScreen from './PauseScreen';

function App() {
  const [archiveIndex, setArchiveIndex] = useState(null);
  // assuming start at 2022/08/21, 18:30:00, PDT, also ignore daylight savings, www.unixtimestamp.com
  // use 1661131800000 when in daylight saving
  // use 1661135400000 when in standard time
  const todaysIndex = useMemo(() => Math.floor((Date.now() - 1661131800000) / (1000 * 60 * 60 * 24)), []);
  const puzzleIndex = useMemo(() => archiveIndex || todaysIndex, [archiveIndex, todaysIndex]);
  const solution = useMemo(() => processSolution(SOLUTIONS.split("\n")[puzzleIndex]), [puzzleIndex]);
  const yesterdaySolution = useMemo(() => processSolution(SOLUTIONS.split("\n")[todaysIndex - 1]), [todaysIndex]);

  const haveSavedData = !archiveIndex && Number(localStorage.getItem('currentDay')) === puzzleIndex + 1;
  const currentSolution = (localStorage.getItem('currentSolution') || '').split('|').filter(n => n);
  const storedHints = Number(localStorage.getItem('currLevelHints'));

  const [tileOrder, setTileOrder] = useState(haveSavedData ? (solution[Math.min(currentSolution.length, 5)][0].slice(0, storedHints).toUpperCase() + solution[Math.min(currentSolution.length, 5)][0].slice(storedHints)).split('') : solution[0][0].split(''));
  const [currentWord, setCurrentWord] = useState(haveSavedData ? solution[Math.min(currentSolution.length, 5)][0].slice(0, storedHints) : '');
  const [currentRound, setCurrentRound] = useState(haveSavedData ? currentSolution.length : 0);
  const [userSolution, setUserSolution] = useState(haveSavedData ? currentSolution : []);
  const [currentLevelHints, setCurrentLevelHints] = useState(haveSavedData ? storedHints : 0);
  const [totalHintsUsed, setTotalHintsUsed] = useState(haveSavedData ? Number(localStorage.getItem('shareHints')) : 0);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [showFeedback, setShowFeedback] = useState(FEEDBACK_TYPE.NONE);
  const [actionsDisabled, setActionsDisabled] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState('');
  const [isPaused, setIsPaused] = useState(false);

  const prevTime = useMemo(() => haveSavedData ? Number(localStorage.getItem('currentTime')) || 0 : 0, [isPaused]);
  // const prevTime = useMemo(() => Number(localStorage.getItem('currentTime')) || 0, [isPaused]);
  // const prevTime = 0;
  const startTime = useMemo(() => Math.floor(Date.now() / 1000), [puzzleIndex, isPaused]);

  useEffect(() => {
    setToLocalStorage('prevTime', prevTime);
  }, [prevTime]);

  const setToLocalStorage = (key, value) => {
    if (!archiveIndex) {
      localStorage.setItem(key, value)
    }
  }
  setToLocalStorage('currLevelHints', currentLevelHints);
  setToLocalStorage('shareHints', totalHintsUsed);
  setToLocalStorage('currentSolution', userSolution.join('|'));

  const { mode } = useParams();
  setToLocalStorage('currentMode', mode);

  useEffect(() => {
    // we have saved data for today's puzzle
    if (Number(localStorage.getItem('currentDay')) !== puzzleIndex + 1) {
      // here we have some partial solution for another day and can clear
      setToLocalStorage('currentSolution', "");
      setToLocalStorage('currentTime', "");
      setToLocalStorage('currLevelHints', 0);
    }
    if (haveSavedData && currentSolution.length === 6) {
      openModal('congratsModal');
    }
    shuffle();
    // startTimeCounter(startTime, prevTime, Math.floor((Date.now() - 1661135400000) / (1000 * 60 * 60 * 24)), !!archiveIndex)
  }, []);

  useEffect(() => {
    if (!isPaused) {
      startTimeCounter(startTime, prevTime, Math.floor((Date.now() - 1661131800000) / (1000 * 60 * 60 * 24)), !!archiveIndex)
    }
  }, [isPaused]);

  const findNewLetter = useCallback((round) => {
    const oldLetters = solution[round - 1][0].split('').sort().join('');
    const newLetters = solution[round][0].split('').sort().join('');
    for (var i = 0; i < oldLetters.length; i++) {
      if (oldLetters[i] !== newLetters[i]) {
        return newLetters[i];
      }
    }
    return newLetters[newLetters.length - 1];
  }, [solution]);

  const clear = useCallback((_, levelSuccess = false) => {
    const hintWord = levelSuccess ? '' : solution[currentRound][0].slice(0, currentLevelHints);
    setCurrentWord(hintWord);
    const newOrder = tileOrder.map((v) => v.toLowerCase());
    hintWord.split('').forEach((v) => {
      const index = newOrder.indexOf(v.toLowerCase());
      newOrder[index] = newOrder[index].toUpperCase();
    })
    setTileOrder(newOrder);
  }, [solution, currentRound, currentLevelHints, setCurrentWord, tileOrder, setTileOrder]);

  const goBack = useCallback(() => {
    if (currentWord.length > currentLevelHints) {
      const lastLetter = currentWord[currentWord.length - 1];
      setCurrentWord(currentWord.slice(0, -1));
      tileOrder[tileOrder.indexOf(lastLetter.toUpperCase())] = lastLetter.toLowerCase();
      setTileOrder(tileOrder);
    }
  }, [currentWord, setCurrentWord, currentLevelHints, tileOrder, setTileOrder]);

  const onClickTile = useCallback((ev) => {
    if (currentRound === 6) return;
    const letter = ev.target.innerText;
    const index = [...ev.target.parentNode.children].indexOf(ev.target)
    tileOrder[index] = tileOrder[index].toUpperCase();
    setTileOrder(tileOrder);
    setCurrentWord(prev => prev + letter);
  }, [currentWord, setCurrentWord, tileOrder, setTileOrder]);

  const shuffle = useCallback(() => {
    while (true) {
      const newOrder = tileOrder.sort(() => Math.random() - 0.5);
      if (!solution.flat().includes(newOrder.join('')) && !BAD_WORDS.has(newOrder.join(''))) {
        setTileOrder([...newOrder]);
        break;
      }
    }
  }, [tileOrder, setTileOrder, solution]);

  const onKeyDown = useCallback((e) => {
    if (!e.repeat) {
      if (e.key === 'Backspace') {
        document.getElementById('deleteButton').click();
        return;
      }
      if (e.key === " ") {
        e.preventDefault();
        document.getElementById('shuffleButton').click();
      }
      const index = tileOrder.indexOf(e.key.toLowerCase());
      if (index !== -1) {
        document.querySelector(`#tileArea :nth-child(${index + 1})`).click();
      }
    }
  }, [goBack, tileOrder]);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown])

  useEffect(() => {
    if (currentWord.length === currentRound + 4) {
      if (solution.flat().includes(currentWord.toLowerCase()) && currentWord.length === currentRound + 4) {
        setToLocalStorage('currentDay', puzzleIndex + 1);
        // correct word
        setCurrentLevelHints(0);
        setActionsDisabled(true);
        setCurrentRound(currentRound + 1);
        if (currentRound + 1 !== solution.length) {
          var tileToFlip = document.querySelector('.emoji-tile')
          const newLetter = findNewLetter(currentRound + 1);
          tileToFlip.firstChild.children[1].innerText = newLetter;
          tileToFlip.firstChild.classList.add("flip");
          setTimeout(() => {
            const newOrder = tileOrder.map((v) => v.toLowerCase());
            newOrder.push(newLetter.toLowerCase());
            setTileOrder(newOrder)
            setActionsDisabled(false)
          }, 700);
        }
        setIsFeedbackVisible(true);
        setShowFeedback(FEEDBACK_TYPE.CORRECT);
        setUserSolution(prev => [...prev, currentWord.toLowerCase()])
        setCurrentWord('');
        clear(null, true);
        setTimeout(() => {
          setIsFeedbackVisible(false);
        }, 500);
        // solved last round
        if (currentRound + 1 === solution.length) {
          // solved yesterday
          if (Number(localStorage.getItem('lastSolved')) === puzzleIndex) {
            setToLocalStorage('streak', (Number(localStorage.getItem('streak')) || 0) + 1)
          } else {
            setToLocalStorage('streak', 1)
          }
          setToLocalStorage('lastSolved', puzzleIndex + 1)
          var now = Math.floor(Date.now() / 1000);
          var diff = now - startTime + (archiveIndex ? 0 : prevTime);
          var totalMinutes = Math.floor(diff / 60);
          var h = Math.floor(totalMinutes / 60);
          var m = Math.floor(totalMinutes % 60);
          var s = Math.floor(diff % 60);
          h = checkTime(h)
          m = checkTime(m);
          s = checkTime(s);
          setToLocalStorage('shareTime', `${h}:${m}:${s}`)
          setTimeElapsed(`${h}:${m}:${s}`)
          document.getElementById('goat-row-feedback').remove();
          document.querySelector('.goat-tile').classList.add('goat-tile-grow');
          setTimeout(() => openModal('congratsModal'), 1200);
        }
      } else {
        // incorrect word
        setIsFeedbackVisible(true)
        setShowFeedback(FEEDBACK_TYPE.INCORRECT);
        setTimeout(() => {
          clear();
          setIsFeedbackVisible(false);
        }, 500);
      }
    }
  }, [currentWord, currentRound, solution, setShowFeedback, tileOrder, setTileOrder, clear, setCurrentLevelHints, setCurrentWord]);

  return (
    <SolutionContext.Provider value={{
      tileOrder, setTileOrder, solution, setActionsDisabled,
      currentWord, setCurrentWord, currentRound, timeElapsed,
      setCurrentRound, shuffle, puzzleIndex, setIsFeedbackVisible,
      userSolution, setUserSolution, actionsDisabled, archiveIndex,
      totalHintsUsed, setTotalHintsUsed, setArchiveIndex, isPaused, setIsPaused,
      showFeedback, setShowFeedback, isFeedbackVisible, mode, setToLocalStorage,
      currentLevelHints, setCurrentLevelHints, clear, goBack, onClickTile
    }}>
      <Header yesterdaySolution={yesterdaySolution} />
      {isPaused && <PauseScreen />}
      <div className="wrapper">
        <div className="intro-info">
          <div>Unscramble a word to reveal the next letter</div>
          <div>Level</div>
        </div>
        <SolutionArea />
        <TileArea />
        <ActionButtons />
      </div>
      <CongratsModal />
    </SolutionContext.Provider>
  );
}

export default App;
