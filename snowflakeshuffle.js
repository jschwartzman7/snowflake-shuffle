const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;


let gameBoard;
let score;
let optimalSolution;
let pathArray;
let legend = {
    "Occupied space": new PegPiece([-canvasWidth/2.1, pegRadius-canvasHeight/2], -1, true),
    "Unoccupied space": new PegPiece([-canvasWidth/2.1, 4*pegRadius-canvasHeight/2], -1, false),
    "Selected space" : new PegPiece([-canvasWidth/2.1, 7*pegRadius-canvasHeight/2], -2, true)
}
legend["Selected space"].toMove = true;
setBoard(SnowflakeState.newBoard());
//console.log("optimalSolution: ", optimalSolution);

document.getElementById("newBoardButton").addEventListener("click", function(){
    setBoard(SnowflakeState.newBoard());

});
document.getElementById("randomBoardButton").addEventListener("click", function(){
    setBoard(SnowflakeState.randomBoard());
});

function setBoard(boardState){
    gameBoard = boardState;
    //optimalSolution = getOptimalSolution(gameBoard);
    //pathArray = getOptimalPath(gameBoard)
}
function drawLegend(){
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    let yOffset = pegRadius-canvasHeight/2+5
    for (let key in legend) {
        const PegPiece = legend[key];
        PegPiece.draw();
        ctx.fillText(key, -canvasWidth/2.1+pegRadius,  yOffset);
        yOffset += 3*pegRadius;
    }
    ctx.restore();
    score = SnowflakeState.getNumOccupied(gameBoard)
    ctx.fillText(score, -canvasWidth/2.1+pegRadius,  yOffset);
}
function gameLoop() {
    ctx.clearRect(-canvasWidth/2, -canvasHeight/2, canvasWidth, canvasHeight);
    gameBoard.drawBoard();
    drawLegend();
    requestAnimationFrame(gameLoop);
}

ctx.translate(canvasWidth/2, canvasHeight/2);
gameLoop();