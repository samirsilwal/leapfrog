//! read cover Image 

function readCoverImage() {
    var outerImg = document.getElementById("img");
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
      img.src = event.target.result;

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
        console.log(event.target.result, img.src ,innerFile.name);
      encode(img, event.target.result, innerFile.name);
    }
}
