// Configuration
const githubUsername = 'vedpatil1345'; // Replace with your GitHub username

// Smooth scrolling for navigation
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Navigation functions
function goHome() { scrollToSection('home'); }
function goAbout() { scrollToSection('about'); }
function goSkills() { scrollToSection('skills'); }
function goExperience() { scrollToSection('experience'); }
function goProjects() { scrollToSection('projects'); }
function goGithub() { scrollToSection('github'); }
function goContact() { scrollToSection('contact'); }

// Typed.js initialization
function initializeTyped() {
    if (typeof Typed !== 'undefined') {
        new Typed('.home-intro', {
            strings: ['Python Developer', 'Web Developer'],
            typeSpeed: 50,
            backSpeed: 50,
            loop: true
        });
    } else {
        console.error('Typed.js is not loaded');
    }
}

// Fetch GitHub profile data
function fetchGitHubProfile() {
    fetch(`https://api.github.com/users/${githubUsername}`)
        .then(response => response.json())
        .then(data => {
            const profile = document.getElementById('profile');
            if (profile) {
                profile.innerHTML = `
                    <div class="profile-header">
                        <img src="${data.avatar_url}" alt="Profile" class="avatar">
                        <div class="profile-info">
                            <h2 class="name">${data.name || data.login}</h2>
                            <p class="username">@${data.login}</p>
                            <p class="bio">${data.bio || 'No bio available.'}</p>
                            <div class="stats">
                                <div class="stat">
                                    <span class="stat-label">Followers:</span>
                                    <span class="stat-count">${data.followers}</span>
                                </div>
                                <div class="stat">
                                    <span class="stat-label">Following:</span>
                                    <span class="stat-count">${data.following}</span>
                                </div>
                                <div class="stat">
                                    <span class="stat-label">Repositories:</span>
                                    <span class="stat-count">${data.public_repos}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        })
        .catch(error => console.error('Error fetching GitHub profile:', error));
}

// Fetch GitHub repositories
function fetchGitHubRepos() {
    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=5`)
        .then(response => response.json())
        .then(repos => {
            const repositories = document.getElementById('repositories');
            if (repositories) {
                repositories.innerHTML = repos.map(repo => `
                    <div class="repo">
                        <h3 class="repo-name">${repo.name}</h3>
                        <p class="repo-description">${repo.description || 'No description available.'}</p>
                        <p class="repo-language">Primary Language: ${repo.language || 'Not specified'}</p>
                        <a href="${repo.html_url}" target="_blank" class="repo-link">View on GitHub</a>
                    </div>
                `).join('');
            }
        })
        .catch(error => console.error('Error fetching GitHub repositories:', error));
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    const formStatus = document.getElementById('form-status');
    formStatus.textContent = 'Sending...';
    
    // Initialize EmailJS
    (function(){
        emailjs.init("k4AgOiH_khBqSvIJL");
    })();
    
    // Send email using EmailJS
    emailjs.send("service_cgm8gjb", "template_pupr2dy", {
        from_name: name,
        from_email: email,
        message: message
    }).then(function(response) {
        console.log('Email sent successfully:', response);
        document.getElementById('contact-form').reset();
        formStatus.textContent = 'Message sent successfully!';
        setTimeout(() => {
            formStatus.textContent = '';
        }, 3000);
    }, function(error) {
        console.log('Failed to send email:', error);
        formStatus.textContent = 'Failed to send message. Please try again.';
    });
}

// Main initialization function
function initializePortfolio() {
    initializeTyped();
    fetchGitHubProfile();
    fetchGitHubRepos();
    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePortfolio);

// Theme toggle functionality
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

function toggleTheme() {
    htmlElement.classList.toggle('dark');
    localStorage.setItem('theme', htmlElement.classList.contains('dark') ? 'dark' : 'light');
    updateThemeToggleButton();
}

function updateThemeToggleButton() {
    const moonIcon = themeToggleBtn.querySelector('.fa-moon');
    const sunIcon = themeToggleBtn.querySelector('.fa-sun');
    if (htmlElement.classList.contains('dark')) {
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    } else {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
}

themeToggleBtn.addEventListener('click', toggleTheme);

// Check for saved theme preference or prefer-color-scheme
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    htmlElement.classList.add('dark');
}

updateThemeToggleButton();

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});