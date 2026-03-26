// Mobile Navigation Toggle

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Sticky Navigation on Scroll

const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 100) {
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});


// Smooth Scroll with Offset

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navHeight = nav.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});


// Intersection Observer for Animations

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger skill bar animations
            if (entry.target.classList.contains('skill-item')) {
                const progressBar = entry.target.querySelector('.skill-progress');
                const progress = progressBar.dataset.progress;
                setTimeout(() => {
                    progressBar.style.width = progress + '%';
                }, 200);
            }
        }
    });
}, observerOptions);

// Observe sections and elements
const sections = document.querySelectorAll('section');
const projectCards = document.querySelectorAll('.project-card');
const skillItems = document.querySelectorAll('.skill-item');

sections.forEach(section => observer.observe(section));
projectCards.forEach(card => observer.observe(card));
skillItems.forEach(item => observer.observe(item));


// Skills Progress Animation

const skillsSection = document.querySelector('.skills');
let skillsAnimated = false;

const animateSkills = () => {
    const skillsPosition = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight;
    
    if (skillsPosition < screenPosition && !skillsAnimated) {
        const progressBars = document.querySelectorAll('.skill-progress');
        progressBars.forEach(bar => {
            const progress = bar.dataset.progress;
            setTimeout(() => {
                bar.style.width = progress + '%';
            }, 100);
        });
        skillsAnimated = true;
    }
};

window.addEventListener('scroll', animateSkills);


// Contact Form Handling

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Here you would typically send the data to a server
    // For now, we'll just show a success message
    console.log('Form submitted:', formData);
    
    // Show success feedback
    showFormFeedback('Thank you! Your message has been sent successfully.', 'success');
    
    // Reset form
    contactForm.reset();
});

// Form validation feedback
const formInputs = contactForm.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '' && input.hasAttribute('required')) {
            input.style.borderColor = '#d4574b';
        } else {
            input.style.borderColor = 'rgba(212, 165, 116, 0.2)';
        }
    });
    
    input.addEventListener('focus', () => {
        input.style.borderColor = 'var(--color-accent)';
    });
});

function showFormFeedback(message, type) {
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? 'var(--color-accent)' : '#d4574b'};
        color: var(--color-dark);
        border-radius: var(--border-radius);
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(feedback);
    
    // Remove after 3 seconds
    setTimeout(() => {
        feedback.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            feedback.remove();
        }, 300);
    }, 3000);
}

// Add animations for feedback
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);


// Active Nav Link on Scroll

const navLinksArray = Array.from(navLinks);
const sectionsArray = Array.from(sections);

window.addEventListener('scroll', () => {
    let current = '';
    
    sectionsArray.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - nav.offsetHeight - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});


// Parallax Effect for Hero

const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 700);
    }
});


// Smooth Page Load Animation

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});


// Keyboard Navigation Enhancement

document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});


// Project Card Tilt Effect (Optional Enhancement)

const cards = document.querySelectorAll('.project-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});


// Email Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

const emailInput = document.getElementById('email');
emailInput.addEventListener('blur', () => {
    if (!validateEmail(emailInput.value) && emailInput.value !== '') {
        emailInput.style.borderColor = '#d4574b';
        showFormFeedback('Please enter a valid email address', 'error');
    }
});


// ================================
// Magical Micro-interactions
// ================================

// Only on non-touch devices
if (window.matchMedia('(pointer: fine)').matches) {

    // Background orbs
    ['bg-orb-1', 'bg-orb-2'].forEach(cls => {
        const orb = document.createElement('div');
        orb.classList.add('bg-orb', cls);
        document.body.prepend(orb);
    });

    // Cursor glow
    const cursorGlow = document.createElement('div');
    cursorGlow.classList.add('cursor-glow');
    document.body.appendChild(cursorGlow);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        throttledParticle(e.clientX, e.clientY);
    });

    (function animateCursorGlow() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top  = glowY + 'px';
        requestAnimationFrame(animateCursorGlow);
    })();

    // Particle trail
    let lastParticleTime = 0;

    function spawnParticle(x, y) {
        const p = document.createElement('div');
        p.classList.add('cursor-particle');
        p.style.left = x + 'px';
        p.style.top  = y + 'px';
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 700);
    }

    function throttledParticle(x, y) {
        const now = Date.now();
        if (now - lastParticleTime > 60) {
            spawnParticle(x, y);
            lastParticleTime = now;
        }
    }
}


// Console Easter Egg

console.log('%cHello, curious developer! 👋', 'color: #d4a574; font-size: 20px; font-weight: bold;');
console.log('%cLike what you see? Let\'s work together!', 'color: #f5f1e8; font-size: 14px;');
console.log('%cEmail: shaked.tzar@gmail.com', 'color: #d4a574; font-size: 12px;');
