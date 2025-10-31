class Solution {

    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> ans = new ArrayList<>();

        for (int i = 1; i <= numRows; i++) {
            ans.add(generateRow(i));
        }

        return ans;
    }

    List<Integer> generateRow(int rowNum) {
        List<Integer> row = new ArrayList<>();
        int num = 1;
        row.add(num);

        for (int i = 1; i < rowNum; i++) {
            num *= (rowNum - i);
            num /= i;
            row.add(num);
        }

        return row;
    }
}
