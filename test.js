const codeSnippets = [
    {
        id: 1,
        category: 'hoisting',
        code: `console.log(x);
var x = 5;`,
        expectedOutput: 'undefined',
        explanation: 'Due to hoisting, the variable declaration is moved to the top but not the initialization.'
    },
    {
        id: 2,
        category: 'hoisting',
        code: `sayHello();
function sayHello() {
    console.log("Hello!");
}`,
        expectedOutput: 'Hello!',
        explanation: 'Function declarations are hoisted completely with their implementation.'
    },
    {
        id: 3,
        category: 'closure',
        code: `function createCounter() {
    let count = 0;
    return function() {
        return ++count;
    }
}
const counter = createCounter();
console.log(counter());
console.log(counter());`,
        expectedOutput: '1\n2',
        explanation: 'The inner function maintains access to count variable due to closure.'
    },
    {
        id: 4,
        category: 'scope',
        code: `let x = 10;
function test() {
    let x = 20;
    console.log(x);
}
test();
console.log(x);`,
        expectedOutput: '20\n10',
        explanation: 'The inner x shadows the outer x within the function scope.'
    },
    {
        id: 5,
        category: 'this',
        code: `const obj = {
    name: 'John',
    greet: function() {
        console.log('Hello ' + this.name);
    }
};
obj.greet();`,
        expectedOutput: 'Hello John',
        explanation: 'When method is called on object, this refers to that object.'
    }
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

function loadQuestions() {
    const container = document.getElementById('questionContainer');
    container.innerHTML = '';
    
    const filteredSnippets = currentCategory === 'all' 
        ? codeSnippets 
        : codeSnippets.filter(s => s.category === currentCategory);
    
    filteredSnippets.forEach(snippet => {
        container.appendChild(createQuestionCard(snippet));
    });

    // Add event listeners to check answer buttons
    document.querySelectorAll('.check-answer').forEach(button => {
        button.addEventListener('click', () => {
            const snippetId = parseInt(button.dataset.id);
            const snippet = codeSnippets.find(s => s.id === snippetId);
            const userAnswer = document.getElementById(`answer-${snippetId}`).value.trim();
            const isCorrect = userAnswer === snippet.expectedOutput;
            showResult(isCorrect, snippet);
        });
    });
}

// Category selection handler
document.getElementById('categorySelect').addEventListener('change', (e) => {
    currentCategory = e.target.value;
    loadQuestions();
});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    loadQuestions();
});