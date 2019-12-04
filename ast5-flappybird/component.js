
function Component(width, height, color, x, y, type, myGameArea) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.dx = 0.1;
    this.dy = 0;
    this.text = '';
    
    var obstacles = [];
    this.type = type;
    if (type == "image" || type == 'imagebird') {
        this.image = new Image();
        this.image.src = color;
    }
    this.gravity = 0.05;
    this.gravityEffect = 4;
    var that = this;
    this.myGameArea = myGameArea;
    var current  = 0;
    

    this.moveFooter = function() {
        var footer = document.getElementById(this.myGameArea.footer);

        
            current += 2;

            footer.style.left = -current + 'px';

            if(current >= 480) {
                footer.style.left = 0 + 'px';
                current = 0;
            }

       
    }


    this.updateGameArea = function (score) {
        this.moveFooter();

        var x, height, gap, minHeight, maxHeight, minGap, maxGap;

        for (var i = 0; i < obstacles.length; i++) {
            if (that.crash(obstacles[i])) {
                localStorage.setItem('score', ''+Math.floor(myGameArea.frame / 200));
                myGameArea.stop();
                return;
            }
        }
        myGameArea.clear();
        myGameArea.frame += 1;

        if (myGameArea.frame == 1 || myGameArea.everyInterval(160)) {
            x = myGameArea.canvas.height;
            y = myGameArea.canvas.width;
            minHeight = 100;
            maxHeight = 400;
            height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
            minGap = 90;
            maxGap = 150;
            gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);

            obstacles.push(new Component(70,  height , "./images/pipeR.png", y, 0, 'image', myGameArea));
            obstacles.push(new Component(70, (x - height - gap), "./images/pipe.png", y,  height + gap , 'image', myGameArea));


       }

        for (var i = 0; i < obstacles.length; i++) {
            obstacles[i].x += -2;
            obstacles[i].update();
        }

        score.text = "SCORE: " + Math.floor(myGameArea.frame / 200);
        score.update();


        that.changePosition();
        
        
        that.update()

       

    }

    this.changePosition = function () {
         //   this.fallUpdate(180);
        
        this.gravityEffect += this.gravity;
      //  this.x += this.dx;
        this.y += this.dy + this.gravityEffect;
        this.hitBottom();
    }

    this.hitBottom = function() {
        var bottom = myGameArea.canvas.height - this.height;
        if (this.y > bottom) {
            this.y = bottom;
            this.gravityEffect= 0;
        }
    }

   this.fallUpdate = function(degrees) {
      ctx = myGameArea.context;

    
    
        ctx.save();
    
       
    
        // rotate the canvas to the specified degrees
        ctx.rotate(degrees*Math.PI/180);
    
        // draw the image
        // since the context is rotated, the image will be rotated also
        ctx.drawImage(this.image, 
            this.x, 
            this.y,
            this.width, this.height);
    
        
        ctx.restore();


   }
   var currentImage = 0;

    this.update = function () {
         ctx = myGameArea.context;

        if(this.type == 'text') {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = this.color;
            ctx.fillText(this.text, this.x, this.y);

        }else if (this.type == 'image') {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        }else if(this.type == 'imagebird'){
           
         

            var nextImage = (currentImage + 1) % 3;
            this.image.src = './images/' + nextImage + '.png';
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
            currentImage = nextImage;
        
        }else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    this.crash = function (obstacle) {
        var birdLeft = this.x;
        var birdRight = this.x + this.width;
        var birdTop = this.y;
        var birdBottom = this.y + this.height;

        var obstacleLeft = obstacle.x;
        var obstacleRight = obstacle.x + obstacle.width;
        var obstacleTop = obstacle.y;
        var obstacleBottom = obstacle.y + obstacle.height;

        var crashed = true;

        if ((birdBottom < obstacleTop) || (birdTop > obstacleBottom) || (birdRight < obstacleLeft) || (birdLeft > obstacleRight)) {
            crashed = false;
        }
        return crashed;

    }

    this.jumpUp = function() {
        this.gravity = -0.2;
        this.y -= 25 + this.gravityEffect;
        this.x += this.dx;



    }

    this.jumpDown = function() {
        this.gravity = 0.05 ;
    }


}