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

// Datos para la comparación de tiempos
let tiempoEjecucion = 0;

const tiemposAlgoritmos = {
    bubble: null,
    selection: null,
    insertion: null,
    gnome: null,
    exchange: null,
    stooge: null,
    quick: null,
    merge: null
};

const nombresAlgoritmos = {
    bubble: "Bubble Sort",
    selection: "Selection Sort",
    insertion: "Insertion Sort",
    gnome: "Gnome Sort",
    exchange: "Exchange Sort",
    stooge: "Stooge Sort",
    quick: "Quick Sort",
    merge: "Merge Sort"
};


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
function actualizarTiempo()
{ const elementoTiempo = document.getElementById("tiempo-ejecucion"); if (elementoTiempo)
    { elementoTiempo.textContent = tiempoEjecucion.toFixed(3) + " ms";
    } 
 }


function esperar(tiempo) {

    return new Promise(resolve => {

        setTimeout(resolve, tiempo);

    });
}

function actualizarGrafica() {

const canvas = document.getElementById("grafica-tiempos");

    if (!canvas) {
        return;
    }

    const contexto = canvas.getContext("2d");

    const ancho = canvas.clientWidth;
    const alto = canvas.clientHeight;

    canvas.width = ancho;
    canvas.height = alto;

    contexto.clearRect(0, 0, ancho, alto);

    const resultados = Object.entries(tiemposAlgoritmos)
        .filter(([algoritmo, tiempo]) => tiempo !== null);

    if (resultados.length === 0) {
        contexto.font = "16px Arial";
        contexto.textAlign = "center";
        contexto.fillText(
            "Ejecuta un algoritmo para mostrar resultados",
            ancho / 2,
            alto / 2
        );
        return;
    }

    const margenIzquierdo = 70;
    const margenDerecho = 30;
    const margenSuperior = 30;
    const margenInferior = 70;

    const anchoGrafica =
        ancho - margenIzquierdo - margenDerecho;

    const altoGrafica =
        alto - margenSuperior - margenInferior;

    const tiempoMaximo = Math.max(
        ...resultados.map(([algoritmo, tiempo]) => tiempo)
    );

    const espacioBarra =
        anchoGrafica / resultados.length;

    const anchoBarra =
        espacioBarra * 0.6;

    resultados.forEach(([algoritmo, tiempo], indice) => {

        const alturaBarra =
            (tiempo / tiempoMaximo) * altoGrafica;

        const x =
            margenIzquierdo +
            indice * espacioBarra +
            (espacioBarra - anchoBarra) / 2;

        const y =
            margenSuperior +
            altoGrafica -
            alturaBarra;

        contexto.fillStyle = "#4a90e2";

        contexto.fillRect(
            x,
            y,
            anchoBarra,
            alturaBarra
        );

        contexto.fillStyle = "#000";
        contexto.font = "12px Arial";
        contexto.textAlign = "center";

        contexto.fillText(
            nombresAlgoritmos[algoritmo],
            x + anchoBarra / 2,
            alto - 35
        );

        contexto.fillText(
            tiempo.toFixed(3) + " ms",
            x + anchoBarra / 2,
            y - 8
        );
    });

    contexto.strokeStyle = "#000";
    contexto.lineWidth = 1;

    contexto.beginPath();

    contexto.moveTo(
        margenIzquierdo,
        margenSuperior
    );

    contexto.lineTo(
        margenIzquierdo,
        margenSuperior + altoGrafica
    );

    contexto.lineTo(
        ancho - margenDerecho,
        margenSuperior + altoGrafica
    );

    contexto.stroke();
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

async function selectionSort() {
    ejecutando = true;

    for (let i = 0; i < datos.length - 1; i++) {
        let indiceMinimo = i;

        for (let j = i + 1; j < datos.length; j++) {
            const barras = document.querySelectorAll(".barra");

            barras[indiceMinimo].classList.add("comparando");
            barras[j].classList.add("comparando");
            comparaciones++;
            actualizarMetricas();

            await esperar(velocidad);

            if (datos[j] < datos[indiceMinimo]) {
                indiceMinimo = j;
            }

            barras[indiceMinimo].classList.remove("comparando");
            barras[j].classList.remove("comparando");
        }

        if (indiceMinimo !== i) {
            const barras = document.querySelectorAll(".barra");

            barras[i].classList.add("intercambiando");
            barras[indiceMinimo].classList.add("intercambiando");
            await esperar(velocidad);

            const temporal = datos[i];
            datos[i] = datos[indiceMinimo];
            datos[indiceMinimo] = temporal;
            intercambios++;
            actualizarMetricas();
            mostrarBarras();

            await esperar(velocidad);
        }

        posicionesOrdenadas.push(i);
        mostrarBarras();
    }

    posicionesOrdenadas.push(datos.length - 1);
    mostrarBarras();
    ejecutando = false;
}

async function insertionSort() {
    ejecutando = true;

    for (let i = 1; i < datos.length; i++) {
        let j = i;

        while (j > 0) {
            const barras = document.querySelectorAll(".barra");

            barras[j - 1].classList.add("comparando");
            barras[j].classList.add("comparando");
            comparaciones++;
            actualizarMetricas();

            await esperar(velocidad);

            if (datos[j - 1] <= datos[j]) {
                barras[j - 1].classList.remove("comparando");
                barras[j].classList.remove("comparando");
                break;
            }

            barras[j - 1].classList.remove("comparando");
            barras[j].classList.remove("comparando");
            barras[j - 1].classList.add("intercambiando");
            barras[j].classList.add("intercambiando");
            await esperar(velocidad);

            const temporal = datos[j - 1];
            datos[j - 1] = datos[j];
            datos[j] = temporal;
            intercambios++;
            actualizarMetricas();
            mostrarBarras();

            await esperar(velocidad);
            j--;
        }

        posicionesOrdenadas.push(i);
        mostrarBarras();
    }

    if (datos.length > 0) {
        posicionesOrdenadas.push(datos.length - 1);
        mostrarBarras();
    }

    ejecutando = false;
}

async function gnomeSort() {
    ejecutando = true;
    let indice = 1;

    while (indice < datos.length) {
        if (indice === 0) {
            indice = 1;
        }

        const barras = document.querySelectorAll(".barra");
        barras[indice - 1].classList.add("comparando");
        barras[indice].classList.add("comparando");
        comparaciones++;
        actualizarMetricas();

        await esperar(velocidad);

        if (datos[indice - 1] <= datos[indice]) {
            barras[indice - 1].classList.remove("comparando");
            barras[indice].classList.remove("comparando");
            indice++;
            continue;
        }

        barras[indice - 1].classList.remove("comparando");
        barras[indice].classList.remove("comparando");
        barras[indice - 1].classList.add("intercambiando");
        barras[indice].classList.add("intercambiando");
        await esperar(velocidad);

        const temporal = datos[indice - 1];
        datos[indice - 1] = datos[indice];
        datos[indice] = temporal;
        intercambios++;
        actualizarMetricas();
        mostrarBarras();

        await esperar(velocidad);
        indice--;
    }

    posicionesOrdenadas = datos.map((valor, indiceActual) => indiceActual);
    mostrarBarras();
    ejecutando = false;
}

async function exchangeSort() {
    ejecutando = true;

    for (let i = 0; i < datos.length - 1; i++) {
        for (let j = i + 1; j < datos.length; j++) {
            const barras = document.querySelectorAll(".barra");
            barras[i].classList.add("comparando");
            barras[j].classList.add("comparando");
            comparaciones++;
            actualizarMetricas();

            await esperar(velocidad);

            if (datos[i] > datos[j]) {
                barras[i].classList.remove("comparando");
                barras[j].classList.remove("comparando");
                barras[i].classList.add("intercambiando");
                barras[j].classList.add("intercambiando");
                await esperar(velocidad);

                const temporal = datos[i];
                datos[i] = datos[j];
                datos[j] = temporal;
                intercambios++;
                actualizarMetricas();
                mostrarBarras();

                await esperar(velocidad);
            } else {
                barras[i].classList.remove("comparando");
                barras[j].classList.remove("comparando");
            }
        }

        posicionesOrdenadas.push(i);
        mostrarBarras();
    }

    if (datos.length > 0) {
        posicionesOrdenadas.push(datos.length - 1);
        mostrarBarras();
    }

    ejecutando = false;
}

async function stoogeSort(inicio = 0, fin = datos.length - 1) {
    const esInicio = inicio === 0 && fin === datos.length - 1;

    if (esInicio) {
        ejecutando = true;
    }

    if (inicio >= fin) {
        if (esInicio) {
            posicionesOrdenadas = datos.map((valor, indice) => indice);
            mostrarBarras();
            ejecutando = false;
        }
        return;
    }

    const barras = document.querySelectorAll(".barra");
    barras[inicio].classList.add("comparando");
    barras[fin].classList.add("comparando");
    comparaciones++;
    actualizarMetricas();

    await esperar(velocidad);

    if (datos[inicio] > datos[fin]) {
        barras[inicio].classList.remove("comparando");
        barras[fin].classList.remove("comparando");
        barras[inicio].classList.add("intercambiando");
        barras[fin].classList.add("intercambiando");
        await esperar(velocidad);

        const temporal = datos[inicio];
        datos[inicio] = datos[fin];
        datos[fin] = temporal;
        intercambios++;
        actualizarMetricas();
        mostrarBarras();

        await esperar(velocidad);
    } else {
        barras[inicio].classList.remove("comparando");
        barras[fin].classList.remove("comparando");
    }

    const tercio = Math.floor((fin - inicio + 1) / 3);

    await stoogeSort(inicio, fin - tercio);
    await stoogeSort(inicio + tercio, fin);
    await stoogeSort(inicio, fin - tercio);

    if (esInicio) {
        posicionesOrdenadas = datos.map((valor, indice) => indice);
        mostrarBarras();
        ejecutando = false;
    }
}

async function quickSort(inicio = 0, fin = datos.length - 1) {
    const esInicio = inicio === 0 && fin === datos.length - 1;

    if (esInicio) {
        ejecutando = true;
    }

    if (inicio >= fin) {
        if (esInicio) {
            posicionesOrdenadas = datos.map((valor, indice) => indice);
            mostrarBarras();
            ejecutando = false;
        }
        return;
    }

    const pivote = datos[Math.floor((inicio + fin) / 2)];
    let izquierda = inicio;
    let derecha = fin;

    while (izquierda <= derecha) {
        while (datos[izquierda] < pivote) {
            izquierda++;
        }

        while (datos[derecha] > pivote) {
            derecha--;
        }

        if (izquierda <= derecha) {
            const barras = document.querySelectorAll(".barra");
            barras[izquierda].classList.add("comparando");
            barras[derecha].classList.add("comparando");
            comparaciones++;
            actualizarMetricas();

            await esperar(velocidad);

            if (izquierda < derecha) {
                barras[izquierda].classList.remove("comparando");
                barras[derecha].classList.remove("comparando");
                barras[izquierda].classList.add("intercambiando");
                barras[derecha].classList.add("intercambiando");
                await esperar(velocidad);

                const temporal = datos[izquierda];
                datos[izquierda] = datos[derecha];
                datos[derecha] = temporal;
                intercambios++;
                actualizarMetricas();
                mostrarBarras();

                await esperar(velocidad);
            } else {
                barras[izquierda].classList.remove("comparando");
                barras[derecha].classList.remove("comparando");
            }

            izquierda++;
            derecha--;
        }
    }

    if (inicio < derecha) {
        await quickSort(inicio, derecha);
    }

    if (izquierda < fin) {
        await quickSort(izquierda, fin);
    }

    if (esInicio) {
        posicionesOrdenadas = datos.map((valor, indice) => indice);
        mostrarBarras();
        ejecutando = false;
    }
}

async function mergeSort(inicio = 0, fin = datos.length - 1) {
    const esInicio = inicio === 0 && fin === datos.length - 1;

    if (esInicio) {
        ejecutando = true;
    }

    if (inicio >= fin) {
        if (esInicio) {
            posicionesOrdenadas = datos.map((valor, indice) => indice);
            mostrarBarras();
            ejecutando = false;
        }
        return;
    }

    const medio = Math.floor((inicio + fin) / 2);

    await mergeSort(inicio, medio);
    await mergeSort(medio + 1, fin);

    const valoresIzquierda = datos.slice(inicio, medio + 1);
    const valoresDerecha = datos.slice(medio + 1, fin + 1);
    const valoresOrdenados = [];
    let indiceIzquierda = 0;
    let indiceDerecha = 0;

    while (indiceIzquierda < valoresIzquierda.length &&
           indiceDerecha < valoresDerecha.length) {
        const posicionIzquierda = inicio + indiceIzquierda;
        const posicionDerecha = medio + 1 + indiceDerecha;
        const barras = document.querySelectorAll(".barra");

        barras[posicionIzquierda].classList.add("comparando");
        barras[posicionDerecha].classList.add("comparando");
        comparaciones++;
        actualizarMetricas();

        await esperar(velocidad);

        if (valoresIzquierda[indiceIzquierda] <= valoresDerecha[indiceDerecha]) {
            valoresOrdenados.push(valoresIzquierda[indiceIzquierda]);
            indiceIzquierda++;
        } else {
            valoresOrdenados.push(valoresDerecha[indiceDerecha]);
            indiceDerecha++;
        }

        barras[posicionIzquierda].classList.remove("comparando");
        barras[posicionDerecha].classList.remove("comparando");
    }

    while (indiceIzquierda < valoresIzquierda.length) {
        valoresOrdenados.push(valoresIzquierda[indiceIzquierda]);
        indiceIzquierda++;
    }

    while (indiceDerecha < valoresDerecha.length) {
        valoresOrdenados.push(valoresDerecha[indiceDerecha]);
        indiceDerecha++;
    }

    for (let indice = 0; indice < valoresOrdenados.length; indice++) {
        const posicion = inicio + indice;

        if (datos[posicion] !== valoresOrdenados[indice]) {
            const barras = document.querySelectorAll(".barra");
            barras[posicion].classList.add("intercambiando");
            await esperar(velocidad);

            datos[posicion] = valoresOrdenados[indice];
            intercambios++;
            actualizarMetricas();
            mostrarBarras();

            await esperar(velocidad);
        }
    }

    if (esInicio) {
        posicionesOrdenadas = datos.map((valor, indice) => indice);
        mostrarBarras();
        ejecutando = false;
    }
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

// Reiniciar tiempos
tiempoEjecucion = 0;

for (const algoritmo in tiemposAlgoritmos) {
    tiemposAlgoritmos[algoritmo] = null;
}

actualizarTiempo();
actualizarGrafica();




    generarDatos();
}

botonGenerar.addEventListener("click", generarDatos);
botonReiniciar.addEventListener("click", reiniciar);

async function ejecutarConTiempo(algoritmo) {

    const inicio = performance.now();

    if (algoritmo === "bubble") {
        await bubbleSort();
    }

    if (algoritmo === "selection") {
        await selectionSort();
    }

    if (algoritmo === "insertion") {
        await insertionSort();
    }

    if (algoritmo === "gnome") {
        await gnomeSort();
    }

    if (algoritmo === "exchange") {
        await exchangeSort();
    }

    if (algoritmo === "stooge") {
        await stoogeSort();
    }

    if (algoritmo === "quick") {
        await quickSort();
    }

    if (algoritmo === "merge") {
        await mergeSort();
    }

    const fin = performance.now();

    tiempoEjecucion = fin - inicio;

    tiemposAlgoritmos[algoritmo] = tiempoEjecucion;

    actualizarTiempo();
    actualizarGrafica();
}


botonIniciar.addEventListener("click", function() {

    // Evitamos iniciar dos veces
    if (ejecutando) {
        return;
    }

    const algoritmo = selectorAlgoritmo.value;

    ejecutarConTiempo(algoritmo);

});




generarDatos();
}
