const foodSound = new Audio('../assets/music/food.mp3');
const gameOver = new Audio('../assets/music/gameover.mp3');
const move = new Audio('../assets/music/move.mp3');
const bgMusic = new Audio('../assets/music/music.mp3');
let inputDir = { x: 0, y: 0 };
let lastPaintTime = 0;
let speed = 5;
let score = 0;
let speaker = 0;
let snakeArr = [{ x: 10, y: 10 }]
let food = { x: 3, y: 3 };
let board = document.getElementsByClassName("board")[0];
// functions

function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine()


}
function isCollide(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[0].x === arr[i].x && arr[0].y === arr[i].y)
            return true;
    }
    if ((arr[0].x < 15 && arr[0].x >= 0) && (arr[0].y < 15 && arr[0].y >= 0))
        return false;
    return true;
}
function gameEngine() {
    // updating the snake array and food
    if (isCollide(snakeArr)) {
        gameOver.play();

        bgMusic.pause();
        inputDir = { x: 0, y: 0 };
        alert("game is over");
        snakeArr = [{ x: 10, y: 10 }];
        if (speaker == 1)
            bgMusic.play();
        food.x=3,food.y=3;
        score = 0;
        speed = 5;
        let newScore = "Score: " + score.toString();
        document.getElementsByClassName('score')[0].innerHTML = newScore;
    }
    // eating the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x,
            y: snakeArr[0].y + inputDir.y
        })
        score++;
        let newScore = "Score: " + score.toString();
        document.getElementsByClassName('score')[0].innerHTML = newScore;
        let a = 3;
        let b = 13;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        foodSound.play();
        if (score >= 3 && score <= 8)
            speed = 8;
        else if (score > 8)
            speed = 10;
    }
    else {
        for (let index = snakeArr.length - 2; index >= 0; index--) {
            snakeArr[index + 1] = { ...snakeArr[index] };
        }
        snakeArr[0].x += inputDir.x;
        snakeArr[0].y += inputDir.y;
    }
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        board.appendChild(snakeElement);
        if (index == 0) {
            snakeElement.classList.add('snakeHead');
        }
        else
            snakeElement.classList.add('snakeBody');

    })
    // display the food

    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    board.appendChild(foodElement);
    foodElement.classList.add('snakeFood');

}
function PlayBgMusic() {
    bgMusic.play();
}
function PauseMusic() {
    bgMusic.pause();
}
// Actual Execution starts here
window.requestAnimationFrame(main);
function ub() {
    if (speaker == 1)
        bgMusic.play();
    if (inputDir.x === 0 && inputDir.y === 1) { }
    else {
        inputDir.x = 0;
        inputDir.y = -1;
    }
} function lb() {
    if (speaker == 1)
        bgMusic.play();
    if (inputDir.x === 1 && inputDir.y === 0) { }
    else {
        inputDir.x = -1;
        inputDir.y = 0;
    }
} function rb() {
    if (speaker == 1)
        bgMusic.play();
    if (inputDir.x === -1 && inputDir.y === 0) { }
    else {
        inputDir.x = 1;
        inputDir.y = 0;
    }
} function db() {
    if (speaker == 1)
        bgMusic.play();
    if (inputDir.x === 0 && inputDir.y === -1) { }
    else {
        inputDir.x = 0;
        inputDir.y = 1;
    }
}
let sp = document.getElementsByClassName('speaker')[0];
sp.addEventListener('click', () => {
    console.log(sp);
    if (speaker == 1) {
        speaker = 0;
        PauseMusic();
        sp.classList.add("faded");
    }
    else {
        speaker = 1;
        PlayBgMusic();
        sp.classList.remove("faded");
    }

});

window.addEventListener('keydown', (val) => {
    if (speaker == 1)
        PlayBgMusic();
    switch (val.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})