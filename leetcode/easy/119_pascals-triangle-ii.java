class Solution {

    public List<Integer> getRow(int rowIndex) {
        List<Integer> result = new ArrayList<>();
        int n = rowIndex + 1;
        long res = 1;
        for (int i = 0; i < n; i++) {
            if (i == 0) {
                result.add(1);
            } else {
                res = res * (n - i);
                res = res / i;
                result.add((int) res);
            }
        }
        return result;
    }
}
