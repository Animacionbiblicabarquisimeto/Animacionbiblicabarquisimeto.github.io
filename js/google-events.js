// google-events.js - Opcional: Para mostrar eventos próximos usando la API
const GOOGLE_API_KEY = 'AIzaSyA0MXtQfM1gCT4ARdKkGJnSLQFJQ_r-2yY';
const CALENDAR_ID = 'ce46abf4c99a6b5697860752f4a30d35ebf90d5a748d4cd59512a791937646de@group.calendar.google.com';

// Función para obtener eventos próximos
async function fetchUpcomingEvents() {
    try {
        const now = new Date().toISOString();
        const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?key=${GOOGLE_API_KEY}&timeMin=${now}&maxResults=5&orderBy=startTime&singleEvents=true`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
            displayUpcomingEvents(data.items);
        } else {
            document.getElementById('upcoming-events').innerHTML = '<p>No hay eventos próximos programados.</p>';
        }
    } catch (error) {
        console.error('Error al cargar eventos:', error);
        document.getElementById('upcoming-events').innerHTML = '<p>No se pudieron cargar los eventos en este momento.</p>';
    }
}

// Función para mostrar eventos próximos
function displayUpcomingEvents(events) {
    const container = document.getElementById('upcoming-events');
    let html = '<h3>Próximos Eventos</h3><div class="events-list">';
    
    events.forEach(event => {
        const start = event.start.dateTime || event.start.date;
        const startDate = new Date(start);
        const formattedDate = startDate.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        html += `
            <div class="event-item">
                <div class="event-date">
                    <span class="event-day">${startDate.getDate()}</span>
                    <span class="event-month">${startDate.toLocaleString('es-ES', { month: 'short' })}</span>
                </div>
                <div class="event-info">
                    <h4>${event.summary}</h4>
                    <p>${formattedDate}</p>
                    ${event.location ? `<p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>` : ''}
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// Cargar eventos cuando la página esté lista
document.addEventListener('DOMContentLoaded', fetchUpcomingEvents);