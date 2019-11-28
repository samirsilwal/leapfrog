
function ImageCarousel(images, IMAGE_WIDTH, IMAGE_HEIGHT, imageContainerWrapper, indicatorDivName) {
    this.images = images;
    this.IMAGE_WIDTH = IMAGE_WIDTH;
    this.IMAGE_LENGTH = images.length;
    this.imageContainerWrapper = imageContainerWrapper;
    this.indicatorDivName = indicatorDivName;
    this.currentImagePosition = 0;
    this.stepOfTransition;
    this.IMAGE_HEIGHT = IMAGE_HEIGHT;
    var imageConatinerName = 'image-container';



    this.setStepOfTransition = function (step) {
        this.stepOfTransition = step;
    }

    this.getStepOfTransition = function () {
        return this.stepOfTransition;
    }

    this.getCurrentImagePosition = function () {
        return this.currentImagePosition;
    }

      

    var styleSetter = {
        setStyleToWrapper: function (wrapper, imgWidth, length) {
            var element = document.getElementsByClassName(wrapper)[0];
            element.style.position = 'absolute';
            element.style.width = imgWidth * length + 'px';
        },

        setStyleToIndicatorWraper: function (wrapper, imgWidth, length) {
            var element = document.getElementsByClassName(wrapper)[0];

            element.style.position = 'absolute';
            element.style.bottom = 40 + 'px';
            element.style.left = (imgWidth / 2 - 13 * length) + 'px';
        },

        setStyleToMainContainer: function (mainWrapper, imgWidth, height) {
            var elements = document.getElementsByClassName(mainWrapper);
            for (var i = 0; i < elements.length; i++) {

                elements[i].style.width = imgWidth + 'px';
                elements[i].style.height = height + 'px';
                elements[i].style.margin = '0 auto';
                elements[i].style.marginTop = 50 + 'px';
                elements[i].style.marginBottom = 100 + 'px';
                elements[i].style.fontSize = 80 + 'px';

            }


        }
    };

    this.setInitialStyles = function () {
        styleSetter.setStyleToWrapper(this.imageContainerWrapper, this.IMAGE_WIDTH, this.IMAGE_LENGTH);
        styleSetter.setStyleToIndicatorWraper(this.indicatorDivName, this.IMAGE_WIDTH, this.IMAGE_LENGTH);
        styleSetter.setStyleToMainContainer(imageConatinerName, this.IMAGE_WIDTH, this.IMAGE_HEIGHT);
    }

}

ImageCarousel.prototype.previousImage = function () {
    var step = this.getStepOfTransition() || 1;

    this.unChangeIndicator(this.currentImagePosition);

    var nextImagePosition = (this.currentImagePosition + 6 * step) % this.IMAGE_LENGTH;
    var wrapperName = this.imageContainerWrapper;
    var imageLenth = this.IMAGE_LENGTH;


    var current = this.currentImagePosition * this.IMAGE_WIDTH;
    var next = nextImagePosition * this.IMAGE_WIDTH;
    var currentPosition = this.currentImagePosition;

    var id = setInterval(function () {

        if (nextImagePosition > currentPosition) {
            current += 1200;
        } else {
            current -= 100 * step;
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
ImageCarousel.prototype.nextImage = function () {

    var step = this.getStepOfTransition() || 1;

    this.unChangeIndicator(this.currentImagePosition);
    var nextImagePosition = (this.currentImagePosition + 1 * step) % this.IMAGE_LENGTH;
    var wrapperName = this.imageContainerWrapper;
    console.log(wrapperName);
    var current = this.currentImagePosition * this.IMAGE_WIDTH;
    var next = nextImagePosition * this.IMAGE_WIDTH;
    var currentPosition = this.currentImagePosition;
    var id = setInterval(function () {
        if (nextImagePosition < currentPosition) {
            current -= 600;
        } else {
            current += 100 * step;
        }
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
    var indicatorList = document.getElementsByClassName(this.indicatorDivName)[0].children;
    indicatorList[position].style.backgroundColor = "white";
}

ImageCarousel.prototype.unChangeIndicator = function (position) {
    var indicatorList = document.getElementsByClassName(this.indicatorDivName)[0].children;
    indicatorList[position].style.removeProperty('background-color');

}

ImageCarousel.prototype.createIndicators = function () {
    var indicatorDiv = document.getElementsByClassName(this.indicatorDivName)[0];
    var that = this;
    for (var i = 0; i < this.IMAGE_LENGTH; i++) {
        var newIndidcator = document.createElement('div');
        newIndidcator.classList.add('indicators');
        newIndidcator.id = 'indicator+' + i;
        newIndidcator.addEventListener('click', function () {
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

ImageCarousel.prototype.init = function () {
    this.createIndicators();
    this.setInitialStyles();
    this.changeIndicator(this.currentImagePosition);


}

var images = document.getElementsByClassName('image-container-wrapper')[0].children;

//!instance creation
var first = new ImageCarousel(images, 1200, 600, 'image-container-wrapper', 'indicators-wrapper');
first.init();

var second = new ImageCarousel(images, 1200, 600, 'image-container-wrapper-1', 'indicators-wrapper-1');
second.setStepOfTransition(2);

second.init();


var third = new ImageCarousel(images, 1200, 600, 'image-container-wrapper-2', 'indicators-wrapper-2');

third.init();