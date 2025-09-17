// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
}

// FAQ Toggle
const faqItems = document.querySelectorAll('.faq-item');

if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
}


// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Highlight active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Simple animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.mv-card, .obj-card, .pastoral-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.mv-card, .obj-card, .pastoral-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // Trigger once on load in case elements are already in view
    animateOnScroll();
});

// Google Calendar Integration
const initGoogleCalendar = () => {
    const calendarContainer = document.getElementById('google-calendar');
    const viewButtons = document.querySelectorAll('.calendar-btn');
    const subscribeLink = document.getElementById('subscribe-link');
    
    // ID del calendario de Google
    const CALENDAR_ID = 'ce46abf4c99a6b5697860752f4a30d35ebf90d5a748d4cd59512a791937646de@group.calendar.google.com';
    
    // Función para cambiar la vista del calendario
    const changeCalendarView = (view) => {
        let src = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(CALENDAR_ID)}&ctz=America%2FCaracas`;
        
        if (view === 'agenda') {
            src += '&mode=AGENDA';
        } else {
            src += '&mode=MONTH';
        }
        
        // Actualizar el iframe
        const iframe = calendarContainer.querySelector('iframe');
        iframe.src = src;
        
        // Actualizar botones activos
        viewButtons.forEach(btn => {
            if (btn.dataset.view === view) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    };
    
    // Configurar botones de vista
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const view = button.dataset.view;
            changeCalendarView(view);
        });
    });
    
    // Configurar enlace de suscripción
    subscribeLink.href = `webcal://calendar.google.com/calendar/ical/${encodeURIComponent(CALENDAR_ID)}/public/basic.ics`;
    
    // Detectar clic en el enlace de suscripción
    subscribeLink.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Mostrar instrucciones de suscripción
        alert('Para suscribirte a este calendario:\n\n1. Abre Google Calendar en tu computadora\n2. Haz clic en el signo "+" junto a "Otros calendarios"\n3. Selecciona "Desde URL"\n4. Pega esta URL: ' + subscribeLink.href + '\n5. Haz clic en "Agregar calendario"');
    });
};

// ... (resto del código existente)

// Modificar el event listener DOMContentLoaded para incluir el calendario
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.mv-card, .obj-card, .pastoral-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    setupDownloadNotifications();
    
    // Inicializar el calendario de Google
    initGoogleCalendar();
});
