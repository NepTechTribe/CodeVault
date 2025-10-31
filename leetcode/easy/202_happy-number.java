/*
Input: n = 19
Output: true
Explanation:
12 + 92 = 82
82 + 22 = 68
62 + 82 = 100
12 + 02 + 02 = 1
 */

class Solution {

    public boolean isHappy(int n) {
        if (n == 1) return true;
        else if (n > 1 && n < 7) return false;

        int sumOfSquare = 0;
        while (n > 0) {
            int digit = n % 10;
            sumOfSquare += digit * digit;
            n = n / 10;
        }
        return isHappy(sumOfSquare);
    }
}
