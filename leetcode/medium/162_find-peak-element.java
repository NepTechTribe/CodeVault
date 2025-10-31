class Solution {

    public int findPeakElement(int[] nums) {
        int left = 0,
            right = nums.length - 1;

        while (left < right) {
            int mid = left + (right - left) / 2;

            if (nums[mid] > nums[mid + 1]) {
                // Peak must be on the left (including mid)
                right = mid;
            } else {
                // Peak must be on the right
                left = mid + 1;
            }
        }

        // left == right is the index of a peak
        return left;
    }
}
