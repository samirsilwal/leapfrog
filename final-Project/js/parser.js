var str = "hari->gopal";

function parse(str) {
    var l = str.length;
    var indexes = '';
    for(var i = 0; i < l; i++ ){
        if (str[i] === '-' && str[i+1] == '>') {
            indexes = indexes + i + (i+1);
        }
    }
    return indexes;
}



function getFromAarrowSeperator(str) {
    var indexes = parse(str);
    console.log(indexes);
    var temp = str;
    var temp1 = str;
    var obj = {
        left : temp.slice(0, indexes[0]),
        right : temp1.slice(Number(indexes[1]) + 1, str.length ),
    }
    return obj;
}


