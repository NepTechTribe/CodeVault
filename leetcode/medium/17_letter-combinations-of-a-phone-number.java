class Solution {

    String[] mapping = new String[] {
        "",
        "",
        "abc",
        "def",
        "ghi",
        "jkl",
        "mno",
        "pqrs",
        "tuv",
        "wxyz",
    };
    List<String> res = new ArrayList<>();

    public void phoneComb(int idx, StringBuilder op, String digits) {
        if (idx >= digits.length()) {
            res.add(op.toString());
            return;
        }

        String val = mapping[digits.charAt(idx) - '0'];

        for (char ch : val.toCharArray()) {
            op.append(ch);

            phoneComb(idx + 1, op, digits);

            op.deleteCharAt(op.length() - 1);
        }
    }

    public List<String> letterCombinations(String digits) {
        if (digits.length() == 0) {
            return res;
        }

        phoneComb(0, new StringBuilder(), digits);

        return res;
    }
}
