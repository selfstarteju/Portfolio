
// DOM Elements
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const nav = document.getElementById('nav');
const scrollBtn = document.getElementById('scrollBtn');
const navLinks = document.querySelectorAll('.nav-link');

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
let mobileMenuOpen = false;

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuOpen = !mobileMenuOpen;
    
    if (mobileMenuOpen) {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.background = 'rgba(15, 23, 42, 0.98)';
        nav.style.padding = '1rem';
        nav.style.borderTop = '1px solid rgba(51, 65, 85, 0.3)';
        nav.style.animation = 'slideDown 0.3s ease-out';
    } else {
        nav.style.display = 'none';
    }
    
    // Animate hamburger menu
    const spans = mobileMenuBtn.querySelectorAll('span');
    if (mobileMenuOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu if open
        if (mobileMenuOpen) {
            mobileMenuOpen = false;
            nav.style.display = 'none';
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });
});

// Scroll to about section when clicking the scroll button
scrollBtn.addEventListener('click', () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        const headerHeight = header.offsetHeight;
        const targetPosition = aboutSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const headerHeight = header.offsetHeight;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Animate skill bars when they come into view
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !bar.classList.contains('animated')) {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
            bar.classList.add('animated');
        }
    });
}

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.about-card, .skills-card, .education-card, .experience-card, .contact-card, .competency-item');
    
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible && !element.classList.contains('animate-on-scroll')) {
            element.classList.add('animate-on-scroll');
            setTimeout(() => {
                element.classList.add('animated');
            }, 100);
        }
    });
}

// Staggered animation for experience cards
function animateExperienceCards() {
    const experienceCards = document.querySelectorAll('.experience-card');
    
    experienceCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible && !card.classList.contains('animated')) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.classList.add('animated');
            }, index * 200);
        }
    });
}

// Initialize experience cards with hidden state
document.addEventListener('DOMContentLoaded', () => {
    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(2rem)';
        card.style.transition = 'all 0.8s ease-out';
    });
});

// Scroll event listeners
window.addEventListener('scroll', () => {
    animateSkillBars();
    animateOnScroll();
    animateExperienceCards();
});

// Initial check on page load
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavLink();
    animateSkillBars();
    animateOnScroll();
    animateExperienceCards();
});

// Add CSS animation for mobile menu
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-link.active {
        color: #ffffff !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    @media (max-width: 768px) {
        .nav {
            display: none !important;
        }
        
        .nav.mobile-open {
            display: flex !important;
        }
    }
    
    /* Smooth transitions for all interactive elements */
    * {
        transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
    }
    
    /* Ensure proper stacking for mobile menu */
    .header {
        position: relative;
    }
    
    .header .container {
        position: relative;
    }
    
    /* Loading animation for page */
    body {
        opacity: 0;
        animation: fadeInPage 0.5s ease-out forwards;
    }
    
    @keyframes fadeInPage {
        to {
            opacity: 1;
        }
    }
`;

document.head.appendChild(style);

// Intersection Observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Animate skill bars
            if (element.classList.contains('skills-card')) {
                const skillBars = element.querySelectorAll('.skill-progress');
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width + '%';
                    }, index * 100);
                });
            }
            
            // Add animation classes
            element.classList.add('animate-on-scroll', 'animated');
            
            // Stop observing once animated
            observer.unobserve(element);
        }
    });
}, observerOptions);

// Observe all animatable elements
document.addEventListener('DOMContentLoaded', () => {
    const animatableElements = document.querySelectorAll('.about-card, .skills-card, .education-card, .experience-card, .competency-item');
    animatableElements.forEach(element => {
        observer.observe(element);
    });
});

// Parallax effect for hero background elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.bg-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect
// document.addEventListener('DOMContentLoaded', () => {
//     const heroTitle = document.querySelector('.hero-title .gradient-text');
//     if (heroTitle) {
//         const originalText = heroTitle.textContent;
//         typeWriter(heroTitle, originalText, 100);
//     }
// });
