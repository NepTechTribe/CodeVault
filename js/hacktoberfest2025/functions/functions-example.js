// functions-example.js

console.log("JavaScript Functions Examples");

// 1. Function Declaration: Basic Area Calculator
console.log("\n1. Function Declaration");
function calculateRectangleArea(length, width) {
  return length * width;
}
console.log(`Area: ${calculateRectangleArea(7, 4)} square units`);


// 2. Function Expression: Greeting with Default Values
console.log("\n2. Function Expression ");
const greetPerson = function(name = "User", language = "English") {
  return `Hello ${name}! You are speaking in ${language}.`;
};
console.log(greetPerson("Sajana", "Nepali"));
console.log(greetPerson("sabin")); // Uses default 'User', 'English'


// 3. Arrow Function: Simple Sum
console.log("\n3. Arrow Function");
const addTwoNumbers = (num1, num2) => num1 + num2;
console.log(`Sum of 8 and 12: ${addTwoNumbers(8, 12)}`);


// 4. Arrow Function with Multiple Lines (and conditional logic)
console.log("\n 4. Arrow Function (Multi-line) ");
const checkEligibility = (age) => {
  if (age >= 18) {
    return "Eligible to vote.";
  } else {
    return "Not eligible to vote yet.";
  }
};
console.log(`For age 20: ${checkEligibility(20)}`);
console.log(`For age 16: ${checkEligibility(16)}`);


// 5. Function with Rest Parameters: Average Calculator
console.log("\n 5. Function with Rest Parameters ");
const calculateAverage = (...numbers) => { 
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, current) => acc + current, 0); 
  return sum / numbers.length;
};
console.log(`Average of (10, 20, 30): ${calculateAverage(10, 20, 30)}`);
console.log(`Average of (5, 10, 15, 20): ${calculateAverage(5, 10, 15, 20)}`);
console.log(`Average of nothing: ${calculateAverage()}`);


// 6. Function Returning Another Function (Higher-Order Function concept)
console.log("\n6. Function Returning Another Function");
function createGreeter(greeting) {
  return function(name) { 
    return `${greeting}, ${name}!`;
  };
}
const sayHi = createGreeter("Hi");
const sayNamaste = createGreeter("Namaste");
console.log(sayHi("Ram"));    
console.log(sayNamaste("Sita")); 

console.log("\nEnd of Functions Examples ");