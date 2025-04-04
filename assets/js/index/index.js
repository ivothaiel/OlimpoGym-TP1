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