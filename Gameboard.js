const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let gameBoard = SnowflakeState.randomBoard();


document.getElementById("newBoardButton").addEventListener("click", function(){

});
document.getElementById("randomBoardButton").addEventListener("click", function(){

});

function gameLoop() {
    ctx.clearRect(-300, -300, canvas.width, canvas.height);
    gameBoard.drawBoard();
    requestAnimationFrame(gameLoop);
}

ctx.translate(300, 300);
gameLoop();