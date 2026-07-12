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
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');
const charCounter = document.getElementById('charCounter');
const messageInput = document.getElementById('message');

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mykrgaoe';
const SUBMIT_TIMEOUT_MS = 12000;

const FIELD_LIMITS = {
    name: { max: 50 },
    email: { max: 100 },
    message: { min: 10, max: 1000 }
};

function validateEmailFormat(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Returns an error message for a field, or '' if it's valid
function getFieldError(name, rawValue) {
    const value = rawValue.trim();

    if (name === 'name') {
        if (!value) return 'Please enter your name.';
        if (value.length > FIELD_LIMITS.name.max) return 'Name must be 50 characters or fewer.';
    }

    if (name === 'email') {
        if (!value) return 'Please enter your email address.';
        if (value.length > FIELD_LIMITS.email.max) return 'Email must be 100 characters or fewer.';
        if (!validateEmailFormat(value)) return 'Please enter a valid email address.';
    }

    if (name === 'message') {
        if (!value) return 'Please enter a message.';
        if (value.length < FIELD_LIMITS.message.min) return `Message should be at least ${FIELD_LIMITS.message.min} characters.`;
        if (value.length > FIELD_LIMITS.message.max) return `Message must be ${FIELD_LIMITS.message.max} characters or fewer.`;
    }

    return '';
}

function setFieldBorder(input, hasError) {
    input.style.borderColor = hasError ? '#d4574b' : 'rgba(212, 165, 116, 0.2)';
}

function resetFieldBorders() {
    ['name', 'email', 'message'].forEach((name) => {
        document.getElementById(name).style.borderColor = 'rgba(212, 165, 116, 0.2)';
    });
}

// Inline feedback as the user leaves each field
['name', 'email', 'message'].forEach((name) => {
    const input = document.getElementById(name);
    input.addEventListener('blur', () => {
        setFieldBorder(input, Boolean(getFieldError(name, input.value)));
    });
    input.addEventListener('focus', () => {
        input.style.borderColor = 'var(--color-accent)';
    });
});

// Live character counter for the message field
messageInput.addEventListener('input', () => {
    const length = messageInput.value.length;
    charCounter.textContent = `${length} / ${FIELD_LIMITS.message.max}`;
    charCounter.classList.toggle('limit-close', length > FIELD_LIMITS.message.max * 0.9);
});

let statusFadeTimeout = null;

function setFormStatus(message, type) {
    clearTimeout(statusFadeTimeout);
    formStatus.textContent = message;
    formStatus.className = type ? `form-status ${type}` : 'form-status';

    if (type === 'success') {
        statusFadeTimeout = setTimeout(() => {
            formStatus.classList.add('fade-out');
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 400);
        }, 5000);
    }
}

let isSubmitting = false;

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Honeypot: bots tend to fill every field, real users never see this one
    if (document.getElementById('_gotcha').value) return;

    const fields = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    for (const name of ['name', 'email', 'message']) {
        const input = document.getElementById(name);
        const error = getFieldError(name, fields[name]);
        setFieldBorder(input, Boolean(error));
        if (error) {
            setFormStatus(error, 'error');
            input.focus();
            return;
        }
    }

    isSubmitting = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    setFormStatus('', '');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

    try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: new FormData(contactForm),
            signal: controller.signal
        });

        if (!response.ok) {
            throw new Error(`Formspree responded with status ${response.status}`);
        }

        console.info('Contact form submitted successfully.');
        setFormStatus("Thanks! Your message has been sent successfully. I'll get back to you as soon as possible.", 'success');
        contactForm.reset();
        charCounter.textContent = `0 / ${FIELD_LIMITS.message.max}`;
        resetFieldBorders();
    } catch (error) {
        if (error.name === 'AbortError') {
            console.error('Contact form submission timed out.');
            setFormStatus('This is taking longer than expected. Please check your connection and try again.', 'error');
        } else {
            console.error('Contact form submission failed:', error);
            setFormStatus('Sorry, something went wrong while sending your message. Please try again, or email me directly at shaked.tzar@gmail.com.', 'error');
        }
    } finally {
        clearTimeout(timeoutId);
        isSubmitting = false;
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
});


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
