// Global variables
const sisyphus = document.getElementsByClassName('sisyphus')[0];
const rock = document.getElementsByClassName('rock')[0];
let sisyphusPos = 50;
let rockPos = 90;
let isPushing = false;
let isFalling = true;
let isMovingLeft = false;
let isMovingRight = false;
let stillRockCounter = 0;
let rockFallSpeed = 0; // Subject to gravity
let rockAngle = 0;
const movementRange = [27, 194]; // Boundaries for movement
const sisyphusSpeed = 0.7; // Sisyphus speed when not pushing
const pushSpeed = 0.3; // Slower when pushing rock

// Event listeners
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') {
        isMovingLeft = true;
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
        isMovingRight = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') {
        isMovingLeft = false;
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
        isMovingRight = false;
    }
});

// Functions
function moveSisyphus(direction) {
    // Adjust position within boundaries
    sisyphusPos += direction * (isPushing ? pushSpeed : sisyphusSpeed); // Slower when pushing
    if (sisyphusPos < movementRange[0]) {
        sisyphusPos = movementRange[0]; // Minimum boundary
    } else if (sisyphusPos > movementRange[1]) {
        sisyphusPos = movementRange[1]; // Maximum boundary
    }

    if (sisyphusPos >= rockPos - 2 && sisyphusPos <= rockPos + 4 && direction > 0 && !isFalling) {
      isPushing = true
    }
    else {
      isPushing = false
    }
}

function moveRock(direction) {
  if (direction > 0 && isPushing) { // Rock being pushed forward
    rockPos += pushSpeed;
    stillRockCounter = 0;
    rockFallSpeed = 0;

    if (rockPos > movementRange[1]) {
      rockPos = movementRange[1];
    }

    if (rockPos < movementRange[1]) {
      rockAngle += pushSpeed * 2 * Math.PI;
    }
  }
  else if (isPushing) { // Rock being pushed, but stationary
    stillRockCounter++;

    if (stillRockCounter >= 100) {
      isFalling = true;
      isPushing = false;
    }
  }
  else if (rockPos >= movementRange[1] && stillRockCounter <= 100) {
    stillRockCounter++;
  }
    else { // Rock falling
      rockFallSpeed += 0.020; // Apply gravity
      rockPos -= rockFallSpeed;
      isFalling = true;
  
      if (rockPos < movementRange[0] + 6) { // Ensure within lower bound (a little above it)
        rockPos = movementRange[0] + 6;
        isFalling = false;
      }
  
      if (isFalling) {
        rockAngle -= rockFallSpeed * 6;
      }
    }

  rock.style.transform = `rotate(${rockAngle}deg)`;
}

function updatePositions() {
    sisyphus.style.left = sisyphusPos + '%';
    rock.style.left = rockPos + '%';
}

function gameLoop() {
    if (isMovingRight) {
      moveSisyphus(1);
      moveRock(1);
    }
    else if (isMovingLeft) {
      moveSisyphus(-1);
      moveRock(-1);
    }
    else {
      moveRock(-1);
    }

    updatePositions();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

// Message
console.log("This is Sisyphus.")
console.log("Sisyphus was condemned by the gods to roll this rock up a mountain for all of eternity.")
console.log("One must imagine Sisyphus happy.")


//eof