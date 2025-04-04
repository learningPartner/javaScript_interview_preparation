// Define an array of background colors
const colors = [
  "#FDF7E4",
  "#FAEED1",
  "#D8EBF1",
  "#E3F4F4",
  "#F7EBEC",
  "#F6FDC3",
  "#FFF8E3",
  "#EAE0DA",
  "#F8EDE3",
  "#EADBC8",
  "#F5EEE6",
  "#DFCCFB",
  "#E3F2FD",
];

// Select all columns
const columns = document.querySelectorAll(".myCol");

// Loop through and assign colors
columns.forEach((col) => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)]; // Pick a random color
  col.style.backgroundColor = randomColor;
});

const menu = [
  {
    name: "JavaScript",
    children: [
      { name: "Introduction", link: "javaScriptBackground.html" },
      { name: "How Js Works", link: "howJsWorks.html" },
      { name: "Hoisting & Closure", link: "hoistingClosure.html" },
      { name: "Functions n more...", link: "functions.html" },
      { name: "Prototype...", link: "prototype.html" },
      { name: "Class in Js", link: "classinjs.html" },
      { name: "Promise Async Await", link: "promiceAsycAwait.html" },
    ],
  },
  {
    name: "Angular",
    children: [
      { name: "NGRX (Basic)", link: "/angular/ngrx.html" },
      { name: "Coming Soon", link: "comingsoon.html" },
    ],
  },
  {
    name: "React",
    children: [
      { name: "Coming Soon", link: "comingsoon.html" },
      { name: "Coming Soon", link: "comingsoon.html" },
    ],
  },
  {
    name: "Dot Net",
    children: [{ name: "Coming Soon", link: "comingsoon.html" }],
  },
];

// Initialize AOS and theme
document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: "ease-out-cubic",
  });

  // Generate navigation menu
  generateNavMenu();

  // Generate topic cards
  generateTopicCards();

  // Initialize theme
  initializeTheme();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      if (href !== "#") {
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 100,
            behavior: "smooth",
          });
        }
      }
    });
  });
});

function generateNavMenu() {
  const navbarNav = document.getElementById("navbarNav");
  const ul = document.createElement("ul");
  ul.className = "navbar-nav me-auto";

  menu.forEach((item) => {
    const li = document.createElement("li");
    li.className = "nav-item dropdown";

    li.innerHTML = `
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <i class="bi ${item.icon} me-1"></i>${item.name}
            </a>
            <ul class="dropdown-menu">
                ${item.children
                  .map(
                    (child) => `
                    <li>
                        <a class="dropdown-item" href="${child.link}">
                            <i class="bi bi-arrow-right-short"></i>${child.name}
                        </a>
                    </li>
                `
                  )
                  .join("")}
            </ul>
        `;

    ul.appendChild(li);
  });

  const testli = document.createElement("li");
  testli.className = "nav-item ";
  testli.innerHTML = ` 
                        <a class="nav-link" href="test.html">
                            <i class="bi bi-arrow-right-short"></i>Test Snipets
                        </a>
                    `;
  ul.appendChild(testli);
  // Insert the menu before the theme toggle button
  const themeToggle = document.getElementById("themeToggle");
  navbarNav.insertBefore(ul, themeToggle);
}

function generateTopicCards() {
  const topicCards = document.getElementById("topic-cards");
  if (topicCards) {
    menu.forEach((topic, index) => {
      const col = document.createElement("div");
      col.className = "col-md-6";
      col.setAttribute("data-aos", "fade-up");
      col.setAttribute("data-aos-delay", (index * 100).toString());

      col.innerHTML = `
                <div class="card topic-card h-100">
                    <div class="card-body text-center">
                        <div class="topic-icon">
                            <i class="bi ${topic.icon}"></i>
                        </div>
                        <h3 class="card-title">${topic.name}</h3>
                        <ul class="subtopic-list">
                            ${topic.children
                              .map(
                                (child) => `
                                <li>
                                    <a href="${child.link}">
                                        <i class="bi bi-arrow-right-short"></i>
                                        ${child.name}
                                    </a>
                                </li>
                            `
                              )
                              .join("")}
                        </ul>
                    </div>
                </div>
            `;

      topicCards.appendChild(col);
    });
  }
}

function initializeTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle.querySelector("i");

  // Check for saved theme preference or default to light
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.classList.toggle("dark-theme", savedTheme === "dark");
  updateThemeIcon(themeIcon, savedTheme);

  // Theme toggle click handler
  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");
    const theme = isDark ? "dark" : "light";
    localStorage.setItem("theme", theme);
    updateThemeIcon(themeIcon, theme);
  });
}

function updateThemeIcon(icon, theme) {
  icon.className = theme === "dark" ? "bi bi-moon-fill" : "bi bi-sun-fill";
}
