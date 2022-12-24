const axios = require('axios');
const people = require("./people");

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

async function getStocks(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json');
    return data;// this will be the array of people objects
}



async function listShareholders(stockName){
    const data = await getStocks();
    let obj,array;
    let newArray = [];
    if(checkValidString(stockName)){
        for(let i=0; i<data.length; i++){
            if(data[i].stock_name === stockName){
                obj = data[i]
            }
        }
        if(!obj){
            throw "Stock name not found!";
        }
        array = obj["shareholders"];
        for(let i=0; i<array.length; i++){
            let peopleObj = await people.getPersonById(array[i].userId);
            let tempObj = {};
            tempObj['first_name'] = peopleObj.first_name;
            tempObj['last_name'] = peopleObj.last_name;
            tempObj['number_of_shares'] = array[i].number_of_shares;
            newArray[i] = tempObj;
        }
        obj["shareholders"] = newArray;
        return obj;
    }
}


async function totalShares(stockName){
    const data = await listShareholders(stockName);
    stockName = stockName.trim();
    if(data.shareholders.length === 0){
        return `${stockName} currently has no shareholders.`;
    }
    else if(data.shareholders.length > 1){
        let total = 0;
        for(let i=0; i<data.shareholders.length; i++){
            total += data.shareholders[i].number_of_shares;
        }
        return `${stockName}, has ${data.shareholders.length} shareholders that own a total of ${total} shares.`
    }
    else{
        return `${stockName}, has 1 shareholder that owns a total of ${data.shareholders[0].number_of_shares} shares.`
    }
}

async function listStocks(firstName, lastName){
    if(checkValidString(firstName) && checkValidString(lastName)){
        const peopleData = await people.getPeople();
        const stocksData = await getStocks();
        
        firstName = firstName.trim();
        lastName = lastName.trim();

        let id;
        
        for(let i=0; i< peopleData.length; i++){
            if(peopleData[i].first_name === firstName && peopleData[i].last_name === lastName){
                id = peopleData[i].id
            }
        }
        if(!id){
            throw 'Person not found!';
        }

        let outArray = [];
        for(let i=0; i< stocksData.length; i++){
            for(let j=0; j<stocksData[i].shareholders.length; j++){
                if(stocksData[i].shareholders[j].userId === id){
                    let obj = {};
                    obj['stock_name'] = stocksData[i].stock_name;
                    obj['number_of_shares'] = stocksData[i].shareholders[j].number_of_shares;
                    outArray.push(obj);
                }
            }
        }
        if(outArray.length === 0){
            throw 'The given person owns no stocks!';
        }

        return outArray;
    }
}



async function getStockById(id){
    if(checkValidString(id)){
        id=id.trim();
        const data = await getStocks();
        for(let i=0; i<data.length; i++){
            if(data[i].id === id){
                return data[i];
            }
        }
        throw 'stock not found';
    }
}



module.exports = {
    listShareholders,
    totalShares,
    listStocks,
    getStockById
}