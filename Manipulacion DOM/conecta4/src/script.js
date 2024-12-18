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

    //let matriz = Array.from({ length: filas }, () => new Array(columnas).fill(0));
    //let matriz = new Array(filas).fill(null).map(() => new Array(columnas).fill(0));
    //console.log(matriz)


    generarMatriz = () => {
        mainMatrix = [];
        for (let i = 0; i < filas; i++){
            mainMatrix.push(new Array(columnas).fill(-1))
        }
        console.log(mainMatrix);
        tablero = mainMatrix;
    };
    
    generarMatriz();

    
    dibujarTablero = () =>{
        tableroDOM.style.gridTemplateColumns = `repeat(${columnas}, 1fr)`
        tableroDOM.style.gridTemplateRows = `repeat(${filas}, 1fr)`
        for (let i = (tamañoTablero-1); i >= 0 ; i--){
            let celda = document.createElement("div");
            celda.classList.add("celdaGrid");
            celda.style.display = "flex";
            celda.style.justifyContent = "center";
            celda.style.alignItems = "center";

            let fichaVacia = document.createElement("div");
            fichaVacia.classList.add("ficha");
            fichaVacia.style.backgroundColor = "white";
            fichaVacia.setAttribute("id", i)
            fichaVacia.style.height = "80%";
            fichaVacia.style.width = "80%";
            fichaVacia.style.borderRadius = "80%";

            celda.appendChild(fichaVacia);
            

            tableroDOM.appendChild(celda);
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
                    celdaMarcarDOM = document.getElementById(casillaDOM)
                    
                    if (jugador){
                        celdaMarcarDOM.style.backgroundColor = "red";
                        celdaMarcarDOM.style.border = "1.5px solid black";
                        tablero[contadorCasilla][filaMarcada] = "PJ1";
                        jugador = false;
                    }else{
                        celdaMarcarDOM.style.backgroundColor = "yellow";
                        celdaMarcarDOM.style.border = "1.5px solid black"
                        tablero[contadorCasilla][filaMarcada] = "PJ2";
                        jugador = true;
                    
                    }
                }else{
                    contadorCasilla = contadorCasilla + 1;
                    casillaDOM = casillaDOM + 7;
                    if (tablero[contadorCasilla] == undefined){
                        mensaje.className = "";
                        mensaje.classList.add("alerta")
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


    borrarMensaje = setInterval(() =>{
        if (mensaje.textContent != null){
            mensaje.innerText = null;
        }
    }, 6000
    )


    reiniciarJuego = () =>{
        todasLasCeldas = document.querySelectorAll(".ficha");

        todasLasCeldas.forEach(celda => {
            celda.style.backgroundColor = "white";
            celda.style.border = "none";
        });

        generarMatriz();

        mensaje.className = "";
        mensaje.classList.add("exitoso")
        mensaje.innerText = "Tablero reiniciado";
    }



    tableroDOM.addEventListener("click", ()=> tirarFicha(event));
    reiniciarBtn.addEventListener("click", reiniciarJuego)
}