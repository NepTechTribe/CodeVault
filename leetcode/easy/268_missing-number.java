class Solution {
    public int missingNumber(int[] nums) {
        int n = nums.length, ans = 0;
        for (int x : nums) 
            ans += x;

        return ((n * (n+1) ) / 2) - ans;
    }
}