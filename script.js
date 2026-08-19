// Smooth page load animation
document.addEventListener('DOMContentLoaded', () => {
    const avatarImg = document.querySelector('.avatar');
    const avatarPlaceholder = document.querySelector('.avatar-placeholder');
    
    // Автоматическая загрузка image.jpg
    if (avatarImg && avatarImg.src) {
        avatarImg.onload = function() {
            if (avatarPlaceholder) {
                avatarPlaceholder.style.display = 'none';
            }
        };
        
        avatarImg.onerror = function() {
            console.error('Ошибка загрузки изображения');
            if (avatarPlaceholder) {
                avatarPlaceholder.style.display = 'block';
            }
        };
    }
    
    // Функция для загрузки другой аватарки
    window.loadAvatar = function(imageUrl) {
        avatarImg.src = imageUrl;
        avatarImg.style.display = 'block';
        avatarImg.onload = function() {
            if (avatarPlaceholder) {
                avatarPlaceholder.style.display = 'none';
            }
        };
        avatarImg.onerror = function() {
            console.error('Ошибка загрузки изображения');
            avatarImg.style.display = 'none';
            if (avatarPlaceholder) {
                avatarPlaceholder.style.display = 'block';
            }
        };
    };
    
    // Add smooth hover effects to social buttons
    const socialBtns = document.querySelectorAll('.social-btn');
    
    socialBtns.forEach((btn, index) => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        btn.addEventListener('click', function(e) {
            // Ripple effect on click
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add keyboard accessibility
    socialBtns.forEach(btn => {
        btn.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                this.click();
            }
        });
    });
});

// Add ripple animation to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Prevent page zoom on double tap for mobile
document.addEventListener('touchend', (e) => {
    if (e.changedTouches.length > 1) return;
}, { passive: true });
