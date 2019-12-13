 //! encoder function to encode texts in the image
  function encode(img, file, fileName) {
   var fileLen = file.length;
   var fileNameLength = fileName.length;
   console.log(fileLen, fileNameLength);


   var canvas  = document.createElement('canvas');
   var context = null;
  // canvas.style.display = 'none';

   var bodyReference = document.getElementsByTagName('body')[0];
   bodyReference.appendChild(canvas);

   context = canvas.getContext('2d');

   console.log(img.width, img.height);

   canvas.height = img.height;
   canvas.width = img.width;

   context.drawImage(img, 0, 0);

   var ImagePixels = context.getImageData(0, 0, canvas.width, canvas.height);
   console.log(ImagePixels.data);


   //! prompt a box to ask for password to encode the data

   var password = prompt('Enter the password');
   console.log(password);


  }