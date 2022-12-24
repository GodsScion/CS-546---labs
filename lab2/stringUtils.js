function checkValidString(string){
    if(!string){
        throw "Null, undefined, no inputs and empty strings or not allowed!";
    }
    else if(typeof string != 'string'){
        throw "Input must be of String type only!";
    }
    string = string.trim();
    if(string.length === 0){
        throw "Strings with just spaces are considered as empty strings and are not valid!";
    }
    else if(!isNaN(string)){
        throw "Only numbers are not allowed!"
    }
    return string;
}

function camelCase(string){
    let i;
    string = checkValidString(string);
    string = string.toLowerCase();
    for(i=0; i<string.length; i++){
        if(string.charAt(i) === ' '){
            string = string.substring(0,i) + string.charAt(i+1).toUpperCase() + string.substring(i+2);
        }
    }
    return string;
}

function replaceChar(string){
    let i,tchar;
    tchar = true;
    string = checkValidString(string);
    for(i=1; i<string.length; i++){
        if(string.charAt(0).toLowerCase() === string.charAt(i).toLowerCase()){
            if(tchar){
                string = string.substring(0,i) + '*' + string.substring(i+1);
                tchar = false;
            }
            else{
                string = string.substring(0,i) + '$' + string.substring(i+1);
                tchar = true;
            }
        }
    }
    return string;
}

function mashUp(string1, string2){
    if(!string1 || !string2){
        throw "2 valid string inputs is a must!";
    }
    else if(typeof string1 != 'string' || typeof string2 != 'string'){
        throw "Inputs must be of String type only!";
    }
    string1 = string1.trim();
    string2 = string2.trim();
    if(string1.length < 2 || string2.length<2){
        throw "Min length of Strings must be atleast 2 after triming extra spaces!";
    }
    return string2.substring(0,2) + string1.substring(2) + ' ' + string1.substring(0,2) + string2.substring(2);
}

module.exports = {
    camelCase,
    replaceChar,
    mashUp
}