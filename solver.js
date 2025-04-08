
primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67];
encounteredStates = {};

function hashOccupations(occupations){
    let hashValue = 1;
    for(let i = 0; i < 19; i++){
        if(occupations[i]){
            hashValue *= primes[i];
        }
    }
    return hashValue;
}

function markNextMove(currentState, nextState){
    for(let i = 0; i < 19; i++){
        if(currentState.pegPieces[i].occupied && !nextState.pegPieces[i].occupied){
            currentState.pegPieces[i].toMove = true;
            return;
        }
    }
}

function getOptimalSolution(boardState){
    let hashedBoard = hashOccupations(SnowflakeState.getOccupations(boardState));
    alert(encounteredStates);
    if(Object.keys(encounteredStates).includes(hashedBoard)){
        return encounteredStates[hashedBoard];
    }
    let successorStates = generateMoves(boardState);
    if(successorStates.length == 0){
        encounteredStates[hashedBoard] = SnowflakeState.getNumOccupied(boardState);
        return encounteredStates[hashedBoard];
    }
    console.log("successors: ", successorStates.length);
    let bestScore = Number.MAX_VALUE;
    for(let successor of successorStates){
        bestScore = Math.min(bestScore, getOptimalSolution(successor));
    }
    encounteredStates[hashedBoard] = bestScore;
    return encounteredStates[hashedBoard];
}

function generateMoves(boardState){
    let successorsOccupations = [];
    for(let row of boardState.boardRows){
        for(let i = 0; i < row.length; i++){
            if(row[i].occupied){
                continue;
            }
            if(i < row.length-2 && row[i+1].occupied && row[i+2].occupied){
                let successorOccupations = SnowflakeState.getOccupations(boardState);
                console.log("successorOccupations: ", successorOccupations);
                successorOccupations[row[i].position] = true;
                successorOccupations[row[i+1].position] = false;
                successorOccupations[row[i+2].position] = false;
                successorsOccupations.push(new SnowflakeState(successorOccupations));
            }
            if(i >= 2 && row[i-1].occupied && row[i-2].occupied){
                let successorOccupations = SnowflakeState.getOccupations(boardState);
                console.log("successorOccupations: ", successorOccupations);
                successorOccupations[row[i].position] = true;
                successorOccupations[row[i-1].position] = false;
                successorOccupations[row[i-2].position] = false;
                successorsOccupations.push(new SnowflakeState(successorOccupations));
            }
        }
    }
    return successorsOccupations;
}

function getOptimalPath(currentState){
    let principlePath = [];
    let successors = generateMoves(currentState);
    while(successors.length > 0){
        let bestSuccessor = successors[0];
        for(let successor of successors){
            if(encounteredStates[hashOccupations(SnowflakeState.getOccupations(successor))] < encounteredStates[hashOccupations(SnowflakeState.getOccupations(bestSuccessor))]){
                bestSuccessor = successor;
            }
        }
        markNextMove(currentState, bestSuccessor);
        principlePath.push(currentState);
        currentState = bestSuccessorState;
        successors = generateMoves(currentState);
    }
    principlePath.push(currentState);
    return principlePath;
}