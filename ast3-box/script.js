
//! oop dynamic .......................................>>>>>>>>>>>>>>>>>>>>>>>>>>>
function Box(x, y, speed, width, height, parentElement) {
    this.x = x;
    this.y = y;
    this.dx = 1*speed*0.45;
    this.dy = 1*speed*0.45;
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
    }

    this.draw = function () {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }

    this.move = function () {
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }

}

Box.prototype.init = function () {
    var box = document.createElement('div');
    box.style.height = this.height + 'px';
    box.style.width = this.width + 'px';
    box.classList.add('box');
    this.parentElement.appendChild(box);
    this.element = box;
    this.element.onclick = this.boxClicked.bind(this);
    return this;
}

function getRandomPosition(min, max) {
    return Math.random() * (max - min) + min;
}




function StartGame(parentElement, boxCount) {
    var boxes = [];
    this.boxCount = boxCount || 5;
    this.parentElement = parentElement;
    this.MAX_HEIGHT = 500;
    this.MAX_WIDTH = 500;

    this.createRandomBoxes = function (x, y, speed, width, height) {

        var length = this.boxCount;

        while (length !== 0) {
            var flag = 0;
            var box = new Box(x, y, speed, width, height, parentElement);

            var xPosition = getRandomPosition(0, this.MAX_WIDTH - box.width);

            var yPosition = getRandomPosition(0, this.MAX_HEIGHT - box.height);

            for (var i = 0; i < boxes.length; i++) {

                if (xPosition < boxes[i].x + boxes[i].width &&
                    (xPosition + box.width) > boxes[i].x &&
                    yPosition < boxes[i].y + boxes[i].height &&
                    yPosition + box.width > boxes[i].y) {
                    flag = 1;
                    break;
                }

            }

            if (flag === 0) {
                box.init();
                box.setPostion(xPosition, yPosition);
                box.draw();
                boxes.push(box);
                length--;

            }

        }
        setInterval(this.moveBoxes.bind(this), 5)

    }

    this.moveBoxes = function () {
        for (var i = 0; i < this.boxCount; i++) {

            if (boxes[i].x + boxes[i].dx > (this.MAX_WIDTH - boxes[i].width) || boxes[i].x + boxes[i].dx < 0) {
                boxes[i].dx = -boxes[i].dx;
            }
            if (boxes[i].y + boxes[i].dy > (this.MAX_WIDTH - boxes[i].height) || boxes[i].y + boxes[i].dy < 0) {
                boxes[i].dy = -boxes[i].dy;
            }

            for (var j = 0; j < this.boxCount; j++) {

                if (boxes[i].x < boxes[j].x + boxes[j].width &&
                    boxes[i].x + boxes[i].width > boxes[j].x &&
                    boxes[i].y < boxes[j].y + boxes[j].height &&
                    boxes[i].y + boxes[i].height > boxes[j].y) {

                    boxes[i].dx = -boxes[i].dx;
                    boxes[i].dy = -boxes[i].dy;

                    boxes[j].dx = -boxes[j].dx;
                    boxes[j].dy = -boxes[j].dy;

                }
            }
            boxes[i].move();
        }
    }


}

var parentElement = document.getElementById('app');
var parentElement1 = document.getElementById('app1');
var parentElement2 = document.getElementById('app2');
new StartGame(parentElement, boxCount = 10).createRandomBoxes(x = 0, y = 0, speed = 1, width = 20, height = 20);
new StartGame(parentElement1, boxCount = 5).createRandomBoxes(x = 0, y = 0, speed = 3, width = 30, height = 30);
new StartGame(parentElement2, boxCount = 6).createRandomBoxes(x = 0, y = 0, speed = 4, width = 30, height = 30);