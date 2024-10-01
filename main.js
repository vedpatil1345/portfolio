// Smooth scrolling for navigation
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
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
document.addEventListener('DOMContentLoaded', function() {
    var typed = new Typed('.home-intro', {
        strings: ['Python Developer','Web Developer'],
        typeSpeed: 50,
        backSpeed: 50,
        loop: true
    });
});

// GitHub profile data
const githubUsername = 'vedpatil1345'; // Replace with your GitHub username

// Fetch GitHub profile data
fetch(`https://api.github.com/users/${githubUsername}`)
    .then(response => response.json())
    .then(data => {
        const profile = document.getElementById('profile');
        profile.innerHTML = `
            <div class="profile-header">
                <img src="${data.avatar_url}" alt="Profile" class="avatar">
                <div class="profile-info">
                    <h2 class="name" onclick="openGitHubProfile()">${data.name}</h2>
                    <p class="username" onclick="openGitHubProfile()">${data.login}</p>
                    <p class="bio">${data.bio}</p>
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
    })
    .catch(error => console.error('Error:', error));

// Fetch GitHub repositories
fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=5`)
    .then(response => response.json())
    .then(repos => {
        const repositories = document.getElementById('repositories');
        repos.forEach(repo => {
            const repoElement = document.createElement('div');
            repoElement.className = 'repo';
            repoElement.innerHTML = `
                <h3 class="repo-name">${repo.name}</h3>
                <p class="repo-description">${repo.description || 'No description available.'}</p>
            `;
            repositories.appendChild(repoElement);
        });
    })
    .catch(error => console.error('Error:', error));

// Open GitHub profile in a new tab
function openGitHubProfile() {
    window.open(`https://github.com/${githubUsername}`, '_blank');
}



// ... (previous code remains the same) ...

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Show loading message
    document.getElementById('form-status').textContent = 'Sending...';
    (function(){
        emailjs.init({
          publicKey: "k4AgOiH_khBqSvIJL",
        });
     })();
    // Send email using EmailJS
    emailjs.send("service_cgm8gjb", "template_pupr2dy", {
        from_name: name,
        from_email: email,
        message: message
    }).then(function(response) {
        console.log('Email sent successfully:', response);
        // Clear the form
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
        // Show success message
        document.getElementById('form-status').textContent = 'Message sent successfully!';
        // Clear success message after 3 seconds
        setTimeout(() => {
            document.getElementById('form-status').textContent = '';
        }, 3000);
    }, function(error) {
        console.log('Failed to send email:', error);
        // Show error message
        document.getElementById('form-status').textContent = 'Failed to send message. Please try again.';
    });
});

// ... (rest of the code remains the same) ...