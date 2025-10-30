// A large integer is represented as array digits, return resulting array of digit after adding 1
class Solution {

    public int[] plusOne(int[] digits) {
        long rev = 0;
        for (int i = digits.length - 1; i >= 0; i--) {
            if (digits[i] < 9) {
                digits[i]++;
                return digits;
            }
            digits[i] = 0;
        }
        int res[] = new int[digits.length + 1];
        res[0] = 1;
        return (res);
    }
}
