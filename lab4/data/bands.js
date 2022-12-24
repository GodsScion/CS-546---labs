const mongoCollections = require('./../config/mongoCollections');
const bands = mongoCollections.bands;
const { ObjectId } = require('mongodb');


async function get(id){
    if (!id) throw 'You must provide an id to search for';
    if (typeof id !== 'string') throw 'Id must be a string';
    if (id.trim().length === 0)
      throw 'Id cannot be an empty string or just spaces';
    id = id.trim();
    if (!ObjectId.isValid(id)) throw 'invalid object ID';
    const bandsCollection = await bands();
    let band = await bandsCollection.findOne({ _id: ObjectId(id) });
    if (band === null) throw 'No band with that id';
    band._id = band._id.toString();
    return band;
}


async function getAll(){
    const bandCollection = await bands();
    const bandsList = await bandCollection.find({}).toArray();
    if (!bandsList) throw 'Could not get all dogs';
    for(let i=0; i<bandsList.length; i++){
        bandsList[i]._id = bandsList[i]._id.toString();
    }
    return bandsList;
}


async function create(name, genre, website, recordLabel, bandMembers, yearFormed){
    if (!name || !genre || !website || !recordLabel || !bandMembers || !yearFormed) throw "All fields need to have valid values"
    if (typeof name !== 'string' || typeof website !== 'string' || typeof recordLabel !== 'string') throw 'Name, website and record label must be of string type'
    name = name.trim();
    website = website.trim();
    recordLabel = recordLabel.trim();
    if (name.length === 0 || website.length === 0 || recordLabel.length === 0) throw "Empty spaces are not allowed in name, website or recordLabel"
    if (website.substring(0,11) != 'http://www.') throw `Given ${website} url is invalid. Website should start with http://www.`
    if (website.substring(website.length-4) != '.com') throw `Given ${website} url is invalid. Website should end with .com`
    if (website.length < 20) throw `Given ${website} url is invalid. There must be at least 5 characters in-between the http://www. and .com`
    if(!Array.isArray(genre) || !Array.isArray(bandMembers)){
        throw 'genre, bandMembers must be of array types only!'
    }else{
        for (let i=0; i<genre.length; i++){
            if(typeof genre[i] == 'string'){
                if(genre[i].trim().length === 0){genre.pop(genre[i]);}
                else{genre[i] = genre[i].trim();}
            }
            else{genre.pop(genre[i]);}
        }
        for (let i=0; i<bandMembers.length; i++){
            if(typeof bandMembers[i] == 'string'){
                if(bandMembers[i].trim().length === 0){bandMembers.pop(bandMembers[i]);}
                else{bandMembers[i] = bandMembers[i].trim();}
            }
            else{bandMembers.pop(bandMembers[i]);}
        }
        if(genre.length === 0 || bandMembers.length === 0){
            throw "genre and bandMembers each must have atleast one valid string element in it. \nNote: Empty white spaces are considered as invalid!"
        }
    }
    if(typeof yearFormed != 'number') throw 'yearFormed must be of number type!'
    if(isNaN(yearFormed)) throw 'NaN is not allowed in yearFormed!'
    if(yearFormed < 1900) throw `Given ${yearFormed} year is invalid. Must be greater than or equal to 1900!`
    if(yearFormed > 2022) throw `Given ${yearFormed} year is invalid. Must be less than or equal to 2022!`
    
    const bandCollection = await bands(); 

    let newBand = {
        //_id: ObjectId, 
        name: name,
        genre: genre,
        website: website,
        recordLabel: recordLabel,
        bandMembers: bandMembers,
        yearFormed: yearFormed
    };

    const insertInfo = await bandCollection.insertOne(newBand);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) 
        throw 'Could not add band';

    const newId = insertInfo.insertedId.toString();
     
    const band = await this.get(newId);
    //band._id = band._id.toString();
    return band; 
}


async function remove(id) {
    if (!id) throw 'You must provide an id to search for';
    if (typeof id !== 'string') throw 'Id must be a string';
    if (id.trim().length === 0)
      throw 'id cannot be an empty string or just spaces';
    id = id.trim();
    if (!ObjectId.isValid(id)) throw 'invalid object ID';

    const bandCollection = await bands();

    let bandToBeDeleted = await get(id);

    const deletionInfo = await bandCollection.deleteOne({ _id: ObjectId(id) });

    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete band with id of ${id}`;
    }
    return `${bandToBeDeleted.name} has been successfully deleted!`;
}


async function rename(id, newName){
    if (!id) throw 'You must provide an id to search for';
    if (typeof id !== 'string') throw 'Id must be a string';
    if (id.trim().length === 0)
      throw 'Id cannot be an empty string or just spaces';
    id = id.trim();
    if (!ObjectId.isValid(id)) throw 'invalid object ID';
    if (!newName) throw 'You must provide a name for your dog';
    if (typeof newName !== 'string') throw 'Name must be a string';
    if (newName.trim().length === 0)
      throw 'Name cannot be an empty string or string with just spaces';
    newName = newName.trim();

    const bandCollection = await bands();

    let obj = await get(id);
    if(obj.name === newName) throw "Won't update cause given new name is same as current name";

    const updatedBand = {
      name: newName
    };

    const updatedInfo = await bandCollection.updateOne(
      { _id: ObjectId(id) },
      { $set: updatedBand }
    );

    if (updatedInfo.modifiedCount === 0) {
      throw 'could not update name of the band successfully';
    }

    let outObj = await this.get(id);
    //outObj._id = outObj._id.toString();
    return outObj;
}



module.exports = {
    create,
    get,
    getAll,
    remove,
    rename
}