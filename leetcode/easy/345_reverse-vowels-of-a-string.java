class Solution {

    public String reverseVowels(String s) {
        char[] arr = s.toCharArray();

        boolean[] isVowel = new boolean[128]; // default false
        char[] vowels = "aeiouAEIOU".toCharArray();
        for (char v : vowels) {
            isVowel[v] = true;
        }

        int front = 0;
        int back = arr.length - 1;

        while (front < back) {
            if (isVowel[arr[front]] && isVowel[arr[back]]) {
                char temp = arr[front];
                arr[front] = arr[back];
                arr[back] = temp;
                front++;
                back--;
            } else if (isVowel[arr[front]]) {
                back--;
            } else if (isVowel[arr[back]]) {
                front++;
            } else {
                front++;
                back--;
            }
        }
        return new String(arr);
    }
}
