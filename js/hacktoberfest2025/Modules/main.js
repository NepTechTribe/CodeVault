// /main.js

import multiply, { add, subtract, PI } from './math.js';
import sayHello, { admin, Person } from './user.js';

// Use math
console.log("5 + 3 =", add(5, 3));          
console.log("10 - 4 =", subtract(10, 4));   
console.log("5 * 3 =", multiply(5, 3));    
console.log("PI =", PI);

// Use user
admin.login();                            
sayHello();                                

const sabin = new Person("Sabin khatri");
sabin.greet();                              

// Show in HTML
document.getElementById('output').textContent = `
add(5,3) = ${add(5,3)}
multiply(5,3) = ${multiply(5,3)}
Person: ${sabin.name}
`.trim();