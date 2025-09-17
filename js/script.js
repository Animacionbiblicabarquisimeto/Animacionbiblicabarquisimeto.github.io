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

// ... (código existente previo)

// Google Calendar Integration
const initGoogleCalendar = () => {
    const calendarContainer = document.getElementById('google-calendar');
    const loadingElement = calendarContainer.querySelector('.loading-calendar');
    const viewButtons = document.querySelectorAll('.calendar-btn');
    const subscribeBtn = document.getElementById('subscribe-btn');
    
    // ID público del calendario de Google (debes reemplazarlo con el ID real)
    const CALENDAR_ID = 'ce46abf4c99a6b5697860752f4a30d35ebf90d5a748d4cd59512a791937646de@group.calendar.google.com';
    const API_KEY = 'AIzaSyA0MXtQfM1gCT4ARdKkGJnSLQFJQ_r-2yY'; // Necesitarás obtener una API key de Google
    
    // Función para cambiar la vista del calendario
    const changeCalendarView = (view) => {
        // Limpiar el contenedor
        calendarContainer.innerHTML = '<div class="loading-calendar"><i class="fas fa-spinner fa-spin"></i><p>Cargando calendario...</p></div>';
        
        // Crear iframe con la vista seleccionada
        const iframe = document.createElement('iframe');
        iframe.src = `https://calendar.google.com/calendar/embed?src=ce46abf4c99a6b5697860752f4a30d35ebf90d5a748d4cd59512a791937646de%40group.calendar.google.com&ctz=America%2FCaracas`;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.frameBorder = '0';
        iframe.scrolling = 'no';
        
        // Reemplazar loading con el iframe cuando cargue
        iframe.onload = () => {
            calendarContainer.innerHTML = '';
            calendarContainer.appendChild(iframe);
        };
        
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
    
    // Configurar botón de suscripción
    subscribeBtn.href = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(CALENDAR_ID)}&ctz=America%2FCaracas`;
    
    // Cargar vista inicial
    changeCalendarView('month');
    
    // Alternativa: Cargar calendario usando la API de Google (más complejo pero más control)
    // loadCalendarWithAPI();
};

// Función alternativa para cargar el calendario usando la API de Google
// (Requiere configuración adicional con API key)
const loadCalendarWithAPI = () => {
    // Esta implementación requiere una API key de Google y habilitar la API de Calendar
    // Es más compleja pero ofrece más control sobre la visualización
    console.log("Cargando calendario con API...");
    // La implementación completa dependería de tus necesidades específicas
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
