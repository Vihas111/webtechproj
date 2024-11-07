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
const messages = [
    "Welcome to the Wizarding World...",
    "Ah, a room filled with secrets, is it? Very well, here’s a hint,", 
    "If your mind is keen enough to grasp it.",
    "Not all is as it seems—sometimes, the quietest objects hold the loudest answers.",
    "Look closely, and let curiosity guide your hand.",
    "Click wisely, for each item you touch may reveal a clue… or lead you further astray.",
    "The path to freedom lies hidden in plain sight.",
    "Now, off you go, and may your instincts be as sharp as your wits!"
];

function changeContent() {
    const textBox = document.getElementById("typing-text");

    textBox.style.animation = 'none';
    textBox.offsetHeight;
    textBox.style.animation = '';

    textBox.textContent = messages[currentIndex];
    currentIndex = (currentIndex + 1) % messages.length;
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
    
    if (answer === "3450") {
        alert("Correct!!");
        document.getElementById("nextButton").style.display = "block";
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
        alert("Correct!!");
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