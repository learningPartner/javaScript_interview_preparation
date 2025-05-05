const codeSnippets = [
    {
        id: 1,
        category: 'Hoisting',
        code: `getName();
console.log(X);
function getName() {
  console.log("Hello");
}
console.log(b);
let b = 20;
console.log(b);`,
        expectedOutput: `Hello
Uncaught ReferenceError: X is not defined`,
        explanation: 'The function getName() is hoisted, so calling it prints "Hello". However, X is not defined anywhere, leading to a ReferenceError. The variable b is declared using let, which is hoisted but remains in the Temporal Dead Zone (TDZ) until initialized. Accessing b before initialization results in another ReferenceError, but after initialization, console.log(b); prints 20.'
    },
    {
        id: 2,
        category: 'Hoisting',
        code: `function test() {
  if (false) {
    var x = 50;
  }
  console.log(x);
  console.log(y);
  var y = 100;
  console.log(y);
}
test();`,
        expectedOutput: `undefined
undefined
100`,
        explanation: `The variable x is declared inside the if block with var, so it is hoisted to the top of the function but remains undefined since the block doesn't execute. This leads to console.log(x); printing undefined.
The variable y is also hoisted, but only its declaration—not its assignment. So console.log(y); before assignment prints undefined. After y = 100;, console.log(y); prints 100.
Since x and y are declared with var, they are function-scoped and exist throughout the function execution.`
    },
    {
        id: 3,
        category: 'Hoisting',
        code: `var foo = function () {
  console.log("I am a function expression!");
}
function foo() {
  console.log("I am a function declaration!");
}
foo();`,
        expectedOutput: `I am a function expression!`,
        explanation: `<p>The function declaration <code>function foo()</code> is hoisted first, but it is later overwritten by the function expression assigned to <code>var foo</code>.</p>
<p>When <code>foo()</code> is called, it executes the function expression, printing:</p>
<pre>I am a function expression!</pre>
<p>This happens because variable assignments override function declarations when they share the same name.</p>
`
    },
    {
        id:4,
        category: 'Hoisting',
        code: `if (true) {
  console.log(innerVar);
  var innerVar = "I am hoisted!";
  console.log(innerVar);
}
console.log(innerVar);
`,
        expectedOutput: `undefined
        I am hoisted!`,
        explanation: `<p>The variable <code>innerVar</code> is declared with <code>var</code>, which means it is hoisted to the top of its function or global scope.</p>
<p>However, only the declaration is hoisted, not the initialization. This means when <code>console.log(innerVar)</code> is executed before the assignment, it prints <code>undefined</code>.</p>
<p>After <code>innerVar = "I am hoisted!"</code>, the second <code>console.log(innerVar)</code> prints:</p>
<pre>I am hoisted!</pre>
<p>Since <code>var</code> is function-scoped, <code>innerVar</code> is accessible outside the block as well, so the final <code>console.log(innerVar)</code> also prints:</p>
<pre>I am hoisted!</pre>
`
    },
    {
        id: 5,
        category: 'Hoisting',
        code: `var x = 10;
console.log(x);
if (true) {
  (function () {
    var x = 20;
    console.log(x);
  })();
}
console.log(x);
`,
        expectedOutput: 
`10
20
10`,
        explanation: `<p>The variable <code>x</code> is first declared globally with the value <code>10</code>, so <code>console.log(x)</code> prints:</p>
<pre>10</pre>
<p>Inside the <code>if</code> block, an **immediately invoked function expression (IIFE)** creates a new function scope. A new <code>x</code> is declared inside this function with the value <code>20</code>. This <code>x</code> is separate from the global <code>x</code>, so <code>console.log(x)</code> inside the function prints:</p>
<pre>20</pre>
<p>After the IIFE executes, we return to the global scope, where <code>x</code> is still <code>10</code>. So the final <code>console.log(x)</code> prints:</p>
<pre>10</pre>
<p>This demonstrates **function scope isolation**, where variables declared with <code>var</code> inside a function do not affect the outer scope.</p>
`
    },
    {
        id: 6,
        category: 'Hoisting',
        code: `var x = 10;
function test() {
  if (x > 20) {
    var x = 50;
  }
  console.log(x);
}
test();
`,
        expectedOutput: `undefined`,
        explanation: `<p>The global variable <code>x</code> is declared and initialized with <code>10</code>.</p>
<p>Inside the <code>test()</code> function, a new variable <code>x</code> is declared using <code>var</code>. Due to **hoisting**, this function-scoped <code>x</code> is moved to the top of the function and initialized as <code>undefined</code>.</p>
<p>Since the condition <code>x > 20</code> is false (because hoisted <code>x</code> is <code>undefined</code>), the assignment <code>x = 50</code> never executes.</p>
<p>Thus, when <code>console.log(x)</code> runs inside the function, it prints:</p>
<pre>undefined</pre>
<p>This happens because the local <code>x</code> shadows the global <code>x</code>, and due to hoisting, it is treated as <code>var x;</code> at the start of the function.</p>
`
    },
    {
        id: 7,
        category: 'Hoisting',
        code: `function test() {
  function foo() {}
  var bar;
  foo();
  bar();
  function foo() {
    console.log("foo");
  }
  bar = function () {
    console.log("bar");
  };
}
test();
`,
        expectedOutput: `foo
        Uncaught TypeError: bar is not a function`,
        explanation: `<p>Function declarations are fully hoisted, while <code>var</code> variables are hoisted but remain <code>undefined</code> until assigned.</p>
<p><code>foo()</code> runs successfully because function declarations are hoisted with their definitions, printing:</p>
<pre>foo</pre>
<p><code>bar()</code> causes an error because <code>bar</code> is hoisted as <code>undefined</code>, and the function is assigned later:</p>
<pre>Uncaught TypeError: bar is not a function</pre>
`
    },
    {
        id: 8,
        category: 'Hoisting',
        code: `function test() {
  if (false) {
    let x = 50;
  }
  console.log(x);
  console.log(y);
  let y = 100;
  console.log(y);
}
test();
`,
        expectedOutput: `Uncaught ReferenceError: x is not defined`,
        explanation: `<p><code>let</code> variables are hoisted but stay in the <strong>Temporal Dead Zone (TDZ)</strong> until initialized.</p>
<p><code>x</code> is inside a blocked <code>if (false)</code>, so it doesn't exist in scope. <code>console.log(x)</code> throws:</p>
<pre>Uncaught ReferenceError: x is not defined</pre>
<p><code>y</code> is hoisted but still in the TDZ when accessed, causing the same error. After initialization, <code>console.log(y)</code> prints:</p>
<pre>100</pre>
`
    },
    {
        id: 10,
        category: 'Hoisting',
        code: `var employeeId = "abc123";
function foo() {
  employeeId();
  return;
  function employeeId() {
    console.log(typeof employeeId);
  }
}
foo();
`,
        expectedOutput: `functions`,
        explanation: `<p>Function declarations are hoisted before variables, so inside <code>foo()</code>, <code>employeeId</code> refers to the function, not the global variable.</p>
<p>Calling <code>employeeId()</code> works since it’s a function, but it prints:</p>
<pre>function</pre>
`
    },
    {
        id: 11,
        category: 'Hoisting',
        code: `function foo() {
  let a = b = 0;
  a++;
  return a;
}
foo();
console.log(typeof a);
console.log(typeof b);
`,
        expectedOutput: `undefined
        number`,
        explanation: `<p><code>let a = b = 0;</code> is interpreted as:</p>
<pre>let a = 0; b = 0;</pre>
<p>Since <code>b</code> is not declared with <code>let</code> or <code>var</code>, it becomes a **global variable**.</p>
<p><code>a</code> is block-scoped inside <code>foo()</code>, so <code>console.log(typeof a)</code> prints:</p>
<pre>undefined</pre>
<p><code>b</code> exists globally, so <code>console.log(typeof b)</code> prints:</p>
<pre>number</pre>
`
    },
    {
        id: 12,
        category: 'Hoisting',
        code: `console.log(typeof foo);
    var foo = function () {
      console.log("Hello!");
    };`,
        expectedOutput: `"undefined"`,
        explanation: `<p>Variable <code>foo</code> is declared with <code>var</code>, so it is hoisted, but only the declaration—not the assignment.</p>
    <p>Before the function expression is assigned, <code>typeof foo</code> evaluates to:</p>
    <pre>"undefined"</pre>
    <p>If it were a function declaration instead of an expression, <code>typeof foo</code> would return <code>"function"</code>.</p>`
    },
    {
        id: 13,
        category: 'Hoisting',
        code: `console.log(a);
    let a = 5;`,
        expectedOutput: `Uncaught ReferenceError: Cannot access 'a' before initialization`,
        explanation: `<p>Variables declared with <code>let</code> are hoisted but remain in the **Temporal Dead Zone (TDZ)** until they are initialized.</p>
    <p>Since <code>a</code> is accessed before its initialization, it throws:</p>
    <pre>Uncaught ReferenceError: Cannot access 'a' before initialization</pre>`
    },
    {
        id: 14,
        category: 'Hoisting',
        code: `var x = 1;
    function test() {
      console.log(x);
      var x = 2;
    }
    test();`,
        expectedOutput: `undefined`,
        explanation: `<p>Due to **hoisting**, the local <code>var x</code> declaration inside <code>test()</code> is moved to the top.</p>
    <p>Thus, inside <code>test()</code>, <code>x</code> is hoisted as <code>var x;</code>, making it <code>undefined</code> at the time of <code>console.log(x)</code>.</p>
    <p>Even though there's a global <code>x = 1</code>, the local <code>x</code> shadows it, so the output is:</p>
    <pre>undefined</pre>`
    },
    {
        id: 15,
        category: 'Hoisting',
        code: `console.log(foo());
    function foo() {
      return "Hello";
    }
    var foo = function () {
      return "Hi";
    };`,
        expectedOutput: `"Hello"`,
        explanation: `<p>Function declarations are hoisted before variable assignments.</p>
    <p>So, <code>function foo() { return "Hello"; }</code> is fully hoisted and available at runtime.</p>
    <p>The <code>var foo</code> declaration is also hoisted, but the function expression is assigned later, so it doesn't override the function declaration at the time of execution.</p>
    <p>Thus, <code>console.log(foo())</code> prints:</p>
    <pre>"Hello"</pre>`
    },
    {
        id: 16,
        category: 'Hoisting',
        code: `(function() {
      console.log(x);
      var x = 10;
    })();`,
        expectedOutput: `undefined`,
        explanation: `<p>The variable <code>x</code> is declared with <code>var</code> inside the IIFE (Immediately Invoked Function Expression).</p>
    <p>Due to **hoisting**, only the declaration is moved to the top, making <code>x</code> <code>undefined</code> before assignment.</p>
    <p>Thus, <code>console.log(x)</code> prints:</p>
    <pre>undefined</pre>`
    },
    {
        id: 17,
        category: 'Hoisting',
        code: `console.log(foo);
    var foo = 10;
    function foo() {}
    console.log(foo);`,
        expectedOutput: `[Function: foo]
    10`,
        explanation: `<p>The function declaration <code>function foo() {}</code> is hoisted first, then the <code>var foo</code> declaration.</p>
    <p>Initially, <code>foo</code> is a function, so <code>console.log(foo)</code> prints:</p>
    <pre>[Function: foo]</pre>
    <p>Later, <code>foo</code> is reassigned to <code>10</code>, so the second <code>console.log(foo)</code> prints:</p>
    <pre>10</pre>`
    },
    {
        id: 18,
        category: 'Hoisting',
        code: `console.log(bar);
    function bar() {
      console.log("I am bar!");
    }
    var bar = 5;
    console.log(bar);`,
        expectedOutput: `[Function: bar]
    5`,
        explanation: `<p>The function declaration <code>bar()</code> is hoisted first.</p>
    <p>The <code>var bar</code> declaration is hoisted but not its assignment.</p>
    <p>So, initially, <code>console.log(bar)</code> prints the function:</p>
    <pre>[Function: bar]</pre>
    <p>After <code>bar = 5</code>, the second <code>console.log(bar)</code> prints:</p>
    <pre>5</pre>`
    },
    {
        id: 19,
        category: 'Hoisting',
        code: `foo();
    var foo = function() {
      console.log("Hello!");
    };`,
        expectedOutput: `Uncaught TypeError: foo is not a function`,
        explanation: `<p>Function expressions are not hoisted like function declarations.</p>
    <p><code>var foo</code> is hoisted as <code>undefined</code>, so calling <code>foo()</code> before assignment throws:</p>
    <pre>Uncaught TypeError: foo is not a function</pre>`
    },
    {
        id: 20,
        category: 'Hoisting',
        code: `console.log(a);
    let a;
    console.log(a);`,
        expectedOutput: `Uncaught ReferenceError: Cannot access 'a' before initialization`,
        explanation: `<p>The <code>let</code> variable <code>a</code> is hoisted but remains in the **Temporal Dead Zone (TDZ)** until it is initialized.</p>
    <p>Accessing it before initialization throws:</p>
    <pre>Uncaught ReferenceError: Cannot access 'a' before initialization</pre>`
    },
    {
        id: 21,
        category: 'Hoisting',
        code: `console.log(x);
    var x;
    console.log(x);`,
        expectedOutput: `undefined
    undefined`,
        explanation: `<p>The variable <code>x</code> is declared with <code>var</code>, so it is hoisted with an initial value of <code>undefined</code>.</p>
    <p>Thus, both <code>console.log(x)</code> statements print:</p>
    <pre>undefined</pre>`
    },
    {
        id: 22,
        category: 'Hoisting',
        code: `var a = 10;
console.log(a);
function fn() {
  console.log(a);
  var a = 20;
  a++;
  console.log(a);
  if (a) {
    var a = 30;
    a++;
    console.log(a);
  }
  console.log(a);
}
fn();
console.log(a);`,
        expectedOutput: `10
        undefined
        21
        31
        31
        10`,
        explanation: `<p>Global <code>a = 10</code>, so first <code>console.log(a)</code> prints:</p>
<pre>10</pre>
<p>Inside <code>fn()</code>, <code>var a</code> is hoisted as <code>undefined</code>, so:</p>
<pre>undefined</pre>
<p>After assignments:</p>
<pre>21</pre>
<pre>31</pre>
<pre>31</pre>
<p>Global <code>a</code> remains unchanged:</p>
<pre>10</pre>

<p><strong>Takeaway:</strong> <code>var</code> is function-scoped, causing shadowing.</p>
`
    },
    
    {
        id: 23,
        category: 'Promise',
        code: `Promise.resolve(1)
  .then((val) => {
    console.log(val);
    return val + 1;
  })
  .then(console.log);`,
        expectedOutput: `1
        2`,
        explanation: ``
    },
    {
        id: 24,
        category: 'Promise',
        code: `console.log("Start");
Promise.resolve().then(() => console.log("Promise"));
console.log("End");`,
        expectedOutput: `Start
        End
        Promise`,
        explanation: `<ul>
            <li>Synchronous code runs first (the console.log("Start") and console.log("End")).</li>
            <li>Promise.resolve() creates a resolved Promise, but it is asynchronous. The .then() handler associated with it will not be executed immediately. Instead, it will be queued in the microtask queue.</li>
            <li> The Promise.then() callback runs after all synchronous code finishes, so "Promise" is logged after "Start" and "End".</li>
        </ul>`
    },
    {
        id: 25,
        category: 'Promise',
        code: `const p = new Promise((resolve, reject) => {
  let success = true;
  success ? resolve("Success") : reject("Failed");
});

p.then(console.log).catch(console.error);
`,
        expectedOutput: `Success`,
        explanation: ``
    },
    {
        id: 26,
        category: 'Promise',
        code: `Promise.resolve(10)
  .then((num) => num * 2)
  .then((num) => num + 5)
  .then(console.log);`,
        expectedOutput: `25`,
        explanation: ``
    },
    {
        id: 27,
        category: 'Promise',
        code: `function doubleAfter2Sec(x) {
  return new Promise(resolve => {
    setTimeout(() => resolve(x * 2), 2000);
  });
} 
Promise.resolve(10)
  .then(doubleAfter2Sec)
  .then(console.log); // 20 after 2 seconds
`,
        expectedOutput: `20`,
        explanation: ``
    },
    {
        id: 28,
        category: 'Promise',
        code: `console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
`,
        expectedOutput: `1
        4
        3
        2`,
        explanation: `Promise.then is a microtask, executed before setTimeout (a macrotask).`
    },
    {
        id: 29,
        category: 'Promise',
        code: `const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3]).then((results) => {
  console.log(results);
});
`,
        expectedOutput: `[1, 2, 3]`,
        explanation: ``
    },
    {
        id: 30,
        category: 'Promise',
        code: `function fetchWithTimeout(url, timeout = 3000) {
  const delay = new Promise((_, reject) =>
    setTimeout(() => reject("Timeout!"), timeout)
  ); 
  return Promise.race([fetch(url), delay]);
}
fetchWithTimeout("https://jsonplaceholder.typicode.com/users",10).then(res=>{
 console.log(res)
}).catch(error=>{
 console.log(error)
})`,
        expectedOutput: `Timeout!`,
        explanation: ``
    },
    {
        id: 31,
        category: 'Prototype',
        code: `function Person(name) {
  this.name = name;
}
Person.prototype.sayHello = function () {
  console.log('Hi, I am ${this.name}');
};
const p = new Person("Chetan");
p.sayHello();
`,
        expectedOutput: `Hi, I am Chetan`,
        explanation: ``
    },
    {
        id: 32,
        category: 'Prototype',
        code: `function Animal() {}
Animal.prototype.sound = "Roar";

const tiger = new Animal();
console.log(tiger.sound);
`,
        expectedOutput: `Roar`,
        explanation: ``
    },
    {
        id: 33,
        category: 'Prototype',
        code: `function Animal(name) {
  this.name = name;
}
Animal.prototype.eat = function () {
  console.log('${this.name} is eating');
};
function Dog(name) {
  Animal.call(this, name); // Call super constructor
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.bark = function () {
  console.log('${this.name} says woof');
};
const dog = new Dog("Bruno");
dog.eat();
dog.bark();
`,
        expectedOutput: `Bruno is eating
        Bruno says woof`,
        explanation: ``
    },
    {
        id: 34,
        category: 'Prototype',
        code: `Array.prototype.last = function () {
  return this[this.length - 1];
};
const arr = [1, 2, 3];
console.log(arr.last());
`,
        expectedOutput: `3`,
        explanation: ``
    },
    {
        id: 35,
        category: 'Prototype',
        code: `function Gadget() {}
Gadget.prototype.version = "1.0";

const g = new Gadget();
g.version = "2.0";

console.log(g.version);
console.log(g.__proto__.version);
`,
        expectedOutput: `2.0
        1.0`,
        explanation: ``
    },
    {
        id: 36,
        category: 'Class',
        code: `class Test {
  constructor() {
    this.value = 42;
  }
  static getValue() {
    return this.value;
  }
}
Test.value = 100;
console.log(Test.getValue());
`,
        expectedOutput: `100`,
        explanation: `Because this inside a static method refers to the class itself, and Test.value is 100.`
    },
    {
        id: 37,
        category: 'Class',
        code: `class Parent {
  constructor() {
    this.name = "Parent";
  } 
  sayHi() {
    console.log('Hi from  ${this.name}');
  }
}

class Child extends Parent {
  constructor() {
    super();
    this.name = "Child";
  } 
  sayHi() {
    super.sayHi();
  }
}

const c = new Child();
c.sayHi();
`,
        expectedOutput: `Hi from Child`,
        explanation: ``
    },
    {
        id: 38,
        category: 'Class',
        code: `class Parent {
  constructor(name) {
    this.parentName = name;
  }
  sayHi() {
    console.log('Hi from ${this.parentName}');
  }
}

class Child extends Parent {
  constructor(parenName,childName) {
    super();
    this.name = childName;
  }
  sayHi() {
    super.sayHi();
  }
}

const c = new Child("aaa",'bbb');
c.sayHi();
`,
        expectedOutput: `Hi from undefined`,
        explanation: ``
    },
    {
        id: 39,
        category: 'Class',
        code: `class Foo {
  constructor() {
    this.count++;
  }
}
const a = new Foo();
const b = new Foo();
console.log(a.count);
console.log(b.count);
`,
        expectedOutput: `undefined 
        undefined `,
        explanation: ``
    },
    {
        id: 40,
        category: 'Class',
        code: `class Logger {
  log = () => {
    console.log(this.message);
  }; 
  constructor(msg) {
    this.message = msg;
  }
}
const l = new Logger("Hello");
const logFn = l.log;
logFn();
`,
        expectedOutput: `Hello`,
        explanation: ``
    }, 
    {
        id: 41,
        category: 'Class',
        code: `class Secret {
  #data = "hidden";

  reveal() {
    return this.#data;
  }
} 
const s = new Secret();
console.log(s.reveal());      
console.log(s.#data);         
`,
        expectedOutput: `hidden
        throws SyntaxError`,
        explanation: ``
    },
    {
        id: 42,
        category: 'Class',
        code: ` class Magic {
     static count = 0; 
     constructor() {
         Magic.count++;
     }
 } 
 const m1 = new Magic();
 const m2 = new Magic();

 console.log(m1.count);
 console.log(Magic.count);`,
        expectedOutput: `undefined
        2`,
        explanation: `undefined as static property on the class itself, not on the instances.2, because we created two instances and each one increased the static count.`
    },
    {
        id: 43,
        category: 'Class',
        code: `const obj = new Test(); // ❓

class Test {
  constructor() {
    console.log("Created!");
  }
}
`,
        expectedOutput: `Cannot access 'Test' before initialization"`,
        explanation: `Classes are not hoisted, unlike function declarations.`
    },
    {
        id: 44,
        category: 'var-let-const',
        code: `console.log(a); // undefined (hoisted)
var a = 10;
console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 20;
`,
        expectedOutput: `undefined
        Cannot access 'b' before initialization`,
        explanation: ``
    },
    {
        id: 45,
        category: 'var-let-const',
        code: `if (true) {
    var x = "I am var";
    let y = "I am let";
    const z = "I am const";
}
console.log(x);
console.log(y);
console.log(z);
`,
        expectedOutput: `I am var
        y is not defined`,
        explanation: `as let and const are block scope so not accessibal after  { }`
    },
    {
        id: 46,
        category: 'var-let-const',
        code: `for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var loop:", i), 1000);
} 
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let loop:", j), 1000);
}
`,
        expectedOutput: `var loop: 3
        var loop: 3
        var loop: 3
        let loop: 1
        let loop: 2
        let loop: 3`,
        explanation: `as var has function or gloabal scope so after there is only single memory assign to var one so it prints last value and in case of let for ecah  {} it will maintain different value`
    },
    {
        id: 47,
        category: 'var-let-const',
        code: `for(var i=0;i<3;i++){
                                            (function() {
                                                console.log(i)
                                            })()
                                        }`,
        expectedOutput: `0
        1
        2 `,
        explanation: `as var is fun or global scope for inside intertaion we have fun so for each iteration we have seperate bscope with diff value`
    },
    {
        id: 48,
        category: 'var-let-const',
        code: `  for(var i=0;i<3;i++){
                                            (function() {
                                               setTimeout(() => {
                                                console.log(i)
                                               }, 10000); 
                                            })()
                                        }`,
        expectedOutput: `3
        3
        3
         `,
        explanation: `as i is in outter scope and we are just accesing it so latest value only`
    },
    {
        id: 49,
        category: 'var-let-const',
        code: `function printFor() {
                                        for (var i = 0; i < 3; i++) {
                                            setTimeout(() => {
                                                printNo(i)
                                            }, 1000)
                                        }
                                    } 
                                    function printNo(num) {
                                        console.log(num)
                                    } 
                                    printFor()`,
        expectedOutput: `3
        3
        3 `,
        explanation: ``
    },
    {
        id: 50,
        category: 'var-let-const',
        code: `function printFor() {
                                        for (var i = 0; i < 3; i++) {
                                            function printNo(num) {
                                                setTimeout(() => {
                                                     console.log(num)
                                                }, 1000)
                                            }
                                            printNo(i)
                                        }
                                    }
                                    printFor()`,
        expectedOutput: `0
        1
        2`,
        explanation: `here becaz of closure every param we pass will be lock with that instance of fun so diff value`
    },
    {
        id: 51,
        category: 'Arrow_Function',
        code: `const obj = {
  count: 0,
  increment: () => {
    this.count++;
  }
};
obj.increment();
`,
        expectedOutput: `NaN`,
        explanation: `as we are calling obj.increment() from outside and there is not variabkle declared with count name so no access of this inarrow fun so undefined++ nan`
    },
    {
        id: 52,
        category: 'Arrow_Function',
        code: `const count = 2;
const obj = {
  count: 0,
  increment: () => {
   this.count++;
   console.log(this.count)
  }
};
obj.increment();`,
        expectedOutput: `NaN`,
        explanation: `now in global scope we have a variable count but that decclared with const so its not in global scope`
    },
    {
        id: 53,
        category: 'Arrow_Function',
        code: `var count = 2;
const obj = {
  count: 0,
  increment: () => {
   this.count++;
   console.log(this.count)
  }
};
obj.increment();`,
        expectedOutput: `3`,
        explanation: `npw in global scope we have count variable so 2++ => 3`
    },
    {
        id: 54,
        category: 'Arrow_Function',
        code: `var name = "Angular"
var person = {
  name: "React",
  age: 30,
  getDetail: function () {
    console.log("getDetail " + this.name)
  },
  getName: () => {
    console.log("getName " + this.name)
  },
}
person.getDetail();
person.getName();`,
        expectedOutput: `getDetail React
        getName Angular`,
        explanation: `now getDetail is normal fun so this refers to the person object. and arrow functions do not bind their own this it wil use its sorrunding scope and we are invoking getName poutside scope in scope we have Angular with same variable name `
    },
    {
        id: 54,
        category: 'Arrow_Function',
        code: `const person = {
  name: "Chetan",
  greet: () => {
    console.log('Hello, ${this.name}');
  }
};
person.greet()`,
        expectedOutput: `Hello, undefined`,
        explanation: ``
    },
    {
        id: 55,
        category: 'Arrow_Function',
        code: `const fn = () => ({ name: "JS" });
console.log(fn());`,
        expectedOutput: `{ name: "JS" }`,
        explanation: `Wrapping the object in () allows it to be returned directly. Without (), JavaScript thinks it's a block.`
    },
    {
        id: 56,
        category: 'Arrow_Function',
        code: `const fn = () => { name: "JS" };
console.log(fn());`,
        expectedOutput: `undefined`,
        explanation: `{} are usually interpreted as the function body in an arrow function <br/> JavaScript sees { name: "JS" } and thinks it's a block of code (not an object). So, it doesn't return anything — meaning the function fn() returns undefined`
    },
    {
        id: 57,
        category: 'Arrow_Function',
        code: `const outer = {
  count: 0,
  inc: function () {
    setTimeout(() => {
      this.count++;
      console.log(this.count);
    }, 100);
  }
};
outer.inc();
`,
        expectedOutput: `1`,
        explanation: `Arrow function inherits this from inc method, which correctly refers to outer`
    },
    {
      id: 58,
      category: 'Arrow_Function',
      code: `let name = "Outer";
const obj = {
  name: "Inner",
  say: () => console.log(this.name)
};
obj.say();
`,
      expectedOutput: `undefined`,
      explanation: `we are calling say fun from outside which is arrow one in in global scope we dont have name with var so undeinfed if global name was with var we would have got outer`
  },
  {
    id: 59,
    category: 'Closure',
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}`,
    expectedOutput: `3
    3
    3`,
    explanation: ``
},
{
  id: 60,
  category: 'Closure',
  code: `for (var i = 0; i < 3; i++) {
  ((j) => {
    setTimeout(() => console.log(j), 1000);
  })(i);
}`,
  expectedOutput: `0
  1
  2`,
  explanation: ``
},
{
  id: 61,
  category: 'Closure',
  code: `function outer() {
  let secret = "I know JS";
  return function inner() {
    return secret;
  };
}
const getSecret = outer();
console.log(getSecret());
`,
  expectedOutput: `I know JS`,
  explanation: ``
},
{
  id: 62,
  category: 'Closure',
  code: `let funcs = [];

for (var i = 0; i < 3; i++) {
  funcs.push(() => console.log(i));
}

funcs[0]();
funcs[1]();
`,
  expectedOutput: `3
  3`,
  explanation: ``
},
{
  id: 63,
  category: 'Promise',
  code: `console.log("Start")
    Promise.resolve(()=>{
      console.log("Promise")
    })
    setTimeout(() => {
      console.log("1 sec")
    }, 1000);
    setTimeout(() => {
      console.log("o sec")
    }, 0);
    setTimeout(() => {
      console.log("no time")
    });
    setTimeout(() => {
      console.log("o.5 sec")
    }, 500);
    console.log("End")`,
  expectedOutput: `Start
  End
  Promise
  o sec
  no time
  o.5 sec
  1 sec
  `,
  explanation: ``
}

];

let currentCategory = 'all';

function createQuestionCard(snippet) {
  const path = window.location.pathname;
  const page = path.substr(path.lastIndexOf("/") + 1);

  const col = document.createElement('div');
  col.className = 'col-md-6'; // Half width for medium+ screens

  col.innerHTML = `
    <div class="card mb-4">
      <div class="card-header bg-secondary text-white">
         <div class='row'>
           <div class='col-10'>
                <pre class="mb-0">${snippet.code}</pre>
           </div>
           <div class='col-2 text-end fw-bold'>
                  ${snippet.category.charAt(0).toUpperCase() + snippet.category.slice(1)}
           </div>
         </div> 
      </div>
      <div class="card-body"> 
         <div class='row'>
           <div class='col-8'>
                ${
                  page == "checkKnowledge.html" ? `
                  <div class="mb-1"> 
                    <textarea class="form-control" placeholder='Enter output ...' rows="2" id="answer-${snippet.id}"></textarea>
                  </div> 
                   ` : ''
                }
           </div>
           <div class='col-4'>
              <label class="form-label">What will be the output?</label>
           </div>
         </div> 
      </div>
    </div>
  `;

  return col;
}

  

function showResult(isCorrect, snippet) {
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <div class="text-${isCorrect ? 'success' : 'danger'} mb-3">
            <h5>${isCorrect ? 'Correct!' : 'Incorrect'}</h5>
        </div>
        <div class="mb-3">
            <strong>Expected Output:</strong>
            <pre class="mt-2">${snippet.expectedOutput}</pre>
        </div>
        <div>
            <strong>Explanation:</strong>
            <p class="mt-2">${snippet.explanation}</p>
        </div>
    `;
    
    const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
    resultModal.show();
}
function normalizeText(text) {
    return text
        .toLowerCase()
        .replace(/\s+/g, ' ') // Normalize spaces & new lines
        .replace(/uncaught\s+/gi, '') // Remove "Uncaught" prefix from errors
        .replace(/(referenceerror|typeerror|syntaxerror|rangeerror):/gi, '') // Remove error types
        .replace(/at\s+\S+/gi, '') // Remove "at ..." stack trace
        .replace(/\[.*?\]/g, '') // Remove anything inside brackets (like [native code])
        .trim();
}

function extractKeyParts(text) {
    return normalizeText(text)
        .split(' ') // Break into words
        .filter(word => word.length > 2); // Remove short common words
}
 

function getSimilarityScore(str1, str2) {
    const words1 = str1.split(' ');
    const words2 = str2.split(' ');
    
    const commonWords = words1.filter(word => words2.includes(word));
    return (commonWords.length / Math.max(words1.length, words2.length)) * 100; // Percentage similarity
}
function loadQuestions() {
    const container = document.getElementById('questionContainer2');
    container.innerHTML = '';
    currentCategory = document.getElementById('categorySelect').value
    const filteredSnippets = currentCategory === 'all' 
        ? codeSnippets 
        : codeSnippets.filter(s => s.category.toLowerCase() === currentCategory);
    
    filteredSnippets.forEach(snippet => {
        container.appendChild(createQuestionCard(snippet));
    });

    // Add event listeners to check answer buttons
    // document.querySelectorAll('.check-answer').forEach(button => {
    //     button.addEventListener('click', () => {
    //         const snippetId = parseInt(button.dataset.id);
    //         const snippet = codeSnippets.find(s => s.id === snippetId);
    //         const userAnswer = document.getElementById(`answer-${snippetId}`).value.trim();
    //         const isCorrect = userAnswer === snippet.expectedOutput;
    //         showResult(isCorrect, snippet);
    //     });
    // });
    // document.querySelectorAll('.check-answer').forEach(button => {
    //     button.addEventListener('click', () => {
    //         const snippetId = parseInt(button.dataset.id);
    //         const snippet = codeSnippets.find(s => s.id === snippetId);
    //         const userAnswer = normalizeText(document.getElementById(`answer-${snippetId}`).value);
    //         const expectedAnswer = normalizeText(snippet.expectedOutput);
    
    //         const similarity = getSimilarityScore(userAnswer, expectedAnswer);
    //         const isCorrect = similarity >= 80; // Accept 80% or more similarity as correct
    
    //         showResult(isCorrect, snippet);
    //     });
    // });
    document.querySelectorAll('.check-answer').forEach(button => {
        button.addEventListener('click', () => {
            const snippetId = parseInt(button.dataset.id);
            const snippet = codeSnippets.find(s => s.id === snippetId);
            const userAnswer = normalizeText(document.getElementById(`answer-${snippetId}`).value);
            const expectedAnswer = normalizeText(snippet.expectedOutput);
    
            const expectedWords = extractKeyParts(expectedAnswer);
            const userWords = extractKeyParts(userAnswer);
    
            // Check if user's answer contains all key expected words
            const isCorrect = expectedWords.every(word => userWords.includes(word));
    
            showResult(isCorrect, snippet);
        });
    });
}

const uniqueCategories = ['All'].concat([...new Set(codeSnippets.map(item => item.category))]);

// Populate dropdown
const categorySelect = document.getElementById('categorySelect');
categorySelect.innerHTML = uniqueCategories.map(category => 
    `<option value="${category.toLowerCase().replace(/\s+/g, '-')}">${category}</option>`
).join('');
// Category selection handler
document.getElementById('categorySelect').addEventListener('change', (e) => {
    debugger;
    currentCategory = e.target.value;
    loadQuestions();
});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    loadQuestions();
});

///*********
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const page = path.substr(path.lastIndexOf("/") + 1);
  debugger;
  if (page === "checkKnowledge.html") {
    loadRandomTestQuestions();
  } else {
    loadQuestions();
  }
});
function loadRandomTestQuestions() {
  const container = document.getElementById('questionContainer2');
  container.innerHTML = '';

  const categoryMap = {};
  codeSnippets.forEach(snippet => {
    if (!categoryMap[snippet.category]) {
      categoryMap[snippet.category] = [];
    }
    categoryMap[snippet.category].push(snippet);
  });
  const category = "search";
  // const selectedSnippets = [];
  
  // if (categoryMap[category]) {
  //   const questions = [...categoryMap[category]]; // clone the array to avoid modifying original
  
  //   // Shuffle the array
  //   for (let i = questions.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [questions[i], questions[j]] = [questions[j], questions[i]];
  //   }
  
  //   // Pick the first 5 or less if not enough questions
  //   const count = Math.min(5, questions.length);
  //   for (let i = 0; i < count; i++) {
  //     selectedSnippets.push(questions[i]);
  //   }
  // } else {
  //   console.warn(`Category "${category}" not found in categoryMap.`);
  // }
  const selectedSnippets = [];
  Object.keys(categoryMap).forEach(category => {
    const questions = categoryMap[category];
      // Shuffle the array
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    const count = Math.min(5, questions.length);
    for (let i = 0; i < count; i++) {
      selectedSnippets.push(questions[i]);
    }
   // const randomIndex = Math.floor(Math.random() * questions.length);
    //selectedSnippets.push(questions[randomIndex]);
  });

  selectedSnippets.forEach(snippet => {
    container.appendChild(createQuestionCard(snippet));
  });

  document.getElementById('submitTest').addEventListener('click', () => {
    let correctCount = 0;
    let unanswered = false;
  
    selectedSnippets.forEach(snippet => {
      const answerBox = document.getElementById(`answer-${snippet.id}`);
      const userInput = answerBox.value.trim();
  
      if (!userInput) {
        unanswered = true;
        answerBox.classList.add('border-danger');
        return;
      } else {
        answerBox.classList.remove('border-danger');
      }
  
      const userAnswer = normalizeText(userInput);
      const expectedAnswer = normalizeText(snippet.expectedOutput);
  
      const similarity = getSimilarityScore(expectedAnswer, userAnswer);
      const isCorrect = similarity >= 70;
  
      const cardBody = answerBox.closest('.card-body');
  
      // Remove previous feedback if any
      const oldResult = cardBody.querySelector('.answer-feedback');
      if (oldResult) oldResult.remove();
  
      const resultDiv = document.createElement('div');
      resultDiv.className = 'mt-3 answer-feedback';
  
      if (isCorrect) {
        correctCount++;
        resultDiv.innerHTML = `<div class="text-success fw-bold">✅ Correct Answer!</div>`;
      } else {
        resultDiv.innerHTML = `
          <div class="text-danger fw-bold">❌ Wrong Answer</div>
          <div><strong>Expected Output:</strong><pre class="mt-2">${snippet.expectedOutput}</pre></div>
          <div><strong>Explanation:</strong><div class="mt-2">${snippet.explanation}</div></div>
        `;
      }
  
      cardBody.appendChild(resultDiv);
    });
  
    if (unanswered) {
      alert("Please provide answers to all questions before submitting.");
      return;
    }
  
    // Show final score
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `<h5 class="text-center">Your Score: ${correctCount} / ${selectedSnippets.length}</h5>`;
    const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
    resultModal.show();
  });
  
  

//   document.getElementById('submitTest').addEventListener('click', () => {
//     let correctCount = 0;
  
//     selectedSnippets.forEach(snippet => {
//       const userAnswer = normalizeText(document.getElementById(`answer-${snippet.id}`).value);
//       const expectedAnswer = normalizeText(snippet.expectedOutput);
  
//       const similarity = getSimilarityScore(expectedAnswer, userAnswer);
//       const isCorrect = similarity >= 70;
  
//       if (isCorrect) correctCount++;
//     });
  
//     const modalContent = document.getElementById('modalContent');
//     modalContent.innerHTML = `<h5 class="text-center">Your Score: ${correctCount} / ${selectedSnippets.length}</h5>`;
//     const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
//     resultModal.show();
//   });
  
}
