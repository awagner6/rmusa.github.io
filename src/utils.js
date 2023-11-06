export const processSolution = (solutionRow) => {
  var processedSolution = [
    [],
    [],
    [],
    [],
    [],
    []
  ];
  var words = solutionRow.trim().split(" ").filter(i => i);
  for (var i = 0; i < words.length; i++) {
    processedSolution[words[i].length - 4].push(words[i].toLowerCase());
  }
  return processedSolution;
}

export function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

export function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
}

export function checkTime(i) {
  if (i < 10) {
    i = "0" + i
  }; // add zero in front of numbers < 10
  return i;
}

export function startTimeCounter(startTime, prevTime, puzzleIndex, isArchive) {
  var now = Math.floor(Date.now() / 1000); // get the time now
  var diff = now - startTime + prevTime; // diff in seconds between now and start
  if (!isArchive) {
    localStorage.setItem('currentTime', diff);
  }
  var m = Math.floor(diff / 60); // get minutes value (quotient of diff)
  var s = Math.floor(diff % 60); // get seconds value (remainder of diff)
  m = checkTime(m); // add a leading zero if it's single digit
  s = checkTime(s); // add a leading zero if it's single digit
  // document.getElementById("timer").innerHTML = m + ":" + s; // update the element where the timer will appear

  // DST daylight savings change
  var nextAnigram = (1661135400000 + ((puzzleIndex + 1) * 1000 * 24 * 60 * 60)) / 1000;
  var timeTilNext = nextAnigram - now;
  var mNext = Math.floor(timeTilNext / 60); // get minutes value (quotient of diff)
  var hNext = Math.floor(mNext / 60);
  mNext = mNext % 60;
  var sNext = Math.floor(timeTilNext % 60); // get seconds value (remainder of diff)
  hNext = checkTime(hNext); // add a leading zero if it's single digit
  mNext = checkTime(mNext); // add a leading zero if it's single digit
  sNext = checkTime(sNext); // add a leading zero if it's single digit
  if (document.getElementById('nextAnigram')) {
    document.getElementById('nextAnigram').innerHTML = `${hNext}:${mNext}:${sNext}`
  }
  var t = setTimeout(() => startTimeCounter(startTime, prevTime, puzzleIndex), 500); // set a timeout to update the timer
}
