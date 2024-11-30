// Typing Animation Script
const texts = [ 
    "Thankyou!",
    "Scanning for authenticity...",
    "Face Shield will be with you shortly."
];
const typingSpeed = 40;
const deletingSpeed = 20;
// const typingSpeed = 2;
// const deletingSpeed = 1;

let index = 0;
let forward = true;

function typeWriter(text, callback) {
    const typewriter = document.getElementById('typewriter');
    const cursor = document.getElementById('cursor');
    document.body.classList.add('no-scroll');
    
    if (forward) {
        typewriter.innerHTML = text.slice(0, index);
        index++;
        if (index > text.length) {
            forward = false;
            setTimeout(() => typeWriter(text, callback), 200);
        } else {
            setTimeout(() => typeWriter(text, callback), typingSpeed);
        }
    } else {
        typewriter.innerHTML = text.slice(0, index);
        index--;
        if (index < 0) {
            forward = true;
            setTimeout(callback, 100);
        } else {
            setTimeout(() => typeWriter(text, callback), deletingSpeed);
        }
    }
}

function displayText1() {
    index = 0;
    forward = true;
    typeWriter(texts[0], displayText2);
}

function displayText2() {
    index = 0;
    forward = true;
    typeWriter(texts[1], displayText3);
}

function displayText3() {
    index = 0;
    forward = true;
    typeWriter(texts[2], moveTypewriterUp);
}

function moveTypewriterUp() {
    const typewriterContainer = document.getElementById('typewriter-container');
    const cursor = document.getElementById('cursor');
    typewriterContainer.classList.add('hidden');
    cursor.style.display = 'none';

    setTimeout(() => {
        typewriterContainer.style.display = 'none';
        window.location.href = "home.html";
        // showHomeScreen();
    }, 100);
}

function showHomeScreen() {
    const homeContent = document.getElementById('homeContent');
    homeContent.classList.add('visible');
    document.body.classList.remove('no-scroll');
}

window.onload = () => {
    setTimeout(displayText1, 100);
};

// window.onload = () => {
//     if (!sessionStorage.getItem('pageLoaded')) {
//         setTimeout(displayText1, 100);
//         sessionStorage.setItem('pageLoaded', 'true');
//     }else{
//         moveTypewriterUp();
//     }
// };

// window.onunload = () => {
//     sessionStorage.removeItem('pageLoaded');
// };

// Sidebar Toggle Script
document.getElementById("toggleButton").addEventListener("click", function () {
    this.classList.toggle("active");
    document.getElementById("sidebar").classList.toggle("collapsed");
    ['nav-a-1', 'nav-a-2', 'nav-a-3', 'nav-a-4', 'login-btn'].forEach(id => {
        const element = document.getElementById(id);
        element.classList.toggle("px-3");
        element.classList.toggle("px-1");
    });
});

function toggleSidebarClassBasedOnWidth() {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById("toggleButton");
    const smallScreen = window.innerWidth < 768;
    
    sidebar.classList.toggle('collapsed', smallScreen);
    toggle.classList.toggle('active', !smallScreen);

    ['nav-a-1', 'nav-a-2', 'nav-a-3', 'nav-a-4', 'login-btn'].forEach(id => {
        const element = document.getElementById(id);
        element.classList.toggle("px-3", !smallScreen);
        element.classList.toggle("px-1", smallScreen);
    });
}

toggleSidebarClassBasedOnWidth();
window.addEventListener('resize', toggleSidebarClassBasedOnWidth);

// Modal & Flip Card Script
var myModal = new bootstrap.Modal(document.getElementById('formModal'), {
    backdrop: 'static',
    keyboard: false
});

document.getElementById('flipToRegister').addEventListener('click', function (event) {
    event.preventDefault();
    document.querySelector('.flip-card').classList.add('flipped');
});

document.getElementById('flipToLogin').addEventListener('click', function (event) {
    event.preventDefault();
    document.querySelector('.flip-card').classList.remove('flipped');
});

// Login Form & Navigation Handling
document.addEventListener('DOMContentLoaded', function () {
    let js_static_authentication = false;

    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault();
        authenticateUser();
    });

    function authenticateUser() {
        const username = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        if (username === "admin@gmail.com" && password === "12345678") {
            js_static_authentication = true;
            toggleNavButtons(true);
            closeModal();
        } else {
            alert("Invalid username or password");
        }
    }

    function closeModal() {
        const closeButton = document.querySelector('.btn-close[data-bs-dismiss="modal"]');
        if (closeButton) closeButton.click();
    }

    function callModal() {
        const callButton = document.querySelector('#login-btn[data-bs-toggle="modal"]');
        if (callButton) callButton.click();
    }

    const logoutLink = document.getElementById('nav-a-2');
    logoutLink.addEventListener('click', function (event) {
        event.preventDefault();
        if (confirm('Are you sure you want to logout?')) {
            window.location.href = logoutLink.href;
        }
    });

    document.getElementById('upload-media').addEventListener('click', function (event) {
        event.preventDefault();
        const navMenuLogin = document.getElementById('nav-menus-login');
        if (window.getComputedStyle(navMenuLogin).display === 'block') {
            callModal();
        } else {
            console.log('logged in');
        }
    });

    function toggleNavButtons(show) {
        const navLink = document.getElementById('nav-menus');
        const navLinkLogin = document.getElementById('nav-menus-login');
        if (navLink && navLinkLogin) {
            navLink.style.display = show ? 'block' : 'none';
            navLinkLogin.style.display = show ? 'none' : 'block';
        } else {
            console.error('Navigation links not found.');
        }
    }
});

