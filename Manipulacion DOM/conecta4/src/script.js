window.onload = () =>{
    //Configuracion por defecto
    let filas = 6;
    let columnas = 7;
    let tamañoTablero = filas * columnas;
    let numFichasGanadoras = 4
    let nombreJ1 = "J1";
    let nombreJ2 = "J2";
    let jugador = true; //Indica quien es el jugador actual [TRUE -> J1 & FALSE -> J2]

    let tableroDOM = document.querySelector(".game");
    let mensaje = document.getElementById("mensaje");
    let reiniciarBtn = document.querySelector(".reiniciar");
    let tablero;
    let numeroTiradas = 0;
    let ganador = false;

    generarMatriz = () => {
        mainMatrix = [];
        for (let i = 0; i < filas; i++) {
            mainMatrix.push(new Array(columnas).fill(-1));
        }
        mainMatrix.reverse(); // Invierte las filas
        console.log(mainMatrix);
        tablero = mainMatrix;
    };
    
    generarMatriz();

    
    dibujarTablero = () =>{
        tableroDOM.style.gridTemplateColumns = `repeat(${columnas}, 1fr)`
        tableroDOM.style.gridTemplateRows = `repeat(${filas}, 1fr)`
        for (let i = (tamañoTablero-1); i >= 0 ; i--){
            let fichaVacia = document.createElement("div");
            fichaVacia.classList.add("ficha");
            fichaVacia.style.backgroundColor = "white";
            fichaVacia.setAttribute("id", i)

            tableroDOM.appendChild(fichaVacia);

        }
    }

    dibujarTablero();

    const tirarFicha = (event) =>{
        celdaPulsadaDOM = Number.parseInt(event.target.id);
        if (Number.isInteger(celdaPulsadaDOM)){
            fila = (celdaPulsadaDOM%columnas);
            console.log(tablero);
            casillaVacia = false;
            columna = 0;
            casillaDOM = fila;
            
    
            while (!casillaVacia){
                if (tablero[columna][fila] == -1){
                    casillaVacia = true;
                    numeroTiradas++;
                    celdaMarcarDOM = document.getElementById(casillaDOM)
                    
                    if (jugador){
                        celdaMarcarDOM.style.backgroundColor = "red";
                        celdaMarcarDOM.style.border = "1.5px solid black";
                        tablero[columna][fila] = jugador;
                        comprobarGanador(columna, fila, jugador);
                        jugador = false;
                    }else{
                        celdaMarcarDOM.style.backgroundColor = "yellow";
                        celdaMarcarDOM.style.border = "1.5px solid black"
                        tablero[columna][fila] = jugador;
                        comprobarGanador(columna, fila, jugador);
                        jugador = true;
                    }
                }else{

                    //Desplazamiento para colocar la siguiente ficha -> fila superior, a la casilla le sumamos el 
                    columna = columna + 1;
                    casillaDOM = casillaDOM + columnas;
                    
                    if (tablero[columna] == undefined){
                        mensaje.className = "";
                        mensaje.classList.add("alerta");
                        mensaje.innerText = "Fila llena";
                        break;
                    }
                }
    
            }
        }else{
            mensaje.className = "";
            mensaje.classList.add("error")
            mensaje.innerText = "No has seleccionado una casilla valida";
        }
    }

    const reiniciarJuego = () =>{
        todasLasCeldas = document.querySelectorAll(".ficha");

        todasLasCeldas.forEach(celda => {
            celda.style.backgroundColor = "white";
            celda.style.border = "none";
        });

        generarMatriz();
        tableroDOM.addEventListener("click", handleTirarFicha);
        iniciarBorradoMensaje();
        numeroTiradas = 0;
        jugador = true;
        ganador = false;

        mensaje.className = "";
        mensaje.classList.add("exitoso")
        mensaje.innerText = "Tablero reiniciado";
    }
    
    
    const comprobarHorizontal = (columna, fila, jugador) =>{
        let contadorFichas = 0;
            for (let i = fila; tablero[columna][i] == jugador; i++){
                contadorFichas++;
                if (contadorFichas == numFichasGanadoras){
                    anunciarGanador(jugador);
                    break;
                }
            }
            contadorFichas = 0
            for (let i = fila; tablero[columna][i] == jugador; i--){
                contadorFichas++;
                if (contadorFichas == numFichasGanadoras){
                    anunciarGanador(jugador);
                    break;
                }
            }
        }


    const comprobarVertical = (columna, fila, jugador) =>{
        // Solo comprobara el ganador en caso que la columna de la posicion marcada sea superior a 2, teniendo en cuenta que las columnas empiezan desde 0;
        if (columna > 2){
            let contadorFichas = 0;
            for (let i = columna; tablero[i][fila] == jugador; i--){
                console.log(i)
                contadorFichas++;
                if (contadorFichas == numFichasGanadoras){
                    anunciarGanador(jugador);
                    break;
                }
            }
        }
    }

    const comprobarDiagonales = (columna, fila, jugador) =>{
        if (columna > 2){
            let contadorFichas = 0;
    
            let i = columna;
            let j = fila;
    
            // Recorre la diagonal hacia arriba-izquierda
            while (i >= 0 && j >= 0 && tablero[i][j] == jugador) {
                contadorFichas++;
                console.log("Contador de fichas diagonales aRRIBA-IZQUIERDA: " + contadorFichas);
    
                if (contadorFichas == numFichasGanadoras) {
                    anunciarGanador(jugador);
                    return;
                }
    
                i--;
                j--;
            }


            i = columna;
            j = fila;
            contadorFichas = 0;

            while (i >= 0 && j < columnas && tablero[i][j] == jugador) {
                contadorFichas++;
                console.log("Contador de fichas diagonales: " + contadorFichas);
    
                if (contadorFichas == numFichasGanadoras) {
                    anunciarGanador(jugador);
                    return;
                }
    
                i--;
                j++;
            }
        }
            
            
            /*console.log("he entrado en la comprobacion de las diagonalies") 
            let contadorFichas = 0
            for (let i = columna; tablero[i][fila] == jugador; i--){
                    console.log(tablero[i][fila-1]);
                    if (tablero[i][fila-1] == jugador){
                        fila--;
                        contadorFichas++;
                        console.log("Contador de fichas diagonales:" + contadorFichas)
                        if (contadorFichas == 4){
                            anunciarGanador(jugador);
                            break;
                        }
                    }
                }
            }*/
        }




    const comprobarGanador = (columna, fila, jugador) =>{
        if (!ganador){
            console.log("Numero de tiradas " + numeroTiradas);

            comprobarHorizontal(columna, fila, jugador);
            comprobarVertical(columna, fila, jugador);
            comprobarDiagonales(columna, fila, jugador);


            //Empate
            if (numeroTiradas == tamañoTablero & !ganador){
                tableroDOM.removeEventListener("click", handleTirarFicha);
                detenerBorradorMensaje();
                mensaje.className = "";
                mensaje.classList.add("error");
                mensaje.innerText = "¡EMPATE! Reinicie el juego para jugar de nuevo";
            }
        }
    }


    const anunciarGanador = (jugador) =>{
        nombreJugador = nombreJ1;
        if (!jugador) nombreJugador = nombreJ2
        ganador = true;
        mensaje.className = "";
        mensaje.classList.add("exitoso")
        mensaje.innerText = `Enhorabuena ${nombreJugador} has ganado la partida`;
        tableroDOM.removeEventListener("click", handleTirarFicha);
        detenerBorradorMensaje();
    }



    function handleTirarFicha(event) {
        tirarFicha(event);
    }


    iniciarBorradoMensaje = () =>{
        borrarMensaje = setInterval(() =>{
            if (mensaje.textContent != null){
                mensaje.innerText = null;
            }
        }, 6000
        )
    }

    iniciarBorradoMensaje();

    detenerBorradorMensaje = () =>{
        clearInterval(borrarMensaje);
    }
    

    tableroDOM.addEventListener("click", handleTirarFicha);
    reiniciarBtn.addEventListener("click", reiniciarJuego);
}