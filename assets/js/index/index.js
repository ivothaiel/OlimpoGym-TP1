// Seleccionamos todos los elementos con la clase 'numero'
const contadores = document.querySelectorAll('.contador .numero');
const duracion = 2000; // Duración de la animación: 2 segundos

// Función para animar los contadores
function animarContadores() {
    contadores.forEach(contador => {
        // Evitar animar si ya se animó
        if (contador.dataset.animado === "true") {
            return;
        }

        // Obtenemos el valor objetivo del atributo data-target
        const valorFinal = parseInt(contador.getAttribute('data-target'));
        let valorInicial = 0;
        const tiempoInicio = performance.now();

        // Función que actualiza el contador en cada frame
        function actualizarContador(tiempoActual) {
            const tiempoTranscurrido = tiempoActual - tiempoInicio;
            const progreso = Math.min(tiempoTranscurrido / duracion, 1); // Progreso de 0 a 1
            valorInicial = progreso * valorFinal;

            // Actualizamos el texto del contador con el valor redondeado
            contador.textContent = Math.round(valorInicial);

            // Si no hemos llegado al final, continuamos la animación
            if (progreso < 1) {
                requestAnimationFrame(actualizarContador);
            } else {
                // Aseguramos que el valor final sea exacto
                contador.textContent = valorFinal;
                contador.dataset.animado = "true"; // Marcamos como animado
            }
        }

        // Iniciamos la animación
        requestAnimationFrame(actualizarContador);
    });
}

// Ejecutamos la animación cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    animarContadores();
});

// Opcional: Ejecutar la animación cuando el elemento entra en la vista
const seccionContador = document.querySelector('.contador');
let animado = false;

window.addEventListener('scroll', () => {
    const rect = seccionContador.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0 && !animado) {
        animarContadores();
        animado = true; // Evitamos que se repita la animación
    }
});

// --- Funcionalidad del Modo Oscuro ---
// Seleccionamos el botón para alternar el modo y el body
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