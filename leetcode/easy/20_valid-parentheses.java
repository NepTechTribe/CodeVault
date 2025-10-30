// time complexity: O(str.length()) 

class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();

        for (char c : s.toCharArray()) {
            // push expected closing bracket for every opening bracket
            if (c == '(') 
                stack.push(')');
            else if (c == '{')
                stack.push('}');
            else if (c == '[')
                stack.push(']');
            
            // invalid if closing bracket does not match or stack is empty
            else if (stack.isEmpty() || stack.pop() != c) 
                return false;
        }

        return stack.isEmpty();
    }
}
