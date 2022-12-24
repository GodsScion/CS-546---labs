const objUtils = require("./objUtils");

function checkValidArray(array,extraParam){
    let i=0;
    if(extraParam){
        throw "Only a single input is allowed and that input must be a valid array!";
    }else if(!array){
        throw "Null or undefined or not writing any inputs is not allowed!";
    }
    else if(!Array.isArray(array)){
        throw "Input must be of Array type!";
    }
    else if(array.length === 0){
        throw "Empty array is not allowed!";
    }
    else{
        for(i=0; i<array.length; i++){
            if (typeof array[i] != 'number'){
                throw "Array must contain only numbers!";
            }
            else if(isNaN(array[i])){
                throw "NaN is not allowed!";
            }
        }
    }
}

function sort(array){
    let i=0;
    for (i=1;i<array.length;i++){
        let key = array[i];
        let j = i-1;
        while(j>=0 && array[j]>key){
            array[j+1] = array[j];
            j=j-1;
        }
        array[j+1] = key;
    }
    return array;
}

function mean(array,extraParam){
    checkValidArray(array,extraParam);
    let tot=0;
    for(i=0; i<array.length; i++){
        tot = tot + array[i];
    }
    return tot/(array.length);
}

function medianSquared(array,extraParam){
    checkValidArray(array,extraParam);
    //array = array.sort();
    array = sort(array);
    if(array.length % 2 === 0){
        return Math.pow((array[array.length/2] + array[array.length/2 - 1])/2,2);
    }
    else{
        return Math.pow(array[(array.length-1)/2],2);
    }
}

function maxElement(array,extraParam){
    checkValidArray(array,extraParam);
    let i=0;
    let max = array[0];
    let index = 0;
    for(i=0;i<array.length;i++){
        if(array[i]>max){
            index=i;
            max=array[i];
        }
    }
    let obj = {};
    obj[max] = index;
    return obj;
}

function fill(end, value, extraParam){
    if(extraParam){
        throw "Max only 2 inputs are allowed!"
    }else if(!end && end!==0){
        throw "Null or undefined or not writing any inputs is not allowed!";
    }
    else if(typeof end != 'number'){
        throw "First input must be of number type only!";
    }
    else if(isNaN(end)){
        throw "NaN is not allowed!";
    }
    else if(end<=0){
        throw "First input number must be greater than 0!";
    }
    else if(value === '' || value === ""){
        throw "Empty Strings are not allowed!";
    }
    let i=0;
    let OutArray = [];
    if(value){
        for(i=0; i<end; i++){
            OutArray.push(value);// = OutArray + [value];
        }
    }
    else{
        for(i=0; i<end; i++){
            OutArray.push(i);// = OutArray + [i];
        }
    }
    return OutArray;
}

function countRepeating(array,extraParam){
    if(extraParam){
        throw "Only a single input is allowed and that input must be a valid array!";
    }else if(!array){
        throw "Null or undefined or not writing any inputs is not allowed!";
    }
    else if(!Array.isArray(array)){
        throw "Input must be of Array type only!";
    }
    if(array.length === 0){
        return {};
    }
    let obj = {};
    let i,j;
    let c=1;
    for(i=0; i<array.length; i++){
        for(j=i+1;j<array.length;j++){
            if(!array[i]){
                throw "Values in an array can't be of null or undefined or empty strings!";
            }
            if(Array.isArray(array[i]) && Array.isArray(array[j])){
                if(isEqual(array[i],array[j])){
                    c+=1;
                    array.splice(j,1);
                    j-=1;
                }
            }
            else if((typeof array[i] == 'object' && typeof array[j] == 'object') && !Array.isArray(array[i]) && !Array.isArray(array[j])){
                if(objUtils.isDeepEqual(array[i],array[j])){
                    c+=1;
                    array.splice(j,1);
                    j-=1;
                }
            }
            else if(array[i] == array[j]){
                c+=1;
                array.splice(j,1);
                j-=1;
            }
        }
        if(c>1){
            obj[array[i]] = c;
            c=1;
        }
    }
    return obj;
}

function isEqual(arrayOne, arrayTwo, extraParam){
    let i,j;
    if(extraParam){
        throw "Only two inputs are allowed!";
    }else if(!arrayOne || !arrayTwo){
        throw "Null or undefined or not writing any inputs is not allowed, two valid array inputs is a must!";
    }
    else if(!Array.isArray(arrayOne) || !Array.isArray(arrayTwo)){
        throw "Inputs must be of Array type only!";
    }
    if(arrayOne.length === arrayTwo.length){
        for(i=0; i<arrayOne.length; i++){
            if(Array.isArray(arrayOne[i] || typeof arrayOne[i] == 'object')){
                arrayOne[i].sort();
            }
            if(Array.isArray(arrayTwo[i] || typeof arrayTwo[i] == 'object')){
                arrayTwo[i].sort();
            }
        }
        arrayOne.sort();
        arrayTwo.sort();
        for(i=0; i<arrayTwo.length; i++){
            if(Array.isArray(arrayTwo[i]) || typeof arrayTwo[i] == 'object'){
                for(j=0; j<arrayTwo[i].length; j++){
                    if(arrayTwo[i][j] !== arrayOne[i][j]){
                        return false;
                    }
                }
            }else if(arrayTwo[i] !== arrayOne[i]){
                return false;
            }
        }
        return true;
    }
    else{
        return false;
    }
}


module.exports = {
    mean,
    medianSquared,
    maxElement,
    fill,
    countRepeating,
    isEqual
}