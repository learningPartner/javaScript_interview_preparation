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
const BASE_PATH = "https://learningpartner.github.io/javaScript_interview_preparation/";
const menu = [
  {
    
    name: "Soft Architecture",
    image: "/logo/angular.png",
    children: [ 
      {
        name: "Architecture",
        link: `#`,
        children: [
          { name: "Solid", link: `${BASE_PATH}angular/dynamicPage.html?page='solid-principles'` },
          { name: "Design Pattern", link: `${BASE_PATH}angular/dynamicPage.html?page='design-pattern'` } 
        ],
      },
      
    ],
  },
  {
    name: "JavaScript",
    image: "/logo/javascript.png",

    children: [
      {
        name: "Introduction",
        link: `${BASE_PATH}javaScript/javaScriptBackground.html`,
      },
      
      { name: "How Js Works", link: `${BASE_PATH}javaScript/howJsWorks.html` },
      {
        name: "Hoisting & Closure",
        link: `${BASE_PATH}javaScript/hoistingClosure.html`,
      },
      {
        name: "Functions n more...",
        link: `${BASE_PATH}javaScript/functions.html`,
      },
      { name: "Prototype...", link: `${BASE_PATH}javaScript/prototype.html` },
      { name: "Class in Js", link: `${BASE_PATH}javaScript/classinjs.html` },
      {
        name: "Promise Async Await",
        link: `${BASE_PATH}javaScript/promiceAsycAwait.html`,
      },
      { name: "ES6 Features", link: `${BASE_PATH}javaScript/es6.html` },
      {
        name: "Object N Array",
        link: `${BASE_PATH}javaScript/ObjectnArray.html`,
      },
      { name: "Famous Short Porgrams", link: `${BASE_PATH}javaScript/shortPrograms.html` },
    ],
  },
  {
    name: "Angular",
    image: "/logo/angular.png",
    children: [
      {
        name: "NGRX (Basic)",
        link: `#`,
        children: [
          { name: "Hoisting", link: `${BASE_PATH}angular/ngrx.html` } 
        ],
      },
      {
        name: "RXJS",
        link: `#`,
        children: [
          { name: "Operators", link: `${BASE_PATH}angular/dynamicPage.html?page='rxjs-operator'` },
          { name: "Subject-Beh-subject Map & Filter", link: `${BASE_PATH}angular/dynamicPage.html?page='rxjs-sub-beh-map'` },
        ],
      },
      {
        name: "Advance",
        link: `#`,
        children: [
          { name: "Advance Concepts", link: `${BASE_PATH}angular/advanceConcepts.html` },
          { name: "Depedency Injection", link: `${BASE_PATH}angular/depedencyInjection.html` },
          { name: "Depedency Injection", link: `${BASE_PATH}angular/depedencyInjection.html` },
          { name: "Optimization", link: `${BASE_PATH}angular/optimization.html` }, 
          { name: "View Child", link: `${BASE_PATH}angular/viewChild.html` }, 
          { name: "Web Worker", link: `${BASE_PATH}angular/webworker.html` },
          { name: "Proxy & Polyfill", link: `${BASE_PATH}angular/dynamicPage.html?page='proxy'` },
        ],
      },
      {
        name: "Component",
        link: `#`,
        children: [
          { name: "Life Cycle", link: `${BASE_PATH}angular/dynamicPage.html?page='life-cycle'` }, 
          { name: "ViewEncapsulation", link: `${BASE_PATH}angular/dynamicPage.html?page='view-encap'` }, 
          
        ],
      },
      { name: "Coming Soon", link: `${BASE_PATH}comingsoon.html` },
    ],
  },
  
  // {
  //   name: "React",
  //   children: [
  //     { name: "Coming Soon", link: "comingsoon.html" },
  //     { name: "Coming Soon", link: "comingsoon.html" },
  //   ],
  // },
  // {
  //   name: "Dot Net",
  //   children: [{ name: "Coming Soon", link: "comingsoon.html" }],
  // },
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
        ${item.image ? `<img src="${item.image}" width="20" class="me-1" />` : ""}
        ${item.name}
      </a>
      ${generateMenuItems(item.children)}
    `;

    ul.appendChild(li);
  });

  const testli = document.createElement("li");
  testli.className = "nav-item";
  testli.innerHTML = `
    <a class="nav-link" href="${BASE_PATH}/test.html">
      <i class="bi bi-arrow-right-short"></i>Test Snippets
    </a>
  `;
  ul.appendChild(testli);

  const testli2 = document.createElement("li");
  testli2.className = "nav-item";
  testli2.innerHTML = `
    <a class="nav-link" href="${BASE_PATH}/checkKnowledge.html">
      <i class="bi bi-arrow-right-short"></i>checkKnowledge
    </a>
  `;
  ul.appendChild(testli2);

  const themeToggle = document.getElementById("themeToggle");
  navbarNav.insertBefore(ul, themeToggle);
}

function generateMenuItems(children) {
  if (!children || children.length === 0) return "";

  const ul = document.createElement("ul");
  ul.className = "dropdown-menu";

  children.forEach((child) => {
    const li = document.createElement("li");

    if (child.children && child.children.length > 0) {
      li.className = "dropdown-submenu";
      li.innerHTML = `
  <a class="dropdown-item dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" onclick="event.stopPropagation();">
    ${child.name}
  </a>
  ${generateMenuItems(child.children)}
`;
    } else {
      li.innerHTML = `
        <a class="dropdown-item" href="${child.link}">
          <i class="bi bi-arrow-right-short"></i>${child.name}
        </a>
      `;
    }

    ul.appendChild(li);
  });

  return ul.outerHTML;
}


// function generateNavMenu() {
//   const navbarNav = document.getElementById("navbarNav");
//   const ul = document.createElement("ul");
//   ul.className = "navbar-nav me-auto";

//   menu.forEach((item) => {
//     const li = document.createElement("li");
//     li.className = "nav-item dropdown";

//     li.innerHTML = `
//             <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
//                 <i class="bi ${item.icon} me-1"></i>${item.name}
//             </a>
//             <ul class="dropdown-menu">
//                 ${item.children
//                   .map(
//                     (child) => `
//                     <li>
//                         <a class="dropdown-item" href="${child.link}">
//                             <i class="bi bi-arrow-right-short"></i>${child.name}
//                         </a>
//                     </li>
//                 `
//                   )
//                   .join("")}
//             </ul>
//         `;

//     ul.appendChild(li);
//   });

//   const testli = document.createElement("li");
//   testli.className = "nav-item ";
//   testli.innerHTML = ` 
//                         <a class="nav-link" href="${BASE_PATH}/test.html">
//                             <i class="bi bi-arrow-right-short"></i>Test Snipets
//                         </a>
//                     `;
//   ul.appendChild(testli);
//   // Insert the menu before the theme toggle button
//   const themeToggle = document.getElementById("themeToggle");
//   navbarNav.insertBefore(ul, themeToggle);
// }

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
                    <div class="card-body">
                        <div class="topic-icon">
                            <img class="logo" src="${topic.image}" />
                        </div>
                        <h3 class="card-title">${topic.name}</h3>
                        <div class="row">
                          ${topic.children.map((childTopic,index)=>
                            `<div class="col-6 ${index %2== 0?'text-left':'text-end'}" >
                              <a href="${childTopic.link}">
                                        <i class="bi bi-arrow-right-short"></i>
                                        ${childTopic.name}
                                    </a>
                            </div>
                            `).join("")}
                          
                        
                        </div>
                        
                    </div>
                </div>
            `;

      topicCards.appendChild(col);
    });
  }
}

// function initializeTheme() {
//   const themeToggle = document.getElementById("themeToggle");
//   const themeIcon = themeToggle.querySelector("i");

//   // Check for saved theme preference or default to light
//   const savedTheme = localStorage.getItem("theme") || "light";
//   document.body.classList.toggle("dark-theme", savedTheme === "dark");
//   updateThemeIcon(themeIcon, savedTheme);

//   // Theme toggle click handler
//   themeToggle.addEventListener("click", () => {
//     const isDark = document.body.classList.toggle("dark-theme");
//     const theme = isDark ? "dark" : "light";
//     localStorage.setItem("theme", theme);
//     updateThemeIcon(themeIcon, theme);
//   });
// }

function initializeTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle.querySelector("i");

  // Get saved theme or default to light
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.classList.toggle("dark-theme", savedTheme === "dark");
  updateThemeIcon(themeIcon, savedTheme);
  sendThemeToIframe(savedTheme); // Send theme to iframe on load

  // Handle toggle
  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");
    const theme = isDark ? "dark" : "light";
    localStorage.setItem("theme", theme);
    updateThemeIcon(themeIcon, theme);
    sendThemeToIframe(theme); // Send theme update
  });
}

// Function to send message to iframe
function sendThemeToIframe(theme) {
  const iframe = document.getElementById("contentFrame");
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage({ type: "THEME_CHANGE", theme }, "*");
  }
}

function updateThemeIcon(icon, theme) {
  icon.className = theme === "dark" ? "bi bi-moon-fill" : "bi bi-sun-fill";
}
