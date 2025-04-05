class Secret {
  #data = "hidden";

  reveal() {
    return this.#data;
  }
} 
const s = new Secret();
console.log(s.reveal());      
console.log(s.#data);         
