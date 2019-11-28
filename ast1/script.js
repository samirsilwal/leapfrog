var images = document.getElementsByTagName('img');

var IMAGE_WIDTH = 1200;
var IMAGE_LENGTH = images.length;
var currentImagePosition = 0;







insertIndicator();
var indicatorList = document.getElementsByClassName('indicators-wrapper')[0].children;
changeIndicator(currentImagePosition);

function nextImage() {
    unChangeIndicator(currentImagePosition);

    var nextImagePosition = (currentImagePosition + 1) % IMAGE_LENGTH;


    var current = currentImagePosition * IMAGE_WIDTH;
    var next = nextImagePosition * IMAGE_WIDTH;
    var id = setInterval(function () {
        if (nextImagePosition == 0) {
            current -= 600;
        } else {
            current += 50;
        }
        console.log(next, current);

        document.getElementsByClassName('image-container-wrapper')[0].style.left = -current + 'px';
        if (nextImagePosition == 0) {
            if (current <= next) {
                clearInterval(id);
            }
        } else {
            if (current >= next) {
                clearInterval(id);
            }
        }
    }, 20);




    currentImagePosition = nextImagePosition;

    changeIndicator(currentImagePosition);

}

function previousImage() {

    unChangeIndicator(currentImagePosition);

    var nextImagePosition = (currentImagePosition + 6) % IMAGE_LENGTH;

    var current = currentImagePosition * IMAGE_WIDTH;
    var next = nextImagePosition * IMAGE_WIDTH;
    var id = setInterval(function () {

        if (nextImagePosition == IMAGE_LENGTH - 1) {
            current += 600;
        } else {
            current -= 50;
        }


        console.log(next, current);

        document.getElementsByClassName('image-container-wrapper')[0].style.left = -current + 'px';

        if (nextImagePosition == IMAGE_LENGTH - 1) {
            if (current >= next) {
                clearInterval(id);
            }
        } else {
            if (current <= next) {
                clearInterval(id);
            }
        }

    }, 20);



    currentImagePosition = nextImagePosition;
    changeIndicator(currentImagePosition);


}

function changeIndicator(position) {
    indicatorList[position].style.backgroundColor = "white";


}

function unChangeIndicator(position) {

    indicatorList[position].style.removeProperty('background-color');

}



function changeImage(gotInstance) {

    unChangeIndicator(currentImagePosition);
    var index = gotInstance.getAttribute('id').split('+')[1];
    var nextImagePosition = index % IMAGE_LENGTH;

    document.getElementsByClassName('image-container-wrapper')[0].style.left = -nextImagePosition * IMAGE_WIDTH + 'px';
    currentImagePosition = nextImagePosition;
    changeIndicator(currentImagePosition);


}
function insertIndicator() {
    var indicatorDiv = document.getElementsByClassName('indicators-wrapper')[0];
    var indicatorList = document.getElementsByClassName('indicators-wrapper')[0].children;

    for (var i = 0; i < IMAGE_LENGTH; i++) {
        var newIndidcator = document.createElement('div');
        newIndidcator.classList.add('indicators');
        newIndidcator.id = 'indicator+'+ i;
        newIndidcator.addEventListener('click', function(){
            changeImage(this);
        });
        indicatorDiv.appendChild(newIndidcator);
    }


    


}








//! oop part

function ImageCarousel(images, IMAGE_WIDTH, imageContainerWrapper, indicatorDivName) {
    this.images = images;
    this.IMAGE_WIDTH = IMAGE_WIDTH;
    this.IMAGE_LENGTH = images.length;
    this.imageContainerWrapper = imageContainerWrapper;
    this.indicatorDivName = indicatorDivName;
    this.currentImagePosition = 0;
    this.stepOfTransition;

    
    
    this.setStepOfTransition = function(step) {
        this.stepOfTransition = step;
    }

    this.getStepOfTransition = function() {
        return this.stepOfTransition;
    }

}

ImageCarousel.prototype.previousImage = function() {
    var step = this.getStepOfTransition() || 1;

    this.unChangeIndicator(this.currentImagePosition);

    var nextImagePosition = (this.currentImagePosition + 6*step) % this.IMAGE_LENGTH;
    var wrapperName = this.imageContainerWrapper;
    var imageLenth = this.IMAGE_LENGTH;


    var current = this.currentImagePosition * this.IMAGE_WIDTH;
    var next = nextImagePosition * this.IMAGE_WIDTH;
    var currentPosition = this.currentImagePosition;

    var id = setInterval(function () {

        if (nextImagePosition > currentPosition ) {
            current += 600;
        } else {
            current -= 100*step;
        }



        document.getElementsByClassName(wrapperName)[0].style.left = -current + 'px';

        if (nextImagePosition > currentPosition) {
            if (current >= next) {
                clearInterval(id);
            }
        } else {
            if (current <= next) {
                clearInterval(id);
            }
        }

    }, 20);



    this.currentImagePosition = nextImagePosition;
    this.changeIndicator(this.currentImagePosition);


}
ImageCarousel.prototype.nextImage = function() {
     var step = this.getStepOfTransition() || 1;
    this.unChangeIndicator(this.currentImagePosition);
    var nextImagePosition = (this.currentImagePosition + 1*step) % this.IMAGE_LENGTH;
    var wrapperName = this.imageContainerWrapper;

    var current = this.currentImagePosition * this.IMAGE_WIDTH;
    var next = nextImagePosition * this.IMAGE_WIDTH;
    var currentPosition = this.currentImagePosition;
    var id = setInterval(function () {
        if (nextImagePosition <  currentPosition) {
            current -= 600;
        } else {
            current += 100*step;
        }
        console.log(current,next);
        document.getElementsByClassName(wrapperName)[0].style.left = -current + 'px';
        if (nextImagePosition < currentPosition) {
            if (current <= next) {
                clearInterval(id);
            }
        } else {
            if (current >= next) {
                clearInterval(id);
            }
        }
    }, 20);


    this.currentImagePosition = nextImagePosition;

   this.changeIndicator(this.currentImagePosition);

}

ImageCarousel.prototype.changeIndicator = function (position) {
    var indicatorList =document.getElementsByClassName(this.indicatorDivName)[0].children;
    indicatorList[position].style.backgroundColor = "white";
}

ImageCarousel.prototype.unChangeIndicator = function (position) {
    var indicatorList =document.getElementsByClassName(this.indicatorDivName)[0].children;
    indicatorList[position].style.removeProperty('background-color');

}

ImageCarousel.prototype.createIndicators = function() {
    var indicatorDiv = document.getElementsByClassName(this.indicatorDivName)[0];
    var that =this;
    
    for (var i = 0; i < this.IMAGE_LENGTH; i++) {
        var newIndidcator = document.createElement('div');
        newIndidcator.classList.add('indicators');
        newIndidcator.id = 'indicator+'+ i;
        newIndidcator.addEventListener('click', function(){
            changeImage(this);
        });
        indicatorDiv.appendChild(newIndidcator);
    }

    function changeImage(gotInstance) {
        
        that.unChangeIndicator(that.currentImagePosition);
        var index = gotInstance.getAttribute('id').split('+')[1];
        var nextImagePosition = index % that.IMAGE_LENGTH;
    
        document.getElementsByClassName(that.imageContainerWrapper)[0].style.left = -nextImagePosition * that.IMAGE_WIDTH + 'px';
        that.currentImagePosition = nextImagePosition;
        that.changeIndicator(that.currentImagePosition);
    
    
    }

} 

ImageCarousel.prototype.init = function() {
    this.createIndicators();
    this.changeIndicator(this.currentImagePosition);


}