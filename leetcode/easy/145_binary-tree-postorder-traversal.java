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
class Solution {

    public List<Integer> postorderTraversal(TreeNode root) {
        // 1 stack
        List<Integer> ans = new ArrayList<>();
        Stack<TreeNode> st = new Stack<>();
        if (root == null) return ans;

        st.push(root);
        while (!st.isEmpty()) {
            TreeNode curr = st.pop();
            ans.add(curr.val);
            if (curr.left != null) {
                st.push(curr.left);
            }
            if (curr.right != null) {
                st.push(curr.right);
            }
        }
        Collections.reverse(ans);
        return ans;
    }
}
