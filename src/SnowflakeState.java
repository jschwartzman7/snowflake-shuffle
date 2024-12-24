import java.util.HashSet;
import java.util.LinkedList;

public class SnowflakeState {

    public static SnowflakeState randomState(){
        boolean[] boardOccupations = new boolean[19];
        for(int i = 0; i < 19; i++){
            boardOccupations[i] = Math.random() < 0.5;
        }
        return new SnowflakeState(boardOccupations);
    }

    public static SnowflakeState randomStartingState(){
        boolean[] boardOccupations = new boolean[19];
        for(int i = 0; i < 19; i++){
            boardOccupations[i] = true;
        }
        boardOccupations[(int)(19*Math.random())] = false;
        return new SnowflakeState(boardOccupations);
    }

    public static SnowflakeState startingState(int emptyIndex){
        boolean[] boardOccupations = new boolean[19];
        for(int i = 0; i < 19; i++){
            boardOccupations[i] = true;
        }
        boardOccupations[emptyIndex] = false;
        return new SnowflakeState(boardOccupations);
    }

    PegPiece[] pegPieces;

    PegPiece[] longRow1;
    PegPiece[] longRow2;
    PegPiece[] longRow3;
    PegPiece[] triangle1Row1;
    PegPiece[] triangle1Row2;
    PegPiece[] triangle1Row3;
    PegPiece[] triangle2Row1;
    PegPiece[] triangle2Row2;
    PegPiece[] triangle2Row3;
    HashSet<PegPiece[]> boardRows;
    String occupiedChar = "X";
    String unoccupiedChar = " ";

    public SnowflakeState(boolean[] occupations){
        pegPieces = new PegPiece[19];
        for(int i = 0; i < pegPieces.length; i++){
            pegPieces[i] = new PegPiece(occupations[i], i);
        }

        longRow1 = new PegPiece[]{pegPieces[0], pegPieces[1], pegPieces[2], pegPieces[3], pegPieces[4]};
        longRow2 = new PegPiece[]{pegPieces[5], pegPieces[6], pegPieces[2], pegPieces[7], pegPieces[8]};
        longRow3 = new PegPiece[]{pegPieces[9], pegPieces[10], pegPieces[2], pegPieces[11], pegPieces[12]};

        triangle1Row1 = new PegPiece[]{pegPieces[13], pegPieces[6], pegPieces[11], pegPieces[15]};
        triangle1Row2 = new PegPiece[]{pegPieces[13], pegPieces[1], pegPieces[10], pegPieces[14]};
        triangle1Row3 = new PegPiece[]{pegPieces[14], pegPieces[7], pegPieces[3], pegPieces[15]};

        triangle2Row1 = new PegPiece[]{pegPieces[16], pegPieces[10], pegPieces[7], pegPieces[17]};
        triangle2Row2 = new PegPiece[]{pegPieces[16], pegPieces[1], pegPieces[6], pegPieces[18]};
        triangle2Row3 = new PegPiece[]{pegPieces[18], pegPieces[11], pegPieces[3], pegPieces[17]};

        boardRows = new HashSet<PegPiece[]>();
        boardRows.add(longRow1);
        boardRows.add(longRow2);
        boardRows.add(longRow3);
        boardRows.add(triangle1Row1);
        boardRows.add(triangle1Row2);
        boardRows.add(triangle1Row3);
        boardRows.add(triangle2Row1);
        boardRows.add(triangle2Row2);
        boardRows.add(triangle2Row3);
    }

    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("  ");
        sb.append(pegPieces[9].occupied ? occupiedChar : unoccupiedChar);
        sb.append("         ");
        sb.append(pegPieces[8].occupied ? occupiedChar : unoccupiedChar);
        sb.append("\n   \\   ");
        sb.append(pegPieces[14].occupied ? occupiedChar : unoccupiedChar);
        sb.append("   /\n    \\ / \\ /\n ");
        sb.append(pegPieces[16].occupied ? occupiedChar : unoccupiedChar);
        sb.append("---");
        sb.append(pegPieces[10].occupied ? occupiedChar : unoccupiedChar);
        sb.append("---");
        sb.append(pegPieces[7].occupied ? occupiedChar : unoccupiedChar);
        sb.append("---");
        sb.append(pegPieces[17].occupied ? occupiedChar : unoccupiedChar);
        sb.append("\n  \\ / \\ / \\ /\n");
        sb.append(pegPieces[0].occupied ? occupiedChar : unoccupiedChar);
        sb.append("--");
        sb.append(pegPieces[1].occupied ? occupiedChar : unoccupiedChar);
        sb.append("---");
        sb.append(pegPieces[2].occupied ? occupiedChar : unoccupiedChar);
        sb.append("---");
        sb.append(pegPieces[3].occupied ? occupiedChar : unoccupiedChar);
        sb.append("--");
        sb.append(pegPieces[4].occupied ? occupiedChar : unoccupiedChar);
        sb.append("\n  / \\ / \\ / \\\n ");
        sb.append(pegPieces[13].occupied ? occupiedChar : unoccupiedChar);
        sb.append("---");
        sb.append(pegPieces[6].occupied ? occupiedChar : unoccupiedChar);
        sb.append("---");
        sb.append(pegPieces[11].occupied ? occupiedChar : unoccupiedChar);
        sb.append("---");
        sb.append(pegPieces[15].occupied ? occupiedChar : unoccupiedChar);
        sb.append("\n    / \\ / \\\n   /   ");
        sb.append(pegPieces[18].occupied ? occupiedChar : unoccupiedChar);
        sb.append("   \\\n  ");
        sb.append(pegPieces[5].occupied ? occupiedChar : unoccupiedChar);
        sb.append("         ");
        sb.append(pegPieces[12].occupied ? occupiedChar : unoccupiedChar);
        sb.append("\n");
        return sb.toString();
    }

    public boolean[] getOccupations(){
        boolean[] occupations = new boolean[19];
        for(int i = 0; i < 19; i++){
            if(pegPieces[i].occupied){
                occupations[i] = true;
            }
        }
        return occupations;
    }

    public int getNumOccupied(){
        int numOccupied = 0;
        for(PegPiece pegPlace : pegPieces){
            if(pegPlace.occupied){
                numOccupied++;
            }
        }
        return numOccupied;
    }

    public LinkedList<boolean[]> generateMoves(){
        LinkedList<boolean[]> successorsOccupations = new LinkedList<boolean[]>();
        for(PegPiece[] row : boardRows){
            for(int i = 0; i < row.length; i++){
                if(row[i].occupied){
                    continue;
                }
                if(i < row.length-2 && row[i+1].occupied && row[i+2].occupied){
                    boolean[] successorOccupations = getOccupations();
                    successorOccupations[row[i].index] = true;
                    successorOccupations[row[i+1].index] = false;
                    successorOccupations[row[i+2].index] = false;
                    successorsOccupations.add(successorOccupations);
                }
                if(i >= 2 && row[i-1].occupied && row[i-2].occupied){
                    boolean[] successorOccupations = getOccupations();
                    successorOccupations[row[i].index] = true;
                    successorOccupations[row[i-1].index] = false;
                    successorOccupations[row[i-2].index] = false;
                    successorsOccupations.add(successorOccupations);
                }
            }
        }
        return successorsOccupations;
    }

    public static void main(String[] args) {
    }
}
