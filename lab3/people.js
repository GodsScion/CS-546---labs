const axios = require('axios');


async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
    return data // this will be the array of people objects
}


function checkValidString(str){
    if (!str){
        throw 'Please enter input, it cannot be empty or null or undefined!';
    }
    else if (typeof str != 'string'){
        throw 'Input must be of string type only!';
    }
    else if (str.trim().length === 0){
        throw 'Inputs with just spaces are not allowed!';
    }
    else{
        return true;
    }
}


async function getPersonById(id){
    if (checkValidString(id)) {
        id = id.trim();
        const data = await getPeople();
        let i;
        for(i=0; i<data.length; i++){
            if(!data[i].id){
                throw `Error in data ID property is not present in ${data[i]} object!`;
            }
            else if (data[i].id === id){
                return data[i];
            }
        }
        throw 'person not found';
    }
}


async function sameEmail(emailDomain){
    if(checkValidString(emailDomain)){
        emailDomain = emailDomain.trim();
        let index = 0;
        let count = 0;
        for(let i = 0; i<emailDomain.length; i++ ){
            if(emailDomain.substr(i,1) === '.'){
                count += 1;
                index = i;
            }
        }
        if(count === 0){
            throw 'EmailDomain must have atleast one period "."';
        }
        else if(index+2 >= emailDomain.length){
            throw 'There must be atleast 2 charecters after the last "." in EmailDomain';
        }
        //else if(){
            //check for letters bruh!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //}
        else{
            const data = await getPeople();
            let outArray = [];
            for(let i=0; i<data.length; i++){
                /*if( -1 < data[i].email.toLowerCase().search(emailDomain.toLowerCase())){
                    outArray.push(data[i]);
                }*/
                index = data[i].email.indexOf('@');
                if(data[i].email.substr(index+1).toLowerCase() === emailDomain.toLowerCase()){
                    outArray.push(data[i]);
                }
            }
            if(outArray.length < 2){
                throw `Number of people with ${emailDomain} domain name are less than 2`;
            }
            else{
                return outArray;
            }
        }
    }
}


async function manipulateIp(){
    let data = await getPeople();
    let tempArray,tempIp,maxIpIndex,minIpIndex,totalIpVal;
    for(let i=0; i<data.length; i++){
        //console.log('ip: ' + data[i].ip_address);
        tempArray = [];
        //tempIp = data[i].ip_address.replace(/./g,'');
        tempIp = data[i].ip_address;
        for(let k=0; k<tempIp.length; k++){
            if(tempIp.charAt(k) === '.'){
                tempIp = tempIp.substring(0,k) + tempIp.substring(k+1);
            }
        }
        //console.log('tempIp: ' + tempIp);
        for(let j=0; j<tempIp.length; j++){ 
            tempArray.push(tempIp.substring(j,j+1));
        }
        //console.log('tempArray Before sort: ' + tempArray);
        tempIp = '';
        tempArray = tempArray.sort();
        //console.log('tempArray After sort: ' + tempArray);
        for(let j=0; j<tempArray.length; j++){
            tempIp = tempIp + tempArray[j].toString();
        }
        //console.log('tempIp: ' + tempIp);
        data[i].ip_address = Number(tempIp);
        //console.log('Ip: ' + data[i].ip_address);
    }
    maxIpIndex = 0;
    minIpIndex = 0;
    totalIpVal = 0;
    for(let i=0; i<data.length; i++){
        totalIpVal = totalIpVal + data[i].ip_address;
        if(data[i].ip_address > data[maxIpIndex].ip_address){
            maxIpIndex = i;
        }
        if(data[i].ip_address < data[minIpIndex].ip_address){
            minIpIndex = i;
        }
    }
    let highestObj = {};
    let lowestObj = {};
    let outputObj = {};
    
    highestObj['firstName'] = data[maxIpIndex].first_name;
    highestObj['lastName'] = data[maxIpIndex].last_name;
    
    lowestObj['firstName'] = data[minIpIndex].first_name;
    lowestObj['lastName'] = data[minIpIndex].last_name;
    
    outputObj['highest'] = highestObj;
    outputObj['lowest'] = lowestObj;
    outputObj['average'] = Math.floor(totalIpVal/data.length);

    return outputObj;
}


async function sameBirthday(month, day){
    const data = await getPeople();
    if(!month || !day){
        throw 'Please give both inputs month and day';
    }
    else if(typeof month != 'number' || typeof day != 'number'){
        if(typeof month == 'string'){
            month = parseInt(month.trim());
            if(isNaN(month) || month === 0){
                throw 'Numbers only if input is string type!';
            }
        }
        else if(typeof month != 'number'){
            throw 'Please give numbers as input. Numbers in string type are also fine!';
        }
        if(typeof day == 'string'){
            day = Number(day.trim());
            if(isNaN(day) || day === 0){
                throw 'Numbers only if input is string type!';
            }
        }
        else if(typeof day != 'number'){
            throw 'Please give numbers as input. Numbers in string type are also fine!';
        }
    }
    if(!(month >= 1 && month <= 12)){
        throw 'Month must be in between 1 and 12 inclusive of 1 and 12!';
    }
    else{
        let month31 = [1,3,5,7,8,10,12];
        if(month31.includes(month)){
            if(!(day >= 1 && day <= 31)){
                throw `For month ${month}, day must be in between 1 and 31 inclusive of 1 and 31`;
            }
        }
        else if(month === 2){
            if(!(day <= 1 && day >= 28)){
                throw `For month ${month}, day must be in between 1 and 28 inclusive of 1 and 28`;
            }
        }
        else if(!(day>=1 && day<=30)){
            throw `For month ${month}, day must be in between 1 and 30 inclusive of 1 and 30`;          
        }
    }
    let outArray = [];
    for(let i=0; i<data.length; i++){
        if(Number(data[i].date_of_birth.substring(0,2)) == month && Number(data[i].date_of_birth.substring(3,5) == day)){
            outArray.push(data[i].first_name + ' ' + data[i].last_name);
        }
    }
    if(outArray.length === 0){
        throw `There are no people with that birthday number ${month}/${day}`;
    }
    return outArray;
}


module.exports = {
    getPersonById,
    sameEmail,
    manipulateIp,
    sameBirthday,
    getPeople
}