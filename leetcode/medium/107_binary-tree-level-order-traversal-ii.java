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

    public List<List<Integer>> levelOrderBottom(TreeNode root) {
        if (root == null) return new ArrayList<>();

        List<List<Integer>> list = new ArrayList<>();

        dfs(root, 0, list);

        int size = list.size();
        for (int i = 0; i < size / 2; i++) {
            List<Integer> newList = list.get(i);
            list.set(i, list.get(size - i - 1));
            list.set(size - i - 1, newList);
        }

        return list;
    }

    public void dfs(TreeNode node, int level, List<List<Integer>> list) {
        if (node == null) return;

        if (level == list.size()) list.add(new ArrayList<>());

        list.get(level).add(node.val);

        dfs(node.left, level + 1, list);
        dfs(node.right, level + 1, list);
    }
}
