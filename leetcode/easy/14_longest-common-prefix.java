// time complexity: O(S) where S is the sum of all characters in all strings
// space complexity: O(1)

class Solution {

    public String longestCommonPrefix(String[] strs) {
        // edge case
        if (strs.length == 0) 
            return "";

        String prefix = strs[0];

        for (int i = 1; i < strs.length; i++) {
            // same word
            while (!strs[i].startsWith(prefix)) {
                // remove last character
                prefix = prefix.substring(0, prefix.length() - 1);
  
                if (prefix.isEmpty()) 
                    return ""; // early return if no common prefix
            }
        }
        return prefix;
    }
}
