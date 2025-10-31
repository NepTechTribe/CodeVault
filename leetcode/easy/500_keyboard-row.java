class Solution {
    public String[] findWords(String[] words) {
        String row1 = "qwertyuiop";
        String row2 = "asdfghjkl";
        String row3 = "zxcvbnm";
        
        List<String> result = new ArrayList<>();
        
        for (String word : words) {
            String lower = word.toLowerCase();
            if (lower.chars().allMatch(c -> row1.indexOf(c) != -1)
             || lower.chars().allMatch(c -> row2.indexOf(c) != -1)
             || lower.chars().allMatch(c -> row3.indexOf(c) != -1)) {
                result.add(word);
            }
        }
        
        return result.toArray(new String[0]);
    }
}
