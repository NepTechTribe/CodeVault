class Solution {

    public int[][] generateMatrix(int n) {
        int index = 1;
        int top = 0,
            bottom = n - 1;
        int left = 0,
            right = n - 1;
        int[][] matrix = new int[n][n];
        while (top <= bottom && left <= right) {
            for (int i = left; i <= right; i++) {
                matrix[top][i] = index;
                index++;
            }
            top++;

            for (int i = top; i <= bottom; i++) {
                matrix[i][right] = index;
                index++;
            }
            right--;

            if (top <= bottom) {
                for (int i = right; i >= left; i--) {
                    matrix[bottom][i] = index;
                    index++;
                }
                bottom--;
            }

            if (left <= right) {
                for (int i = bottom; i >= top; i--) {
                    matrix[i][left] = index;
                    index++;
                }
                left++;
            }
        }
        return matrix;
    }
}
