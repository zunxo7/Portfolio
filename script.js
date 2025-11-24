// ============================================
// Typing Effect for Hero Title
// ============================================

const typingTexts = [
    'Modern UI',
    'Web Design',
    'Fast Sites',
    'Clean Code',
    'Responsive',
    'UI Design',
    'Landing Page'
];

let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;
    
    const currentText = typingTexts[currentTextIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typingSpeed = 50;
    } else {
        typingElement.textContent = currentText.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && currentCharIndex === currentText.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Initialize typing effect when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
});

// ============================================
// Dark Mode Toggle
// ============================================

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Update theme icon
function updateThemeIcon(theme) {
    const themeIcon = themeToggle.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

updateThemeIcon(currentTheme);

// Toggle theme
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// ============================================
// Navbar Scroll Effect
// ============================================

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// Scroll Fade-In Animations
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
});

// ============================================
// Smooth Scroll for Anchor Links
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#hero') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Circle Arrow Button Handler
// ============================================

const circleArrow = document.querySelector('.circle-arrow');
if (circleArrow) {
    circleArrow.addEventListener('click', () => {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = projectsSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// ============================================
// Image Lazy Loading Fallback
// ============================================

// Handle broken images by showing placeholder
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Create a colored placeholder if image fails to load
            this.style.background = 'linear-gradient(135deg, #ff6b35 0%, #ff8c5a 100%)';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.color = 'white';
            this.style.fontSize = '2rem';
            this.alt = 'Project Image';
            
            // Create a simple placeholder div
            const placeholder = document.createElement('div');
            placeholder.style.width = '100%';
            placeholder.style.height = '100%';
            placeholder.style.background = 'linear-gradient(135deg, var(--accent-orange) 0%, var(--accent-orange-light) 100%)';
            placeholder.style.display = 'flex';
            placeholder.style.alignItems = 'center';
            placeholder.style.justifyContent = 'center';
            placeholder.style.color = 'white';
            placeholder.style.fontSize = '3rem';
            placeholder.textContent = '🎨';
            
            this.parentNode.replaceChild(placeholder, this);
        });
    });
});

// ============================================
// Mobile Menu (Future Enhancement)
// ============================================

// For now, nav links are hidden on mobile as per design
// Can be enhanced with a hamburger menu if needed

// ============================================
// Performance: Debounce scroll events
// ============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler
const debouncedScrollHandler = debounce(() => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// ============================================
// Logo Underline Alignment
// ============================================

function adjustLogoUnderline() {
    const digitalText = document.getElementById('digital-text');
    const logoLine = document.querySelector('.logo-img line');
    
    if (digitalText && logoLine) {
        // Get the text bounding box
        const textBBox = digitalText.getBBox();
        const textStartX = parseFloat(digitalText.getAttribute('x')) || 64;
        const textWidth = textBBox.width;
        
        // Set line to match text width
        logoLine.setAttribute('x1', textStartX);
        logoLine.setAttribute('x2', textStartX + textWidth);
    }
}

// Adjust on load and resize
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(adjustLogoUnderline, 100);
});

window.addEventListener('resize', adjustLogoUnderline);


