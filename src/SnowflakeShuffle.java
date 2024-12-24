import edu.princeton.cs.introcs.StdDraw;
import java.util.HashSet;
import java.util.Iterator;
import java.util.HashMap;
import java.util.LinkedList;

public class SnowflakeShuffle {

    private final int CANVAS_SIZE = 700;
    private final int SCALE = 1;
    private final int BUFFER_TIME_MS = 25;
    private final double triangleLength = SCALE / 4.0;
    private final double radius = triangleLength / 5.0;
    private final int right = 39;
    private final int left = 37;

    public SnowflakeShuffle(){
        StdDraw.enableDoubleBuffering();
        StdDraw.setCanvasSize(CANVAS_SIZE, CANVAS_SIZE);
        StdDraw.setScale(-SCALE, SCALE);
    }

    public void drawLongRow(double angle, PegPiece[] longRow){
        double cos = Math.cos(angle);
        double sin = Math.sin(angle);
        StdDraw.setPenColor();
        StdDraw.line(-cos*(3*triangleLength-radius), -sin*(3*triangleLength-radius), -cos*(triangleLength+radius), -sin*(triangleLength+radius));
        StdDraw.line(-cos*(triangleLength-radius), -sin*(triangleLength-radius), cos*-radius, sin*-radius);
        StdDraw.line(cos*radius, sin*radius, cos*(triangleLength-radius), sin*(triangleLength-radius));
        StdDraw.line(cos*(triangleLength+radius), sin*(triangleLength+radius), cos*(3*triangleLength-radius), sin*(3*triangleLength-radius));
        if(longRow[0].occupied){
            if(longRow[0].toMove){
                StdDraw.setPenColor(StdDraw.GRAY);
            }
            else{
                StdDraw.setPenColor();
            }
            StdDraw.filledCircle(-3*cos*triangleLength, -3*sin*triangleLength, radius);
        }
        else {
            StdDraw.setPenColor();
            StdDraw.circle(-3*cos*triangleLength, -3*sin*triangleLength, radius);
        }
        if(longRow[1].occupied){
            if(longRow[1].toMove){
                StdDraw.setPenColor(StdDraw.GRAY);
            }
            else{
                StdDraw.setPenColor();
            }
            StdDraw.filledCircle(-1*cos*triangleLength, -1*sin*triangleLength, radius);
        }
        else {
            StdDraw.setPenColor();
            StdDraw.circle(-1*cos*triangleLength, -1*sin*triangleLength, radius);
        }
        if(longRow[2].occupied){
            if(longRow[2].toMove){
                StdDraw.setPenColor(StdDraw.GRAY);
            }
            else{
                StdDraw.setPenColor();
            }
            StdDraw.filledCircle(0, 0, radius);
        }
        else {
            StdDraw.setPenColor();
            StdDraw.circle(0, 0, radius);
        }
        if(longRow[3].occupied){
            if(longRow[3].toMove){
                StdDraw.setPenColor(StdDraw.GRAY);
            }
            else{
                StdDraw.setPenColor();
            }
            StdDraw.filledCircle(cos*triangleLength, sin*triangleLength, radius);
        }
        else {
            StdDraw.setPenColor();
            StdDraw.circle(cos*triangleLength, sin*triangleLength, radius);
        }
        if(longRow[4].occupied){
            if(longRow[4].toMove){
                StdDraw.setPenColor(StdDraw.GRAY);
            }
            else{
                StdDraw.setPenColor();
            }
            StdDraw.filledCircle(3*cos*triangleLength, 3*sin*triangleLength, radius);
        }
        else {
            StdDraw.setPenColor();
            StdDraw.circle(3*cos*triangleLength, 3*sin*triangleLength, radius);
        }
    }

    public void drawTriangleSide(double[] p0, double angle, PegPiece[] triangleRow){
        double cos = Math.cos(angle);
        double sin = Math.sin(angle);
        StdDraw.setPenColor();
        StdDraw.line(p0[0]+cos*radius, p0[1]+sin*radius, p0[0]+cos*(triangleLength-radius), p0[1]+sin*(triangleLength-radius));
        StdDraw.line(p0[0]+cos*(triangleLength+radius), p0[1]+sin*(triangleLength+radius), p0[0]+cos*(2*triangleLength-radius), p0[1]+sin*(2*triangleLength-radius));
        StdDraw.line(p0[0]+cos*(2*triangleLength+radius), p0[1]+sin*(2*triangleLength+radius), p0[0]+cos*(3*triangleLength-radius), p0[1]+sin*(3*triangleLength-radius));
        for(int i = 0; i < triangleRow.length; i++){
            double x = p0[0] + i*cos*triangleLength;
            double y = p0[1] + i*sin*triangleLength;
            if(triangleRow[i].occupied){
                if(triangleRow[i].toMove){
                    StdDraw.setPenColor(StdDraw.GRAY);
                }
                else{
                    StdDraw.setPenColor();
                }
                StdDraw.filledCircle(x, y, radius);
            }
            else {
                StdDraw.setPenColor();
                StdDraw.circle(x, y, radius);
            }
        }
    }

    public void drawBoard(SnowflakeState boardState){
        drawLongRow(0, boardState.longRow1);
        drawLongRow(Math.PI/3, boardState.longRow2);
        drawLongRow(-Math.PI/3, boardState.longRow3);

        double distance = Math.sqrt(3)*triangleLength;
        drawTriangleSide(new double[]{distance*Math.cos(7*Math.PI/6), distance*Math.sin(7*Math.PI/6)}, 0, boardState.triangle1Row1);
        drawTriangleSide(new double[]{distance*Math.cos(7*Math.PI/6), distance*Math.sin(7*Math.PI/6)}, Math.PI/3, boardState.triangle1Row2);
        drawTriangleSide(new double[]{0, distance}, -Math.PI/3, boardState.triangle1Row3);

        drawTriangleSide(new double[]{distance*Math.cos(5*Math.PI/6), distance*Math.sin(5*Math.PI/6)}, 0, boardState.triangle2Row1);
        drawTriangleSide(new double[]{distance*Math.cos(5*Math.PI/6), distance*Math.sin(5*Math.PI/6)}, -Math.PI/3, boardState.triangle2Row2);
        drawTriangleSide(new double[]{0, -distance}, Math.PI/3, boardState.triangle2Row3);
    }

    public void drawInfo(int pathIndex, int optimalSolution){
        StdDraw.setPenColor();
        
        StdDraw.text(SCALE*.8, -SCALE*0.4, "Step " + pathIndex);

        StdDraw.filledCircle(SCALE*.6, -SCALE*0.5, radius*.65);
        StdDraw.text(SCALE*.8, -SCALE*0.5, "occupied");

        StdDraw.circle(SCALE*.6, -SCALE*0.6, radius*.65);
        StdDraw.text(SCALE*.8, -SCALE*0.6, "unoccupied");

        StdDraw.setPenColor(StdDraw.GRAY);
        StdDraw.filledCircle(SCALE*.6, -SCALE*0.7, radius*.65);
        StdDraw.setPenColor();
        StdDraw.text(SCALE*.8, -SCALE*0.7, "next move");

        StdDraw.text(SCALE*.7, -SCALE*0.8, "'right' -> next state");
        StdDraw.text(SCALE*.7, -SCALE*0.9, "'left' -> previous state");
        StdDraw.text(0, -SCALE*0.9, "Final: " + optimalSolution + " remaining");
    }

    public void run(SnowflakeState boardState){
        SnowflakeSolver solver = new SnowflakeSolver();
        int optimalSolution = solver.getOptimalSolution(boardState);
        SnowflakeState[] pathArray = solver.getOptimalPath(boardState).toArray(new SnowflakeState[0]);
        for(int i = 0; i < pathArray.length; i++){
            System.out.println("State " + i);
            System.out.println(pathArray[i]);
            System.out.println();
        }
        SnowflakeState currentState = pathArray[0];
        int pathIndex = 0;
        boolean rightPressed = false;
        boolean leftPressed = false;
        while(true){
            StdDraw.clear();
            drawBoard(currentState);
            drawInfo(pathIndex, optimalSolution);
            if(StdDraw.isKeyPressed(right) && pathIndex < pathArray.length-1 && !rightPressed){
                currentState = pathArray[++pathIndex];
                rightPressed = true;
            }
            else if(StdDraw.isKeyPressed(left) && pathIndex > 0 && !leftPressed){
                currentState = pathArray[--pathIndex];
                leftPressed = true;
            }
            if(!StdDraw.isKeyPressed(right)){
                rightPressed = false;
            }
            if(!StdDraw.isKeyPressed(left)){
                leftPressed = false;
            }
            StdDraw.show(BUFFER_TIME_MS);    
        }
    }


    public static void main(String[] args) {
        SnowflakeShuffle snowflakeShuffle = new SnowflakeShuffle();
        snowflakeShuffle.run(SnowflakeState.randomStartingState());
    }
}