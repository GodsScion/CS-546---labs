const axios = require('axios');

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json');
    return data; // this will be the array of people objects
}

async function getWork(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json');
    return data;
}

async function getPersonById(id){
    
    id = id.trim();
    id = Number(id);
    const data  = await this.getPeople();
    for(let i=0; i<data.length; i++){
        if(!data[i].id){
            throw `Error in data ID property is not present in ${data[i]} object!`;
        }
        else if (data[i].id.valueOf() === id.valueOf()){
            return data[i];
        }
    }
    throw 'there is no person with that ID';
}

async function getWorkById(id){

    id = Number(id);
    const data  = await this.getWork();
    for(let i=0; i<data.length; i++){
        if(!data[i].id){
            throw `Error in data ID property is not present in ${data[i]} object!`;
        }
        else if (data[i].id.valueOf() === id.valueOf()){
            return data[i];
        }
    }
    throw 'there is no company with that ID';
}


module.exports = {
    getPeople,
    getPersonById,
    getWork,
    getWorkById
}