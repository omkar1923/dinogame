const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
let isJumping = false;
let score = 0;

function jump() {
    if (!isJumping) {
        isJumping = true;
        let currentPosition = 0;
        const jumpInterval = setInterval(() => {
            if (currentPosition >= 150) {
                clearInterval(jumpInterval);
                const fallInterval = setInterval(() => {
                    if (currentPosition === 0) {
                        clearInterval(fallInterval);
                        isJumping = false;
                    } else {
                        currentPosition -= 5;
                        dino.style.bottom = currentPosition + 'px';
                    }
                }, 20);
            } else {
                currentPosition += 5;
                dino.style.bottom = currentPosition + 'px';
            }
        }, 20);
    }
}

function checkCollision() {
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
    
    if (cactusLeft > 0 && cactusLeft < 70 && dinoTop < 50) {
        endGame();
    }
}

function endGame() {
    clearInterval(checkAlive);
    dino.style.animationPlayState = "paused";
    cactus.style.animationPlayState = "paused";
    alert("Whoops! Game Over Your Score: " + score);
    window.location.reload();
}


let checkAlive = setInterval(checkCollision, 10);

document.addEventListener("keydown", function (event) {
    if (event.code === 'Space') {
        jump();
    }
});

// Function to update score every second
setInterval(() => {
    score += 20;
    console.log("Score: " + score);
}, 1000);
