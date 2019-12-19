//! read cover Image 

function readCoverImage() {
  var outerImg = document.getElementById("img");
  var value = document.getElementById('example').checked;
  if (!outerImg.files[0]) {
    return;
  }


  var imgdata = outerImg.files[0];
  var reader = new FileReader();
  reader.onload = function (event) {
    var img = new Image;
    img.onload = function () {
      getFileToHide(this);
    }
    if (value) {
      img.src = './images/download (1).png';

    } else {
      img.src = event.target.result;

    }


  }
  reader.readAsDataURL(imgdata);
}



function readCoverImageForTextOnly() {
  var outerImg = document.getElementById("img");
  var text = document.getElementById('text-to-hide').value;
  var value = document.getElementById('example').checked;

  console.log(text);
  if (!outerImg.files[0]) {
    return;
  }
  var imgdata = outerImg.files[0];
  var reader = new FileReader();

  reader.onload = function (event) {
    var img = new Image;
    img.onload = function () {
      encodeTextOnly(img, text);
    }
    if (value) {
      img.src = './images/download (1).png';

    } else {
      img.src = event.target.result;

    }



  }
  reader.readAsDataURL(imgdata);
}







function getFileToHide(img) {
  var innerFile = document.getElementById("file");
  if (!innerFile.files[0]) {

    return;
  }
  innerFile = innerFile.files[0];
  var reader = new FileReader();
  reader.readAsBinaryString(innerFile);
  reader.onload = function (event) {
    //  console.log(event.target.result, img.src ,innerFile.name);
    encode(img, event.target.result, innerFile.name);


  }
}


function readEncodedImage() {
  var outerImg = document.getElementById("img1");
  var value = document.getElementById('decode-choice').checked;


  if (!outerImg.files[0]) {
    return;
  }

  var imgData = outerImg.files[0];
  var reader = new FileReader();
  reader.onload = function (event) {
    var img = new Image;
    img.onload = function () {
      if (!value) {
        decode(this);

      } else {
        decodeTextOnly(this);

      }

    }
    img.src = event.target.result;
  }
  reader.readAsDataURL(imgData);
}