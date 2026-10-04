// ========================================
// ELEMENTOS DE LA INTERFAZ
// ========================================

const contenedorBarras = document.getElementById("contenedor-barras");
const botonGenerar = document.getElementById("generar");
const botonIniciar = document.getElementById("iniciar");
const botonReiniciar = document.getElementById("reiniciar")

// ========================================
// CONFIGURACIÓN
// ========================================

const cantidadElementos = 20;


let datos = [];

let comparaciones = 0;
let intercambios = 0;

let posicionesOrdenadas = [];

let ejecutando = false;


// ========================================
// GENERAR DATOS
// ========================================

function generarDatos() {

    // Si el algoritmo está ejecutándose,
    // no permitimos generar nuevos datos.
    if (ejecutando) {
        return;
    }

    datos = [];
    posicionesOrdenadas=[];

    // Generamos los números aleatorios
    for (let i = 0; i < cantidadElementos; i++) {

        const valor = Math.floor(Math.random() * 91) + 10;

        datos.push(valor);
    }

    // Reiniciamos las métricas
    comparaciones = 0;
    intercambios = 0;

    actualizarMetricas();

    // Mostramos las barras
    mostrarBarras();
}


// ========================================
// MOSTRAR LAS BARRAS
// ========================================

function mostrarBarras() {

    // Eliminamos las barras anteriores
    contenedorBarras.innerHTML = "";

    // Recorremos el arreglo
    for (let i = 0; i < datos.length; i++) {

        // Creamos una barra
        const barra = document.createElement("div");

        // Le asignamos la clase barra
        barra.classList.add("barra");

        // La altura representa el valor
        barra.style.height = datos[i] + "%";

        // Mostramos el valor
        barra.textContent = datos[i];

        // Guardamos el valor
        barra.dataset.valor = datos[i];

        // Guardamos también la posicion
        barra.dataset.indice = i;

        if(posicionesOrdenadas.includes(i)){
            barra.classList.add("ordenada")
        }

        // Agregamos la barra
        contenedorBarras.appendChild(barra);
    }
}


// ========================================
// ACTUALIZAR MÉTRICAS
// ========================================

function actualizarMetricas() {

    document.getElementById("comparaciones").textContent = comparaciones;

    document.getElementById("intercambios").textContent = intercambios;
}
// ========================================
// REINICIAR
// ========================================

function reiniciar() {

    if (ejecutando) {
        return;
    }

    generarDatos();
}


// ========================================
// ESPERAR
// ========================================

function esperar(tiempo) {

    return new Promise(resolve => {

        setTimeout(resolve, tiempo);

    });
}


// ========================================
// BUBBLE SORT
// ========================================

async function bubbleSort() {

    // Indicamos que el algoritmo está ejecutándose
    ejecutando = true;

    // Recorremos el arreglo
    for (let i = 0; i < datos.length - 1; i++) {

        // Comparamos los elementos
        for (let j = 0; j < datos.length - 1 - i; j++) {

            // Obtenemos todas las barras
            const barras = document.querySelectorAll(".barra");

            // Resaltamos las dos barras que estamos comparando
            barras[j].classList.add("comparando");
            barras[j + 1].classList.add("comparando");

            // Aumentamos el contador
            comparaciones++;

            actualizarMetricas();

            // Esperamos para poder ver la comparación
            await esperar(300);


            // Comparamos los valores
            if (datos[j] > datos[j + 1]) {

                // Cambiamos el color para indicar intercambio
                barras[j].classList.remove("comparando");
                barras[j + 1].classList.remove("comparando");

                barras[j].classList.add("intercambiando");
                barras[j + 1].classList.add("intercambiando");

                await esperar(300);


                // Intercambiamos los valores
                const temporal = datos[j];

                datos[j] = datos[j + 1];

                datos[j + 1] = temporal;


                // Aumentamos el contador
                intercambios++;

                actualizarMetricas();


                // Actualizamos las barras
                mostrarBarras();


                await esperar(300);

            } else {

                // Quitamos el color de comparación
                barras[j].classList.remove("comparando");
                barras[j + 1].classList.remove("comparando");

            }
        }

        // Obtenemos las barras actualizadas
        const barras = document.querySelectorAll(".barra");

        // Marcamos como ordenada la última posición
        posicionesOrdenadas.push(datos.length -1 -i);
        mostrarBarras();

        await esperar(200);
    }


    // Marcamos la primera posición como ordenada
    posicionesOrdenadas.push(0);
    mostrarBarras();


    // Terminamos la ejecución
    ejecutando = false;
}

// ========================================
// REINICIAR
// ========================================

function reiniciar() {

    // Si el algoritmo está ejecutándose,
    // no permitimos reiniciar.
    if (ejecutando) {
        return;
    }

    // Eliminamos los datos actuales
    datos = [];

    // Eliminamos las posiciones ordenadas
    posicionesOrdenadas = [];

    // Reiniciamos las métricas
    comparaciones = 0;
    intercambios = 0;

    actualizarMetricas();

    // Generamos nuevamente los datos
    generarDatos();
}
// ========================================
// BOTÓN GENERAR
// ========================================

botonGenerar.addEventListener("click", generarDatos);
botonReiniciar.addEventListener("click", reiniciar);


// ========================================
// BOTÓN INICIAR
// ========================================

botonIniciar.addEventListener("click", function() {

    // Evitamos iniciar dos veces
    if (ejecutando) {
        return;
    }

    bubbleSort();

});


// ========================================
// GENERAR DATOS AL ABRIR LA PÁGINA
// ========================================

generarDatos();