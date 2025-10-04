// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functionality
    initScrollAnimations();
    initMobileMenu();
    initSmoothScrolling();
    initButtonInteractions();
    initHeaderScroll();
});

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.hero-left, .hero-right, .service-card, .about-right');
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        if (index % 2 === 0) {
            el.classList.add('slide-in-left');
        } else {
            el.classList.add('slide-in-right');
        }
        observer.observe(el);
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });

        // Close menu when clicking on links
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Button Interactions
function initButtonInteractions() {
    // Connect Me / Contact Me buttons
    const connectButtons = document.querySelectorAll('.btn-primary');
    connectButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Add ripple effect
            createRippleEffect(this);

            // Simulate contact action
            setTimeout(() => {
                alert('연락처 정보가 복사되었습니다!\n이메일: markus@olefolio.com\n전화: +1 (555) 123-4567');
            }, 200);
        });
    });

    // Download CV buttons
    const downloadButtons = document.querySelectorAll('.btn-secondary');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Add ripple effect
            createRippleEffect(this);

            // Simulate download action
            setTimeout(() => {
                alert('CV 다운로드가 시작됩니다...\n(실제 구현에서는 PDF 파일을 다운로드합니다)');
            }, 200);
        });
    });
}

// Ripple Effect for Buttons
function createRippleEffect(button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }

        lastScrollTop = scrollTop;
    });
}

// Service Cards Hover Effect
document.addEventListener('DOMContentLoaded', function () {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Parallax Effect for Decorative Elements
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.decorative-dots, .decorative-circles, .decorative-triangle');

    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-links.active {
        display: flex;
        position: fixed;
        top: 80px;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 20px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        z-index: 999;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-links {
            display: none;
        }
        
        .nav-links.active {
            display: flex;
        }
    }
`;
document.head.appendChild(style);

// Loading Animation
window.addEventListener('load', function () {
    document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);
