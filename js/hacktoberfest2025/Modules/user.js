// Modules/user.js


export const admin = {
  name: "Sabin",
  role: "Admin",
  login() {
    console.log(`${this.name} logged in!`);
  }
};

export class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
}

// Default export
export default function sayHello() {
  console.log("Hello from default export!");
}