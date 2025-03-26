 
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
    const navbarHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Tech Topics</a>
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
