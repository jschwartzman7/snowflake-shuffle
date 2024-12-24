public class PegPiece {

    public boolean occupied;
    public final int index;
    public boolean toMove;

    public PegPiece(boolean isOccupied, int position){
        occupied = isOccupied;
        index = position;
        toMove = false;
    }
    
}
