'use strict';

//functions

const setCurrentScore = score =>
  (document.getElementById(`current--${activePlayer}`).textContent = score);

const switchPlayer = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};

const zeroCurrentScore = function () {
  currentScore = 0;
  setCurrentScore(currentScore);
};

const diceButtonFunction = function () {
  if (isPlaying) {
    diceRoll = Math.trunc(Math.random() * 6 + 1);
    diceImg.setAttribute('src', `dice-${diceRoll}.png`);
    diceImg.classList.remove('hidden');

    if (diceRoll === 1) {
      zeroCurrentScore();
      switchPlayer();
    } else {
      currentScore += diceRoll;
      setCurrentScore(currentScore);
    }
  }
};

const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  isPlaying = true;
  scoreZero.textContent = 0;
  scoreOne.textContent = 0;
  diceImg.classList.add('hidden');
};

//Declaring variables
const diceImg = document.querySelector('.dice');
const scoreZero = document.getElementById('score--0');
const scoreOne = document.getElementById('score--1');
const diceButtonEl = document.querySelector('.btn--roll');
const holdButtonEl = document.querySelector('.btn--hold');
const newButtonEl = document.querySelector('.btn--new');
let scores, activePlayer, currentScore, diceRoll, isPlaying;

//Start resets

init();

//USER ROLLS DICE

diceButtonEl.addEventListener('click', diceButtonFunction);

holdButtonEl.addEventListener('click', function () {
  if (isPlaying) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 10) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      isPlaying = false;
      diceImg.classList.add('hidden');
    } else {
      zeroCurrentScore();
      switchPlayer();
    }
  }
});

newButtonEl.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  setCurrentScore(0);
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  init();
});
