class Solution {

    public double myPow(double x, int n) {
        return helper(x, (long) n);
    }

    private static double helper(double a, long b) {
        if (b == 0) 
            return 1;
        if (b < 0) 
            return 1 / helper(a, -b);
        if (b % 2 != 0) 
            return a * helper(a * a, (b - 1) / 2);
        return helper(a * a, b / 2);
    }
}
