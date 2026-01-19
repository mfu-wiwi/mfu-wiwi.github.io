// Yoon's Portfolio - Interactive JavaScript

// Lightbox Variables
let currentImageIndex = 0;
let galleryImages = [];

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initBackToTop();
    initNavHighlight();
    initContactForm();
    initParallaxEffects();
    initCursorEffects();
    initLightbox();
    initFloatingBubbles();
});

// Initialize Lightbox with all gallery images
function initLightbox() {
    galleryImages = [
        { src: 'images/christmas2.jpg', caption: '🎄 Christmas Performance - Wells International School' },
        { src: 'images/christmas1.jpg', caption: '🎄 Christmas Joy with Students' },
        { src: 'images/christmas-heart.jpg', caption: '💕 Spreading Love and Joy' },
        { src: 'images/teaching1.jpg', caption: '✏️ Teaching Time - Engaging Young Minds' },
        { src: 'images/classroom.jpg', caption: '👩‍🏫 Teacher Yoon in Action' },
        { src: 'images/students1.jpg', caption: '🌟 Happy Students Learning Together' },
        { src: 'images/nelc-class.jpg', caption: '🏆 Certificate Day at NELC - Proud of my students!' },
        { src: 'images/teaching2.jpg', caption: '📚 Classroom Fun and Learning' },
        { src: 'images/thingyan.jpg', caption: '🎊 Thingyan Festival - Traditional celebration' },
        { src: 'images/parent-meeting.jpg', caption: '👨‍👩‍👧 Parent Conferences - Building strong connections' }
    ];

    // Close lightbox on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            changeLightboxImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeLightboxImage(1);
        }
    });

    // Close on overlay click
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
}

// Open Lightbox with specific image
function openLightbox(imgSrc, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    if (lightbox && lightboxImg) {
        // Find image index
        currentImageIndex = galleryImages.findIndex(img => img.src === imgSrc);
        if (currentImageIndex === -1) currentImageIndex = 0;
        
        lightboxImg.src = imgSrc;
        lightboxCaption.textContent = caption || '';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        lightboxImg.style.animation = 'bounceIn 0.5s ease-out';
    }
}

// Close Lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    if (lightbox) {
        lightboxImg.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }, 200);
    }
}

// Change Lightbox Image (prev/next)
function changeLightboxImage(direction) {
    if (galleryImages.length === 0) return;
    
    currentImageIndex += direction;
    
    // Loop around
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }
    
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    // Add slide animation
    lightboxImg.style.animation = direction > 0 ? 'slideInRight 0.3s ease-out' : 'slideInLeft 0.3s ease-out';
    
    lightboxImg.src = galleryImages[currentImageIndex].src;
    lightboxCaption.textContent = galleryImages[currentImageIndex].caption;
}

// Fun Floating Bubbles for kid-friendly feel
function initFloatingBubbles() {
    const bubbleContainer = document.createElement('div');
    bubbleContainer.className = 'bubble-container';
    bubbleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    document.body.appendChild(bubbleContainer);

    function createBubble() {
        const bubble = document.createElement('div');
        const size = Math.random() * 30 + 10;
        const emojis = ['🌟', '✨', '💖', '🎈', '🌸', '🎀', '⭐', '🦋', '🌈', '🎵'];
        
        bubble.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        bubble.style.cssText = `
            position: absolute;
            font-size: ${size}px;
            left: ${Math.random() * 100}%;
            bottom: -50px;
            opacity: 0.3;
            animation: bubbleFloat ${Math.random() * 10 + 10}s linear forwards;
        `;
        
        bubbleContainer.appendChild(bubble);
        
        setTimeout(() => bubble.remove(), 20000);
    }

    // Create bubbles periodically
    setInterval(createBubble, 3000);
    
    // Create a few initial bubbles
    for (let i = 0; i < 5; i++) {
        setTimeout(createBubble, i * 500);
    }
}

// Mobile Menu Toggle - Enhanced with Kid-Friendly Animations
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!menuBtn || !mobileMenu) return;

    // Toggle menu on button click
    menuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        const isOpen = mobileMenu.classList.contains('active');
        
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    function openMenu() {
        mobileMenu.classList.add('active');
        menuBtn.classList.add('active');
        // Prevent body scroll when menu is open
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileMenu.classList.remove('active');
        menuBtn.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close menu when clicking a link with smooth animation
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add click feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                closeMenu();
            }, 150);
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !menuBtn.contains(e.target)) {
            closeMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Close menu on window resize (tablet to desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });
}

// Smooth Scroll for anchor links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Reveal Animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.education-card, .skill-card, .gallery-item, section > div > div'
    );

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 150;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('animate-fadeInUp');
                element.style.opacity = '1';
            }
        });
    };

    // Set initial state
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    // Trigger on scroll
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Navigation Active State
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        const navHeight = document.querySelector('nav').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-primary');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-primary');
            }
        });
    });
}

// Contact Form Handler
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Show success message
            showNotification('Thank you for your message! 💕 I will get back to you soon!', 'success');
            
            // Reset form
            form.reset();
            
            // Optional: Send to email service or backend
            console.log('Form submitted:', data);
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-24 left-1/2 transform -translate-x-1/2 px-6 py-4 rounded-2xl shadow-xl z-50 animate-slideDown max-w-md mx-4`;
    
    // Set styles based on type
    if (type === 'success') {
        notification.classList.add('bg-gradient-to-r', 'from-accent', 'to-green-400', 'text-white');
    } else if (type === 'error') {
        notification.classList.add('bg-gradient-to-r', 'from-red-500', 'to-red-400', 'text-white');
    } else {
        notification.classList.add('bg-gradient-to-r', 'from-primary', 'to-pink-400', 'text-white');
    }
    
    notification.innerHTML = `
        <div class="flex items-center gap-3">
            <span class="text-2xl">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
            <p class="font-medium">${message}</p>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translate(-50%, -20px)';
        notification.style.transition = 'all 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.floating-shape');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.02);
            element.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

// Cursor Effects (for desktop)
function initCursorEffects() {
    if (window.matchMedia('(pointer: fine)').matches) {
        // Create custom cursor elements
        const cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        cursorDot.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: #FF6B9D;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            mix-blend-mode: difference;
        `;
        
        const cursorRing = document.createElement('div');
        cursorRing.className = 'cursor-ring';
        cursorRing.style.cssText = `
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid rgba(255, 107, 157, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transition: transform 0.15s ease, width 0.2s ease, height 0.2s ease;
        `;
        
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorRing);
        
        let mouseX = 0, mouseY = 0;
        let dotX = 0, dotY = 0;
        let ringX = 0, ringY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animateCursor() {
            // Smooth follow for dot
            dotX += (mouseX - dotX) * 0.2;
            dotY += (mouseY - dotY) * 0.2;
            cursorDot.style.left = `${dotX - 4}px`;
            cursorDot.style.top = `${dotY - 4}px`;
            
            // Smoother follow for ring
            ringX += (mouseX - ringX) * 0.1;
            ringY += (mouseY - ringY) * 0.1;
            cursorRing.style.left = `${ringX - 20}px`;
            cursorRing.style.top = `${ringY - 20}px`;
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Hover effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .hover-lift, .gallery-item');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorRing.style.width = '60px';
                cursorRing.style.height = '60px';
                cursorRing.style.borderColor = 'rgba(255, 107, 157, 0.8)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursorRing.style.width = '40px';
                cursorRing.style.height = '40px';
                cursorRing.style.borderColor = 'rgba(255, 107, 157, 0.5)';
            });
        });
    }
}

// Typing Animation for Hero (optional enhancement)
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

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    updateCounter();
}

// Image Lazy Loading with Blur Effect
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Easter Egg: Konami Code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        // Easter egg activated!
        createConfetti();
        showNotification('🎉 You found the secret! Teacher Yoon sends you virtual hugs! 🤗', 'success');
    }
});

// Confetti Effect
function createConfetti() {
    const colors = ['#FF6B9D', '#FFD93D', '#6BCB77', '#4D96FF', '#FF9F43'];
    const confettiCount = 150;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -20px;
            opacity: ${Math.random() + 0.5};
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            pointer-events: none;
            z-index: 9999;
            animation: fall ${Math.random() * 3 + 2}s linear forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
    
    // Add falling animation
    if (!document.getElementById('confetti-styles')) {
        const style = document.createElement('style');
        style.id = 'confetti-styles';
        style.textContent = `
            @keyframes fall {
                to {
                    transform: translateY(100vh) rotate(${Math.random() * 720}deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Preloader (optional)
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), 500);
    }
});

// Console Easter Egg
console.log('%c🌸 Welcome to Yoon\'s Portfolio! 🌸', 'font-size: 20px; color: #FF6B9D; font-weight: bold;');
console.log('%cBuilt with love and passion for teaching! 💕', 'font-size: 14px; color: #6BCB77;');
console.log('%cTry the Konami code for a surprise! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️🅱️🅰️', 'font-size: 12px; color: #FFD93D;');
