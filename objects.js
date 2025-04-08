/*
Ability to play game, configure board, and view optimal solution
*/
const triangleLength = 80;
const pegRadius = 20;
const lineWidth = 2;

class PegPiece {
    constructor(defaultCenter, index, occupied){
        this.occupied = occupied;
        this.position = index;
        this.toMove = false;
        this.defaultCenter = defaultCenter;
        this.center = defaultCenter;
        document.getElementById("gameCanvas").addEventListener('click', (event) => {
            if(this.position < 0){
                return;
            }
            let x = event.clientX - document.getElementById("gameCanvas").getBoundingClientRect().left-canvasWidth/2;
            let y = event.clientY - document.getElementById("gameCanvas").getBoundingClientRect().top-canvasHeight/2;
            let distance = Math.sqrt((x-this.defaultCenter[0])**2 + (y-this.defaultCenter[1])**2);
            if(distance > pegRadius){
                return;
            }
            if(this.toMove){
                this.center = this.defaultCenter;
                this.toMove = false;
            }
            else{
                if(this.occupied){
                    for(let pegPiece of gameBoard.pegPieces){
                        if(pegPiece.toMove){
                            return;
                        }
                    }
                    this.toMove = true;
                }
            }
        });
        document.getElementById("gameCanvas").addEventListener('mousemove', (event) => {
            if(this.toMove && this.position >= 0){
                this.center = [event.clientX - document.getElementById("gameCanvas").getBoundingClientRect().left-canvasWidth/2,
                               event.clientY - document.getElementById("gameCanvas").getBoundingClientRect().top-canvasHeight/2];
            }
        });
    }

    draw(){
        if(this.toMove){
            let gradient = ctx.createLinearGradient(this.center[0]-pegRadius, this.center[1]-pegRadius, this.center[0]+pegRadius, this.center[1]+pegRadius)
            gradient.addColorStop(0, "white");
            gradient.addColorStop(0.8, "blue");
            ctx.fillStyle = gradient;
        }
        else if(this.occupied){
            let gradient = ctx.createLinearGradient(this.center[0]-pegRadius, this.center[1]-pegRadius, this.center[0]+pegRadius, this.center[1]+pegRadius)
            gradient.addColorStop(0, "blue");
            gradient.addColorStop(0.8, "black");
            ctx.fillStyle = gradient;
        }
        else{
            let gradient = ctx.createLinearGradient(this.center[0]-pegRadius, this.center[1]-pegRadius, this.center[0]+pegRadius, this.center[1]+pegRadius)
            gradient.addColorStop(0, "white");
            gradient.addColorStop(0.8, "gray");
            ctx.fillStyle = gradient;
        }
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(this.center[0], this.center[1], pegRadius, 0, 2*Math.PI);
        ctx.fill();
        }
}

class SnowflakeState {

    static newBoard(){
        let board = new SnowflakeState(new Array(19).fill(true));
        let unoccupiedIndex = Math.round(Math.random()*19-0.5)
        board.pegPieces[unoccupiedIndex].occupied = false;
        return board;
    }
    static randomBoard(){
        let board = new SnowflakeState(new Array(19).fill(false));
        for(let i = 0; i < 19; i++){
            board.pegPieces[i].occupied = Math.round(Math.random());
        }
        return board;
    }

    static getOccupations(board){
        let occupations = [];
        for(let i = 0; i < 19; i++){
            if(board.pegPieces[i].occupied){
                occupations.push(true);
            }
            else{
                occupations.push(false);
            }
        }
        return occupations;
    }

    static getNumOccupied(board){
        let numOccupied = 0;
        for(let i = 0; i < 19; i++){
            if(board.pegPieces[i].occupied){
                numOccupied++;
            }
        }
        return numOccupied;
    }


    constructor(boardOccupations){
        this.pegPieces = [];

        this.pegPieces.push(new PegPiece([-3*triangleLength, 0], 0, boardOccupations[0]));
        this.pegPieces.push(new PegPiece([-1*triangleLength, 0], 1, boardOccupations[1]));
        this.pegPieces.push(new PegPiece([0, 0], 2, boardOccupations[2]));
        this.pegPieces.push(new PegPiece([1*triangleLength, 0], 3, boardOccupations[3]));
        this.pegPieces.push(new PegPiece([3*triangleLength, 0], 4, boardOccupations[4]));

        this.pegPieces.push(new PegPiece([-3*triangleLength*Math.cos(-Math.PI*2/3), -3*triangleLength*Math.sin(-Math.PI*2/3)], 5, boardOccupations[5]));
        this.pegPieces.push(new PegPiece([-triangleLength*Math.cos(-Math.PI*2/3), -triangleLength*Math.sin(-Math.PI*2/3)], 6, boardOccupations[6]));
        this.pegPieces.push(new PegPiece([triangleLength*Math.cos(-Math.PI*2/3), triangleLength*Math.sin(-Math.PI*2/3)], 7, boardOccupations[7]));
        this.pegPieces.push(new PegPiece([3*triangleLength*Math.cos(-Math.PI*2/3), 3*triangleLength*Math.sin(-Math.PI*2/3)], 8, boardOccupations[8]));
        
        this.pegPieces.push(new PegPiece([-3*triangleLength*Math.cos(Math.PI*2/3), -3*triangleLength*Math.sin(Math.PI*2/3)], 9, boardOccupations[9]));
        this.pegPieces.push(new PegPiece([-triangleLength*Math.cos(Math.PI*2/3), -triangleLength*Math.sin(Math.PI*2/3)], 10, boardOccupations[10]));
        this.pegPieces.push(new PegPiece([triangleLength*Math.cos(Math.PI*2/3), triangleLength*Math.sin(Math.PI*2/3)], 11, boardOccupations[11]));
        this.pegPieces.push(new PegPiece([3*triangleLength*Math.cos(Math.PI*2/3), 3*triangleLength*Math.sin(Math.PI*2/3)], 12, boardOccupations[12]));
        
        this.pegPieces.push(new PegPiece([-triangleLength+Math.cos(-2*Math.PI/3)*triangleLength, Math.sin(-2*Math.PI/3)*triangleLength], 13, boardOccupations[13]));
        this.pegPieces.push(new PegPiece([0, 2*triangleLength*Math.sin(Math.PI/3)], 14, boardOccupations[14]));
        this.pegPieces.push(new PegPiece([triangleLength*Math.cos(-Math.PI/3)+triangleLength, -triangleLength*Math.sin(Math.PI/3)], 15, boardOccupations[15]));
        
        this.pegPieces.push(new PegPiece([-triangleLength+Math.cos(-2*Math.PI/3)*triangleLength, Math.sin(2*Math.PI/3)*triangleLength], 16, boardOccupations[16]));
        this.pegPieces.push(new PegPiece([0, -2*triangleLength*Math.sin(Math.PI/3)], 17, boardOccupations[17]));
        this.pegPieces.push(new PegPiece([triangleLength*Math.cos(Math.PI/3)+triangleLength, triangleLength*Math.sin(Math.PI/3)], 18, boardOccupations[18]));
        
        this.longRow1 = [this.pegPieces[0], this.pegPieces[1], this.pegPieces[2], this.pegPieces[3], this.pegPieces[4]];
        this.longRow2 = [this.pegPieces[5], this.pegPieces[6], this.pegPieces[2], this.pegPieces[7], this.pegPieces[8]];
        this.longRow3 = [this.pegPieces[9], this.pegPieces[10], this.pegPieces[2], this.pegPieces[11], this.pegPieces[12]];

        this.triangle1Row1 = [this.pegPieces[13], this.pegPieces[1], this.pegPieces[11], this.pegPieces[14]];
        this.triangle1Row2 = [this.pegPieces[13], this.pegPieces[7], this.pegPieces[10], this.pegPieces[15]];
        this.triangle1Row3 = [this.pegPieces[14], this.pegPieces[6], this.pegPieces[3], this.pegPieces[15]];

        this.triangle2Row1 = [this.pegPieces[16], this.pegPieces[1], this.pegPieces[7], this.pegPieces[17]];
        this.triangle2Row2 = [this.pegPieces[16], this.pegPieces[11], this.pegPieces[6], this.pegPieces[18]];
        this.triangle2Row3 = [this.pegPieces[18], this.pegPieces[3], this.pegPieces[10], this.pegPieces[17]];

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
        document.getElementById("gameCanvas").addEventListener('click', (event) => {
            for(let row of this.boardRows){
                for(let i = 0; i < row.length; i++){
                    if(row[i].occupied){
                        continue;
                    }
                    let x = event.clientX - document.getElementById("gameCanvas").getBoundingClientRect().left-canvasWidth/2;
                    let y = event.clientY - document.getElementById("gameCanvas").getBoundingClientRect().top-canvasHeight/2;
                    let distance = Math.sqrt((x-row[i].defaultCenter[0])**2 + (y-row[i].defaultCenter[1])**2);
                    if(distance > pegRadius){
                        continue;
                    }
                    if(i-2>=0){
                        if(row[i-1].occupied && row[i-2].toMove){
                            row[i-2].toMove = false;
                            row[i-2].occupied = false;
                            row[i-2].center = row[i-2].defaultCenter;
                            row[i-1].occupied = false;
                            row[i].occupied = true;
                        }
                    }
                    if(i+2<row.length){
                        if(row[i+1].occupied && row[i+2].toMove){
                            row[i+2].toMove = false;
                            row[i+2].occupied = false;
                            row[i+2].center = row[i+2].defaultCenter;
                            row[i+1].occupied = false;
                            row[i].occupied = true;
                        }
                    }
                }
            }
        });
    }

    drawLongRow(angle){
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        let pegRadiusTemp = pegRadius*1.3
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.moveTo(-cos*(3*triangleLength-pegRadiusTemp), -sin*(3*triangleLength-pegRadiusTemp));
        ctx.lineTo(-cos*(triangleLength+pegRadiusTemp), -sin*(triangleLength+pegRadiusTemp));
        ctx.stroke();
        ctx.lineWidth = lineWidth;
        ctx.moveTo(-cos*(triangleLength-pegRadiusTemp), -sin*(triangleLength-pegRadiusTemp));
        ctx.lineTo(cos*-pegRadiusTemp, sin*-pegRadiusTemp);
        ctx.stroke();
        ctx.lineWidth = lineWidth;
        ctx.moveTo(cos*pegRadiusTemp, sin*pegRadiusTemp);
        ctx.lineTo(cos*(triangleLength-pegRadiusTemp), sin*(triangleLength-pegRadiusTemp));
        ctx.stroke();
        ctx.lineWidth = lineWidth;
        ctx.moveTo(cos*(triangleLength+pegRadiusTemp), sin*(triangleLength+pegRadiusTemp));
        ctx.lineTo(cos*(3*triangleLength-pegRadiusTemp), sin*(3*triangleLength-pegRadiusTemp));
        ctx.stroke();
    }
    
    drawTriangleSide(p0, angle){
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        let pegRadiusTemp = pegRadius*1.3
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(p0[0]+cos*pegRadiusTemp, p0[1]+sin*pegRadiusTemp);
        ctx.lineTo(p0[0]+cos*(triangleLength-pegRadiusTemp), p0[1]+sin*(triangleLength-pegRadiusTemp));
        ctx.stroke();
        ctx.moveTo(p0[0]+cos*(triangleLength+pegRadiusTemp), p0[1]+sin*(triangleLength+pegRadiusTemp));
        ctx.lineTo(p0[0]+cos*(2*triangleLength-pegRadiusTemp), p0[1]+sin*(2*triangleLength-pegRadiusTemp));
        ctx.stroke();
        ctx.moveTo(p0[0]+cos*(2*triangleLength+pegRadiusTemp), p0[1]+sin*(2*triangleLength+pegRadiusTemp));
        ctx.lineTo(p0[0]+cos*(3*triangleLength-pegRadiusTemp), p0[1]+sin*(3*triangleLength-pegRadiusTemp));
        ctx.stroke();
    }
    
    drawBoard(){
        for(let boardRow of this.boardRows){
            for(let pegPiece of boardRow){
                pegPiece.draw();
            }
        }
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