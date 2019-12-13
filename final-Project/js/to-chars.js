 //! change number to characters

 
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
