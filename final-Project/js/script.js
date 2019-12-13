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


  function Mash() {
    var n = 0xefc8249d;

    var mash = function (data) {
      data = data.toString();
      for (var i = 0; i < data.length; i++) {
        n += data.charCodeAt(i);
        var h = 0.02519603282416938 * n;
        n = h >>> 0;
        h -= n;
        h *= n;
        n = h >>> 0;
        h -= n;
        n += h * 0x100000000; // 2^32
      }
      return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
    };

    mash.version = 'Mash 0.9';
    return mash;
  }


  function Alea() {
    return (function (args) {
      // Johannes Baagøe <baagoe@baagoe.com>, 2010
      var s0 = 0;
      var s1 = 0;
      var s2 = 0;
      var c = 1;

      if (args.length == 0) {
        args = [+new Date];
      }
      var mash = Mash();
      s0 = mash(' ');
      s1 = mash(' ');
      s2 = mash(' ');
      console.log(s0,s1,s2,'................')

      for (var i = 0; i < args.length; i++) {
        s0 -= mash(args[i]);
        if (s0 < 0) {
          s0 += 1;
        }
        s1 -= mash(args[i]);
        if (s1 < 0) {
          s1 += 1;
        }
        s2 -= mash(args[i]);
        if (s2 < 0) {
          s2 += 1;
        }
      }
      mash = null;

      var random = function () {
        var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
        s0 = s1;
        s1 = s2;
        return s2 = t - (c = t | 0);
      };
      random.uint32 = function () {
        return random() * 0x100000000; // 2^32
      };
      random.fract53 = function () {
        return random() +
          (random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
      };
      random.version = 'Alea 0.9';
      random.args = args;
      return random;

    }(Array.prototype.slice.call(arguments)));
  };

  
  function getLengthInChars(length) {
    var bigPart = length & (~255);
    var tempSmallPart = length & (~bigPart);

    bigPart = bigPart >> 8;

    var buf = String.fromCharCode(tempSmallPart);

    while (bigPart > 255) {
      var tempLen = bigPart;
      bigPart = bigPart & (~255);
      tempSmallPart = tempLen & (~bigPart);
      bigPart = bigPart >> 8;
      buf = buf + String.fromCharCode(tempSmallPart);
    }

    buf = buf + String.fromCharCode(bigPart);
    if (buf.length <= 8) {
      var end = 8 - buf.length;
      for (var x = 0; x < end; x++) {
        buf = buf + String.fromCharCode(0);
      }
    } else {
      return "";
    }
    return buf;
  }


  
  function encode(img, file, fileName) {
    var fileLen = file.length;
    var nameLen = fileName.length;

    if (nameLen > 249) {
      nameLen = 255;
      fileName = fileName.substr(0, 249) + "~" + fileName.substr(-5);
    }

    var canvas = null,
    ctx = null,
    canvas = document.createElement("canvas");
    // the canvas should not be visible
    canvas.style.display = "none";
    var b = document.getElementsByTagName("body")[0];
    b.appendChild(canvas);
    ctx = canvas.getContext("2d");
  

    canvas.width = img.width;
    canvas.height = img.height;
    // draw the image into the canvas element
    ctx.drawImage(img, 0, 0);
    var image = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var imageData = image.data;
    var length = imageData.length;
    var newData = new Array();
    var pass = prompt("please enter a password");
    var rng = new Alea(pass);
    var redIndicies = [];
    for (var i = 0; i < length; i++) {
      newData[i] = i;
    }

    var bytes = String.fromCharCode(nameLen) + fileName + getLengthInChars(fileLen) + file;
    console.log(bytes);
    if (imageData.length / 4 < bytes.length) {
      alert("innerFile too big")
      return;
    }
    for (var i = 0; i <= bytes.length; i++) {
      var randnum = Math.floor(rng() * newData.length);
      var redIndex = randnum - (randnum % 4);

      if (newData[redIndex] == -1) {
        i--;
        continue;
      }
      //redIndicies.push(redIndex);
      imageData[redIndex] = ((imageData[redIndex] & (~7)) | ((bytes.charCodeAt(i) >> 5) & 7))
      imageData[redIndex + 1] = ((imageData[redIndex + 1] & (~3)) | ((bytes.charCodeAt(i) >> 3) & 3))
      imageData[redIndex + 2] = ((imageData[redIndex + 2] & (~7)) | ((bytes.charCodeAt(i)) & 7))
      newData[redIndex] = -1;
    }
    image.data = imageData;
    ctx.putImageData(image, 0, 0);
    canvas.style.display = "";
  }