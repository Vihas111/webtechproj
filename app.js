
let time = localStorage.getItem('elapsedTime') ? parseInt(localStorage.getItem('elapsedTime')) : 0; // Initialize from localStorage if available
let timerInterval;
let username = localStorage.getItem('username') ? localStorage.getItem('username') : '';

function navigateTo(page) {
    window.location.href = page;
}

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
    if (inputField.value.length < 4) { // Restrict to 4 digits
        inputField.value += value;
    }
}

function backspace() {
    const inputField = document.getElementById('inputField');
    inputField.value = inputField.value.slice(0, -1);
}

window.onload = function() {
    document.getElementById('keypad').style.display = 'none';
};

let currentIndex = 0;
const messages = {
    puzzle1: [
        "Ah, a room filled with secrets, is it? Very well, here’s a hint,", 
        "Shapes before you—different yet aligned in purpose.",
        "Focus your gaze, for within them lies a hidden sequence.",
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
    puzzle3: [
        "Ah, another challenge to test your mind!",
        "Words have been twisted, their letters scattered.",
        "Rearrange them to reveal their true form.",
        "Only by solving each word can you uncover the code.",
        "Focus, for even a single misplaced letter could lead you astray.",
        "Onward, then! Your next step depends on it!"
    ],
    puzzle4: [
        "If your mind is keen enough to grasp it.",
        "Not all is as it seems—sometimes, the quietest objects hold the loudest answers.",
        "Look closely, and let curiosity guide your hand.",
        "Click wisely, for each item you touch may reveal a clue… or lead you further astray.",
        "The path to freedom lies hidden in plain sight."
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

function showImageModal(imageSrc) {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalImage");

    modal.style.display = "block";
    modalImg.src = imageSrc;
}

function closeImageModal() {
    var modal = document.getElementById("imageModal");
    modal.style.display = "none";
}

function checkPuzzle4Answer(nextPage) {
    const answer = document.getElementById("inputField").value;
    
    if (answer === "1418") {
        alert("Correct! Moving to the next puzzle...");
        navigateTo(nextPage);
    } else {
        const inputField = document.getElementById("inputField");
        inputField.style.borderColor = "red"; // Change border to red for feedback
        inputField.value = ""; // Clear the field
        inputField.placeholder = "Wrong answer, try again!"; // Temporary feedback
        setTimeout(() => {
            inputField.style.borderColor = ""; // Reset border after feedback
        }, 1500);
    }
} 



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

function checkPuzzle1Answer(nextPage) {
        const answer = document.getElementById("inputField").value;
    
    if (answer === "4365") {
        //alert("Correct!!");
        //navigateTo(nextPage);
        nextButton.style.display = "block";

    } else {
const inputField = document.getElementById("inputField");
        inputField.style.borderColor = "red"; // Change border to red for feedback
        inputField.value = ""; // Clear the field
        inputField.placeholder = "Wrong answer, try again!"; // Temporary feedback
        setTimeout(() => {
inputField.style.borderColor = ""; // Reset border after feedback
        }, 1500);
    }
}


//Unscramble puzzle code
const words = ["AZKABAN", "HOGWARTS", "PATRONUS", "MUGGLE"];
const solutionCode = `${words[0][4]}${words[1][1]}${words[2][4]}${words[3][0]}`;

// Variables for tracking progress
let letterSets = words.map(word => word.split('').sort(() => Math.random() - 0.5));
let solvedWords = [false, false, false, false];
let msg = ['', '', '', ''];
const highlightLetters = [
  { wordIndex: 0, letterIndex: 4 },
  { wordIndex: 1, letterIndex: 1 },
  { wordIndex: 2, letterIndex: 4 },
  { wordIndex: 3, letterIndex: 0 }
];

// Function to check if a word is solved
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

// Function to move letters within a word
const moveLetter = (wordIndex, dragIndex, hoverIndex) => {
  if (solvedWords[wordIndex]) return;

  const updatedLetters = [...letterSets[wordIndex]];
  const [removed] = updatedLetters.splice(dragIndex, 1);
  updatedLetters.splice(hoverIndex, 0, removed);

  letterSets[wordIndex] = updatedLetters;
  checkSolved(updatedLetters, wordIndex);
};

// Function to update the UI
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

      // Highlight letters if solved
      const shouldHighlight = highlightLetters.some(
        (highlight) => highlight.wordIndex === wordIndex && highlight.letterIndex === letterIndex
      );
      if (solvedWords[wordIndex] && shouldHighlight) {
        letterTile.classList.add('highlight');
      }

      if (!solvedWords[wordIndex]) {
        letterTile.addEventListener('dragstart', (event) => {
          event.dataTransfer.setData('text/plain', JSON.stringify({ wordIndex, letterIndex }));
        });

        letterTile.addEventListener('dragover', (event) => event.preventDefault());

        letterTile.addEventListener('drop', (event) => {
          event.preventDefault();
          const { wordIndex: draggedWordIndex, letterIndex: draggedLetterIndex } = JSON.parse(event.dataTransfer.getData('text'));
          if (draggedWordIndex === wordIndex) {
            moveLetter(wordIndex, draggedLetterIndex, letterIndex);
          }
        });
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

  if (solvedWords.every(Boolean)) {
    codeInput.disabled = false;
    submitButton.disabled = false;
  } else {
    codeInput.disabled = true;
    submitButton.disabled = true;
  }
};

// Function to handle code submission
const handleCodeSubmit = () => {
  const inputCode = document.getElementById('code-input').value.trim().toUpperCase();
  const codeMessage = document.getElementById('code-message');
  const nextButton = document.getElementById("nextButton");

  if (inputCode === solutionCode) {
    codeMessage.innerText = '✅ Success! You entered the correct code!';
    codeMessage.className = 'success';
    nextButton.style.display = "block";
  } else {
    codeMessage.innerText = '❌ Incorrect code. Try again.';
    codeMessage.className = 'error';
  }
};

// Initialize the UI on load
updateUI();

// Attach event listener for the submit button
document.getElementById('submit-button').addEventListener('click', handleCodeSubmit);


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
