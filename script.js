// DOM Elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Set current page indicator
const currentPage = window.location.pathname;
navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage || 
        link.getAttribute('href') === './' + currentPage.split('/').pop()) {
        link.setAttribute('aria-current', 'page');
    }
});

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Handle active link state
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// Handle scroll events for navbar styling
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// Animation for skill cards when they come into view
document.addEventListener('DOMContentLoaded', function() {
    // Animation for skill cards when they come into view
    const skillCards = document.querySelectorAll('.skill-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Add click effect to cards
    skillCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
});

// Animation for timeline items
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.1 });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'all 0.5s ease';
        observer.observe(item);
    });
});

// Project filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // Initialize Intersection Observer for project cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });
});

// Project likes and preview functionality
document.addEventListener('DOMContentLoaded', function() {
    // Like functionality
    const likeButtons = document.querySelectorAll('.like-btn');
    const likes = JSON.parse(localStorage.getItem('projectLikes') || '{}');

    // Initialize likes from localStorage
    likeButtons.forEach(button => {
        const projectId = button.getAttribute('data-project');
        const likeCount = button.nextElementSibling;
        
        // Set initial like count and button state
        likeCount.textContent = likes[projectId] || 0;
        if (localStorage.getItem(`liked_${projectId}`)) {
            button.classList.add('liked');
            button.querySelector('i').classList.remove('far');
            button.querySelector('i').classList.add('fas');
        }
    });

    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const likeCount = this.nextElementSibling;
            const isLiked = this.classList.contains('liked');

            if (!isLiked) {
                // Add like
                likes[projectId] = (likes[projectId] || 0) + 1;
                this.classList.add('liked');
                this.querySelector('i').classList.remove('far');
                this.querySelector('i').classList.add('fas');
                localStorage.setItem(`liked_${projectId}`, 'true');
            } else {
                // Remove like
                likes[projectId] = Math.max(0, (likes[projectId] || 0) - 1);
                this.classList.remove('liked');
                this.querySelector('i').classList.remove('fas');
                this.querySelector('i').classList.add('far');
                localStorage.removeItem(`liked_${projectId}`);
            }

            // Update like count
            likeCount.textContent = likes[projectId];
            localStorage.setItem('projectLikes', JSON.stringify(likes));

            // Add heart animation
            const heart = document.createElement('i');
            heart.classList.add('fas', 'fa-heart', 'heart-animation');
            button.appendChild(heart);
            setTimeout(() => heart.remove(), 1000);
        });
    });

    // Preview Modal functionality
    const modal = document.getElementById('previewModal');
    const previewButtons = document.querySelectorAll('.preview-btn');
    const closeModal = document.querySelector('.close-modal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTags = document.getElementById('modalTags');

    // Project data (you can modify this with your actual project data)
    const projectData = {
        project1: {
            title: 'Portfolio Website',
            description: 'A responsive portfolio website built with HTML, CSS, and JavaScript. Features modern design principles and smooth animations.',
            image: './assets/project1.jpg',
            tags: ['HTML', 'CSS', 'JavaScript']
        },
        project2: {
            title: 'Task Manager App',
            description: 'A mobile app for managing daily tasks and schedules. Built with React Native and Firebase for real-time updates.',
            image: './assets/project2.jpg',
            tags: ['React Native', 'Firebase']
        },
        project3: {
            title: 'Data Analysis Tool',
            description: 'Python-based data analysis and visualization tool. Processes large datasets and creates insightful visualizations.',
            image: './assets/project3.jpg',
            tags: ['Python', 'Pandas', 'Matplotlib']
        },
        project4: {
            title: 'E-commerce Platform',
            description: 'Full-stack e-commerce website with payment integration. Features user authentication and real-time inventory management.',
            image: './assets/project4.jpg',
            tags: ['React', 'Node.js', 'MongoDB']
        }
    };

    previewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-preview');
            const project = projectData[projectId];

            modalImage.src = project.image;
            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;
            modalTags.innerHTML = project.tags
                .map(tag => `<span class="tag">${tag}</span>`)
                .join('');

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});