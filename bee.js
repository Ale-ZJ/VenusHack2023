/* html variables */
const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const nameText = document.querySelector("#name");
const resetBtn = document.querySelector("#resetBtn");

/* game board constants */
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "lightgreen";
const beeColor = "black";
const beeBorder = "black";
const foodColor = "lightpink";
const unitSize = 25;

/* global variables for game logic */
let running = false;     // for keeping track of end-game
let flowerFound = false; // for keeping track of finding all the letters of a women in STEM
let firstMove = true;
let xVelocity = 0;
let yVelocity = 0;
let foodX;
let foodY;
let displayName = "";     // name displayed below game board
let womanName = "Marie Curie";  // last name from json file loaded at beginning of game
let currWomanNameIdx = 0; 
let bee = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
]; 

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart(){
    running = true;
    // load women information for the game
    nameText.textContent = "hi"
    createFood();
    drawFood();
    nextTick();
};

function nextTick(){
    if(running){
        setTimeout(()=>{
        clearBoard();
        drawFood();       // draw letter
        moveBee();        // move bee in the grid
        drawBee();        // draw bee 
        checkGameOver();  // bee hits a border or name is completed
        nextTick();
        }, 75);
    }
    else{
        displayGameOver();
    }
};

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
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
    ctx.font = "35px Chalkduster";
    ctx.fillStyle = "black";
    ctx.fillText(womanName[currWomanNameIdx], foodX+12.5, foodY+25);
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

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch(true){
        case(keyPressed == LEFT && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == UP && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case(keyPressed == RIGHT && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == DOWN && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
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
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    if (flowerFound) {
        ctx.fillText("FLOWER FOUND!", gameWidth / 2, gameHeight / 2);
        // how do i display women information only when end-game?
    } 
    else {
        ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    }
    
    running = false;
};

function resetGame(){
    // loadWomenInfo() to change women name, known_for, summary
    xVelocity = unitSize;
    yVelocity = 0;
    bee = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
    gameStart();
};


function _generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// TODO: update the global variable for women information
// loads a women's information into bee.js 
function loadWomenInfo() {
    id = generateRandomNumber(1,36);

    // load the json file
    fetch('techwomen.json')
        .then(data => {
            const flowerInfo = document.getElementById('flowerResult')

            // search json file for a given women in stem
            const flowers = data.filter(item => item.id == id);

            
        });


}
