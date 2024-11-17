let time = localStorage.getItem('elapsedTime') ? parseInt(localStorage.getItem('elapsedTime')) : 0;
let timerInterval;
let username = localStorage.getItem('username') ? localStorage.getItem('username') : '';
let currentIndex = 0;

// Navigation Function
function navigateTo(page) {
    window.location.href = page;
}

// Timer Functions
function startTimer() {
    time = 0;
    localStorage.setItem('elapsedTime', time);
    timerInterval = setInterval(() => {
        time += 1;
        localStorage.setItem('elapsedTime', time);
    }, 1000);
}

function completePuzzle() {
    clearInterval(timerInterval);
    alert(`Congratulations! You completed the puzzle in ${time} seconds.`);
    navigateTo('victory.html');
}

// Keypad Handling
function toggleKeypad() {
    const keypad = document.getElementById('keypad');
    const toggleButton = document.getElementById('toggleKeypad');
    if (keypad.style.display === 'none' || keypad.style.display === '') {
        keypad.style.display = 'block';
        toggleButton.style.display = 'none';
    } else {
        keypad.style.display = 'none';
        toggleButton.style.display = 'block';
    }
}

function addToInput(value) {
    const inputField = document.getElementById('inputField');
    if (inputField.value.length < 4) {
        inputField.value += value;
    }
}

function backspace() {
    const inputField = document.getElementById('inputField');
    inputField.value = inputField.value.slice(0, -1);
}

// Puzzle Prompts
const messages = {
    puzzle1: [
        "Ah, a room filled with secrets, is it? Very well, here’s a hint,", 
        "Shapes before you—different yet aligned in purpose.",
        "Focus your gaze, for within them lies a hidden sequence.",
        "Look closely, and let curiosity guide your hand.",
        "Pay close attention, and the numbers will reveal themselves... but only if you follow the right path.",
        "Now, off you go, and may your instincts be as sharp as your wits!"
    ],
    puzzle2: [
        "A maze, you say? Not just any maze…",
        "This one is filled with creatures that hunger for fear.",
        "Keep your wits about you; find the hidden key, avoid the shadows,",
        "and you may yet see the light at the end.",
        "But tarry too long, and darkness will consume you."
    ],
    puzzle5: [
        "Ah, the final test. You’ve come far, but the path to the Room of Requirement is not yet clear.",
        "Before you lies a puzzle—a shifting image, broken into pieces.",
        "Align them correctly, and the way forward shall be revealed.",
        "But remember, only those with patience and focus will unlock its secret."
    ]
};

function changeContent() {
    const textBox = document.getElementById("typing-text");
    const puzzleMessages = messages[currentPuzzle];
    textBox.style.animation = 'none';
    textBox.offsetHeight;
    textBox.style.animation = '';
    textBox.textContent = puzzleMessages[currentIndex];
    currentIndex = (currentIndex + 1) % puzzleMessages.length;
}

// Modal Handling
function showImageModal(imageSrc) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    modal.style.display = "block";
    modalImg.src = imageSrc;
}

function closeImageModal() {
    document.getElementById("imageModal").style.display = "none";
}

// Sliding Puzzle
let rows = 3, columns = 3;
let currTile, turns = 0;
let imgOrder = ["1", "3", "2", "4", "5", "6", "7", "8", "9"];
let puzzleSolved = false;

window.onload = function() {
    document.getElementById('keypad').style.display = 'none';
    startSlidingPuzzle();
};

function startSlidingPuzzle() {
    const board = document.getElementById("board");
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            const tile = document.createElement("img");
            tile.id = r + "-" + c;
            tile.src = "img_slidepuz/" + imgOrder.shift() + ".jpg";
            tile.addEventListener("click", tileClick);
            board.append(tile);
        }
    }
}

function tileClick() {
    currTile = this;
    if (!puzzleSolved && isAdjacentToEmpty(currTile)) {
        const emptyTile = findEmptyTile();
        [currTile.src, emptyTile.src] = [emptyTile.src, currTile.src];
        turns++;
        document.getElementById("turns").innerText = turns;
        setTimeout(checkIfSolved, 100);
    }
}

function checkIfSolved() {
    const solvedOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const tiles = document.querySelectorAll("#board img");
    for (let i = 0; i < tiles.length; i++) {
        if (!tiles[i].src.includes("img_slidepuz/" + solvedOrder[i] + ".jpg")) return;
    }
    puzzleSolved = true;
    completePuzzle();


}

function findEmptyTile() {
    return [...document.querySelectorAll("#board img")].find(tile => tile.src.includes("3.jpg"));
}

function isAdjacentToEmpty(tile) {
    const emptyTile = findEmptyTile();
    const [r, c] = tile.id.split("-").map(Number);
    const [r2, c2] = emptyTile.id.split("-").map(Number);
    return (r == r2 && Math.abs(c - c2) === 1) || (c == c2 && Math.abs(r - r2) === 1);
}

// Puzzle Answer Checkers
function checkPuzzle1Answer(nextPage) {
    checkAnswer("4365", nextPage);
}

function checkPuzzle4Answer(nextPage) {
    checkAnswer("1418", nextPage);
}

function checkPuzzle5Answer(nextPage) {
    checkAnswer("9034", nextPage);
}

function checkAnswer(correctCode, nextPage) {
    const answer = document.getElementById("inputField").value;
    const inputField = document.getElementById("inputField");
    if (answer === correctCode) {
        navigateTo(nextPage);
    } else {
        inputField.style.borderColor = "red";
        inputField.value = "";
        inputField.placeholder = "Wrong answer, try again!";
        setTimeout(() => inputField.style.borderColor = "", 1500);
    }
}



//this is scramble puzzle code
const words = ["AZKABAN", "HOGWARTS", "PATRONUS", "MUGGLE"];
const scrambledWords = words.map(word => word.split('').sort(() => Math.random() - 0.5));
const solutionCode = `${words[0][2]}${words[1][1]}${words[2][4]}${words[3][0]}`;

let letterSets = [...scrambledWords];
let solvedWords = [false, false, false, false];
let msg = ['', '', '', ''];
const highlightLetters = [
  { wordIndex: 0, letterIndex: 2 },
  { wordIndex: 1, letterIndex: 1 },
  { wordIndex: 2, letterIndex: 4 },
  { wordIndex: 3, letterIndex: 0 },
];

const checkSolved = (letters, index) => {
  if (letters.join('') === words[index]) {
    msg[index] = '✨ Correct! ✨';
    solvedWords[index] = true;
  } else {
    msg[index] = '';
    solvedWords[index] = false;
  }
  updateUI();
};

const moveLetter = (wordIndex, dragIndex, hoverIndex) => {
    if (solvedWords[wordIndex]) return;

  const updatedLetters = [...letterSets[wordIndex]];
  const [removed] = updatedLetters.splice(dragIndex, 1);
  updatedLetters.splice(hoverIndex, 0, removed);

  letterSets[wordIndex] = updatedLetters;
  checkSolved(updatedLetters, wordIndex);
};

const updateUI = () => {
  const wordContainer = document.getElementById('word-container');
  wordContainer.innerHTML = '';

  words.forEach((word, wordIndex) => {
    const wordDiv = document.createElement('div');

    const wordLabel = document.createElement('h4');
    wordLabel.innerText = `Word ${wordIndex + 1}`;
    wordDiv.appendChild(wordLabel);

    const wordRow = document.createElement('div');
    wordRow.className = 'word-row';

    const lettersContainer = document.createElement('div');
    lettersContainer.className = 'word-row';

    letterSets[wordIndex].forEach((letter, letterIndex) => {
      const letterTile = document.createElement('div');
      letterTile.className = 'letter-tile';
      letterTile.innerText = letter;
      letterTile.draggable = !solvedWords[wordIndex];
      letterTile.dataset.wordIndex = wordIndex;
      letterTile.dataset.letterIndex = letterIndex;

      if (!solvedWords[wordIndex]) {
        letterTile.addEventListener('dragstart', (event) => {
          event.dataTransfer.setData('text/plain', JSON.stringify({ wordIndex, letterIndex }));
        });

        letterTile.addEventListener('dragover', (event) => {
          event.preventDefault();
        });

        letterTile.addEventListener('drop', (event) => {
          event.preventDefault();
          const { wordIndex: draggedWordIndex, letterIndex: draggedLetterIndex } = JSON.parse(event.dataTransfer.getData('text'));
          if (draggedWordIndex === wordIndex) {
            moveLetter(wordIndex, draggedLetterIndex, letterIndex);
          }
        });
      }

      if (solvedWords[wordIndex] && highlightLetters.some(
        (highlight) => highlight.wordIndex === wordIndex && highlight.letterIndex === letterIndex
      )) {
        letterTile.classList.add('highlight');
      }

      lettersContainer.appendChild(letterTile);
    });

    const messageDiv = document.createElement('div');
    messageDiv.className = 'word-message';
    messageDiv.textContent = msg[wordIndex];

    wordRow.appendChild(lettersContainer);
    wordRow.appendChild(messageDiv);

    wordDiv.appendChild(wordRow);
    wordContainer.appendChild(wordDiv);
  });

  const codeInput = document.getElementById('code-input');
  const submitButton = document.getElementById('submit-button');
  const codeMessage = document.getElementById('code-message');

  if (solvedWords.every(Boolean)) {
    codeInput.disabled = false;
    submitButton.disabled = false;
  }

  submitButton.addEventListener('click', handleCodeSubmit);
};

const handleCodeSubmit = () => {
  const inputCode = document.getElementById('code-input').value.toUpperCase();
  const codeMessage = document.getElementById('code-message');
  
  if (inputCode === solutionCode) {
    codeMessage.innerText = '✅ Success! You entered the correct code!';
    codeMessage.className = 'success';
    document.getElementById("nextButton").style.display = "block";
  } else {
    codeMessage.innerText = '❌ Incorrect code. Try again.';
    codeMessage.className = 'error';
  }
};

updateUI();


// Function to start the timer
function startTimer() {
    time = 0;
    localStorage.setItem('elapsedTime', time);
    timerInterval = setInterval(function() {
        time += 1;
        localStorage.setItem('elapsedTime', time); // Update localStorage with the latest time
        console.log('Time = ' + time);
    }, 1000);
}

// Function to stop the timer and clear localStorage when done
function completePuzzle() {
    clearInterval(timerInterval); // Stop the timer
    alert(`Congratulations! You completed the puzzle in ${time} seconds.`);
    
    navigateTo('victory.html'); // Navigate to the next page
}

//maze puzzle


//below is for sliding puzzle
var rows = 3;
var columns = 3;

var currTile;
var turns = 0;

//var imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];
var imgOrder = ["1", "3", "2", "4", "5", "6", "7", "8", "9"];

window.onload = function() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "img_slidepuz/" + imgOrder.shift() + ".jpg";
            tile.addEventListener("click", tileClick);
            document.getElementById("board").append(tile);
        }
    }
}

function tileClick() {
    currTile = this;
    if (!puzzleSolved && isAdjacentToEmpty(currTile)) {
        let emptyTile = findEmptyTile();
        let currImg = currTile.src;
        currTile.src = emptyTile.src;
        emptyTile.src = currImg;
        turns += 1;
        document.getElementById("turns").innerText = turns;
        setTimeout(checkIfSolved, 100);
    }
}

let puzzleSolved = false;

function checkIfSolved() {
    const solvedOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let tiles = document.querySelectorAll("#board img");

    for (let i = 0; i < tiles.length; i++) {
        if (!tiles[i].src.includes("img_slidepuz/"+solvedOrder[i] + ".jpg")) {
            return;
        }
    }

    puzzleSolved = true;
    //alert("Congratulations! You solved it!");
    document.getElementById("board").classList.add("fade-out");
    document.getElementById("turn").classList.add("fade-out");
    document.getElementById("reset").classList.add("fade-out");
    setTimeout(() => {
        document.getElementById("board").style.display = "none";
        document.getElementById("turn").style.display = "none";
        document.getElementById("reset").style.display = "none";
    }, 1000);

    document.getElementById("code").style.display = "block";
    document.getElementById("keypadcont").style.display = "block";
    setTimeout(() => {
        document.getElementById("code").classList.remove("hidden");
        document.getElementById("code").classList.add("fade-in");
        document.getElementById("keypadcont").classList.remove("hidden");
        document.getElementById("keypadcont").classList.add("fade-in");
    }, 100);

}

function goToNextLevel(nextPage) {
    navigateTo(nextPage);
}

function findEmptyTile() {
    let tiles = document.querySelectorAll("img");
    for (let tile of tiles) {
        if (tile.src.includes("3.jpg")) {
            return tile;
        }
    }
}

function resetPuzzle() {
    let initialOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];
    let tiles = document.querySelectorAll("#board img");
    
    tiles.forEach((tile, index) => {
        tile.src = "img/" + initialOrder[index] + ".jpg";
    });
}

function isAdjacentToEmpty(tile) {
    let emptyTile = findEmptyTile();
    
    let [r, c] = tile.id.split("-").map(Number);
    let [r2, c2] = emptyTile.id.split("-").map(Number);

    let moveLeft = r == r2 && c2 == c - 1;
    let moveRight = r == r2 && c2 == c + 1;
    let moveUp = c == c2 && r2 == r - 1;
    let moveDown = c == c2 && r2 == r + 1;

    return moveLeft || moveRight || moveUp || moveDown;
}


function checkPuzzle5Answer(nextPage) {//change the name of checkpuzzle5Answer(for now its 5th)
    const answer = document.getElementById("inputField").value;
    
    if (answer === "9034") {
        document.getElementById("nextButton").style.display = "block";
        completePuzzle();
    } else {
        const inputField = document.getElementById("inputField");
        inputField.style.borderColor = "red"; // Change border to red for feedback
        inputField.value = ""; // Clear the field
        inputField.placeholder = "Wrong answer, try again!"; // Temporary feedback
        setTimeout(() => {
            inputField.style.borderColor = ""; // Reset border after feedback
        }, 1500);
    }
}//end of sliding puzzle
