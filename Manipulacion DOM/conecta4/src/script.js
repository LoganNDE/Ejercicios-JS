//Configuracion por defecto
let filas = 6;
let columnas = 7;
let tamañoTablero = filas * columnas;

//Indica quien es el jugador actual [TRUE -> J1 & FALSE -> J2]
let jugador = true;

window.onload = () =>{
    let tableroDOM = document.querySelector(".game");
    let mensaje = document.getElementById("mensaje");
    let reiniciarBtn = document.querySelector(".reiniciar");
    let tablero;
    let numeroTiradas = 0;
    let ganador = false;

    //let matriz = Array.from({ length: filas }, () => new Array(columnas).fill(0));
    //let matriz = new Array(filas).fill(null).map(() => new Array(columnas).fill(0));
    //console.log(matriz)


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
            filaMarcada = (celdaPulsadaDOM%columnas);
            console.log(tablero);
            casillaVacia = false;
            contadorCasilla = 0;
            casillaDOM = filaMarcada;
            
    
            while (!casillaVacia){
                if (tablero[contadorCasilla][filaMarcada] == -1){
                    casillaVacia = true;
                    numeroTiradas++;
                    celdaMarcarDOM = document.getElementById(casillaDOM)
                    
                    if (jugador){
                        celdaMarcarDOM.style.backgroundColor = "red";
                        celdaMarcarDOM.style.border = "1.5px solid black";
                        tablero[contadorCasilla][filaMarcada] = jugador;
                        jugador = false;
                    }else{
                        celdaMarcarDOM.style.backgroundColor = "yellow";
                        celdaMarcarDOM.style.border = "1.5px solid black"
                        tablero[contadorCasilla][filaMarcada] = jugador;
                        jugador = true;
                    
                    }
                    
                    comprobarGanador(contadorCasilla, filaMarcada);
                
                }else{
                    contadorCasilla = contadorCasilla + 1;
                    casillaDOM = casillaDOM + 7;
                    if (tablero[contadorCasilla] == undefined){
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

        mensaje.className = "";
        mensaje.classList.add("exitoso")
        mensaje.innerText = "Tablero reiniciado";
    }
    
    
    const comprobarVertical = (contadorFila, casillaMarcada) =>{
        let contadorFichas = 0;
        console.log("cords: " + contadorFila + ":" + casillaMarcada)

        console.log(tablero[contadorFila][casillaMarcada])


        //CAMBIAMOS DE JUGADOR DE FALSE->TRUE, YA QUE AL TIRAR LA FICHA, ESTA CAMBIA DE JUGADOR ANTES DE HACER LA COMPORBACIÓN
        if (!jugador){
            for (let i = casillaMarcada; tablero[contadorFila][i] == true; i++){
                contadorFichas++;
                if (contadorFichas == 4){
                    alert("ganadorJ1")
                    break;
                }
            }
            contadorFichas = 0
            for (let i = casillaMarcada; tablero[contadorFila][i] == true; i--){
                contadorFichas++;
                if (contadorFichas == 4){
                    alert("ganadorJ1")
                    break;
                }
            }
        }else{
            for (let i = casillaMarcada; tablero[contadorFila][i] == false; i++){
                contadorFichas++;
                if (contadorFichas == 4){
                    alert("ganadorJ2")
                    break;
                }
            }
        }

    }




    const comprobarGanador = (contadorCasilla, filaMarcada) =>{
        console.log(numeroTiradas);
        if (numeroTiradas == tamañoTablero){
            tableroDOM.removeEventListener("click", handleTirarFicha);
            detenerBorradorMensaje();
            mensaje.className = "";
            mensaje.classList.add("error");
            mensaje.innerText = "¡EMPATE! Reinicie el juego para jugar de nuevo";
        }
        
        comprobarVertical(contadorCasilla, filaMarcada);
        /*while (!ganador){
            
        
        } 
        
        */
        
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