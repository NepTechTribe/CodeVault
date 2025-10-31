class Solution {

    public int maxProduct(int[] nums) {
        var maxProd = Integer.MIN_VALUE;
        var prod = 1;
        for (var i = 0; i < nums.length; i++) {
            prod *= nums[i];
            maxProd = Math.max(prod, maxProd);
            if (prod == 0) {
                prod = 1;
            }
        }
        prod = 1;
        for (var i = nums.length - 1; i >= 0; i--) {
            prod *= nums[i];
            maxProd = Math.max(prod, maxProd);
            if (prod == 0) {
                prod = 1;
            }
        }
        return maxProd;
    }
}
