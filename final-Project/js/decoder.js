//! decoder for file hidden in image


function decode(img) {
    console.log("hello i am decoder");

    //!create a canvas to get image pixels

    var canvas = null,
        context = null,
        canvas = document.createElement("canvas");

    canvas.style.display = "none";
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(canvas);
    context = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;

    context.drawImage(img, 0, 0);
    var image = context.getImageData(0, 0, canvas.width, canvas.height);
    var imageData = image.data;
    var length = imageData.length;
    var newData = new Array();

    var password = prompt("please enter a password");
    var pseudoRandomGenerator = new Alea(password);

    for (var i = 0; i < length; i++) {
        newData[i] = i;
    }

    //! extract name of the encoded file from image
    
    var name = "";
    var retObj = getName(pseudoRandomGenerator, imageData, newData);

    newData = retObj.newData;
    name = retObj["name"];

    //! ask user if want to save file

    var readyToDownload = confirm("want to download file:" + name + "?");

    if (!readyToDownload) {
        return;
    }
    saveFileToMakeDownloadable(pseudoRandomGenerator, imageData, newData, name);
   

}

function decodeTextOnly(img) {
   
    //!create a canvas to get image pixels

    var canvas = null,
        context = null,
        canvas = document.createElement("canvas");

    canvas.style.display = "none";
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(canvas);
    context = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;

    context.drawImage(img, 0, 0);
    var image = context.getImageData(0, 0, canvas.width, canvas.height);
    var imageData = image.data;
    var length = imageData.length;
    var newData = new Array();

    var password = prompt("please enter a password");
    var pseudoRandomGenerator = new Alea(password);

    for (var i = 0; i < length; i++) {
        newData[i] = i;
    }

    //! extract name of the encoded file from image

    var retObj = getBodyLength(pseudoRandomGenerator, imageData, newData);
    var body = "";

    var newData = retObj.newData;
    var len = retObj["len"];

   for (var i = 0; i < len; i++) {

       var randnum = Math.floor(pseudoRandomGenerator() * newData.length);
       var pixelPosition = randnum - (randnum % 4);

       if (newData[pixelPosition] == -1) {
           i--;
           continue;
       }

       byte = ((imageData[pixelPosition] & 7) << 5 | (imageData[pixelPosition + 1] & 3) << 3 | (imageData[pixelPosition + 2] & 7));
       body += String.fromCharCode(byte);
       console.log(body);
       newData[pixelPosition] = -1;
   }

   var display = document.getElementById('text-to-display');
   display.style.display = 'block';
   display.value = body;
    

}

function saveFileToMakeDownloadable(pseudoRandomGenerator, imageData, newData, name) {

     var retObj = getBodyLength(pseudoRandomGenerator, imageData, newData);
     var body = "";

     var newData = retObj.newData;
     var len = retObj["len"];

    for (var i = 0; i < len; i++) {

        var randnum = Math.floor(pseudoRandomGenerator() * newData.length);
        var pixelPosition = randnum - (randnum % 4);

        if (newData[pixelPosition] == -1) {
            i--;
            continue;
        }

        byte = ((imageData[pixelPosition] & 7) << 5 | (imageData[pixelPosition + 1] & 3) << 3 | (imageData[pixelPosition + 2] & 7));
        body += String.fromCharCode(byte);
        newData[pixelPosition] = -1;
    }

    var base64string = base64_encode(body, true);
    console.log(base64string);
    url = "data:application/octet-stream;base64," + base64string;


    
    var element = document.createElement('a');
    element.setAttribute('href', url);
    element.setAttribute('download', name);
  
    element.style.display = 'none';
    document.getElementsByTagName("body")[0].appendChild(element);
  
    element.click();
  
    document.getElementsByTagName("body")[0].removeChild(element);
    


}



function getBodyLength(rng, imageData, newData) {
    var len = 0;

    for (var i = 0; i <= 7; i++) {

      var randnum = Math.floor(rng() * newData.length);
      var redIndex = randnum - (randnum % 4);


      if (newData[redIndex] == -1) {
        i--;
        continue;
      }
      
      byte = ((imageData[redIndex] & 7) << 5 | (imageData[redIndex + 1] & 3) << 3 | (imageData[redIndex + 2] & 7));
      len |= byte << (i * 8);
      
      newData[redIndex] = -1;

    }
    
    return {
      "len": len,
      "newData": newData,
    }


  }

function getName(pseudoRandomGenerator, imageData, newData) {

    var randnum = Math.floor(pseudoRandomGenerator() * newData.length);
    var pixelPosition = randnum - (randnum % 4);
    var name = "";

    if (newData[pixelPosition] == -1) {
        return getName(pseudoRandomGenerator, imageData, newData);
    }

    len = ((imageData[pixelPosition] & 7) << 5 | (imageData[pixelPosition + 1] & 3) << 3 | (imageData[pixelPosition + 2] & 7));
    
    console.log(len);

    newData[pixelPosition] = -1;

    for (var i = 0; i < len; i++) {

        var randnum = Math.floor(pseudoRandomGenerator() * newData.length);
        var pixelPosition = randnum - (randnum % 4);

        if (newData[pixelPosition] == -1) {
            i--;
            continue;
        }

        byte = ((imageData[pixelPosition] & 7) << 5 | (imageData[pixelPosition + 1] & 3) << 3 | (imageData[pixelPosition + 2] & 7));
       
        name += String.fromCharCode(byte);

        newData[pixelPosition] = -1;
    }

    console.log(name);

    return {
        "name": name,
        "newData": newData,
    }
}