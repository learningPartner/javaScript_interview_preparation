function greet(role) {
  console.log(`Hello, my name is ${this.name}, and I am a ${role}`);
}
const user = { name: "Alice" };
greet.call(user, "developer");
