//!........game area..........



function MyGameArea(gameCanvas, backCanvas, uiCanvas, scoreCanvas, updateGameArea, parent, keyCode, resetFunction, scoreLocation) {
    this.canvas = document.getElementById(gameCanvas);
    this.backCanvas = document.getElementById(backCanvas);
    this.uiCanvas = document.getElementById(uiCanvas);
    this.scoreCanvas = document.getElementById(scoreCanvas);
    this.keyCode = keyCode;
    this.resetFunction = resetFunction;
    this.scoreLocation = scoreLocation;
    var that = this;

    this.listen = function (bird) {
        window.addEventListener('keydown', (event) => {
            if (event.keyCode === that.keyCode) {
                bird.jumpUp();
            }

        });

        window.addEventListener('keyup', (event) => {
            if (event.keyCode === that.keyCode) {
                bird.jumpDown();
            }
        })
    }
    this.start = function () {
        that.canvas.width = 480;
        that.canvas.height = 640;
        that.canvas.style = "border:1px solid #000000";

        that.context = that.canvas.getContext("2d");

        that.frame = 0;
        document.getElementById(parent).appendChild(that.canvas);
        that.interval = setInterval(updateGameArea, 20);
    }

    this.displayScore = function () {
        that.scoreCanvas.width = 480;
        that.scoreCanvas.height = 640;
        that.scoreCanvas.style = "border:1px solid #000000";

        that.scoreContext = that.scoreCanvas.getContext("2d");

        that.scoreContext.font = '30px Consolas';
        that.scoreContext.fillStyle = 'black';
        that.scoreContext.fillText(localStorage.getItem('score'), 230, 220);
        var currentScore = localStorage.getItem('score');

        if (localStorage.getItem(that.scoreLocation) < localStorage.getItem('score')) {
            localStorage.setItem(that.scoreLocation, currentScore);
        }


        that.scoreContext.font = '30px Consolas';
        that.scoreContext.fillStyle = 'black';
        that.scoreContext.fillText(localStorage.getItem(this.scoreLocation), 230, 270);

        that.scoreCanvas.addEventListener('click', function (event) {



            that.reset();


        });

        window.addEventListener('keydown', (event) => {
            if (event.keyCode === that.keyCode) {
            
                that.reset();
            }

        });



    }
    this.createUI = function () {
        that.uiCanvas.width = 480;
        that.uiCanvas.height = 640;
        that.uiCanvas.style = "border:1px solid #000000";

        that.uiContext = that.uiCanvas.getContext("2d");

        const uiImage = new Image();
        uiImage.onload = () => {
            that.uiContext.drawImage(uiImage, 170, 350, 150, 80);
        }
        uiImage.src = './images/restart.png';




        const scoreImage = new Image();
        scoreImage.onload = () => {
            that.uiContext.drawImage(scoreImage, 170, 150, 150, 150);
        }
        scoreImage.src = './images/score.png';

        this.displayScore();
    }
    this.reset = function () {

        this.backContext.clearRect(0, 0, this.backCanvas.width, this.backCanvas.height);
        this.scoreContext.clearRect(0, 0, this.scoreCanvas.width, this.scoreCanvas.height);

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.uiContext.clearRect(0, 0, this.scoreCanvas.width, this.scoreCanvas.height);
        this.scoreCanvas = null;
        this.backCanvas = null;
        this.uiCanvas = null;
        this.canvas = null;

        this.resetFunction();

    }
    this.createBackGround = function () {
        that.backCanvas.width = 480;
        that.backCanvas.height = 640;
        that.backCanvas.style = "border:1px solid #000000";

        that.backContext = that.backCanvas.getContext("2d");
        const backgroundImage = new Image();
        backgroundImage.onload = () => {
            that.backContext.drawImage(backgroundImage, 0, 0, 480, 640);
        }
        backgroundImage.src = './images/background.png';


    }

    this.clear = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.stop = function () {
        this.createUI();
        clearInterval(this.interval);
    }

    this.everyInterval = function (n) {

        if ((this.frame / n) % 1 == 0) {
            return true;
        }
        return false;

    }

}