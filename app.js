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

function checkPuzzle1Answer(nextPage) {
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
