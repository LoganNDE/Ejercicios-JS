    const paddle = document.getElementById("paddle");
    const ball = document.getElementById("ball");
    const gameBoard = document.querySelector(".gameBoard");
    const gameOnePlayer = document.querySelector(".gameOnePlayer");
    const btnSettings = document.querySelector(".btnStn");
    const bntPause = document.querySelector(".btnPause");
    const btnHome = document.querySelector(".btnHome");
    const btnConfirmStg = document.querySelector("#btnConfirmStn");
    
    var loseGame = false;
    let moveUP = false;
    let moveDown = false;
    let settingsShow = false;
    let gamePaused = false;



    var ball_movement = null;
    var velocity_x = null;
    var velocity_y = null;

    //Caracteristicas del tablero
    let widthBoard = 1800;
    let heightBoard = 800;
    let borderBoard = 10;
    let colorBorderBoard = "#b1b1b1";
    let backgroundColorBoard = "#1A1A2E";

    applySettingsBoard = () =>{
    //configuraciones del tablero
    gameBoard.style.width = widthBoard + "px"
    gameBoard.style.height = heightBoard + "px"
    gameBoard.style.border = borderBoard + "px " + "solid " + colorBorderBoard; 
    gameBoard.style.backgroundColor = backgroundColorBoard;
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
    }

    //Caracteristicas de la pala
    let paddleWidth = 40;
    let paddleHeight = 150;
    let separationPaddle = 50;
    let colorPaddle = "#ECECEC";


    applySettingsPaddle = () =>{
    //Configuracion de la pala
    paddle.style.width = paddleWidth + "px"
    paddle.style.height = paddleHeight + "px"
    paddle.style.left = separationPaddle + "px"
    paddle.style.backgroundColor = colorPaddle;
    }


    //Aplciar configuracion por defecto de los elemetos del videojuego
    applySettingsBall();
    applySettingsPaddle();
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

    gameOverLayer = () =>{
        var playAgain = document.querySelector(".playAgain")
        var backHome = document.querySelector(".backMenu")

        playAgain.addEventListener("click", () =>{
            hiddeGameOver();
            restartGame();
            loseGame = false;
        })

        backHome.addEventListener("click", () =>{
            hiddeGameOver();
            hiddeGame();
            showMenu();
            clearInterval(ball_movement)
            loseGame = false;
        })
    }

    restartPositionBall = () =>{
        ball.style.top = "calc(50% - 40px)";
        ball.style.left = "calc(50% - 40px)";
        velocity_x = 5;
        velocity_y = 5;
    }

    restartPositionPaddle = () =>{
        paddle.style.top = "calc(50% - 75px)";
    }

    restartGame = () =>{
        restartPositionBall();
        ball_movement = setInterval(move_ball, 10);
        restartPositionPaddle();
    }

    gameOnePlayer.addEventListener("click", () => {
        hiddeMenu();
        showGame();
        restartGame();
    })

    btnSettings.addEventListener("click", () => {
        settingsShow = true;
        showSettings();
        clearInterval(ball_movement);
    })

    btnConfirmStg.addEventListener("click", () =>{
        let ballSizeStn = document.querySelector("#ballSizeStn");
        let paddleHeightStn = document.querySelector("#paddleHeightStn");
        let paddleWidthStn = document.querySelector("#paddleWidthStn");

        ballSize = Number(ballSizeStn.value ? Number(ballSizeStn.value) : 80);
        paddleHeight = Number(paddleHeightStn.value) ? Number(paddleHeightStn.value) : 150;
        paddleWidth = Number(paddleWidthStn.value) ? Number(paddleWidthStn.value) : 40;
        radiusBall = ballSize/2;

        applySettingsBall();
        applySettingsPaddle();
        applySettingsBoard();
    })

    bntPause.addEventListener("click", () =>{
        console.log(gamePaused);
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
    })


    //Add onkeypress handler
    //document.onkeydown = move_paddle;

    document.addEventListener("keydown", (event) =>{

        if(event.key == "a"){
            moveUP = true;
        }

        if (event.key == "z"){
            moveDown = true;
        }

        if (event.key == "Escape" && !settingsShow){
            showSettings();
            clearInterval(ball_movement)
            settingsShow = true;
            gamePaused = true;
        }else if (event.key == "Escape" && settingsShow){
            hiddeSettings();
            ball_movement = setInterval(move_ball, 10);
            settingsShow = false;
            gamePaused = false;
        }
    })

    document.addEventListener("keyup", (event) =>{

        if(event.key == "a"){
            moveUP = false;
        }

        if (event.key == "z"){
            moveDown = false;
        }
    })


    // Move ball
    function move_ball(){

        //Check Top
        if (ball.offsetTop <= 0) {
            velocity_y = -velocity_y;
        }

        //Check right
        if (ball.offsetLeft + radiusBall * 2 >= gameBoard.offsetWidth - (borderBoard + (borderBoard/2))) {
            console.log(radiusBall);
            velocity_x = -velocity_x;
        }

        //Check bottom
        if ((ball.offsetTop + radiusBall * 2 ) >= (gameBoard.offsetHeight - (borderBoard + (borderBoard/2)))) {
            console.log("abajo")
            velocity_y = -velocity_y;
        }

        //Check left - Game Lose
        if (ball.offsetLeft <= 0) {
            loseGame = true;
            clearInterval(ball_movement)
            showGameOver();
            gameOverLayer();
        }

        console.log("Colision con la pala " + (paddleWidth + separationPaddle))
        console.log("OffsetLeft de la pelota " + ball.offsetLeft)    
        // Check collision
        if (ball.offsetLeft <= (paddleWidth + separationPaddle)){
            velocity_x = -velocity_x;
        }
        
        //&& (ball.offsetTop + (radiusBall/2)) <= (paddle.offsetTop + paddleHeight)) 

        //&&  && (ball.offsetTop + (radiusBall*2))>=(paddle.offsetTop)

        ball.style.top = (ball.offsetTop + velocity_y) +"px";
        ball.style.left = (ball.offsetLeft + velocity_x) +"px";

    }

    function move_paddle(){

        if (moveUP && paddle.offsetTop > 0){
            paddle.style.top = (paddle.offsetTop - 2) +"px";
        } else if (moveDown && (paddle.offsetTop + paddle.offsetHeight) <= (gameBoard.offsetHeight - (borderBoard*2))){
            paddle.style.top = (paddle.offsetTop + 2) +"px";
        }

        requestAnimationFrame(move_paddle);

    }

    move_paddle();
