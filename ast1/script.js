var images = document.getElementsByTagName('img');

var IMAGE_WIDTH = 1200;
var IMAGE_LENGTH = images.length;
var currentImagePosition = 0;


Array.from(images).forEach(
    function (val, index) {
        val.style.left = (index * IMAGE_WIDTH) + 'px';
        val.style.top = 0;
    }
);

changeIndicator(currentImagePosition);

function nextImage() {
    unChangeIndicator(currentImagePosition);

    var nextImagePosition = (currentImagePosition + 1) % IMAGE_LENGTH;
    var imgCurrent = document.getElementById('image' + currentImagePosition);
    imgCurrent.className = (imgCurrent.className === 'out') ? 'in' : "out";

    setTimeout(function () {
        (function () {
            imgCurrent.className = (imgCurrent.className === 'out') ? 'in' : "out";
            document.getElementsByClassName('image-container-wrapper')[0].style.left = -nextImagePosition * IMAGE_WIDTH + 'px';
            currentImagePosition = nextImagePosition;
            changeIndicator(currentImagePosition);
        }());
    }, 500);


}

function previousImage() {
    unChangeIndicator(currentImagePosition);

    var nextImagePosition = (currentImagePosition + 6) % IMAGE_LENGTH;
    var imgCurrent = document.getElementById('image' + currentImagePosition);
    imgCurrent.className = (imgCurrent.className === 'out') ? 'in' : "out";

    setTimeout(function () {
        (function () {
            imgCurrent.className = (imgCurrent.className === 'out') ? 'in' : "out";
            document.getElementsByClassName('image-container-wrapper')[0].style.left = -nextImagePosition * IMAGE_WIDTH + 'px';
            currentImagePosition = nextImagePosition;
            changeIndicator(currentImagePosition);
        }());
    }, 500);


}

function changeIndicator(position) {
    document.getElementById('indicator' + position).style.backgroundColor = "white";

}

function unChangeIndicator(position) {

    document.getElementById('indicator' + position).style.removeProperty("background-color");

}

function changeImageByIndicator() {

    unChangeIndicator(currentImagePosition);
    var selectedIndicator = event.target.getAttribute('id');
    var index = selectedIndicator[selectedIndicator.length - 1];
    changeImage(index);

}

function changeImage(index) {
    unChangeIndicator(currentImagePosition);

    var nextImagePosition = index % IMAGE_LENGTH;
    var imgCurrent = document.getElementById('image' + currentImagePosition);
    imgCurrent.className = (imgCurrent.className === 'out') ? 'in' : "out";

    setTimeout(function () {
        (function () {
            imgCurrent.className = (imgCurrent.className === 'out') ? 'in' : "out";
            document.getElementsByClassName('image-container-wrapper')[0].style.left = -nextImagePosition * IMAGE_WIDTH + 'px';
            currentImagePosition = nextImagePosition;
            changeIndicator(currentImagePosition);
        }());
    }, 500);

}