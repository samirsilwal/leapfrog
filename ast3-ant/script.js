const distance = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))

var totalAnts;
function getScore() {
    var elemnt = document.getElementById('score-board');
    elemnt.innerText = (totalAnts-ants.length);
}

function stopGame() {
    var text = 'you won\n'+'score : '+(totalAnts-ants.length) ;
    if (secs === 0){
        text = 'you loose\n'+'score : '+(totalAnts-ants.length);
    }
    if (ants.length === 0 || secs === 0){
        clearInterval(stopTimer);
        a.pause();
        var res = document.getElementById('result');
        res.innerText = text;
        res.style.display = 'block';
    }
}

var counter = {};
var stopTimer;
var secs;
window.addEventListener("load", function () {
  counter.end = 60;

  counter.sec = document.getElementById("timer");

  if (counter.end > 0) {
    stopTimer = setInterval(function(){

      counter.end--;
      if (counter.end <= 0) { 
        clearInterval(stopTimer); 
        counter.end = 0;
      }

       secs = counter.end;
      var mins  = Math.floor(secs / 60); 
      secs -= mins * 60;

      counter.sec.innerHTML = secs;
    }, 1000);
  }
});

function Ant(x, y, speed, width, height, parentElement) {
    this.x = x;
    this.y = y;
    this.dx = 0.5*speed;
    this.dy = 0.5*speed;
    this.width = width;
    this.height = height;
    this.element = null;
    this.parentElement = parentElement;
    var that = this;

    this.setPostion = function (x, y) {
        this.x = x;
        this.y = y;
    }

    this.boxClicked = function () {
        console.log('boxClicked', this.width);
        this.element.addEventListener('mousedown', function(event){
            console.log(event);
            
            var x = event.x;
            var y = event.y;
            
            for (let i = 0; i < ants.length; i++) {
                if (distance(x, y, ants[i].x, ants[i].y) <= ants[i].width) {
                   console.log('hello');
                   var updated = ants.filter(function(val, index){
                        ants[i].element.children[0].src = './images/Red-Cross-Transparent-PNG.png';
                       
                       // ants[i].element.style.display = 'none';

                      
                      

                       return i !== index; 
                   });
                   
                   ants = updated;
                }
            }
        });

    }

    this.draw = function () {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }

    this.move = function () {
      //  this.rotate();

        this.x += this.dx;
        this.y += this.dy;
        this.rotate();

        this.draw();
    }
    this.rotate = function() {
        if(this.dx > 0 &&  this.dy > 0){
            this.element.style.transform = 'rotate('+ 135 +'deg)';
        }
        if(this.dx < 0 &&  this.dy > 0){
            this.element.style.transform = 'rotate('+ -135 +'deg)';
        }
        if(this.dx < 0 &&  this.dy < 0){
            this.element.style.transform = 'rotate('+ -45 +'deg)';
        }
        if(this.dx > 0 &&  this.dy < 0){
            this.element.style.transform = 'rotate('+ 45 +'deg)';
        }
        
    }

}

Ant.prototype.init = function () {
    var ant = document.createElement('div');
    var antImg = document.createElement('img');
    ant.style.height = this.height + 'px';
    ant.style.width = this.width + 'px';
    ant.classList.add('ant');
    antImg.src = 'https://www.animatedimages.org/data/media/183/animated-ant-image-0071.gif';
    antImg.classList.add('img');
    ant.appendChild(antImg);
    this.parentElement.appendChild(ant);

    this.element = ant;
    this.element.onclick = this.boxClicked.bind(this);
    return this;
}

function getRandomPosition(min, max) {
    return Math.random() * (max - min) + min;
}



var ants = [];
var id;
function StartGame(parentElement, boxCount) {
    this.boxCount = boxCount || 5;
    this.parentElement = parentElement;
    this.MAX_HEIGHT = 500;
    this.MAX_WIDTH = 500;

    this.createRandomants = function (x, y, speed, width, height) {

        var length = this.boxCount;
        totalAnts = length;
        while (length !== 0) {
            var flag = 0;
            var ant = new Ant(x, y, speed, width, height, parentElement);
            

            var xPosition = getRandomPosition(0, this.MAX_WIDTH - ant.width);

            var yPosition = getRandomPosition(0, this.MAX_HEIGHT - ant.height);

            for (var i = 0; i < ants.length; i++) {

                if (xPosition < ants[i].x + ants[i].width &&
                    (xPosition + ant.width) > ants[i].x &&
                    yPosition < ants[i].y + ants[i].height &&
                    yPosition + ant.width > ants[i].y) {
                    flag = 1;
                    break;
                }

            }

            if (flag === 0) {
                ant.init();
                ant.setPostion(xPosition, yPosition);
                ant.draw();
                ants.push(ant);
                length--;

            }

        }
    //  id =   setInterval(this.moveants.bind(this), 5)

    }
    
    

    this.moveants = function () {
        getScore();
        stopGame();


        for (var i = 0; i < ants.length; i++) {

            if (ants[i].x + ants[i].dx > (this.MAX_WIDTH - ants[i].width) || ants[i].x + ants[i].dx < 0) {
                
                ants[i].dx = -ants[i].dx;
            }
            if (ants[i].y + ants[i].dy > (this.MAX_WIDTH - ants[i].height) || ants[i].y + ants[i].dy < 0) {
                ants[i].dy = -ants[i].dy;
            }

            for (var j = 0; j < ants.length; j++) {
              
                    if (ants[i].x < ants[j].x + ants[j].width &&
                        ants[i].x + ants[i].width > ants[j].x &&
                        ants[i].y < ants[j].y + ants[j].height &&
                        ants[i].y + ants[i].height > ants[j].y) {
    
                        ants[i].dx = -ants[i].dx;
                        ants[i].dy = -ants[i].dy;
    
                        ants[j].dx = -ants[j].dx;
                        ants[j].dy = -ants[j].dy;
    
                    }
                
            }
            ants[i].move();
        }
    }
    
    this.start = function() {
     id =  setInterval(this.moveants.bind(this), 5);
    }

    this.pause = function() {
        clearInterval(id);
       }
     
    


}

var parentElement = document.getElementById('app');

var a = new StartGame(parentElement, 5);
a.createRandomants(x = 0, y = 0, speed = 1, width = 30, height = 40);
a.start();
