var element = document.getElementById('image-wrapper');
var destroyedCarCounter = 0
var currentImagePosition = 0;
element.style.bottom = 0;

var roadId;
var reference;

var speedRoad = 30;
var carSpeed = 20;

var carsImages = ['green', 'blue', 'puruple','grey',  'spotted', 'myCar'];

function start() {

    var nextImagePosition = (currentImagePosition + 1) % 3;

    var current = currentImagePosition * 510;
    var id = setInterval(function () {
        roadId = id;
        current += 10;


        document.getElementById('image-wrapper').style.bottom = -current + 'px';

        if (current == 1020) {
            clearInterval(id);
            document.getElementById('image-wrapper').style.bottom = 0 + 'px';
            currentImagePosition = 0;
            start();
        }
    }, speedRoad);




    currentImagePosition = nextImagePosition;



}
//! for my car class

function Car(width, height, parentElement, currentLane, myCar, index) {
    this.height = height;
    this.width = width;
    this.currentLane = currentLane;
    this.element = null;
    this.parentElement = parentElement;
    this.x = 0;
    this.y = 0;
    this.dx = 76;
    this.dy = 5;
    this.myCar = myCar;
    this.index = index || -1;
    var that = this;

    this.change = function () {
        this.y += this.dy;
        this.movePosition();
    }

    this.setPosition = function (y) {
        this.y = y;
    }
    this.movePosition = function () {
        this.element.style.top = this.y + 'px';
    }

    this.draw = function (lane) {
        //  console.log(x,y);
        switch (lane) {
            case 'left':
                this.element.style.left = 155 + 'px';
                if (this.myCar == true) {
                    this.element.style.bottom = 45 + 'px';
                    this.y = 45;

                } else {
                    this.element.style.top = 0 + 'px';
                    this.y = 0;

                }

                this.x = 155;
                break;
            case 'middle':
                this.element.style.left = 233 + 'px';
                if (this.myCar == true) {
                    this.element.style.bottom = 45 + 'px';
                    this.y = 45;

                } else {
                    this.element.style.top = 0 + 'px';
                    this.y = 0;

                }
                this.x = 233;
                break;
            case 'right':
                this.element.style.left = 310 + 'px';
                if (this.myCar == true) {
                    this.element.style.bottom = 45 + 'px';
                    this.y = 45;

                } else {
                    this.element.style.top = 0 + 'px';
                    this.y = 0;

                }
                this.x = 310;
                break;
        }


    }

    this.moveLeft = function () {
        changeLaneAnimation('left');

        if (a.currentLane === 'right') {
            a.currentLane = "middle";
        } else {
            a.currentLane = 'left';

        }

        a.element.style.left = a.x - a.dx + 'px';
        a.element.style.bottom = a.y + 'px';
        a.x -= a.dx;
    }

    this.moveRight = function () {
        changeLaneAnimation('right');

        if (a.currentLane === 'left') {
            a.currentLane = 'middle';
        } else {
            a.currentLane = "right";

        }


        a.element.style.left = a.x + a.dx + 'px';
        a.element.style.bottom = a.y + 'px';

        a.x += a.dx;
        // this.y = this.dy;
    }

    this.init = function () {
        var car = document.createElement('div');
        var carImg = document.createElement('img');
        car.setAttribute('id', 'car' + this.index);
        car.style.height = this.height + 'px';
        car.style.width = this.width + 'px';
        car.classList.add('mycar');
        var i = Math.floor(Math.random() * 6);
        if (this.myCar) {
            carImg.src = './images/myCar.png';

        } else {
            carImg.src = './images/' + carsImages[i] + '.png';

        }
        carImg.classList.add('img');
        car.appendChild(carImg);
        car.style.userSelect = 'none';
        this.parentElement.appendChild(car);

        this.element = car;
        if (this.myCar) {
            this.element.setAttribute('tabindex', '0');
            this.element.focus();
            this.element.style.outline = 'none';
            this.move();
        }

        this.draw(this.currentLane);
        return this;
    }

    this.remove = function () {
        destroyedCarCounter++;

        // console.log(this.parentElement, '....', this.element);
        this.parentElement.removeChild(that.element);

        var i = this.index;
        var updated = cars.filter(function (val) {
            return val.index !== i;
        });
        cars = updated;
        // console.log('final parent element', this.parentElement);
    }

    this.move = function () {

        this.element.addEventListener('keydown', reference = function (event) {

            if ((that.x + that.dx) < 350) {
                if (event.keyCode === 68) {
                    change.play();

                    that.moveRight();
                }
            }
            if ((that.x - that.dx) > 140) {
                if (event.keyCode === 65) {
                    change.play();

                    that.moveLeft();
                }
            }
        }, true);

    }

}



//! class for falling vehicles 
var lanePositions = ['left', 'middle', 'right']

function getRandomPosition(min, max) {
    return Math.random() * (max - min) + min;
}

var cars = [];

function StartGame() {
    var y;

    var movingCarsId;

    this.displayCurrentScore = function () {
        var el = document.getElementById('currentscore');
        el.innerHTML = destroyedCarCounter;
        var cs = document.getElementById('currentscorehigh');
        cs.innerHTML = this.getCookie('highScore');

    }
    this.movecars = function () {
        // console.log(parentElement);
        this.displayCurrentScore();

        for (var i = 0; i < cars.length; i++) {

            if (cars[i].currentLane === a.currentLane) {
                if (cars[i].y >= (510 - a.y - 140)) {
                    cars[i].dy = 0;
                    cars[i].element.children[0].src = './images/destroyedcarfront.png';
                    var sign = Math.floor(Math.random() * 4);
                    cars[i].element.style.transform = 'rotate(' + (-1) ** sign * 15 + 'deg)';
                    crash.play();
                    this.accident();
                }
            }
            cars[i].change();

            if (cars[i].y > 510) {

                cars[i].remove();

                if (cars.length == 0) {
                    this.createRandomCars();

                }
            }
        }
    }
    this.start = function () {
        movingCarsId = setInterval(this.movecars.bind(this), carSpeed);
    }
    this.stop = function () {
        clearInterval(movingCarsId);
    }

    this.accident = function () {
        a.element.removeEventListener('keydown', reference, true);
        audio.stop();
        clearInterval(roadId);
        this.stop();
        a.element.children[0].src = "./images/destroyedcar.png";
        var sign = Math.floor(Math.random() * 4);

        a.element.style.transform = 'rotate(' + (-1) ** sign * 15 + 'deg)';
        var el = document.getElementById('score');
        document.getElementsByClassName('score-display')[0].style.display = 'block';
        document.getElementsByClassName('replay')[0].style.display = 'block';
        el.innerHTML = destroyedCarCounter;
        this.storeScore(destroyedCarCounter);

    }
    this.deleteScore = function () {
        document.cookie = "highScore= ; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ";path=/";

    }
    this.getCookie = function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    this.storeScore = function (value) {

        function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }



        if (this.getCookie('highScore')) {
            if (Number.parseInt(this.getCookie('highScore')) < value) {
                console.log('changed score b', Number.parseInt(this.getCookie('highScore')));
                setCookie('highScore', value, 1);
                console.log('changed score a', Number.parseInt(this.getCookie('highScore')));

            }
        } else {
            console.log('hello');
            setCookie('highScore', value, 1);

        }

    }


    this.createRandomCars = function () {
        var length = 2;
        var prevRandomNum = -1;
        while (length !== 0) {
            var index = Math.floor(Math.random() * 3);
            if (index !== prevRandomNum) {
                var car = new Car(50, 50, parentElement, lanePositions[index], false, length);
                car.init();
                cars.push(car);
                length--;
                prevRandomNum = index;

            }
        }
        for (var i = 0; i < cars.length; i++) {
            y = getRandomPosition(-410, 0);
            cars[i].setPosition(y);
            cars[i].movePosition();
        }



    }


}


function changeLaneAnimation(direction) {
    var current = 0;

    if (direction === 'right') {
        var hello = setInterval(function () {

            current += 5;

            a.element.style.transform = 'rotate(' + current + 'deg)';

            if (current === 30) {
                clearInterval(hello);
                a.element.style.transform = 'rotate(' + -1 + 'deg)';

            }
        }, 30);
    } else {
        var hello = setInterval(function () {

            current += 5;

            a.element.style.transform = 'rotate(' + -current + 'deg)';

            if (current === 30) {
                clearInterval(hello);
                a.element.style.transform = 'rotate(' + 1 + 'deg)';

            }
        }, 30);
    }

}



var parentElement = document.getElementById('road-container');
var a;

function replayGame() {
    location.reload();
}


//!section for timing control
var counter = {};

function timer() {

    counter.end = 60;

    // counter.sec = document.getElementById("timer");

    if (counter.end > 0) {
        stopTimer = setInterval(function () {

            counter.end--;
            if (counter.end <= 0) {
                clearInterval(stopTimer);
                counter.end = 0;
            }

            secs = counter.end;
            var mins = Math.floor(secs / 60);
            secs -= mins * 60;

            if(secs == 30) {
                speedRoad -=10;
                carSpeed -=10;
            }
           

        }, 1000);
    }

}

function Sound(src) {

    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}

var audio = new Sound('./images/background.mp3');
var crash = new Sound('./images/crash.wav');
var change = new Sound('./images/change.mp3');


function beginGame() {

    audio.play();


    timer();
    document.getElementsByClassName('title')[0].style.display = 'none';

    document.getElementsByClassName('score-display-current')[0].style.display = 'block';
    document.getElementsByClassName('score-display-high')[0].style.display = 'block';

    var icon = document.getElementById('start-screen');
    icon.style.display = 'none';
    a = new Car(50, 50, parentElement, 'left', true).init();
    var game = new StartGame();
    game.createRandomCars();
    start();

    game.start();

}