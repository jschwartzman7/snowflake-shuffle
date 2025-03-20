/*
Ability to play game, configure board, and view optimal solution
*/

const triangleLength = 80;
const pegRadius = triangleLength / 5.0;

class PegPiece {

    constructor(isOccupied, position){
        this.occupied = isOccupied;
        this.index = position;
        this.toMove = false;
        this.defaultCenter = [];
        this.center = [];
        document.getElementById("gameCanvas").addEventListener('click', (event) => {
            let x = event.clientX - document.getElementById("gameCanvas").getBoundingClientRect().left-300;
            let y = event.clientY - document.getElementById("gameCanvas").getBoundingClientRect().top-300;
            if(this.toMove){
                let distance = Math.sqrt((x-this.defaultCenter[0])**2 + (y-this.defaultCenter[1])**2);
                if(distance < pegRadius){
                    this.center = this.defaultCenter;
                    this.toMove = false;
                }
                else{
                    this.center = [600,600];
                }
            }
            else{
                let distance = Math.sqrt((x-this.defaultCenter[0])**2 + (y-this.defaultCenter[1])**2);
                if(distance < pegRadius){
                    if(this.occupied){
                    this.toMove = true;
                    }
                    else{
                        this.occupied = true;
                    }
                }
            }
        });
        document.getElementById("gameCanvas").addEventListener('mousemove', (event) => {
            let x = event.clientX - document.getElementById("gameCanvas").getBoundingClientRect().left-300;
            let y = event.clientY - document.getElementById("gameCanvas").getBoundingClientRect().top-300;
            if(this.toMove){
                this.center = [x, y];
            }
        });
    }

    setCenter(newCenter){
        if(this.center.length == 0){
    
            this.center = newCenter
        }
    }

    draw(){
        if(this.toMove){
            ctx.fillStyle = "gray";
        }
        else if(this.occupied){
            ctx.fillStyle = "black";
        }
        else{
            ctx.fillStyle = "white";
        }
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(this.center[0], this.center[1], pegRadius, 0, 2*Math.PI);
        ctx.fill();
    }
}

class SnowflakeState {

    static newBoard(){
        let board = new SnowflakeState();
        let unoccupiedIndex = Math.round(Math.random()*19-0.5)
        board.pegPieces[unoccupiedIndex].occupied = false;
        return board;
    }
    static randomBoard(){
        let board = new SnowflakeState();
        for(let i = 0; i < 19; i++){
            board.pegPieces[i].occupied = Math.round(Math.random());
        }
        return board;
    }

    constructor(){
        this.pegPieces = [];
        for(let i = 0; i < 19; i++){
            this.pegPieces.push(new PegPiece(true, i));
        }

        this.longRow1 = [this.pegPieces[0], this.pegPieces[1], this.pegPieces[2], this.pegPieces[3], this.pegPieces[4]];
        this.longRow2 = [this.pegPieces[5], this.pegPieces[6], this.pegPieces[2], this.pegPieces[7], this.pegPieces[8]];
        this.longRow3 = [this.pegPieces[9], this.pegPieces[10], this.pegPieces[2], this.pegPieces[11], this.pegPieces[12]];

        this.triangle1Row1 = [this.pegPieces[13], this.pegPieces[6], this.pegPieces[11], this.pegPieces[15]];
        this.triangle1Row2 = [this.pegPieces[13], this.pegPieces[1], this.pegPieces[10], this.pegPieces[1]];
        this.triangle1Row3 = [this.pegPieces[14], this.pegPieces[7], this.pegPieces[3], this.pegPieces[15]];

        this.triangle2Row1 = [this.pegPieces[16], this.pegPieces[10], this.pegPieces[7], this.pegPieces[17]];
        this.triangle2Row2 = [this.pegPieces[16], this.pegPieces[1], this.pegPieces[6], this.pegPieces[18]];
        this.triangle2Row3 = [this.pegPieces[18], this.pegPieces[11], this.pegPieces[3], this.pegPieces[17]];

        this.boardRows = []
        this.boardRows.push(this.longRow1);
        this.boardRows.push(this.longRow2);
        this.boardRows.push(this.longRow3);
        this.boardRows.push(this.triangle1Row1);
        this.boardRows.push(this.triangle1Row2);
        this.boardRows.push(this.triangle1Row3);
        this.boardRows.push(this.triangle2Row1);
        this.boardRows.push(this.triangle2Row2);
        this.boardRows.push(this.triangle2Row3);
    }

    drawLongRow(angle, longRow){
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        if(longRow[0].center.length == 0){
            longRow[0].defaultCenter = [-cos*(3*triangleLength), -sin*(3*triangleLength)];
            longRow[0].center = longRow[0].defaultCenter
        }
        longRow[0].draw();
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.moveTo(-cos*(3*triangleLength-pegRadius), -sin*(3*triangleLength-pegRadius));
        ctx.lineTo(-cos*(triangleLength+pegRadius), -sin*(triangleLength+pegRadius));
        ctx.stroke();
        if(longRow[1].center.length == 0){
            longRow[1].defaultCenter = [-cos*(triangleLength), -sin*(triangleLength)];
            longRow[1].center = longRow[1].defaultCenter;
        }
        longRow[1].draw();
        ctx.lineWidth = 5;
        ctx.moveTo(-cos*(triangleLength-pegRadius), -sin*(triangleLength-pegRadius));
        ctx.lineTo(cos*-pegRadius, sin*-pegRadius);
        ctx.stroke();
        if(longRow[2].center.length == 0){
            longRow[2].defaultCenter = [0, 0];
            longRow[2].center = longRow[2].defaultCenter;
        }
        longRow[2].draw();
        ctx.lineWidth = 5;
        ctx.moveTo(cos*pegRadius, sin*pegRadius);
        ctx.lineTo(cos*(triangleLength-pegRadius), sin*(triangleLength-pegRadius));
        ctx.stroke();
        if(longRow[3].center.length == 0){
            longRow[3].defaultCenter = [cos*(triangleLength), sin*(triangleLength)];
            longRow[3].center = longRow[3].defaultCenter;
        }
        longRow[3].draw();
        ctx.lineWidth = 5;
        ctx.moveTo(cos*(triangleLength+pegRadius), sin*(triangleLength+pegRadius));
        ctx.lineTo(cos*(3*triangleLength-pegRadius), sin*(3*triangleLength-pegRadius));
        ctx.stroke();
        if(longRow[4].center.length == 0){
            longRow[4].defaultCenter = [cos*(3*triangleLength), sin*(3*triangleLength)];
            longRow[4].center = longRow[4].defaultCenter;
        }
        longRow[4].draw();
    }
    
    drawTriangleSide(p0, angle, triangleRow){
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(p0[0]+cos*pegRadius, p0[1]+sin*pegRadius);
        ctx.lineTo(p0[0]+cos*(triangleLength-pegRadius), p0[1]+sin*(triangleLength-pegRadius));
        ctx.stroke();
        ctx.moveTo(p0[0]+cos*(triangleLength+pegRadius), p0[1]+sin*(triangleLength+pegRadius));
        ctx.lineTo(p0[0]+cos*(2*triangleLength-pegRadius), p0[1]+sin*(2*triangleLength-pegRadius));
        ctx.stroke();
        ctx.moveTo(p0[0]+cos*(2*triangleLength+pegRadius), p0[1]+sin*(2*triangleLength+pegRadius));
        ctx.lineTo(p0[0]+cos*(3*triangleLength-pegRadius), p0[1]+sin*(3*triangleLength-pegRadius));
        ctx.stroke();
        for(let i = 0; i < triangleRow.length; i++){
            let x = p0[0] + i*cos*triangleLength;
            let y = p0[1] + i*sin*triangleLength;
            if(triangleRow[i].center.length == 0){
                triangleRow[i].defaultCenter = [x, y];
                triangleRow[i].center = triangleRow[i].defaultCenter;
            }
            triangleRow[i].draw();
        }
    }
    
    drawBoard(){
        this.drawLongRow(0, this.longRow1);
        this.drawLongRow(Math.PI/3, this.longRow2);
        this.drawLongRow(-Math.PI/3, this.longRow3);
    
        let distance = Math.sqrt(3)*triangleLength;
        this.drawTriangleSide([distance*Math.cos(7*Math.PI/6), distance*Math.sin(7*Math.PI/6)], 0, this.triangle1Row1);
        this.drawTriangleSide([distance*Math.cos(7*Math.PI/6), distance*Math.sin(7*Math.PI/6)], Math.PI/3, this.triangle1Row2);
        this.drawTriangleSide([0, distance], -Math.PI/3, this.triangle1Row3);
    
        this.drawTriangleSide([distance*Math.cos(5*Math.PI/6), distance*Math.sin(5*Math.PI/6)], 0, this.triangle2Row1);
        this.drawTriangleSide([distance*Math.cos(5*Math.PI/6), distance*Math.sin(5*Math.PI/6)], -Math.PI/3, this.triangle2Row2);
        this.drawTriangleSide([0, -distance], Math.PI/3, this.triangle2Row3);
    }
    

}