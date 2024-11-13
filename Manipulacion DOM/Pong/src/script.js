    const paddleLeft = document.querySelector(".p-left");
    const paddleRight = document.querySelector(".p-right");
    const ball = document.getElementById("ball");
    const gameBoard = document.querySelector(".gameBoard");
    const gameOnePlayer = document.querySelector(".gameOnePlayer");
    const gameTwoPlayers = document.querySelector(".gameTwoPlayers");
    const btnSettingsHome = document.querySelector(".btnSettingsHome");
    const btnSettings = document.querySelector(".btnStn");
    const closeSettings = document.querySelector(".closeSettings");
    const bntPause = document.querySelector(".btnPause");
    const btnHome = document.querySelector(".btnHome");
    const btnConfirmStg = document.querySelector("#btnConfirmStn");
    const keyChanger = document.querySelector("#keyChanger")
    const musicIntro = document.getElementById('intro');
    const stopMusic = document.querySelector(".stopMusic");
    const svgMusicON = document.querySelector(".musicIconON")
    const svgMusicOFF = document.querySelector(".musicIconOFF")

    musicIntro.volume = 0.20; // Ajusta el valor según la necesidada

    
    var gameOn = false; //Indicamos que el no ha empezado
    let moveUPLeft = false;
    let moveDownLeft = false;
    let moveUPRight = false;
    let moveDownRight = false;


    let settingsShow = false;
    let twoPlayers = false;
    let musicOn = true;


    var ball_movement = null;
    let velocityBall = 5;
    var velocity_x = null;
    var velocity_y = null;
    

    //Caracteristicas del tablero
    let widthBoard = 95;
    let heightBoard = 80;
    let borderBoard = 10;
    let colorBorderBoard = "white";
    let ColorBoard = "#000000";

    applySettingsBoard = () =>{
    //configuraciones del tablero
    gameBoard.style.width = widthBoard + "%";
    gameBoard.style.height = heightBoard + "%";
    gameBoard.style.border = borderBoard + "px " + "solid " + colorBorderBoard; 
    gameBoard.style.backgroundColor = ColorBoard;
    }


    //Caracteristicas de la pelota
    let ballSize = 80;
    let ballColor = "#FF4500";
    //Calculo de radio de la pelota
    let radiusBall = ballSize/2;

    applySettingsBall = () =>{
    //configuraciones de la pelota
    ball.style.width = ballSize + "px";
    ball.style.height = ballSize + "px";
    ball.style.borderRadius = radiusBall + "px";
    ball.style.backgroundColor = ballColor;
    velocity_x = velocityBall;
    velocity_y = velocityBall;
    }

    //Caracteristicas de la pala
    let paddleWidth = 40;
    let paddleHeight = 150;
    let separationPaddle = 50;
    let colorPaddle = "#ECECEC";

    //Teclas por defecto
    let j1Up = "a";
    let j1Down = "z";
    let j2Up = "k";
    let j2Down = "m";


    applySettingsPaddleLeft = () =>{
    //Configuracion de la pala
    paddleLeft.style.width = paddleWidth + "px"
    paddleLeft.style.height = paddleHeight + "px"
    paddleLeft.style.left = separationPaddle + "px"
    paddleLeft.style.backgroundColor = colorPaddle;
    }

    applySettingsPaddleRight = () =>{
        paddleRight.style.width = paddleWidth + "px"
        paddleRight.style.height = paddleHeight + "px"
        paddleRight.style.right = separationPaddle + "px"
        paddleRight.style.backgroundColor = colorPaddle;
    }

    
    //Configuraciones (Inputs)
    let ballSizeStn = document.querySelector("#ballSizeStn");
    let ballVelocityStn = document.querySelector("#ballVelocityStn");
    let ballColorStn = document.querySelector("#colorPickerBall")

    let paddleHeightStn = document.querySelector("#paddleHeightStn");
    let paddleWidthStn = document.querySelector("#paddleWidthStn");
    let paddleColorStn = document.querySelector("#colorPickerPaddle");

    let keyJ1Up = document.querySelector(".J1Up");
    let keyJ1Down = document.querySelector(".J1Down");
    let keyJ2Up = document.querySelector(".J2Up");
    let keyJ2Down = document.querySelector(".J2Down");

    let boardColorStn = document.querySelector("#colorPickerBoard");

    ballSizeStn.value = ballSize;
    ballVelocityStn.value = velocityBall;
    ballColorStn.value = ballColor;

    paddleHeightStn.value = paddleHeight;
    paddleWidthStn.value = paddleWidth;
    paddleColorStn.value = colorPaddle;

    keyJ1Up.textContent = j1Up;
    keyJ1Down.textContent = j1Down;
    keyJ2Up.textContent = j2Up;
    keyJ2Down.textContent = j2Down;

    boardColorStn.value = ColorBoard;


    //Aplciar configuracion por defecto de los elemetos del videojuego
    applySettingsBall();
    applySettingsPaddleLeft();
    applySettingsBoard();



    /*
    const ball_radius = 0;
    var  velocicty = 30;
    var angle = Math.random() * (Math.PI/2 - 0.25);
    var velocity_x = velocicty *  Math.cos(angle);
    var velocity_y = (Math.random()>0.5)?(-1):(1) * velocicty *  Math.sin(angle);
    */

    hiddeMenu = () =>{
        menu = document.querySelector(".wrapperMain");
        menu.classList.add("hiddenContent");
    }

    showMenu = () =>{
        menu = document.querySelector(".wrapperMain");
        menu.classList.remove("hiddenContent");
    }

    hiddeGame = () =>{
        game = document.querySelector(".wrapperGame");
        game.classList.add("hiddenContent");
    }

    showGame= () =>{
        game = document.querySelector(".wrapperGame");
        game.classList.remove("hiddenContent");
    }

    hiddeGameOver = () =>{
        gameOver = document.querySelector("#gameOver");
        gameOver.classList.add("hiddenContent");
    }

    showGameOver = () =>{
        gameOver = document.querySelector("#gameOver");
        gameOver.classList.remove("hiddenContent");
    }

    hiddeSettings = () =>{
        settings = document.querySelector("#settings");
        settings.classList.add("hiddenContent");
    }

    showSettings = () =>{
        settings = document.querySelector("#settings");
        settings.classList.remove("hiddenContent");
    }

    hiddePaddleRight = () =>{
        paddleRight.classList.add("hiddenContent");
    }

    showPaddleRight = () =>{
        paddleRight.classList.remove("hiddenContent");
    }

    hiddeKeyChanger = () =>{
        keyChanger.classList.add("hiddenContent");
    }

    showKeyChanger = () =>{
        keyChanger.classList.remove("hiddenContent");
    }

    showIconMusicON = () =>{
        svgMusicON.classList.remove("hiddenContent");
    }

    hiddeIconMusicON = () =>{
        svgMusicON.classList.add("hiddenContent");
    }

    showIconMusicOFF = () =>{
        svgMusicOFF.classList.remove("hiddenContent");
    }

    hiddeIconMusicOFF = () =>{
        svgMusicOFF.classList.add("hiddenContent");
    }





    gameOverLayer = () =>{
        var playAgain = document.querySelector(".playAgain")
        var backHome = document.querySelector(".backMenu")

        playAgain.addEventListener("click", () =>{
            hiddeGameOver();
            restartGame();
        })

        backHome.addEventListener("click", () =>{
            hiddeGameOver();
            hiddeGame();
            showMenu();
            clearInterval(ball_movement)
            gameOn = false;
        })
    }

    restartPositionBall = () =>{
        ball.style.top = "calc(50% - 40px)";
        ball.style.left = "calc(50% - 40px)";
        velocity_x = velocityBall;
        velocity_y = velocityBall;
    }

    restartPositionPaddleLeft = () =>{
        paddleLeft.style.top = "calc(50% - 75px)";
    }

    restartPositionPaddleRight = () =>{
        paddleLeft.style.top = "calc(50% - 75px)";
    }

    restartGame = () =>{
        clearInterval(ball_movement);
        gamePaused = false;
        restartPositionBall();
        ball_movement = setInterval(move_ball, 10);
        restartPositionPaddleLeft();
        if (twoPlayers){
            restartPositionPaddleRight();
        }
    }

    gameOnePlayer.addEventListener("click", () => {
        gameOn = true;
        twoPlayers = false;
        hiddePaddleRight();
        hiddeMenu();
        showGame();
        restartGame();
    })

    gameTwoPlayers.addEventListener("click", () =>{
        gameOn = true;
        twoPlayers = true;
        hiddeMenu();
        showGame();
        restartGame();
        showPaddleRight();
        applySettingsPaddleRight();
    })

    btnSettingsHome.addEventListener("click", () => {
        if (!settingsShow){
            showSettings();
            settingsShow = true;
        }
    })


    closeSettings.addEventListener("click", () =>{
        if (settingsShow){
            hiddeSettings();
            settingsShow = false;
            if (gameOn){
                ball_movement = setInterval(move_ball, 10);
                gamePaused = false;
            }
        }
    })

    btnSettings.addEventListener("click", () => {
        settingsShow = true;
        showSettings();
        clearInterval(ball_movement);
    })

    // Función genérica para cambiar la tecla
    const setKey = (element) => {
        if (showSettings) {
            showKeyChanger();
            
            // Define la función para el evento keypress
            const keyPress = (event) => {
                element.textContent = event.key;
                // Remueve el evento una vez que se presione una tecla
                document.removeEventListener("keypress", keyPress);
                hiddeKeyChanger();
            };

            // Agrega el evento keypress
            document.addEventListener("keypress", keyPress);
        }
    };

    // Asigna eventos a cada tecla
    keyJ1Up.addEventListener("click", () => setKey(keyJ1Up));
    keyJ1Down.addEventListener("click", () => setKey(keyJ1Down));
    keyJ2Up.addEventListener("click", () => setKey(keyJ2Up));
    keyJ2Down.addEventListener("click", () => setKey(keyJ2Down));


    btnConfirmStg.addEventListener("click", () =>{

        btnConfirmStg.style = "transform: scale(0.8)"

        setTimeout(function(){
            btnConfirmStg.style = "transform: scale(1)"
        }, 150);


        ballSize = (ballSizeStn.value) ? Number(ballSizeStn.value) : ballSize;
        velocityBall = ballVelocityStn.value ? Number(ballVelocityStn.value) : velocityBall;
        ballColor = ballColorStn.value ? ballColorStn.value : ballColor;
        radiusBall = ballSize/2;

        paddleHeight = (paddleHeightStn.value) ? Number(paddleHeightStn.value) : paddleHeight;
        paddleWidth = (paddleWidthStn.value) ? Number(paddleWidthStn.value) : paddleWidth;
        colorPaddle = paddleColorStn.value ? paddleColorStn.value : paddleColor;

        j1Up = keyJ1Up.textContent ? keyJ1Up.textContent : j1Up;
        j1Down = keyJ1Down.textContent ? keyJ1Down.textContent : j1Down;
        j2Up = keyJ2Up.textContent ? keyJ2Up.textContent : j2Up;
        j2Down = keyJ2Down.textContent ? keyJ2Down.textContent : j2Down;

        ColorBoard = boardColorStn.value ? boardColorStn.value : boardColor;

        applySettingsBall();
        applySettingsBoard();
        applySettingsPaddleLeft();
        if (twoPlayers){
            applySettingsPaddleLeft();
        }
        applySettingsBoard();
    })

    bntPause.addEventListener("click", () =>{
        if (!gamePaused){
            clearInterval(ball_movement)
            gamePaused = true;        
        }else{
            ball_movement = setInterval(move_ball, 10);
            gamePaused = false;
        }
    })

    btnHome.addEventListener("click", () =>{
        clearInterval(ball_movement);
        hiddeGame();
        showMenu();
        gameOn = false;
    })

    document.addEventListener("keydown", (event) =>{

        if(event.key == j1Up){
            moveUPLeft = true;
        }

        if (event.key == j1Down){
            moveDownLeft = true;
        }

        if(twoPlayers && event.key == j2Up){
            moveUPRight = true;
        }

        if (twoPlayers && event.key == j2Down){
            moveDownRight = true;
        }

        if (event.key == "Escape" && !settingsShow){
            showSettings();
            clearInterval(ball_movement)
            settingsShow = true;
            gamePaused = true;
        }else if (event.key == "Escape" && settingsShow){
            hiddeSettings();
            if (gameOn){
                ball_movement = setInterval(move_ball, 10);
                gamePaused = false;
            }
            settingsShow = false;
        }
    })

    document.addEventListener("keyup", (event) =>{

        if(event.key == j1Up){
            moveUPLeft = false;
        }

        if (event.key == j1Down){
            moveDownLeft = false;
        }

        if(twoPlayers && event.key == j2Up){
            moveUPRight = false;
        }

        if (twoPlayers && event.key == j2Down){
            moveDownRight = false;
        }

    })

    stopMusic.addEventListener("click", () =>{
        if (musicOn){
            hiddeIconMusicON();
            showIconMusicOFF();
            musicIntro.pause();
            musicIntro.currentTime = 0;
            musicOn = false;
        }else{
            showIconMusicON();
            hiddeIconMusicOFF();
            musicIntro.play();
            musicOn = true;
        }
    })

    // Move ball
    function move_ball(){

        //Check Top
        if (ball.offsetTop <= 0) {
            velocity_y = -velocity_y;
        }

        //Check right
        if (ball.offsetLeft + (radiusBall * 2) >= (gameBoard.offsetWidth - borderBoard)) {
            velocity_x = -velocity_x;
        }

        //Check bottom
        if ((ball.offsetTop + radiusBall * 2 ) >= (gameBoard.offsetHeight - borderBoard)) {
            velocity_y = -velocity_y;
        }

        //Check left - Game Lose
        if (ball.offsetLeft <= 0) {
            clearInterval(ball_movement)
            showGameOver();
            gameOverLayer();
        }else if ((twoPlayers) && (ball.offsetLeft + (radiusBall * 2) >= (gameBoard.offsetWidth - borderBoard))){
            clearInterval(ball_movement)
            showGameOver();
            gameOverLayer();
        }
 
        // Check collision
        if (ball.offsetLeft <= (paddleWidth + separationPaddle) && (ball.offsetTop + radiusBall <= paddleLeft.offsetTop + paddleHeight) && (ball.offsetTop + radiusBall >= paddleLeft.offsetTop)){
            velocity_x = -velocity_x;
        }

        // Check collision
        if (twoPlayers && ball.offsetLeft + (radiusBall * 2) >= paddleRight.offsetLeft && ball.offsetTop + radiusBall <= paddleRight.offsetTop + paddleHeight && (ball.offsetTop + radiusBall >= paddleRight.offsetTop)){
            velocity_x = -velocity_x;
        }

        ball.style.top = (ball.offsetTop + velocity_y) +"px";
        ball.style.left = (ball.offsetLeft + velocity_x) +"px";

    }

    function move_paddle(){

        if (moveUPLeft && paddleLeft.offsetTop > 0){
            paddleLeft.style.top = (paddleLeft.offsetTop - 2) +"px";
        } else if (moveDownLeft && (paddleLeft.offsetTop + paddleLeft.offsetHeight) <= (gameBoard.offsetHeight - (borderBoard*2))){
            paddleLeft.style.top = (paddleLeft.offsetTop + 2) +"px";
        }

        if (twoPlayers && moveUPRight && paddleRight.offsetTop > 0){
            paddleRight.style.top = (paddleRight.offsetTop - 2) +"px";
        } else if (twoPlayers && moveDownRight && (paddleRight.offsetTop + paddleRight.offsetHeight) <= (gameBoard.offsetHeight - (borderBoard*2))){
            paddleRight.style.top = (paddleRight.offsetTop + 2) +"px";
        }

        requestAnimationFrame(move_paddle);

    }

    move_paddle();


    loseGame = () =>{
        clearInterval(ball_movement)
        showGameOver();
        gameOverLayer();
    }