function getMessageEncoded() {
    var message = "demoencrypt";
    var enc = new TextEncoder();
    return enc.encode(message);
}

function generateKey(rawKey) {
    var usages = ['encrypt', 'decrypt'];
    var extractable = false;
  
    return window.crypto.subtle.importKey(
      'raw'
    , rawKey
    , { name: 'AES-CBC' }
    , extractable
    , usages
    );
  }


function encryptMessage(key) {
    var encoded = getMessageEncoded();
    counter = window.crypto.getRandomValues(new Uint8Array(16));

    return window.crypto.subtle.encrypt(
        {
            name:'AES-CBC',
            counter,
        
        },
        key,
        encoded
    );

}

//console.log(generateKey('sam'));

// window.crypto.subtle.generateKey( { name: "AES-CBC", length: 128 }, false,  ["encrypt", "decrypt"] )
// .then(function(key){
//     var iv  = window.crypto.getRandomValues(new Uint8Array(16))
//     window.crypto.subtle.encrypt({ name: "AES-CBC",iv: iv,}, key, "dataToEncrypt" )
//     .then(function(encrypted){
//         console.log(encrypted);
//     }).catch(function(err){
//        console.error(err);
//     });     
// }).catch(function(err){
//     console.error(err);
// });

var myKey;

window.crypto.subtle.generateKey(
    {
        name: "AES-CBC",
        length: 256, //can be  128, 192, or 256
    },
    false, //whether the key is extractable (i.e. can be used in exportKey)
    ["encrypt", "decrypt"] //can be "encrypt", "decrypt", "wrapKey", or "unwrapKey"
)
.then(function(key){
    //returns a key objec
    enc(key);
    
})
.catch(function(err){
    console.error(err);
});



function str2ab(str) {
   var encoder = new TextEncoder();
   var encoded =  encoder.encode(str);
 //  console.log(encoded);
   return encoded;
  }


function enc(key) {
    var str = str2ab('samir');
window.crypto.subtle.encrypt(
    {
        name: "AES-CTR",
        //Don't re-use counters!
        //Always use a new counter every time your encrypt!
        counter: window.crypto.getRandomValues(new Uint8Array(16)),
        length: 128, //can be 1-128
    },
    key, //from generateKey or importKey above
    str//ArrayBuffer of data you want to encrypt
)
.then(function(encrypted){
    //returns an ArrayBuffer containing the encrypted data
 //   console.log(encrypted + 'hello');
   // console.log(new Uint8Array(encrypted));
})
.catch(function(err){
   // console.error(err);
});
}