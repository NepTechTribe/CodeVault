class Solution {

    public String reverseWords(String s) {
        char[] st = s.toCharArray();
        char[] arr = new char[st.length];
        int ind = reversewordslength(st, arr, 0);
        return new String(arr, 0, ind);
    }

    public int reversewordslength(char[] st, char[] arr, int start) {
        while (start < st.length && st[start] == ' ') {
            start++;
        }
        int end = start;
        while (end < st.length && st[end] != ' ') {
            end++;
        }
        if (start - end == 0) {
            return 0;
        }
        int reversedwordlen = reversewordslength(st, arr, end);
        if (reversedwordlen != 0) {
            arr[reversedwordlen] = ' ';
            reversedwordlen++;
        }
        while (start < end) {
            arr[reversedwordlen++] = st[start++];
        }
        return reversedwordlen;
    }
}
