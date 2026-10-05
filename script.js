
// ========================================
// ELEMENTOS DE LA INTERFAZ
// ========================================

const contenedorBarras =
    document.getElementById("contenedor-barras");

const botonGenerar =
    document.getElementById("generar");

const botonIniciar =
    document.getElementById("iniciar");

const botonReiniciar =
    document.getElementById("reiniciar");

const controlVelocidad =
    document.getElementById("velocidad");

const selectorAlgoritmo =
    document.getElementById("algoritmo");

const nombreAlgoritmo =
    document.getElementById("nombre-algoritmo");

const elementoTiempo =
    document.getElementById("tiempo-ejecucion");


// ========================================
// CONFIGURACIÓN
// ========================================

const cantidadElementos = 20;

let datos = [];

let comparaciones = 0;
let intercambios = 0;

let tiempoEjecucion = 0;

let posicionesOrdenadas = [];

let ejecutando = false;

let velocidad = 300;


// ========================================
// TIEMPOS DE LOS ALGORITMOS
// ========================================

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


// ========================================
// NOMBRES DE LOS ALGORITMOS
// ========================================

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


// ========================================
// GENERAR DATOS
// ========================================

function generarDatos() {

    if (ejecutando) {
        return;
    }

    datos = [];

    posicionesOrdenadas = [];

    for (
        let i = 0;
        i < cantidadElementos;
        i++
    ) {

        const valor =
            Math.floor(Math.random() * 91) + 10;

        datos.push(valor);
    }

    comparaciones = 0;

    intercambios = 0;

    tiempoEjecucion = 0;

    actualizarMetricas();

    actualizarTiempo();

    mostrarBarras();
}


// ========================================
// MOSTRAR BARRAS
// ========================================

function mostrarBarras() {

    contenedorBarras.innerHTML = "";

    for (
        let i = 0;
        i < datos.length;
        i++
    ) {

        const barra =
            document.createElement("div");

        barra.classList.add("barra");

        // La altura depende del valor
        barra.style.height =
            datos[i] + "%";

        barra.textContent =
            datos[i];

        barra.dataset.valor =
            datos[i];

        barra.dataset.indice =
            i;

        if (
            posicionesOrdenadas.includes(i)
        ) {

            barra.classList.add("ordenada");
        }

        contenedorBarras.appendChild(barra);
    }
}


// ========================================
// ACTUALIZAR MÉTRICAS
// ========================================

function actualizarMetricas() {

    document.getElementById(
        "comparaciones"
    ).textContent = comparaciones;

    document.getElementById(
        "intercambios"
    ).textContent = intercambios;
}


// ========================================
// ACTUALIZAR TIEMPO
// ========================================

function actualizarTiempo() {

    if (elementoTiempo) {

        elementoTiempo.textContent =
            tiempoEjecucion.toFixed(3) +
            " ms";
    }
}


// ========================================
// ESPERAR
// ========================================

function esperar(tiempo) {

    return new Promise(
        resolve => setTimeout(resolve, tiempo)
    );
}


// ========================================
// VELOCIDAD
// ========================================

function actualizarVelocidad() {

    const valor =
        Number(controlVelocidad.value);

    velocidad =
        600 - (valor * 50);
}


controlVelocidad.addEventListener(
    "input",
    actualizarVelocidad
);

actualizarVelocidad();


// ========================================
// ACTUALIZAR NOMBRE
// ========================================

function actualizarNombreAlgoritmo() {

    const opcion =
        selectorAlgoritmo.options[
            selectorAlgoritmo.selectedIndex
        ];

    nombreAlgoritmo.textContent =
        opcion.textContent;

    actualizarComplejidad();
}


// ========================================
// COMPLEJIDAD
// ========================================

function actualizarComplejidad() {

    const algoritmo =
        selectorAlgoritmo.value;

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

    const elemento =
        document.getElementById("complejidad");

    if (elemento) {

        elemento.textContent =
            complejidad;
    }
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

    for (
        let i = 0;
        i < datos.length - 1;
        i++
    ) {

        for (
            let j = 0;
            j < datos.length - 1 - i;
            j++
        ) {

            const barras =
                document.querySelectorAll(".barra");

            barras[j].classList.add(
                "comparando"
            );

            barras[j + 1].classList.add(
                "comparando"
            );

            comparaciones++;

            actualizarMetricas();

            await esperar(velocidad);

            if (
                datos[j] > datos[j + 1]
            ) {

                barras[j].classList.remove(
                    "comparando"
                );

                barras[j + 1].classList.remove(
                    "comparando"
                );

                barras[j].classList.add(
                    "intercambiando"
                );

                barras[j + 1].classList.add(
                    "intercambiando"
                );

                await esperar(velocidad);

                const temporal =
                    datos[j];

                datos[j] =
                    datos[j + 1];

                datos[j + 1] =
                    temporal;

                intercambios++;

                actualizarMetricas();

                mostrarBarras();

                await esperar(velocidad);

            } else {

                barras[j].classList.remove(
                    "comparando"
                );

                barras[j + 1].classList.remove(
                    "comparando"
                );
            }
        }

        posicionesOrdenadas.push(
            datos.length - 1 - i
        );

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

    for (
        let i = 0;
        i < datos.length - 1;
        i++
    ) {

        let indiceMinimo = i;

        for (
            let j = i + 1;
            j < datos.length;
            j++
        ) {

            const barras =
                document.querySelectorAll(".barra");

            barras[indiceMinimo].classList.add(
                "comparando"
            );

            barras[j].classList.add(
                "comparando"
            );

            comparaciones++;

            actualizarMetricas();

            await esperar(velocidad);

            if (
                datos[j] <
                datos[indiceMinimo]
            ) {

                indiceMinimo = j;
            }

            barras[indiceMinimo].classList.remove(
                "comparando"
            );

            barras[j].classList.remove(
                "comparando"
            );
        }

        if (
            indiceMinimo !== i
        ) {

            const barras =
                document.querySelectorAll(".barra");

            barras[i].classList.add(
                "intercambiando"
            );

            barras[indiceMinimo].classList.add(
                "intercambiando"
            );

            await esperar(velocidad);

            const temporal =
                datos[i];

            datos[i] =
                datos[indiceMinimo];

            datos[indiceMinimo] =
                temporal;

            intercambios++;

            actualizarMetricas();

            mostrarBarras();

            await esperar(velocidad);
        }

        posicionesOrdenadas.push(i);

        mostrarBarras();

        await esperar(velocidad);
    }

    posicionesOrdenadas.push(
        datos.length - 1
    );

    mostrarBarras();

    ejecutando = false;
}


// ========================================
// INSERTION SORT
// ========================================

async function insertionSort() {

    ejecutando = true;

    for (
        let i = 1;
        i < datos.length;
        i++
    ) {

        let j = i;

        while (j > 0) {

            const barras =
                document.querySelectorAll(".barra");

            barras[j - 1].classList.add(
                "comparando"
            );

            barras[j].classList.add(
                "comparando"
            );

            comparaciones++;

            actualizarMetricas();

            await esperar(velocidad);

            if (
                datos[j - 1] <= datos[j]
            ) {

                barras[j - 1].classList.remove(
                    "comparando"
                );

                barras[j].classList.remove(
                    "comparando"
                );

                break;
            }

            barras[j - 1].classList.remove(
                "comparando"
            );

            barras[j].classList.remove(
                "comparando"
            );

            barras[j - 1].classList.add(
                "intercambiando"
            );

            barras[j].classList.add(
                "intercambiando"
            );

            await esperar(velocidad);

            const temporal =
                datos[j - 1];

            datos[j - 1] =
                datos[j];

            datos[j] =
                temporal;

            intercambios++;

            actualizarMetricas();

            mostrarBarras();

            await esperar(velocidad);

            j--;
        }
    }

    posicionesOrdenadas =
        datos.map(
            (valor, indice) => indice
        );

    mostrarBarras();

    ejecutando = false;
}


// ========================================
// GNOME SORT
// ========================================

async function gnomeSort() {

    ejecutando = true;

    let indice = 1;

    while (
        indice < datos.length
    ) {

        if (indice === 0) {
            indice = 1;
        }

        const barras =
            document.querySelectorAll(".barra");

        barras[indice - 1].classList.add(
            "comparando"
        );

        barras[indice].classList.add(
            "comparando"
        );

        comparaciones++;

        actualizarMetricas();

        await esperar(velocidad);

        if (
            datos[indice - 1] <=
            datos[indice]
        ) {

            barras[indice - 1].classList.remove(
                "comparando"
            );

            barras[indice].classList.remove(
                "comparando"
            );

            indice++;

            continue;
        }

        barras[indice - 1].classList.remove(
            "comparando"
        );

        barras[indice].classList.remove(
            "comparando"
        );

        barras[indice - 1].classList.add(
            "intercambiando"
        );

        barras[indice].classList.add(
            "intercambiando"
        );

        await esperar(velocidad);

        const temporal =
            datos[indice - 1];

        datos[indice - 1] =
            datos[indice];

        datos[indice] =
            temporal;

        intercambios++;

        actualizarMetricas();

        mostrarBarras();

        await esperar(velocidad);

        indice--;
    }

    posicionesOrdenadas =
        datos.map(
            (valor, indiceActual) =>
                indiceActual
        );

    mostrarBarras();

    ejecutando = false;
}


// ========================================
// EXCHANGE SORT
// ========================================

async function exchangeSort() {

    ejecutando = true;

    for (
        let i = 0;
        i < datos.length - 1;
        i++
    ) {

        for (
            let j = i + 1;
            j < datos.length;
            j++
        ) {

            const barras =
                document.querySelectorAll(".barra");

            barras[i].classList.add(
                "comparando"
            );

            barras[j].classList.add(
                "comparando"
            );

            comparaciones++;

            actualizarMetricas();

            await esperar(velocidad);

            if (
                datos[i] > datos[j]
            ) {

                barras[i].classList.remove(
                    "comparando"
                );

                barras[j].classList.remove(
                    "comparando"
                );

                barras[i].classList.add(
                    "intercambiando"
                );

                barras[j].classList.add(
                    "intercambiando"
                );

                await esperar(velocidad);

                const temporal =
                    datos[i];

                datos[i] =
                    datos[j];

                datos[j] =
                    temporal;

                intercambios++;

                actualizarMetricas();

                mostrarBarras();

                await esperar(velocidad);

            } else {

                barras[i].classList.remove(
                    "comparando"
                );

                barras[j].classList.remove(
                    "comparando"
                );
            }
        }

        posicionesOrdenadas.push(i);

        mostrarBarras();
    }

    posicionesOrdenadas.push(
        datos.length - 1
    );

    mostrarBarras();

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

        return;
    }

    const barras =
        document.querySelectorAll(".barra");

    barras[inicio].classList.add(
        "comparando"
    );

    barras[fin].classList.add(
        "comparando"
    );

    comparaciones++;

    actualizarMetricas();

    await esperar(velocidad);

    if (
        datos[inicio] >
        datos[fin]
    ) {

        barras[inicio].classList.remove(
            "comparando"
        );

        barras[fin].classList.remove(
            "comparando"
        );

        barras[inicio].classList.add(
            "intercambiando"
        );

        barras[fin].classList.add(
            "intercambiando"
        );

        await esperar(velocidad);

        const temporal =
            datos[inicio];

        datos[inicio] =
            datos[fin];

        datos[fin] =
            temporal;

        intercambios++;

        actualizarMetricas();

        mostrarBarras();

        await esperar(velocidad);

    } else {

        barras[inicio].classList.remove(
            "comparando"
        );

        barras[fin].classList.remove(
            "comparando"
        );
    }

    const tercio =
        Math.floor(
            (fin - inicio + 1) / 3
        );

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

        posicionesOrdenadas =
            datos.map(
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

        return;
    }

    const pivote =
        datos[
            Math.floor(
                (inicio + fin) / 2
            )
        ];

    let izquierda = inicio;

    let derecha = fin;

    while (
        izquierda <= derecha
    ) {

        while (
            datos[izquierda] < pivote
        ) {

            izquierda++;
        }

        while (
            datos[derecha] > pivote
        ) {

            derecha--;
        }

        if (
            izquierda <= derecha
        ) {

            const barras =
                document.querySelectorAll(".barra");

            barras[izquierda].classList.add(
                "comparando"
            );

            barras[derecha].classList.add(
                "comparando"
            );

            comparaciones++;

            actualizarMetricas();

            await esperar(velocidad);

            if (
                izquierda < derecha
            ) {

                barras[izquierda].classList.remove(
                    "comparando"
                );

                barras[derecha].classList.remove(
                    "comparando"
                );

                barras[izquierda].classList.add(
                    "intercambiando"
                );

                barras[derecha].classList.add(
                    "intercambiando"
                );

                await esperar(velocidad);

                const temporal =
                    datos[izquierda];

                datos[izquierda] =
                    datos[derecha];

                datos[derecha] =
                    temporal;

                intercambios++;

                actualizarMetricas();

                mostrarBarras();

                await esperar(velocidad);

            } else {

                barras[izquierda].classList.remove(
                    "comparando"
                );

                barras[derecha].classList.remove(
                    "comparando"
                );
            }

            izquierda++;

            derecha--;
        }
    }

    if (
        inicio < derecha
    ) {

        await quickSort(
            inicio,
            derecha
        );
    }

    if (
        izquierda < fin
    ) {

        await quickSort(
            izquierda,
            fin
        );
    }

    if (esInicio) {

        posicionesOrdenadas =
            datos.map(
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
        Math.floor(
            (inicio + fin) / 2
        );

    await mergeSort(
        inicio,
        medio
    );

    await mergeSort(
        medio + 1,
        fin
    );

    const valoresIzquierda =
        datos.slice(
            inicio,
            medio + 1
        );

    const valoresDerecha =
        datos.slice(
            medio + 1,
            fin + 1
        );

    const valoresOrdenados = [];

    let indiceIzquierda = 0;

    let indiceDerecha = 0;

    while (
        indiceIzquierda <
            valoresIzquierda.length &&
        indiceDerecha <
            valoresDerecha.length
    ) {

        const posicionIzquierda =
            inicio +
            indiceIzquierda;

        const posicionDerecha =
            medio +
            1 +
            indiceDerecha;

        const barras =
            document.querySelectorAll(".barra");

        barras[posicionIzquierda]
            .classList.add(
                "comparando"
            );

        barras[posicionDerecha]
            .classList.add(
                "comparando"
            );

        comparaciones++;

        actualizarMetricas();

        await esperar(velocidad);

        if (
            valoresIzquierda[
                indiceIzquierda
            ] <=
            valoresDerecha[
                indiceDerecha
            ]
        ) {

            valoresOrdenados.push(
                valoresIzquierda[
                    indiceIzquierda
                ]
            );

            indiceIzquierda++;

        } else {

            valoresOrdenados.push(
                valoresDerecha[
                    indiceDerecha
                ]
            );

            indiceDerecha++;
        }

        barras[posicionIzquierda]
            .classList.remove(
                "comparando"
            );

        barras[posicionDerecha]
            .classList.remove(
                "comparando"
            );
    }

    while (
        indiceIzquierda <
        valoresIzquierda.length
    ) {

        valoresOrdenados.push(
            valoresIzquierda[
                indiceIzquierda
            ]
        );

        indiceIzquierda++;
    }

    while (
        indiceDerecha <
        valoresDerecha.length
    ) {

        valoresOrdenados.push(
            valoresDerecha[
                indiceDerecha
            ]
        );

        indiceDerecha++;
    }

    for (
        let indice = 0;
        indice < valoresOrdenados.length;
        indice++
    ) {

        const posicion =
            inicio + indice;

        if (
            datos[posicion] !==
            valoresOrdenados[indice]
        ) {

            const barras =
                document.querySelectorAll(".barra");

            barras[posicion]
                .classList.add(
                    "intercambiando"
                );

            await esperar(velocidad);

            datos[posicion] =
                valoresOrdenados[indice];

            intercambios++;

            actualizarMetricas();

            mostrarBarras();

            await esperar(velocidad);
        }
    }

    if (esInicio) {

        posicionesOrdenadas =
            datos.map(
                (valor, indice) => indice
            );

        mostrarBarras();

        ejecutando = false;
    }
}


// ========================================
// EJECUTAR ALGORITMO
// ========================================

async function ejecutarAlgoritmo(
    algoritmo
) {

    if (ejecutando) {
        return;
    }

    if (datos.length === 0) {

        generarDatos();
    }

    comparaciones = 0;

    intercambios = 0;

    tiempoEjecucion = 0;

    posicionesOrdenadas = [];

    actualizarMetricas();

    actualizarTiempo();

    // ========================================
    // MEDIR TIEMPO
    // ========================================

    const inicio =
        performance.now();


    if (algoritmo === "bubble") {

        await bubbleSort();
    }

    else if (algoritmo === "selection") {

        await selectionSort();
    }

    else if (algoritmo === "insertion") {

        await insertionSort();
    }

    else if (algoritmo === "gnome") {

        await gnomeSort();
    }

    else if (algoritmo === "exchange") {

        await exchangeSort();
    }

    else if (algoritmo === "stooge") {

        await stoogeSort();
    }

    else if (algoritmo === "quick") {

        await quickSort();
    }

    else if (algoritmo === "merge") {

        await mergeSort();
    }


    const fin =
        performance.now();


    tiempoEjecucion =
        fin - inicio;


    // Guardar tiempo del algoritmo

    tiemposAlgoritmos[
        algoritmo
    ] =
        tiempoEjecucion;


    actualizarTiempo();

    actualizarGrafica();
}


// ========================================
// GRÁFICA DE TIEMPOS
// ========================================

function actualizarGrafica() {

    const canvas =
        document.getElementById(
            "grafica-tiempos"
        );

    if (!canvas) {
        return;
    }

    const contexto =
        canvas.getContext("2d");

    const ancho =
        canvas.clientWidth || 800;

    const alto =
        canvas.clientHeight || 400;

    canvas.width = ancho;

    canvas.height = alto;

    contexto.clearRect(
        0,
        0,
        ancho,
        alto
    );


    const resultados =
        Object.entries(
            tiemposAlgoritmos
        ).filter(
            ([algoritmo, tiempo]) =>
                tiempo !== null
        );


    // ========================================
    // NO HAY RESULTADOS
    // ========================================

    if (
        resultados.length === 0
    ) {

        contexto.fillStyle =
            "#333";

        contexto.font =
            "16px Arial";

        contexto.textAlign =
            "center";

        contexto.fillText(
            "Ejecuta un algoritmo para mostrar resultados",
            ancho / 2,
            alto / 2
        );

        return;
    }


    // ========================================
    // MEDIDAS
    // ========================================

    const margenIzquierdo = 70;

    const margenDerecho = 30;

    const margenSuperior = 40;

    const margenInferior = 80;


    const anchoGrafica =
        ancho -
        margenIzquierdo -
        margenDerecho;

    const altoGrafica =
        alto -
        margenSuperior -
        margenInferior;


    const tiempoMaximo =
        Math.max(
            ...resultados.map(
                ([algoritmo, tiempo]) =>
                    tiempo
            )
        );


    // Evitar división entre cero

    const maximoSeguro =
        tiempoMaximo === 0
            ? 1
            : tiempoMaximo;


    const espacioBarra =
        anchoGrafica /
        resultados.length;

    const anchoBarra =
        espacioBarra * 0.6;


    // ========================================
    // DIBUJAR BARRAS
    // ========================================

    resultados.forEach(
        ([algoritmo, tiempo], indice) => {

            const alturaBarra =
                (
                    tiempo /
                    maximoSeguro
                ) *
                altoGrafica;


            const x =
                margenIzquierdo +
                indice *
                espacioBarra +
                (
                    espacioBarra -
                    anchoBarra
                ) / 2;


            const y =
                margenSuperior +
                altoGrafica -
                alturaBarra;


            // Barra

            contexto.fillStyle =
                "#38bdf8";

            contexto.fillRect(
                x,
                y,
                anchoBarra,
                alturaBarra
            );


            // Nombre

            contexto.fillStyle =
                "#000";

            contexto.font =
                "12px Arial";

            contexto.textAlign =
                "center";

            contexto.fillText(
                nombresAlgoritmos[
                    algoritmo
                ],

                x +
                anchoBarra / 2,

                alto - 40
            );


            // Tiempo

            contexto.fillText(
                tiempo.toFixed(3) +
                " ms",

                x +
                anchoBarra / 2,

                y - 8
            );
        }
    );


    // ========================================
    // EJES
    // ========================================

    contexto.strokeStyle =
        "#000";

    contexto.lineWidth = 1;

    contexto.beginPath();

    // Eje vertical

    contexto.moveTo(
        margenIzquierdo,
        margenSuperior
    );

    contexto.lineTo(
        margenIzquierdo,
        margenSuperior +
        altoGrafica
    );


    // Eje horizontal

    contexto.lineTo(
        ancho -
        margenDerecho,

        margenSuperior +
        altoGrafica
    );

    contexto.stroke();
}


// ========================================
// REINICIAR
// ========================================

function reiniciar() {

    /*
        Si el algoritmo está ejecutándose,
        no generamos otro proceso encima.
    */

    if (ejecutando) {
        return;
    }

    datos = [];

    posicionesOrdenadas = [];

    comparaciones = 0;

    intercambios = 0;

    tiempoEjecucion = 0;


    // Borrar comparación de tiempos

    for (
        const algoritmo in tiemposAlgoritmos
    ) {

        tiemposAlgoritmos[
            algoritmo
        ] = null;
    }


    actualizarMetricas();

    actualizarTiempo();

    actualizarGrafica();

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

        ejecutarAlgoritmo(
            algoritmo
        );
    }
);


// ========================================
// INICIO
// ========================================

generarDatos();

actualizarGrafica();
