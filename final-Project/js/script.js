function init() {
    var value = document.getElementById('choice').checked;
    var innerFile = document.getElementById("select-file");


    if(value) {
        readCoverImageForTextOnly();

    }else {
        console.log(innerFile);
        innerFile.style.display = 'block';

        readCoverImage();
    }
}

var value = document.getElementById('choice');
value.addEventListener('click', function(){
    var value = document.getElementById('choice').checked;
    var innerFile = document.getElementById("select-file");
    var text = document.getElementById("text-to-hide");



    if(value) {
        innerFile.style.display = 'none';

        text.style.display = 'block';

    }else {
        innerFile.style.display = 'block';
        text.style.display = 'none';


    }
})


