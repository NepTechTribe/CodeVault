class Solution {

    private static final int SIZE = 9;
    private static final int BLOCK_SIZE = 3;
    private static final char EMPTY_CELL = '.';
    private static final int allBits = 0x1ff;
    private static final int[] bitFlags = new int[] {
        0x1,
        0x1 << 1,
        0x1 << 2,
        0x1 << 3,
        0x1 << 4,
        0x1 << 5,
        0x1 << 6,
        0x1 << 7,
        0x1 << 8,
    };

    private char[][] board;
    private int[] rows;
    private int[] cols;
    private int[] blocks;
    private int totalCount = 0;

    public void solveSudoku(char[][] board) {
        if (
            board == null || (board.length != SIZE && board[0].length != SIZE)
        ) throw new IllegalArgumentException();
        this.board = board;
        initialize();
        initialUpdate();
        bruteForce();
    }

    private void initialize() {
        rows = new int[SIZE];
        cols = new int[SIZE];
        blocks = new int[SIZE];
        totalCount = 0;
    }

    private boolean bruteForce() {
        if (totalCount >= SIZE * SIZE) return true;
        int row = -1;
        int col = -1;

        int min = SIZE + 1;
        for (int r = 0; r < SIZE && min > 1; ++r) {
            for (int c = 0; c < SIZE; ++c) {
                if (board[r][c] != EMPTY_CELL) continue;
                int candidateCounts = getCandidateCount(r, c);
                if (candidateCounts < min) {
                    min = candidateCounts;
                    row = r;
                    col = c;
                }
                if (min == 1) break;
            }
        }
        if (min < 1) return false;
        int candidates = getCandidates(row, col);

        for (int i = 0; i < SIZE && candidates != 0; ++i, candidates >>= 1) {
            if (candidates % 2 == 0) continue;
            mark(i, row, col);
            board[row][col] = toChar(i);
            if (bruteForce()) return true;
            board[row][col] = EMPTY_CELL;
            unmark(i, row, col);
        }
        return false;
    }

    private int getCandidates(int row, int col) {
        int blkId = (row / BLOCK_SIZE) * BLOCK_SIZE + col / BLOCK_SIZE;
        return ~(rows[row] | cols[col] | blocks[blkId]) & allBits;
    }

    private int getCandidateCount(int row, int col) {
        int candidates = getCandidates(row, col);
        int count = 0;
        for (int i = 0; candidates != 0; ++i, candidates = candidates & (candidates - 1)) ++count;
        return count;
    }

    private void mark(int value, int row, int col) {
        int blkId = (row / BLOCK_SIZE) * BLOCK_SIZE + col / BLOCK_SIZE;
        int flag = bitFlags[value];
        rows[row] |= flag;
        cols[col] |= flag;
        blocks[blkId] |= flag;
        ++totalCount;
    }

    private void unmark(int value, int row, int col) {
        int blkId = (row / BLOCK_SIZE) * BLOCK_SIZE + col / BLOCK_SIZE;
        int mask = ~bitFlags[value];
        rows[row] &= mask;
        cols[col] &= mask;
        blocks[blkId] &= mask;
        --totalCount;
    }

    private void initialUpdate() {
        for (int r = 0; r < SIZE; ++r) {
            for (int c = 0; c < SIZE; ++c) {
                if (board[r][c] == EMPTY_CELL) continue;
                int value = fromChar(board[r][c]);
                mark(value, r, c);
            }
        }
    }

    private static int fromChar(char c) {
        return c - '1';
    }

    private static char toChar(int i) {
        return (char) (i + '1');
    }
}
