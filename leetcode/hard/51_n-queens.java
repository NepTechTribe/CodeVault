// class Solution {
//     public List<List<String>> solveNQueens(int n) {
//         List<List<String>> results = new ArrayList<>();
//         boolean[][] board = new boolean[n][n];
//         backtrack(board, 0 ,results);
//         return results;
//     }
//     private void backtrack(boolean[][] board, int row, List<List<String>> results){
//         if(row == board.length){
//             results.add(createBoard(board));
//             return;
//         }
//         for(int col=0; col<board.length; col++){
//             if(isSafe(board,row,col)){
//                 board[row][col] = true;
//                 backtrack(board, row+1, results);
//                 board[row][col] = false;
//             }
//         }
//     }

//     private boolean isSafe(boolean[][] board,int row,int col){
//         for(int i=0; i < row; i++){
//             if(board[i][col]) return false;
//         }

//         for(int i=row-1, j=col-1; i>=0 && j>=0; i--, j--){
//             if(board[i][j]) return false;
//         }

//         for(int i=row-1, j=col+1; i>=0 && j < board.length; i--, j++ ){
//             if(board[i][j]) return false;
//         }

//         return true;
//     }

//     private List<String> createBoard(boolean[][] board){
//         List<String> b = new ArrayList<>();
//         for(int i=0; i<board.length; i++){
//             StringBuilder row = new StringBuilder();
//             for(int j=0; j<board.length; j++){
//                 row.append(board[i][j] ? 'Q' : '.');
//             }
//             b.add(row.toString());
//         }
//         return b;
//     }
// }

class Solution {

    private int n;
    private int fullMask;
    private int[] queens; // queens[row] = col position
    private String[] templates; // templates[c] = board row with 'Q' at c
    private List<List<String>> results;

    public List<List<String>> solveNQueens(int n) {
        this.n = n;
        this.fullMask = (1 << n) - 1;
        this.queens = new int[n];
        this.results = new ArrayList<>();
        buildTemplates();
        backtrack(0, 0, 0, 0);
        return results;
    }

    // Pre-build n Strings like "...Q.." for each column position
    private void buildTemplates() {
        templates = new String[n];
        char[] row = new char[n];
        for (int c = 0; c < n; c++) {
            Arrays.fill(row, '.');
            row[c] = 'Q';
            templates[c] = new String(row);
        }
    }

    /**
     * @param row      which row we're filling
     * @param colMask  occupied columns bitmap
     * @param d1Mask   occupied (row+col) diagonals bitmap
     * @param d2Mask   occupied (row-col+n-1) diagonals bitmap
     */
    private void backtrack(int row, int colMask, int d1Mask, int d2Mask) {
        if (row == n) {
            // build solution by referencing pre-made row‑strings
            List<String> sol = new ArrayList<>(n);
            for (int r = 0; r < n; r++) {
                sol.add(templates[queens[r]]);
            }
            results.add(sol);
            return;
        }
        // bits free in this row
        int avail = fullMask & ~(colMask | d1Mask | d2Mask);
        while (avail != 0) {
            int bit = avail & -avail; // rightmost free column
            avail ^= bit; // remove it
            int col = Integer.numberOfTrailingZeros(bit);
            queens[row] = col;

            backtrack(row + 1, colMask | bit, (d1Mask | bit) << 1, (d2Mask | bit) >>> 1);
            // no need to unset queens[row], it'll be overwritten
        }
    }
}
