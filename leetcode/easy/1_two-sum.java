// Brute Force Soultion using nested loop : Time Complexity: O(n^2) Space Complexity: O(1)
// optimal solution is use Hash Map

class Solution {

    public int[] twoSum(int[] nums, int target) {
        for (int i = 1; i < nums.length; i++) for (
            int j = i;
            j < nums.length;
            j++
        )
         // checks sum of every combination
        if (nums[j] + nums[j - i] == target)
            return new int[] { j, j - i };
        return null;
    }
}
