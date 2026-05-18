// Crear partículas flotantes decorativas
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(0, 180, 255, ${Math.random() * 0.5 + 0.3});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
            z-index: 0;
            box-shadow: 0 0 ${Math.random() * 10 + 5}px rgba(0, 180, 255, 0.5);
        `;
        
        particlesContainer.appendChild(particle);
        animateParticle(particle);
    }
}

function animateParticle(particle) {
    const duration = Math.random() * 15 + 10;
    const startX = parseFloat(particle.style.left);
    const startY = parseFloat(particle.style.top);
    const endX = Math.random() * 100;
    const endY = Math.random() * 100;
    const startTime = Date.now();
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = (elapsed % (duration * 1000)) / (duration * 1000);
        
        const currentX = startX + (endX - startX) * progress;
        const currentY = startY + (endY - startY) * progress;
        
        particle.style.left = currentX + '%';
        particle.style.top = currentY + '%';
        particle.style.opacity = Math.sin(progress * Math.PI);
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Efecto hover en elementos
function setupHoverEffects() {
    const sections = document.querySelectorAll('.section');
    const tags = document.querySelectorAll('.tech-tag');
    const educationItems = document.querySelectorAll('.education-item');
    
    [...sections, ...tags, ...educationItems].forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
}

// Animar números en las barras de idiomas
function animateLanguageBars() {
    const bars = document.querySelectorAll('.language-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    bars.forEach(bar => observer.observe(bar));
}

// Efecto de brillo en hover para la foto
function setupPhotoGlow() {
    const photoPlaceholder = document.querySelector('.photo-placeholder');
    
    if (photoPlaceholder) {
        photoPlaceholder.addEventListener('mousemove', (e) => {
            const rect = photoPlaceholder.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            photoPlaceholder.style.boxShadow = `
                0 0 40px rgba(0, 212, 255, 0.5),
                inset 0 0 30px rgba(0, 180, 255, 0.2),
                ${x * 0.1 - 10}px ${y * 0.1 - 10}px 20px rgba(0, 180, 255, 0.3)
            `;
        });
        
        photoPlaceholder.addEventListener('mouseleave', () => {
            photoPlaceholder.style.boxShadow = '0 0 30px rgba(0, 180, 255, 0.3), inset 0 0 20px rgba(0, 180, 255, 0.1)';
        });
    }
}

// Inicializar todo
window.addEventListener('load', () => {
    createParticles();
    setupHoverEffects();
    animateLanguageBars();
    setupPhotoGlow();
});

// Agregar clase activa al hacer scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        
        if (window.pageYOffset >= top - 100 && window.pageYOffset < top + height) {
            section.style.opacity = '1';
        }
    });
});
