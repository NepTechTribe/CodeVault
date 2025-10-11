// modern_unique_loops.js

console.log("JavaScript Loops Examples by Sabin");

// --- For Loop Example: 
console.log("\n For Loop: Spacecraft Launch Countdown ");
for (let countdown = 5; countdown > 0; countdown--) {
  console.log(`T-minus ${countdown} seconds...`);
}
console.log("Lift Off!");


// --- While Loop Example
console.log("\n While Loop: Rolling a Die Until a Six Appears ");
let diceRoll = 0;
let rollsCount = 0;
while (diceRoll !== 6) { 
  diceRoll = Math.floor(Math.random() * 6) + 1; 
  rollsCount++;
  console.log(`Roll #${rollsCount}: You rolled a ${diceRoll}`);
}
console.log(`\nFinally, rolled a 6 after ${rollsCount} attempts!`);


// --- Do...While Loop Example
console.log("\n Do...While Loop: User Confirmation");
let userResponse;
let attempts = 0;
do {
  attempts++;
  console.log(`Attempt ${attempts}: Do you want to continue? (Type 'yes' or 'no')`);
  userResponse = attempts === 1 ? 'no' : (attempts === 2 ? 'not sure' : 'yes'); 
  console.log(`User says: '${userResponse}'`);

  if (userResponse !== 'yes') {
    console.log("Please type 'yes' to proceed.");
  }
} while (userResponse !== 'yes' && attempts < 5); 
if (userResponse === 'yes') {
  console.log("Great! Proceeding with the operation.");
} else {
  console.log("Max attempts reached. Operation cancelled.");
}


// --- ForEach Loop Example 
console.log("\n ForEach Loop: Processing a Shopping Cart");
const shoppingCart = [
  { item: "Laptop", price: 1200, quantity: 1 },
  { item: "Mouse", price: 25, quantity: 2 },
  { item: "Keyboard", price: 75, quantity: 1 }
];

let totalPrice = 0;
shoppingCart.forEach(product => { // Using an arrow function
  const itemTotal = product.price * product.quantity;
  console.log(`${product.item}: Rs.${product.price} x ${product.quantity} = Rs.${itemTotal}`);
  totalPrice += itemTotal;
});
console.log(`\nTotal Cart Value: Rs.${totalPrice}`);

console.log("\nEnd of JavaScript Loops Examples by Sabin");