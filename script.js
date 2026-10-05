// Elementos de la interfaz

const contenedorBarras = document.getElementById("contenedor-barras");
const botonGenerar = document.getElementById("generar");
const botonIniciar = document.getElementById("iniciar");
const botonReiniciar = document.getElementById("reiniciar");
const controlVelocidad = document.getElementById("velocidad");
const selectorAlgoritmo = document.getElementById("algoritmo");
const nombreAlgoritmo = document.getElementById("nombre-algoritmo");

// Configuracion

const cantidadElementos = 20;


let datos = [];

let comparaciones = 0;
let intercambios = 0;

let posicionesOrdenadas = [];

let ejecutando = false;
let velocidad = 300;




function generarDatos() {

    // No genera datos nuevos mientras el algoritmo esta en proceso
    if (ejecutando) {
        return;
    }

    datos = [];
    posicionesOrdenadas=[];

    // Genera numeros aleatorios
    for (let i = 0; i < cantidadElementos; i++) {

        const valor = Math.floor(Math.random() * 91) + 10;

        datos.push(valor);
    }

    // Reinicio metricas
    comparaciones = 0;
    intercambios = 0;

    actualizarMetricas();

    // Mostramos las barras
    mostrarBarras();
}


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



function actualizarMetricas() {

    document.getElementById("comparaciones").textContent = comparaciones;

    document.getElementById("intercambios").textContent = intercambios;
}



function esperar(tiempo) {

    return new Promise(resolve => {

        setTimeout(resolve, tiempo);

    });
}

function actualizarVelocidad(){
    const valor = Number(controlVelocidad.value);
    velocidad = 600 - (valor*50);
}

controlVelocidad.addEventListener("input", actualizarVelocidad);
actualizarVelocidad();



function actualizarNombreAlgoritmo(){
    const opcion = selectorAlgoritmo.options[selectorAlgoritmo.selectedIndex];
    nombreAlgoritmo.textContent = opcion.textContent;
}
selectorAlgoritmo.addEventListener("change", actualizarNombreAlgoritmo);
actualizarNombreAlgoritmo();

async function bubbleSort() {


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

            // Esperamos para poder ver la comparacion
            await esperar(velocidad);


            // Comparamos los valores
            if (datos[j] > datos[j + 1]) {

                // Cambiamos el color para indicar intercambio
                barras[j].classList.remove("comparando");
                barras[j + 1].classList.remove("comparando");

                barras[j].classList.add("intercambiando");
                barras[j + 1].classList.add("intercambiando");

                await esperar(velocidad);


                // Intercambiamos los valores
                const temporal = datos[j];

                datos[j] = datos[j + 1];

                datos[j + 1] = temporal;


                // Aumentamos el contador
                intercambios++;

                actualizarMetricas();


                // Actualizamos las barras
                mostrarBarras();


                await esperar(velocidad);

            } else {

                // Quitamos el color de comparacion
                barras[j].classList.remove("comparando");
                barras[j + 1].classList.remove("comparando");

            }
        }

        // Obtenemos las barras actualizadas
        const barras = document.querySelectorAll(".barra");

        // Marcamos como ordenada la ultima posicion
        posicionesOrdenadas.push(datos.length -1 -i);
        mostrarBarras();

        await esperar(velocidad);
    }


    // Marcamos la primera posicion como ordenada
    posicionesOrdenadas.push(0);
    mostrarBarras();


    ejecutando = false;
}

function reiniciar() {

    // No se puede reiniciar mientras el algoritmo esta en ejecucion
    if (ejecutando) {
        return;
    }

    // Eliminamos los datos actuales
    datos = [];

    // Eliminamos las posiciones ordenadas
    posicionesOrdenadas = [];

    // Reinicio metricas
    comparaciones = 0;
    intercambios = 0;

    actualizarMetricas();


    generarDatos();
}

botonGenerar.addEventListener("click", generarDatos);
botonReiniciar.addEventListener("click", reiniciar);


botonIniciar.addEventListener("click", function() {

    // Evitamos iniciar dos veces
    if (ejecutando) {
        return;
    }
    const algoritmo = selectorAlgoritmo.value;

    if(algoritmo === "bubble"){
        bubbleSort();
    }

});



generarDatos();