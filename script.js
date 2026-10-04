// ========================================
// ELEMENTOS DE LA INTERFAZ
// ========================================

const contenedorBarras = document.getElementById("contenedor-barras");
const botonGenerar = document.getElementById("generar");


// ========================================
// CONFIGURACIÓN
// ========================================

const cantidadElementos = 20;


// ========================================
// GENERAR DATOS
// ========================================

function generarDatos() {

    // Limpiamos las barras anteriores
    contenedorBarras.innerHTML = "";

    // Generamos los elementos
    for (let i = 0; i < cantidadElementos; i++) {

        // Número aleatorio entre 10 y 100
        const valor = Math.floor(Math.random() * 91) + 10;

        // Creamos una barra
        const barra = document.createElement("div");

        // Le asignamos la clase barra
        barra.classList.add("barra");

        // La altura representa el valor
        barra.style.height = valor + "%";

        // Guardamos el valor dentro de la barra
        barra.dataset.valor = valor;

        // Agregamos la barra al contenedor
        contenedorBarras.appendChild(barra);
    }
}


// ========================================
// BOTÓN GENERAR DATOS
// ========================================

botonGenerar.addEventListener("click", generarDatos);


// ========================================
// GENERAR DATOS AL CARGAR LA PÁGINA
// ========================================

generarDatos();