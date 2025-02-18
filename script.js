// Written by WdataW for a simple guessing game in 18-2-2025.

// selecting the elements we need to use.
const guessField = document.querySelector(".guessField");
const submitGuess = document.querySelector(".guessSubmit");

const prevGuesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

const randomNumber = Number(Math.floor(Math.random() * 100 + 1)); // generating a random number from 1-100.
let countOfGuesses = 1; // keeping track of the number of attempts.

function resetGame() {
  // to reset the game.
  lastResult.style.backgroundColor = "transparent";

  const paras = document.querySelector(".resultParas").querySelectorAll("p");
  for (const para of paras) {
    para.textContent = "";
  }
  countOfGuesses = 1;
  guessField.disabled = false;
  submitGuess.disabled = false;
  document.body.removeChild(document.querySelector("#resetButton"));
}
function gameover() {
  // to stop the game. cause: no more attemps or the player won.
  guessField.disabled = true;
  submitGuess.disabled = true;
  lowOrHi.textContent = "";
  guessField.value = "";
  // creating the reset button. allowing the player to reset the game.
  const resetButton = document.createElement("button");
  resetButton.id = "resetButton";
  resetButton.textContent = "Start New Game";
  document.body.appendChild(resetButton);
  resetButton.addEventListener("click", resetGame);
}

// compares the player guess against the random number.
function guess() {
  if (countOfGuesses === 1) {
    prevGuesses.textContent += "Previous Guesses:";
  }
  countOfGuesses += 1;

  const guessedNumber = Number(guessField.value);
  prevGuesses.textContent += " " + guessedNumber + " "; // to keep a record of previous attempts.

  if (guessedNumber === randomNumber) {
    // correct guess
    lastResult.textContent = "Congratulations! You got it right!";
    lastResult.style.backgroundColor = "green";
    gameover();
    return;

    // limits the player with 10 attempts only.
  } else if (countOfGuesses > 10) {
    lastResult.textContent = "!!!GANE OVER!!!";
    gameover();
    return;
  } else {
    // wrong guess but still has attempts.
    lastResult.textContent = "Wrong!";
    lastResult.style.backgroundColor = "red";
    if (guessedNumber > randomNumber) {
      lowOrHi.textContent = "Last Guess Was Too High!"; // a clue for the player
    } else {
      lowOrHi.textContent = "Last Guess Was Too Low!"; // a clue for the player
    }
  }
  // to prepare for the next attempt.
  guessField.value = "";
  guessField.focus();
}

submitGuess.addEventListener("click", guess);
