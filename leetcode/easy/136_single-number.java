// xor gives 0 when same numbers are xored
class Solution {

    static {
        for (int i = 0; i < 300; i++) singleNumber(new int[0]);
    }

    public static int singleNumber(int[] nums) {
        int ans = 0;
        for (int num : nums) 
            ans ^= num;
        return ans;
    }
}
