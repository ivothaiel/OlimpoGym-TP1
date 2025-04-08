
// --- Funcionalidad del Modo Oscuro ---

const toggleModo = document.getElementById('toggle-modo');
const body = document.body;

// Función para alternar el modo oscuro
function alternarModoOscuro() {
    body.classList.toggle('modo-oscuro');
    
    // Actualizamos el ícono del botón
    if (body.classList.contains('modo-oscuro')) {
        toggleModo.textContent = '☀️'; // Sol para modo claro
        localStorage.setItem('tema', 'oscuro'); // Guardamos la preferencia
    } else {
        toggleModo.textContent = '🌙'; // Luna para modo oscuro
        localStorage.setItem('tema', 'claro');
    }
}

// Verificamos la preferencia del usuario al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const temaGuardado = localStorage.getItem('tema');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Si hay un tema guardado, lo aplicamos; si no, usamos la preferencia del sistema
    if (temaGuardado === 'oscuro' || (!temaGuardado && prefersDarkScheme)) {
        body.classList.add('modo-oscuro');
        toggleModo.textContent = '☀️';
    } else {
        body.classList.remove('modo-oscuro');
        toggleModo.textContent = '🌙';
    }
});

// Añadimos el evento al botón para alternar el modo
toggleModo.addEventListener('click', alternarModoOscuro);