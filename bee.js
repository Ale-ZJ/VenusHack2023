/**
 * Written by: Lillian Ling, Alexandra Zhang Jiang
 */

/* html variables */
const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const nameText = document.querySelector("#name");
const resetBtn = document.querySelector("#resetBtn");
const knownForText = document.querySelector("#knownFor");
const summaryText = document.querySelector("#summary");

/* game board constants */
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "lightgreen";
const beeColor = "black";
const beeBorder = "black";
const foodColor = "yellow";
const unitSize = 25;
const frameRate = 1000/10; // 60 frames per second

/* global variables for game logic */
let running = false;     // for keeping track of end-game
let flowerFound = false; // for keeping track of finding all the letters of a women in STEM
let paused = true;
let xVelocity = unitSize;         // the bee moves to the right at beginning of game
let yVelocity = 0;
let foodX;
let foodY;
let displayName = "";      // name displayed below game board
let womanName;             // last name from json file loaded at beginning of game
let womanKnownFor;
let womanSummary;
let intervalTimerId;
let currWomanNameIdx = 0; 
let bee = [
    {x:unitSize * 4, y:unitSize*5},
    {x:unitSize * 3, y:unitSize*5},
    {x:unitSize * 2, y:unitSize*5},
    {x:unitSize, y:unitSize*5},
    {x:0, y:unitSize*5}
]; 

window.addEventListener("keydown", changeDirection);
playBtn.addEventListener("click", resetGame);

gameStart();

function gameStart(){
    running = true;
    paused = true;
    loadWomenInfo();
    nameText.textContent = "Start collecting letters!"
    clearBoard();
    createFood(); // initial letter
 
    // repeatedly calls gameLoop after frameRate time has passed
    intervalTimerId = setInterval(() => {
        gameLoop();
    }, frameRate);
};

// updates game state and render state graphics
function gameLoop() {
    if (running){
        clearBoard();
        drawFood();
        if (!paused) {
            moveBee();
        }
        drawBee();
        checkGameOver();
    }
    else {
        displayGameOver();
    }
}

function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};

function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
};

function drawFood(){ 
    ctx.fillStyle = foodColor;

    ctx.beginPath();
    ctx.arc(foodX+unitSize/2, foodY+unitSize/2, 16, 0, Math.PI * 2, false);
    ctx.strokeStyle = 'gold';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.font = "25px Darumadrop One";
    ctx.fillStyle = "black";
    ctx.fillText(womanName[currWomanNameIdx], foodX+10, foodY+25);
};

function moveBee(){
    const head = {x: bee[0].x + xVelocity,
                  y: bee[0].y + yVelocity};
    
    bee.unshift(head);
    //if food is eaten
    if(bee[0].x == foodX && bee[0].y == foodY){
        displayName += womanName[currWomanNameIdx];
        nameText.textContent = displayName;
        currWomanNameIdx += 1;
        
        // check if collected all letters
        if (currWomanNameIdx == womanName.length) {
            flowerFound = true;
        }
        else {
            createFood();
        }
    }
    else{
        bee.pop();
    }     
};

function drawBee(){
    ctx.fillStyle = beeColor;
    ctx.strokeStyle = beeBorder;
    bee.forEach(beePart => {
        ctx.fillRect(beePart.x+10, beePart.y+10, unitSize-20, unitSize-20);
        ctx.strokeRect(beePart.x+10, beePart.y+10, unitSize-20, unitSize-20);
    })
    
    if (yVelocity === 0) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(bee[0].x, bee[0].y+2.5, unitSize, unitSize-5);
        ctx.fillStyle = "black";
        ctx.fillRect(bee[0].x+5, bee[0].y+2.5, 5, 20);
        ctx.fillRect(bee[0].x+15, bee[0].y+2.5, 5, 20);
        ctx.strokeRect(bee[0].x, bee[0].y+2.5, unitSize, unitSize-5);
        ctx.fillStyle = "white";
        ctx.fillRect(bee[0].x+10, bee[0].y-5, 8, 15);
        ctx.strokeRect(bee[0].x+10, bee[0].y-5, 8, 15);
        ctx.fillRect(bee[0].x+10, bee[0].y+17, 8, 15);
        ctx.strokeRect(bee[0].x+10, bee[0].y+17, 8, 15);
    }
    else {
        ctx.fillStyle = "yellow";
        ctx.fillRect(bee[0].x+2.5, bee[0].y, unitSize-5, unitSize);
        ctx.fillStyle = "black";
        ctx.fillRect(bee[0].x+2.5, bee[0].y+5, 20, 5);
        ctx.fillRect(bee[0].x+2.5, bee[0].y+15, 20, 5);
        ctx.strokeRect(bee[0].x+2.5, bee[0].y, unitSize-5, unitSize);
        ctx.fillStyle = "white";
        ctx.fillRect(bee[0].x-5, bee[0].y+10, 15, 8);
        ctx.strokeRect(bee[0].x-5, bee[0].y+10, 15, 8);
        ctx.fillRect(bee[0].x+15, bee[0].y+10, 15, 8);
        ctx.strokeRect(bee[0].x+15, bee[0].y+10, 15, 8);
    }
};


function changeDirection(event){
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;
    const PAUSE = 32;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    if (keyPressed == UP || keyPressed == DOWN) {
        event.preventDefault();
    }
    switch(true){
        case(keyPressed == LEFT && !goingRight && !paused):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == UP && !goingDown && !paused):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case(keyPressed == RIGHT && !goingLeft && !paused):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == DOWN && !goingUp && !paused):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
        case(keyPressed == PAUSE):
            paused = paused? false : true;
            break;
    }
    clearTimeout();
};


function checkGameOver(){
    switch(true){
        case (bee[0].x < 0):
            running = false;
            break;
        case (bee[0].x >= gameWidth):
            running = false;
            break;
        case (bee[0].y < 0):
            running = false;
            break;
        case (bee[0].y >= gameHeight):
            running = false;
            break;
    }

    // games over if you bump into self
    for(let i = 1; i < bee.length; i+=1){
        if(bee[i].x == bee[0].x && bee[i].y == bee[0].y){
            running = false;
        }
    }

    // if flower found then congratulations!
    if (flowerFound) {
        running = false;
    }

};

function displayGameOver(){
    ctx.font = "50px Darumadrop One";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    if (flowerFound) {
        ctx.fillText("FLOWER FOUND!", gameWidth / 2, gameHeight / 2);
        knownForText.textContent = womanKnownFor;
        summaryText.textContent = womanSummary;
    } 
    else {
        ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    }
    
    running = false;
};

function resetGame(){
    loadWomenInfo();
    xVelocity = unitSize;
    yVelocity = 0;
    currWomanNameIdx = 0;
    displayName = "";
    womanKnownFor = "";
    womanSummary = "";
    knownForText.textContent = womanKnownFor;
    summaryText.textContent = womanSummary;
    flowerFound = false;
    clearBoard();
    bee = [
        {x:unitSize * 4, y:unitSize*5},
        {x:unitSize * 3, y:unitSize*5},
        {x:unitSize * 2, y:unitSize*5},
        {x:unitSize, y:unitSize*5},
        {x:0, y:unitSize*5}
    ]; 
    clearTimeout(intervalTimerId);
    gameStart();
};

function loadWomenInfo() {
    function _generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    randomId = _generateRandomNumber(1, 38);

    fetch('techwomen.json')
        .then(response => response.json())
        .then(womenData => {
            const womanMatch = womenData.find(item => item.id == randomId);
            
            womanName = womanMatch.name;
            womanKnownFor = womanMatch.known_for;
            womanSummary = womanMatch.Bio.Summary;
        });
}