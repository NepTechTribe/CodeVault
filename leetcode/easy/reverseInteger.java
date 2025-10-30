class Solution {
public:
    int reverse(int x) {
   
     int rev = 0 ,i=0;
     while(x){
      int digit = x%10;
        if(rev> INT_MAX/10 || rev < INT_MIN/10){
        return 0;
     }
      rev=(10*rev)+digit;
      i++;
      x=x/10;
     }  
     
     return rev; 
    }
};