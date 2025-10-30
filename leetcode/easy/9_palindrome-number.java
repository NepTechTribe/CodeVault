// time complexity: O(n log n) where n is number of digits
// space complexity: O(1)

class Solution {

    public boolean isPalindrome(int x) {
        if (x < 0)
            return false;   // -123 = 321- so not palindrome

        int temp = x;
        int res = 0;

        // reverse the number
        while (temp != 0) {
            res = res * 10 + (temp % 10);
            temp = temp / 10;
        }

        return (x == res);
    }
}
