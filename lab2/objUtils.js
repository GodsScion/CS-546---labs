const arrayUtils = require("./arrayUtils");

function makeArrays(array,extraParam){
    let i,j,keys;
    let outArray = [];
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
            if (typeof array[i] != 'object'){
                throw "Array must contain only objects!";
            }
            keys = Object.keys(array[i]);
            if(keys.length < 2){
                throw "Objects in the array must have atleast 2 elements!";
            }
        }
    }
    for(i=0; i<array.length; i++){
        keys = Object.keys(array[i]);
        for(j=0; j<keys.length; j++){
            outArray.push([keys[j],array[i][keys[j]]]);
        }
    }
    return outArray;
}

function isDeepEqual(obj1, obj2){
    let i;
    if(!obj1 || !obj2){
        throw "Inputs can't be empty!";
    }
    else if(Array.isArray(obj1) || Array.isArray(obj2)){
        throw "Ah!! Clever Person eh. No arrays, only objects for now!";
    }
    else if(typeof obj1 !== 'object' || typeof obj2 !== 'object'){
        throw "Inputs must be of object type only!"
    }
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);
    keys1.sort();
    keys2.sort();
    if(keys1.length === keys2.length){
        for(i=0; i<keys1.length; i++){
            if(keys1[i] !== keys2[i]){
                return false;
            }
            else if(typeof obj1[keys1[i]] == 'object' && typeof obj2[keys2[i]] == 'object'){  //checking equality of object type
                if(!isDeepEqual(obj1[keys1[i]],obj2[keys2[i]])){
                    return false;
                }
            }
            else if(Array.isArray(obj1[keys1[i]]) && Array.isArray(obj2[keys2[i]])){ //checking equality of arrays
                if(!arrayUtils.isEqual(obj1[keys1[i]],obj2[keys2[i]])){
                    return false;
                }
            }
            else if(obj1[keys1[i]] !== obj2[keys2[i]]){
                return false;
            }    
        }
    }
    else{
        return false;
    }
    return true;
}

function computeObject(object, func){
    if(!object || !func){
        throw "Inputs can't be empty!";
    }
    else if(Array.isArray(object)){
        throw "Ah!! Clever Person eh. For 1st input no array, only object for now!";
    }
    else if(typeof object !== 'object' || typeof func !== 'function'){
        throw "Inputs must be of valid type only (object, function) respectively!"
    }
    else{
        let keys = Object.keys(object);
        for(let i=0; i<keys.length; i++){
            if(typeof object[keys[i]] != 'number'){
                throw "Values of the object must be of number type only!";
            }
            else if(isNaN(object[keys[i]])){
                throw "NaN is not allowed!";
            }
            else{
                object[keys[i]] = func(object[keys[i]])
            }
        }
    }
    return object;
}

module.exports = {
    makeArrays,
    isDeepEqual,
    computeObject
}