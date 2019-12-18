 //! encoder function to encode texts in the image



 function encode(img, file, fileName) {

    var fileLen = file.length;
    var fileNameLength = fileName.length;

    if (fileNameLength > 249) {
      fileNameLength = 255;
      fileName = fileName.substr(0, 249) + "~" + fileName.substr(-5);
    }


    var canvas = null,
    ctx = null,
    canvas = document.createElement("canvas");

    canvas.style.display = "none";

    var body = document.getElementsByTagName("body")[0];
    body.appendChild(canvas);
    
    ctx = canvas.getContext("2d");
  
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    var image = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    var imageData = image.data;
    var length = imageData.length;

    var newData = new Array();

    var password = prompt("please enter a password");
    var pseudoRandomGenerator = new Alea(password);

    for (var i = 0; i < length; i++) {
      newData[i] = i;
    }
    var bytes = String.fromCharCode(fileNameLength) + fileName + getLengthInChars(fileLen) + file;

    console.log(bytes);
    if ((imageData.length / 4) < bytes.length) {
      alert("Cannot hide!! file too large")
      return;
    }
    
    for (var i = 0; i <= bytes.length; i++) {
      var randnum = Math.floor(pseudoRandomGenerator() * newData.length);
      var pixelPosition = randnum - (randnum % 4);

      if (newData[pixelPosition] == -1) {
        i--;
        continue;
      }

      imageData[pixelPosition] = ((imageData[pixelPosition] & (~7)) | ((bytes.charCodeAt(i) >> 5) & 7))
      imageData[pixelPosition + 1] = ((imageData[pixelPosition + 1] & (~3)) | ((bytes.charCodeAt(i) >> 3) & 3))
      imageData[pixelPosition + 2] = ((imageData[pixelPosition + 2] & (~7)) | ((bytes.charCodeAt(i)) & 7))
      newData[pixelPosition] = -1;
    }


    image.data = imageData;
    ctx.putImageData(image, 0, 0);
    canvas.style.display = "";
 }

 function print(data) {
     console.log(data);
 }


 function encodeTextOnly(img, text) {

  

    var canvas = null,
    ctx = null,
    canvas = document.createElement("canvas");

    canvas.style.display = "none";

    var body = document.getElementsByTagName("body")[0];
    body.appendChild(canvas);
    
    ctx = canvas.getContext("2d");
  
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    var image = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    var imageData = image.data;
    var length = imageData.length;

    var newData = new Array();

    var password = prompt("please enter a password");
    var pseudoRandomGenerator = new Alea(password);

    for (var i = 0; i < length; i++) {
      newData[i] = i;
    }
    var bytes =  getLengthInChars(text.length) + text;

    console.log(bytes);
    
    if ((imageData.length / 4) < bytes.length) {
      alert("Cannot hide!! file too large")
      return;
    }
    
    for (var i = 0; i <= bytes.length; i++) {
      var randnum = Math.floor(pseudoRandomGenerator() * newData.length);
      var pixelPosition = randnum - (randnum % 4);

      if (newData[pixelPosition] == -1) {
        i--;
        continue;
      }

      imageData[pixelPosition] = ((imageData[pixelPosition] & (~7)) | ((bytes.charCodeAt(i) >> 5) & 7))
      imageData[pixelPosition + 1] = ((imageData[pixelPosition + 1] & (~3)) | ((bytes.charCodeAt(i) >> 3) & 3))
      imageData[pixelPosition + 2] = ((imageData[pixelPosition + 2] & (~7)) | ((bytes.charCodeAt(i)) & 7))
      newData[pixelPosition] = -1;
    }


    image.data = imageData;
    ctx.putImageData(image, 0, 0);
    canvas.style.display = "";


 }