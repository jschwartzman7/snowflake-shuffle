import java.util.HashMap;
import java.util.LinkedList;

public class SnowflakeSolver {
    
    private final int[] primes = new int[]{2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67};
    private HashMap<Integer, Integer> encounteredStates;

    public SnowflakeSolver(){
        encounteredStates = new HashMap<Integer, Integer>();
    }

    public int hashOccupations(boolean[] occupations){
        int hashValue = 1;
        for(int i = 0; i < 19; i++){
            if(occupations[i]){
                hashValue *= primes[i];
            }
        }
        return hashValue;
    }

    public void markNextMove(SnowflakeState currentState, SnowflakeState nextState){
        for(int i = 0; i < 19; i++){
            if(currentState.pegPieces[i].occupied && !nextState.pegPieces[i].occupied){
                currentState.pegPieces[i].toMove = true;
            }
        }
    }

    public int getOptimalSolution(SnowflakeState boardState){
        int hashedBoard = hashOccupations(boardState.getOccupations());
        if(encounteredStates.containsKey(hashedBoard)){
            return encounteredStates.get(hashedBoard);
        }
        LinkedList<boolean[]> successorsOccupations = boardState.generateMoves();
        if(successorsOccupations.size() == 0){
            encounteredStates.put(hashedBoard, boardState.getNumOccupied());
            return encounteredStates.get(hashedBoard);
        }
        int bestScore = Integer.MAX_VALUE;
        for(boolean[] successor : successorsOccupations){
            SnowflakeState successorState = new SnowflakeState(successor);
            bestScore = Math.min(bestScore, getOptimalSolution(successorState));
        }
        encounteredStates.put(hashedBoard, bestScore);
        return encounteredStates.get(hashedBoard);
    }

    public LinkedList<SnowflakeState> getOptimalPath(SnowflakeState currentState){
        LinkedList<SnowflakeState> principlePath = new LinkedList<SnowflakeState>();
        LinkedList<boolean[]> successors = currentState.generateMoves();
        while(successors.size() > 0){
            boolean[] bestSuccessor = successors.get(0);
            for(boolean[] successor : successors){
                if(encounteredStates.get(hashOccupations(successor)) < encounteredStates.get(hashOccupations(bestSuccessor))){
                    bestSuccessor = successor;
                }
            }
            SnowflakeState bestSuccessorState = new SnowflakeState(bestSuccessor);
            markNextMove(currentState, bestSuccessorState);
            principlePath.add(currentState);
            currentState = bestSuccessorState;
            successors = currentState.generateMoves();
            
        }
        principlePath.add(currentState);
        return principlePath;
    }

}
