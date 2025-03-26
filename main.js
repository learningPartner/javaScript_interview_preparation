 
// Define an array of background colors
const colors = ["#FDF7E4", "#FAEED1", "#D8EBF1", "#E3F4F4", "#F7EBEC", "#F6FDC3", "#FFF8E3", "#EAE0DA","#F8EDE3", "#EADBC8", "#F5EEE6", "#DFCCFB", "#E3F2FD"];

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
            { name: "Async", link: "js-async.html" }
        ]
    },
    {
        name: "Angular",
        children: [
            { name: "Components", link: "angular-components.html" },
            { name: "Services", link: "angular-services.html" }
        ]
    },
    {
        name: "React",
        children: [
            { name: "Hooks", link: "react-hooks.html" },
            { name: "State Management", link: "react-state.html" }
        ]
    },
    {
        name: "Dot Net",
        children: [
            { name: "Web API", link: "dotnet-api.html" },
            { name: "Entity Framework", link: "dotnet-ef.html" }
        ]
    }
];

 
function generateNavbar() {
    debugger;
    const navbarHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark position-static">
        <div class="container-fluid">
        
            <a class="navbar-brand" href="./index.html">
                <i class="bi bi-code-square"></i> TechPrep Pro
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav" id="menuContainer">
                    ${menu.map(category => `
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="${category.name}Dropdown" role="button" data-bs-toggle="dropdown">
                                ${category.name}
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="${category.name}Dropdown">
                                ${category.children.map(item => `
                                    <li><a class="dropdown-item" href="${item.link}">${item.name}</a></li>
                                `).join('')}
                            </ul>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    </nav>`;

    // Insert navbar at the beginning of the body
    document.body.insertAdjacentHTML("afterbegin", navbarHTML);
}

// Ensure script runs after DOM is loaded
document.addEventListener("DOMContentLoaded", generateNavbar);
// Initialize AOS
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // Generate navigation menu
   // generateNavMenu();
   //generateNavbar();
    // Generate topic cards
    generateTopicCards();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});
 
function generateNavMenu() {
    const navbarNav = document.getElementById('navbarNav');
    const ul = document.createElement('ul');
    ul.className = 'navbar-nav ms-auto';

    menu.forEach(item => {
        const li = document.createElement('li');
        li.className = 'nav-item dropdown';
        
        li.innerHTML = `
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <i class="bi ${item.icon} me-1"></i>${item.name}
            </a>
            <ul class="dropdown-menu">
                ${item.children.map(child => `
                    <li>
                        <a class="dropdown-item" href="${child.link}">
                            <i class="bi bi-arrow-right-short"></i>${child.name}
                        </a>
                    </li>
                `).join('')}
            </ul>
        `;
        
        ul.appendChild(li);
    });

    navbarNav.appendChild(ul);
}

function generateTopicCards() {
    const topicCards = document.getElementById('topic-cards');
    
    menu.forEach((topic, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-6';
        col.setAttribute('data-aos', 'fade-up');
        col.setAttribute('data-aos-delay', (index * 100).toString());
        
        col.innerHTML = `
            <div class="card topic-card h-100">
                <div class="card-body text-center">
                    <div class="topic-icon">
                        <i class="bi ${topic.icon}"></i>
                    </div>
                    <h3 class="card-title">${topic.name}</h3>
                    <ul class="subtopic-list">
                        ${topic.children.map(child => `
                            <li>
                                <a href="${child.link}">
                                    <i class="bi bi-arrow-right-short"></i>
                                    ${child.name}
                                </a>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        topicCards.appendChild(col);
    });
}