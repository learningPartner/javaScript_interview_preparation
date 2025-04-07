const topics = [
  { name: "JavaScript - Classes", path: "javaScript/classinjs.html" },
  { name: "JavaScript - Coming Soon", path: "javaScript/comingsoon.html" },
  { name: "JavaScript - ES6", path: "javaScript/es6.html" },
  { name: "JavaScript - Functions", path: "javaScript/functions.html" },
  { name: "JavaScript - Hoisting & Closure", path: "javaScript/hoistingClosure.html" },
  { name: "JavaScript - How JS Works", path: "javaScript/howJsWorks.html" },
  { name: "JavaScript - JS Engine Background", path: "javaScript/javaScriptBackground.html" },
  { name: "JavaScript - Promise / Async Await", path: "javaScript/promiceAsycAwait.html" },
  { name: "JavaScript - Prototype", path: "javaScript/prototype.html" },
  { name: "Angular - NgRx", path: "angular/ngrx.html" },
];

const searchInput = document.getElementById("searchInput");
const resultsList = document.getElementById("resultsList");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  resultsList.innerHTML = "";

  const filtered = topics.filter(topic =>
    topic.name.toLowerCase().includes(query)
  );

  filtered.forEach(topic => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = topic.path;
    a.textContent = topic.name;
    li.appendChild(a);
    resultsList.appendChild(li);
  });
});
