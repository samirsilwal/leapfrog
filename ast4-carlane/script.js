var element = document.getElementById('image-wrapper');
var destroyedCarCounter = 0
var currentImagePosition = 0;
element.style.bottom = 0;

var roadId;
var reference;
var bulletCounter = 5;

var speedRoad = 5;
var carSpeed = 20;

var carsImages = ['green', 'blue', 'puruple', 'grey', 'spotted', 'myCar'];

var cars = [];
var bullets = [];
var lanePositions = ['left', 'middle', 'right']

var parentElement = document.getElementById('road-container');
var a;

var keySetOne = [65, 68];
var keySetTwo = [74 , 76];
var secsValue;


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
    this.keySet = null;
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

        if (this.currentLane === 'right') {
            this.currentLane = "middle";
        } else {
            this.currentLane = 'left';

        }

        this.element.style.left = this.x - this.dx + 'px';
        this.element.style.bottom = this.y + 'px';
        this.x -= this.dx;
    }

    this.moveRight = function () {
        changeLaneAnimation('right');

        if (this.currentLane === 'left') {
            this.currentLane = 'middle';
        } else {
            this.currentLane = "right";

        }


        this.element.style.left = this.x + this.dx + 'px';
        this.element.style.bottom = this.y + 'px';

        this.x += this.dx;
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
            this.move();
        }

        this.draw(this.currentLane);
        return this;
    }

    this.bulletShot = function (bullet) {

        //clearInterval(bulletId);
    

        this.parentElement.removeChild(that.element);
        bullet.parentElement.removeChild(bullet.element);

        var i = this.index;
        var updated = cars.filter(function (val) {
            return val.index !== i;
        });
        cars = updated;

        bullets = [];   
      //  console.log(bulletCounter);



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

    this.throwBullets = function () {
       // bullets = [];
        var bullet = new Bullet(a.x, a.y, parentElement, a.currentLane).init();
        bullets.push(bullet);
        bulletCounter--;

        document.getElementById('bullet-count').innerHTML = bulletCounter;

        bullet.movePosition();
        bullet.move();

    }

    this.move = function () {

        this.element.addEventListener('keydown', reference = function (event) {

            if ((that.x + that.dx) < 350) {
                if (event.keyCode === that.keySet[1]) {
                    change.play();

                    that.moveRight();
                }
            }

            if ((that.x - that.dx) > 140) {
                if (event.keyCode === that.keySet[0]) {
                    change.play();

                    that.moveLeft();
                }
            }

           if(bulletCounter > 0) {
            if (event.keyCode == 32) {
                that.throwBullets();
            }
           }
        }, true);

    }

}



//! class for falling vehicles 

function getRandomPosition(min, max) {
    return Math.random() * (max - min) + min;
}


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


           if (bullets.length !== 0) {

                for (var j = 0; j < bullets.length; j++) {

                    // bullets[i].move();
                    if (cars[i].currentLane === bullets[j].currentLane) {
                        if (cars[i].y >= (510 - bullets[j].y - 140)) {

                            var tempBullet = bullets[0];
                        
                            cars[i].bulletShot(tempBullet);
      
                        }

                    }
                    if (cars.length === 0) {
                        this.createRandomCars();

                    }
                }

            }


        }
    }
    this.start = function () {
        movingCarsId = setInterval(this.movecars.bind(this), 30);
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
     //   document.getElementsByClassName('replay')[0].style.display = 'block';
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
        }, 20);
    } else {
        var hello = setInterval(function () {

            current += 5;

            a.element.style.transform = 'rotate(' + -current + 'deg)';

            if (current === 30) {
                clearInterval(hello);
                a.element.style.transform = 'rotate(' + 1 + 'deg)';

            }
        }, 20);
    }

}








//!section for timing control
var counter = {};

function timer() {

    counter.end = 120;

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
            secsValue = secs;
            if (secs % 30 == 0) {
        
                bulletCounter = 5;
                document.getElementById('bullet-count').innerHTML = bulletCounter;

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
var change = new Sound('./images/change-1.mp3');

function start() {

    var nextImagePosition = (currentImagePosition + 1) % 3;

    var current = currentImagePosition * 510;
    var id = setInterval(function () {
        roadId = id;
        current += 15 ;


        document.getElementById('image-wrapper').style.bottom = -current + 'px';

        if (current == 1020) {
            clearInterval(id);
            document.getElementById('image-wrapper').style.bottom = 0 + 'px';
            currentImagePosition = 0;
            start();
        }
    }, 30);




    currentImagePosition = nextImagePosition;



}


function beginGame() {

    audio.play();

    timer();
    document.getElementsByClassName('bullets-display')[0].style.display = 'block';

    document.getElementById('bullet-count').innerHTML = bulletCounter;

    document.getElementsByClassName('title')[0].style.display = 'none';

    document.getElementsByClassName('score-display-current')[0].style.display = 'block';
    document.getElementsByClassName('score-display-high')[0].style.display = 'block';

    var icon = document.getElementById('start-screen');
    icon.style.display = 'none';
    a = new Car(50, 50, parentElement, 'left', true).init();
    a.keySet = keySetOne;
 
    var game = new StartGame();
    game.createRandomCars();
    start();

    game.start();

}


//! bullet implementation


function Bullet(x, y, parentElement, currentLane) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.element = null;
    this.parentElement = parentElement;
    this.dy = 20;
    var that = this;
    this.currentLane = currentLane;
    this.index = null;



    this.change = function () {
        this.y += this.dy;
        this.movePosition();
    }

    this.setPosition = function (y) {
        this.y = y;
    }
    this.movePosition = function () {
        this.element.style.bottom = this.y + 45 + 'px';
        this.element.style.left = this.x  + 'px';
    }
    this.move = function () {
        bulletId = setInterval(function () {
            that.change();
        }, 20);

    }

    this.init = function () {
        var bullet = document.createElement('div');
        var bulletImage = document.createElement('img');
        bullet.setAttribute('id', 'bullet' + this.index);
        bullet.style.height = this.height + 'px';
        bullet.style.width = this.width + 'px';
        bullet.classList.add('bullet');
    
        bulletImage.src = './images/bullet.png';

       
        bulletImage.classList.add('img');
        bullet.appendChild(bulletImage);
        bullet.style.userSelect = 'none';
        this.parentElement.appendChild(bullet);

        this.element = bullet;
      
        return this;
    }
}



function beginGame() {

    audio.play();

    timer();
    document.getElementsByClassName('bullets-display')[0].style.display = 'block';

    document.getElementById('bullet-count').innerHTML = bulletCounter;

    document.getElementsByClassName('title')[0].style.display = 'none';

    document.getElementsByClassName('score-display-current')[0].style.display = 'block';
    document.getElementsByClassName('score-display-high')[0].style.display = 'block';

    var icon = document.getElementById('start-screen');
    icon.style.display = 'none';
    a = new Car(50, 50, parentElement, 'left', true).init();
    a.keySet = keySetOne;
 
    var game = new StartGame();
    game.createRandomCars();
    start();

    game.start();

}
