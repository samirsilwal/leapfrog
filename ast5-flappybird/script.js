//!begining of first object

var flappyBird;
var myGameArea;
var score;

function start() {

 myGameArea = new MyGameArea('game', 'background', 'ui','score',updateGameArea, 'canvas-holder', 87, start, 'best');

 flappyBird = new Component(50, 50, './images/0.png', 100, 120, 'imagebird', myGameArea);
 score = new Component("30px", "Consolas", "black", 300, 50, 'text', myGameArea);

myGameArea.createBackGround();
myGameArea.listen(flappyBird);
myGameArea.start();


}


function updateGameArea() {

    flappyBird.updateGameArea(score,myGameArea);

}


//!end of first object

var flappyBird1;
var myGameArea1;
var score1;

function start1() {

    myGameArea1 = new MyGameArea('game1', 'background1', 'ui1','score1',updateGameArea1, 'canvas-holder1', 96, start1, 'best1');
   
    flappyBird1 = new Component(50, 50, './images/bird.gif', 100, 120, 'imagebird', myGameArea1);
    score1 = new Component("30px", "Consolas", "black", 300, 50, 'text', myGameArea1);
   
   myGameArea1.createBackGround();
   myGameArea1.listen(flappyBird1);
   myGameArea1.start();
   
   
}

function updateGameArea1() {

    
    flappyBird1.updateGameArea(score1,myGameArea1);

}   

localStorage.setItem('best',0);
localStorage.setItem('best1',0);



start();

start1();


