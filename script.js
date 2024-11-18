const mazeElement = document.getElementById("maze");
const messageElement = document.getElementById("message");
const mazemsg = document.getElementById("mazemsg");
const timerElement = document.getElementById("timer");
let currentPuzzle='puzzle2';

function navigateTo(page) {
    window.location.href = page;
}


const mazeLayout = [
    ['P', 'W', 'W', 'W', 'P', 'P', 'P', 'W', 'W', 'W', 'W', 'P'],
    ['P', 'P', 'P', 'P', 'P', 'W', 'P', 'P', 'W', 'P', 'P', 'W'],
    ['W', 'W', 'W', 'W', 'P', 'W', 'W', 'P', 'W', 'W', 'P', 'W'],
    ['W', 'P', 'P', 'P', 'P', 'P', 'W', 'P', 'P', 'P', 'P', 'P'],
    ['W', 'P', 'W', 'W', 'W', 'P', 'W', 'W', 'W', 'W', 'W', 'W'],
    ['P', 'P', 'P', 'P', 'W', 'P', 'P', 'P', 'P', 'P', 'P', 'E'],
    ['W', 'W', 'W', 'P', 'W', 'W', 'W', 'W', 'P', 'W', 'W', 'W'],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'K', 'W']
];

let playerPosition = { x: 0, y: 0 };
const exitPosition = { x: 11, y: 5 };
let hasKey = false;
let timeLeft = 60;
let timerint;
const enemies = [
    { x: 4, y: 3, direction: 1 },
    { x: 8, y: 1, direction: -1 },
    { x: 7, y: 7, direction: 1 }
];

function initializeMaze() {
    mazeElement.innerHTML = '';
    for (let y = 0; y < mazeLayout.length; y++) {
        for (let x = 0; x < mazeLayout[y].length; x++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            if (mazeLayout[y][x] === 'P') {
                cell.classList.add("path");
            } else if (mazeLayout[y][x] === 'W') {
                cell.classList.add("wall");
            } else if (mazeLayout[y][x] === 'E') {
                cell.classList.add("exit");
            } else if (mazeLayout[y][x] === 'K') {
                cell.classList.add("key");
            }

            if (x === playerPosition.x && y === playerPosition.y) {
                cell.classList.add("player");
            }

            enemies.forEach(enemy => {
                if (enemy.x === x && enemy.y === y) {
                    cell.classList.add("enemy");
                }
            });

            mazeElement.appendChild(cell);
        }
    }
    timerElement.textContent = timeLeft + "s";
}

function movePlayer(dx, dy) {
    const newX = playerPosition.x + dx;
    const newY = playerPosition.y + dy;

    if (newX < 0 || newX >= mazeLayout[0].length || newY < 0 || newY >= mazeLayout.length) {
        mazemsg.textContent = "You can't move outside the maze!";
        return;
    }
    if (mazeLayout[newY][newX] === 'W') {
        mazemsg.textContent = "You hit a wall!";
        return;
    }
    
    if (mazeLayout[newY][newX] === 'K') {
        mazemsg.textContent = "You found the key! Now, find the exit!";
        hasKey = true;
    }

    playerPosition = { x: newX, y: newY };

    if (newX === exitPosition.x && newY === exitPosition.y) {
        if (hasKey) {
            mazemsg.textContent = "Congratulations! You escaped!";
            alert("moving to next puzzle!");
            clearInterval(timerint);
            clearInterval(enemyInterval);
            navigateTo('puzzle3.html');
        } else {
            mazemsg.textContent = "You need the key to exit!";
        }
        return;
    }

    enemies.forEach(enemy => {
        if (enemy.x === newX && enemy.y === newY) {
            mazemsg.textContent = "You were caught by an enemy! Game Over!";
            clearInterval(timerint);
            clearInterval(enemyInterval);
            resetGame();
        }
    });

    initializeMaze();
}

function moveEnemies() {
    enemies.forEach(enemy => {
        let newX = enemy.x + enemy.direction;

        // Check if the new position is a wall or outside the maze boundaries
        if (newX < 0 || newX >= mazeLayout[0].length || mazeLayout[enemy.y][newX] === 'W') {
            // Reverse direction
            enemy.direction *= -1;
            newX = enemy.x + enemy.direction;
        }

        // Update enemy position
        enemy.x = newX;
    });
    initializeMaze();
}

function mazetimer() {
    timerint = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft + "s";
        if (timeLeft <= 0) {
            messageElement.textContent = "Time's up! Game Over!";
            clearInterval(timerint);
            clearInterval(enemyInterval);
        }
    }, 1000);
}

function handleKeydown(event) {
    switch (event.key) {
        case 'ArrowUp': movePlayer(0, -1); break;
        case 'ArrowDown': movePlayer(0, 1); break;
        case 'ArrowLeft': movePlayer(-1, 0); break;
        case 'ArrowRight': movePlayer(1, 0); break;
    }
}

function resetGame() {
    playerPosition = { x: 0, y: 0 };
    hasKey = false;
    timeLeft = 60;
    clearInterval(timerint);
    clearInterval(enemyInterval);
    initializeMaze();
    mazetimer();
    enemyInterval = setInterval(moveEnemies, 1000);  // Enemies move every second
    mazemsg.textContent = "";
}

document.addEventListener("keydown", handleKeydown);


let enemyInterval = setInterval(moveEnemies, 1000);  // Set interval for enemy movement
