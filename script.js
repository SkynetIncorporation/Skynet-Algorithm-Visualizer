// Elementos de la interfaz

const contenedorBarras = document.getElementById("contenedor-barras");
const botonGenerar = document.getElementById("generar");


// Configuracion

const cantidadElementos = 20;


// Generacion de datos

function generarDatos() {

    // Limpieza de las barras anteriores
    contenedorBarras.innerHTML = "";

    // Generacion de los elementos
    for (let i = 0; i < cantidadElementos; i++) {

        // Numero aleatorio entre 10 y 100
        const valor = Math.floor(Math.random() * 91) + 10;
        //Crear barra
        const barra = document.createElement("div");

// Le asignamos la clase barra
        barra.classList.add("barra");

// La altura representa el valor
        barra.style.height = valor + "%";

// Guardamos el valor dentro de la barra
        barra.dataset.valor = valor;

// Mostramos el valor encima de la barra
        barra.textContent = valor;

// Agregamos la barra al contenedor
        contenedorBarras.appendChild(barra);
    }
}


// Boton generar datos

botonGenerar.addEventListener("click", generarDatos);


// Generar datos para cargar pagina

generarDatos();