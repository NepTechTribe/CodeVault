/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */

//sir approach
class Solution {

    public boolean isBalanced(TreeNode root) {
        return checkHeight(root) != -1;
    }

    static int checkHeight(TreeNode root) {
        if (root == null) return 0;
        //find the left height tree
        int left = checkHeight(root.left);
        //find the right height of the tree
        int right = checkHeight(root.right);
        //check balanced factor
        if (left == -1 || right == -1) return -1;
        //check balanced factor
        if (Math.abs(left - right) > 1) return -1;

        return Math.max(left, right) + 1;
    }
}
