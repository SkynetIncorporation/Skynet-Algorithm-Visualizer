// ========================================
// ELEMENTOS DE LA INTERFAZ
// ========================================

const contenedorBarras = document.getElementById("contenedor-barras");
const botonGenerar = document.getElementById("generar");
const botonIniciar = document.getElementById("iniciar");
const botonReiniciar = document.getElementById("reiniciar");
const controlVelocidad = document.getElementById("velocidad");
const selectorAlgoritmo = document.getElementById("algoritmo");
const nombreAlgoritmo = document.getElementById("nombre-algoritmo");


// ========================================
// CONFIGURACIÓN
// ========================================

const cantidadElementos = 20;

let datos = [];

let comparaciones = 0;
let intercambios = 0;

let posicionesOrdenadas = [];

let ejecutando = false;
let velocidad = 300;


// ========================================
// GENERAR DATOS
// ========================================

function generarDatos() {

    // No genera datos nuevos mientras el algoritmo está en proceso
    if (ejecutando) {
        return;
    }

    datos = [];
    posicionesOrdenadas = [];

    // Genera números aleatorios
    for (let i = 0; i < cantidadElementos; i++) {

        const valor = Math.floor(Math.random() * 91) + 10;

        datos.push(valor);
    }

    // Reinicia métricas
    comparaciones = 0;
    intercambios = 0;

    actualizarMetricas();

    // Muestra las barras
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

        // Guardamos la posición
        barra.dataset.indice = i;

        // Si la posición ya está ordenada
        if (posicionesOrdenadas.includes(i)) {
            barra.classList.add("ordenada");
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
// ESPERAR
// ========================================

function esperar(tiempo) {

    return new Promise(resolve => {

        setTimeout(resolve, tiempo);

    });
}


// ========================================
// VELOCIDAD
// ========================================

function actualizarVelocidad() {

    const valor = Number(controlVelocidad.value);

    velocidad = 600 - (valor * 50);
}

controlVelocidad.addEventListener("input", actualizarVelocidad);

actualizarVelocidad();


// ========================================
// ACTUALIZAR INFORMACIÓN DEL ALGORITMO
// ========================================

function actualizarNombreAlgoritmo() {

    const opcion =
        selectorAlgoritmo.options[selectorAlgoritmo.selectedIndex];

    nombreAlgoritmo.textContent = opcion.textContent;

    actualizarComplejidad();
}


// ========================================
// ACTUALIZAR COMPLEJIDAD
// ========================================

function actualizarComplejidad() {

    const algoritmo = selectorAlgoritmo.value;

    let complejidad = "";

    if (algoritmo === "bubble") {
        complejidad = "O(n²)";
    }

    if (algoritmo === "selection") {
        complejidad = "O(n²)";
    }

    if (algoritmo === "insertion") {
        complejidad = "O(n²)";
    }

    if (algoritmo === "gnome") {
        complejidad = "O(n²)";
    }

    if (algoritmo === "exchange") {
        complejidad = "O(n²)";
    }

    if (algoritmo === "stooge") {
        complejidad = "O(n²·⁷⁰⁹)";
    }

    if (algoritmo === "quick") {
        complejidad = "O(n log n)";
    }

    if (algoritmo === "merge") {
        complejidad = "O(n log n)";
    }

    document.getElementById("complejidad").textContent =
        complejidad;
}


selectorAlgoritmo.addEventListener(
    "change",
    actualizarNombreAlgoritmo
);

actualizarNombreAlgoritmo();


// ========================================
// BUBBLE SORT
// ========================================

async function bubbleSort() {

    ejecutando = true;

    for (let i = 0; i < datos.length - 1; i++) {

        for (let j = 0; j < datos.length - 1 - i; j++) {

            const barras = document.querySelectorAll(".barra");

            barras[j].classList.add("comparando");
            barras[j + 1].classList.add("comparando");

            comparaciones++;

            actualizarMetricas();

            await esperar(velocidad);

            if (datos[j] > datos[j + 1]) {

                barras[j].classList.remove("comparando");
                barras[j + 1].classList.remove("comparando");

                barras[j].classList.add("intercambiando");
                barras[j + 1].classList.add("intercambiando");

                await esperar(velocidad);

                const temporal = datos[j];

                datos[j] = datos[j + 1];
                datos[j + 1] = temporal;

                intercambios++;

                actualizarMetricas();

                mostrarBarras();

                await esperar(velocidad);

            } else {

                barras[j].classList.remove("comparando");
                barras[j + 1].classList.remove("comparando");
            }
        }

        posicionesOrdenadas.push(datos.length - 1 - i);

        mostrarBarras();

        await esperar(velocidad);
    }

    posicionesOrdenadas.push(0);

    mostrarBarras();

    ejecutando = false;
}


// ========================================
// SELECTION SORT
// ========================================

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

        await esperar(velocidad);
    }

    posicionesOrdenadas.push(datos.length - 1);

    mostrarBarras();

    ejecutando = false;
}


// ========================================
// INSERTION SORT
// ========================================

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


// ========================================
// GNOME SORT
// ========================================

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

    posicionesOrdenadas = datos.map(
        (valor, indiceActual) => indiceActual
    );

    mostrarBarras();

    ejecutando = false;
}


// ========================================
// EXCHANGE SORT
// ========================================

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


// ========================================
// STOOGE SORT
// ========================================

async function stoogeSort(
    inicio = 0,
    fin = datos.length - 1
) {

    const esInicio =
        inicio === 0 &&
        fin === datos.length - 1;

    if (esInicio) {
        ejecutando = true;
    }

    if (inicio >= fin) {

        if (esInicio) {

            posicionesOrdenadas = datos.map(
                (valor, indice) => indice
            );

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

    const tercio =
        Math.floor((fin - inicio + 1) / 3);

    await stoogeSort(
        inicio,
        fin - tercio
    );

    await stoogeSort(
        inicio + tercio,
        fin
    );

    await stoogeSort(
        inicio,
        fin - tercio
    );

    if (esInicio) {

        posicionesOrdenadas = datos.map(
            (valor, indice) => indice
        );

        mostrarBarras();

        ejecutando = false;
    }
}


// ========================================
// QUICK SORT
// ========================================

async function quickSort(
    inicio = 0,
    fin = datos.length - 1
) {

    const esInicio =
        inicio === 0 &&
        fin === datos.length - 1;

    if (esInicio) {
        ejecutando = true;
    }

    if (inicio >= fin) {

        if (esInicio) {

            posicionesOrdenadas = datos.map(
                (valor, indice) => indice
            );

            mostrarBarras();

            ejecutando = false;
        }

        return;
    }

    const pivote =
        datos[Math.floor((inicio + fin) / 2)];

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

            const barras =
                document.querySelectorAll(".barra");

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

        await quickSort(
            inicio,
            derecha
        );
    }

    if (izquierda < fin) {

        await quickSort(
            izquierda,
            fin
        );
    }

    if (esInicio) {

        posicionesOrdenadas = datos.map(
            (valor, indice) => indice
        );

        mostrarBarras();

        ejecutando = false;
    }
}


// ========================================
// MERGE SORT
// ========================================

async function mergeSort(
    inicio = 0,
    fin = datos.length - 1
) {

    const esInicio =
        inicio === 0 &&
        fin === datos.length - 1;

    if (esInicio) {
        ejecutando = true;
    }

    if (inicio >= fin) {

        return;
    }

    const medio =
        Math.floor((inicio + fin) / 2);


    // Ordenamos la mitad izquierda
    await mergeSort(
        inicio,
        medio
    );


    // Ordenamos la mitad derecha
    await mergeSort(
        medio + 1,
        fin
    );


    // ========================================
    // FUSIONAR LAS DOS MITADES
    // ========================================

    const valoresIzquierda =
        datos.slice(inicio, medio + 1);

    const valoresDerecha =
        datos.slice(medio + 1, fin + 1);

    const valoresOrdenados = [];

    let indiceIzquierda = 0;
    let indiceDerecha = 0;


    // ========================================
    // COMPARAR ELEMENTOS
    // ========================================

    while (
        indiceIzquierda < valoresIzquierda.length &&
        indiceDerecha < valoresDerecha.length
    ) {

        const posicionIzquierda =
            inicio + indiceIzquierda;

        const posicionDerecha =
            medio + 1 + indiceDerecha;

        const barras =
            document.querySelectorAll(".barra");


        // Resaltamos las barras que estamos comparando
        barras[posicionIzquierda].classList.add("comparando");
        barras[posicionDerecha].classList.add("comparando");


        // Aumentamos el contador
        comparaciones++;

        actualizarMetricas();


        // Esperamos para mostrar la comparación
        await esperar(velocidad);


        // Comparamos los valores
        if (
            valoresIzquierda[indiceIzquierda] <=
            valoresDerecha[indiceDerecha]
        ) {

            valoresOrdenados.push(
                valoresIzquierda[indiceIzquierda]
            );

            indiceIzquierda++;

        } else {

            valoresOrdenados.push(
                valoresDerecha[indiceDerecha]
            );

            indiceDerecha++;
        }


        // Quitamos el color de comparación
        barras[posicionIzquierda].classList.remove("comparando");
        barras[posicionDerecha].classList.remove("comparando");
    }


    // ========================================
    // AGREGAR ELEMENTOS RESTANTES
    // ========================================

    while (
        indiceIzquierda < valoresIzquierda.length
    ) {

        valoresOrdenados.push(
            valoresIzquierda[indiceIzquierda]
        );

        indiceIzquierda++;
    }


    while (
        indiceDerecha < valoresDerecha.length
    ) {

        valoresOrdenados.push(
            valoresDerecha[indiceDerecha]
        );

        indiceDerecha++;
    }


    // ========================================
    // COLOCAR LOS ELEMENTOS ORDENADOS
    // ========================================

    for (
        let indice = 0;
        indice < valoresOrdenados.length;
        indice++
    ) {

        const posicion =
            inicio + indice;

        const barras =
            document.querySelectorAll(".barra");


        // Si el valor cambia
        if (
            datos[posicion] !==
            valoresOrdenados[indice]
        ) {

            // Mostramos que el elemento se está colocando
            barras[posicion].classList.add(
                "intercambiando"
            );

            await esperar(velocidad);


            // Colocamos el nuevo valor
            datos[posicion] =
                valoresOrdenados[indice];


            // Aumentamos el contador
            intercambios++;

            actualizarMetricas();


            // Actualizamos las barras
            mostrarBarras();

            await esperar(velocidad);
        }
    }


    // ========================================
    // MARCAR SEGMENTO ORDENADO
    // ========================================

    for (
        let i = inicio;
        i <= fin;
        i++
    ) {

        if (!posicionesOrdenadas.includes(i)) {

            posicionesOrdenadas.push(i);
        }
    }


    mostrarBarras();

    await esperar(velocidad);


    // ========================================
    // TERMINAR MERGE SORT
    // ========================================

    if (esInicio) {

        posicionesOrdenadas = datos.map(
            (valor, indice) => indice
        );

        mostrarBarras();

        ejecutando = false;
    }
}




// ========================================
// REINICIAR
// ========================================

function reiniciar() {

    if (ejecutando) {
        return;
    }

    datos = [];

    posicionesOrdenadas = [];

    comparaciones = 0;
    intercambios = 0;

    actualizarMetricas();

    generarDatos();
}


// ========================================
// BOTÓN GENERAR
// ========================================

botonGenerar.addEventListener(
    "click",
    generarDatos
);


// ========================================
// BOTÓN REINICIAR
// ========================================

botonReiniciar.addEventListener(
    "click",
    reiniciar
);


// ========================================
// BOTÓN INICIAR
// ========================================

botonIniciar.addEventListener(
    "click",
    function() {

        if (ejecutando) {
            return;
        }

        const algoritmo =
            selectorAlgoritmo.value;

        if (algoritmo === "bubble") {
            bubbleSort();
        }

        if (algoritmo === "selection") {
            selectionSort();
        }

        if (algoritmo === "insertion") {
            insertionSort();
        }

        if (algoritmo === "gnome") {
            gnomeSort();
        }

        if (algoritmo === "exchange") {
            exchangeSort();
        }

        if (algoritmo === "stooge") {
            stoogeSort();
        }

        if (algoritmo === "quick") {
            quickSort();
        }

        if (algoritmo === "merge") {
            mergeSort();
        }
    }
);


// ========================================
// GENERAR DATOS AL ABRIR
// ========================================

generarDatos();