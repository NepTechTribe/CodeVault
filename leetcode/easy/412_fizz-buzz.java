class Solution {

    private int n = 0;
    private List<String> ans = new java.util.AbstractList<>() {
        @Override
        public String get(int index) {
            index++;
            if (index % 3 == 0 && index % 5 == 0)
                return "FizzBuzz";
            else if (index % 3 == 0) 
                return "Fizz";
            else if (index % 5 == 0) 
                return "Buzz";
            else 
                return String.valueOf(index);
        }
        @Override
        public int size() {
            return n;
        }
    };

    public List<String> fizzBuzz(int n) {
        this.n = n;
        return ans;
    }
}
