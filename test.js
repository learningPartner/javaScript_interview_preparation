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
        id: 3,
        category: 'Hoisting',
        code: ``,
        expectedOutput: ``,
        explanation: ``
    },
    {
        id: 3,
        category: 'Hoisting',
        code: ``,
        expectedOutput: ``,
        explanation: ``
    },
    {
        id: 3,
        category: 'Hoisting',
        code: ``,
        expectedOutput: ``,
        explanation: ``
    },
    {
        id: 3,
        category: 'Hoisting',
        code: ``,
        expectedOutput: ``,
        explanation: ``
    },
    {
        id: 3,
        category: 'Hoisting',
        code: ``,
        expectedOutput: ``,
        explanation: ``
    },
    {
        id: 3,
        category: 'Hoisting',
        code: ``,
        expectedOutput: ``,
        explanation: ``
    },
    {
        id: 3,
        category: 'Hoisting',
        code: ``,
        expectedOutput: ``,
        explanation: ``
    },
    {
        id: 3,
        category: 'Hoisting',
        code: ``,
        expectedOutput: ``,
        explanation: ``
    },
    {
        id: 3,
        category: 'Hoisting',
        code: ``,
        expectedOutput: ``,
        explanation: ``
    },
    {
        id: 3,
        category: 'Hoisting',
        code: ``,
        expectedOutput: ``,
        explanation: ``
    },
    {
        id: 3,
        category: 'Hoisting',
        code: ``,
        expectedOutput: ``,
        explanation: ``
    },
];

let currentCategory = 'all';

function createQuestionCard(snippet) {
    const card = document.createElement('div');
    card.className = 'card mb-4';
    card.innerHTML = `
        <div class="card-header bg-secondary">
            Question #${snippet.id} - ${snippet.category.charAt(0).toUpperCase() + snippet.category.slice(1)}
        </div>
        <div class="card-body">
            <pre class="mb-4">${snippet.code}</pre>
            <div class="mb-3">
                <label class="form-label">What will be the output?</label>
                <textarea class="form-control" rows="3" id="answer-${snippet.id}"></textarea>
            </div>
            <button class="btn btn-primary check-answer" data-id="${snippet.id}">
                Check Answer
            </button>
        </div>
    `;
    return card;
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
    const container = document.getElementById('questionContainer');
    container.innerHTML = '';
    
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