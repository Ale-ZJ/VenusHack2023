const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const nameText = document.querySelector("#name");
//const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "lightgreen";
const snakeColor = "black";
const snakeBorder = "black";
const foodColor = "lightpink";
const unitSize = 25;
let running = false;
let xVelocity = 0;
let yVelocity = 0;
let foodX;
let foodY;
let womanName = "";
let score = 0;
let snake = [
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
    running= true;
    // scoreText.textContent = score;
    nameText.textContent = "hi"
    createFood();
    drawFood();
    nextTick();
};

function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawBee();
            checkGameOver();
            nextTick();
        }, 100);
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
    ctx.fillText("A", foodX+12.5, foodY+25);
};


function moveSnake(){
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity};
    
    snake.unshift(head);
    //if food is eaten
    if(snake[0].x == foodX && snake[0].y == foodY){
        womanName += "A";
        nameText.textContent = womanName;
        //score+=1;
        //scoreText.textContent = score;
        createFood();
    }
    else{
        snake.pop();
    }     
};

function drawBee(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x+10, snakePart.y+10, unitSize-20, unitSize-20);
        ctx.strokeRect(snakePart.x+10, snakePart.y+10, unitSize-20, unitSize-20);
    })
    
    if (yVelocity === 0) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(snake[0].x, snake[0].y+2.5, unitSize, unitSize-5);
        ctx.fillStyle = "black";
        ctx.fillRect(snake[0].x+5, snake[0].y+2.5, 5, 20);
        ctx.fillRect(snake[0].x+15, snake[0].y+2.5, 5, 20);
        ctx.strokeRect(snake[0].x, snake[0].y+2.5, unitSize, unitSize-5);
        ctx.fillStyle = "white";
        ctx.fillRect(snake[0].x+10, snake[0].y-5, 8, 15);
        ctx.strokeRect(snake[0].x+10, snake[0].y-5, 8, 15);
        ctx.fillRect(snake[0].x+10, snake[0].y+17, 8, 15);
        ctx.strokeRect(snake[0].x+10, snake[0].y+17, 8, 15);
    }
    else {
        ctx.fillStyle = "yellow";
        ctx.fillRect(snake[0].x+2.5, snake[0].y, unitSize-5, unitSize);
        ctx.fillStyle = "black";
        ctx.fillRect(snake[0].x+2.5, snake[0].y+5, 20, 5);
        ctx.fillRect(snake[0].x+2.5, snake[0].y+15, 20, 5);
        ctx.strokeRect(snake[0].x+2.5, snake[0].y, unitSize-5, unitSize);
        ctx.fillStyle = "white";
        ctx.fillRect(snake[0].x-5, snake[0].y+10, 15, 8);
        ctx.strokeRect(snake[0].x-5, snake[0].y+10, 15, 8);
        ctx.fillRect(snake[0].x+15, snake[0].y+10, 15, 8);
        ctx.strokeRect(snake[0].x+15, snake[0].y+10, 15, 8);
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
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
            running = false;
            break;
    }
    // games over if you bump into self
    for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }

};
function displayGameOver(){
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    running = false;
};
function resetGame(){
    // score = 0;
    womanName = ""
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
    gameStart();
};