# snowflake-shuffle
Inspired by the Jane Street puzzle Snowflake Shuffle.
### Game instructions:
Place all 18 pegs in the holes, leaving any 1 peg hole open. Choose any peg and "jump" it over another so that it lands in an open hole. Remove the peg that was jumped over. Repeat this process until there are no more moves available. Remove as many pegs as you can.
### Challenge:
Write a mathematical proof that proves the limit for the fewest possible pegs remaining.

### In SnowflakeSolver.java, I wrote a dynamic programming algorithm that, given a starting snowflake board configuration, computes the minimum possible number of pegs remaining, as well as the sequence of moves needed to arrive at this solution. In SnowflakeShuffle.java, I created a display using StdDraw that allows the user to see the board state at each step and traverse through the optimal move path.
