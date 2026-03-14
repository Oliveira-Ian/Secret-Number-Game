// ============================================================
// VARIABLES AND CONSTANTS
// ============================================================

const max = 100;

let drawnNumbersList = [];
let secretNumber;
let attempts = 1;

const inputField = document.querySelector('input[type="number"]');
const newGameButton = document.getElementById('reiniciar');
const guessButton = document.getElementById('guess');



// ============================================================
// MAIN GAME FUNCTIONS
// ============================================================

function initializeGame() {
    displayInitialMessage();

    clearField();
    setNewGameButtonState(false);
    setGuessButtonState(false);

    secretNumber = getRandomNumber(max);
    //console.log(`Secret Number: ${secretNumber}`); // debug
    attempts = 1;
}


function checkGuess() {
    const guessedNumber = Number(inputField.value);

    if (guessedNumber === secretNumber) {

        const wordAttempt = attempts === 1 ? 'attempt' : 'attempts';
        const messageAttempts = `You guessed the secret number: ${secretNumber}, with: ${attempts} ${wordAttempt}`;

        changeTextOnScreen('h1', 'Congratulations!!');
        changeTextOnScreen('p', messageAttempts);

        setNewGameButtonState(true);
        setGuessButtonState(true);

    } else if (guessedNumber > secretNumber) {

        changeTextOnScreen('p', `The secret number is lower than: ${guessedNumber}`);
        attempts++;
        clearField();

    } else {

        changeTextOnScreen('p', `The secret number is higher than: ${guessedNumber}`);
        attempts++;
        clearField();

    }
}


function restartGame() {
    initializeGame();
}



// ============================================================
// HELPER FUNCTIONS
// ============================================================

function changeTextOnScreen(selector, text) {
    const element = document.querySelector(selector);
    element.innerHTML = text;
    //responsiveVoice.speak(text, 'Brazilian Portuguese Female', {rate:1.2});

    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 1;

        const voices = speechSynthesis.getVoices();
        const femaleVoice = voices.find(voice =>
            voice.lang === 'en-US' &&
            (voice.name.includes('Female') || voice.name.includes('Jenny') || voice.name.includes('Aria'))
        );

        if (femaleVoice) {
            utterance.voice = femaleVoice;
        }

        speechSynthesis.speak(utterance);
    } else {
        console.log('Speech synthesis not supported in this browser.');
    }
}


function displayInitialMessage() {
    changeTextOnScreen('h1', 'Secret Number Game');
    changeTextOnScreen('p', 'Choose a number between 1 and 100');
    changeTextOnScreen('#reiniciar', 'New Game');
    changeTextOnScreen('#guess', 'Guess');
}


function getRandomNumber(max) {
    let drawnNumber = Math.floor((Math.random() * max) + 1);
    let qtdElementsOfDrawnNumbersList = drawnNumbersList.length;

    if (qtdElementsOfDrawnNumbersList === max) {
        return drawnNumbersList = [];
    }
    if (drawnNumbersList.includes(drawnNumber)) {
        return getRandomNumber(max);

    } else {
        drawnNumbersList.push(drawnNumber);
        console.log(drawnNumbersList);
        return drawnNumber;
    }
}


function clearField() {
    inputField.value = '';
}


function setNewGameButtonState(enabled) {
    if (enabled) {
        newGameButton.disabled = false;
    } else {
        newGameButton.disabled = true;
    }
}


function setGuessButtonState(enabled) {
    if (enabled) {
        guessButton.disabled = true;
    } else {
        guessButton.disabled = false;
    }
}



// ============================================================
// INITIALIZATION
// ============================================================

initializeGame();