const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const {ObjectId} = require('mongodb');
const validation = require('./validation');

async function get(id){
    id = validation.checkId(id);
    const bandsCollection = await bands();
    let band = await bandsCollection.findOne({ _id: ObjectId(id) });
    if (!band) throw 'No band with that id';
    band._id = band._id.toString();
    return band;
}


async function getAll(){
    const bandCollection = await bands();
    let bandsList = await bandCollection.find().toArray();
    if (!bandsList) throw 'Could not get all bands';
    for(let i=0; i<bandsList.length; i++){
        bandsList[i]._id = bandsList[i]._id.toString();
    }
    return bandsList;
}


async function create(name, genre, website, recordLabel, bandMembers, yearFormed){
    
    let newval = validation.check(name, genre, website, recordLabel, bandMembers, yearFormed);
    name = newval[0]; genre = newval[1]; website = newval[2]; recordLabel = newval[3]; bandMembers = newval[4]; yearFormed = newval[5];

    const bandCollection = await bands(); 

    let newBand = {
        name: name,
        genre: genre,
        website: website,
        recordLabel: recordLabel,
        bandMembers: bandMembers,
        yearFormed: yearFormed,
        albums: [],
        overallRating: 0
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
    id = validation.checkId(id);

    const bandCollection = await bands();

    let bandToBeDeleted = await get(id);

    const deletionInfo = await bandCollection.deleteOne({ _id: ObjectId(id) });

    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete band with id of ${id}`;
    }
    return `${bandToBeDeleted.name} has been successfully deleted!`;
}


async function update(id, name, genre, website, recordLabel, bandMembers, yearFormed){
    if(!id) throw "All fields need to have valid values";
    id = validation.checkId(id);
    let newval = validation.check(name, genre, website, recordLabel, bandMembers, yearFormed);
    name = newval[0]; genre = newval[1]; website = newval[2]; recordLabel = newval[3]; bandMembers = newval[4]; yearFormed = newval[5];

    const bandCollection = await bands();

    let obj = await get(id);
    if(obj.name === name && obj.genre === genre && obj.website === website && obj.recordLabel === recordLabel && obj.bandMembers === bandMembers && obj.yearFormed === yearFormed) throw "Won't update cause all new values are same as current values";

    const updatedBand = {
        name: name,
        genre: genre,
        website: website,
        recordLabel: recordLabel,
        bandMembers: bandMembers,
        yearFormed: yearFormed
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

async function updateRating(id){
    id = validation.checkId(id);
    let obj = await get(id);
    let totalRating = 0;
    for(let i=0; i<obj.albums.length; i++){
        totalRating += obj.albums[i].rating;
    }

    if(obj.albums.length>0){
        totalRating = (totalRating/(obj.albums.length)).toFixed(1);
    }

    const updatedBand = {
        overallRating : totalRating
    };

    const bandCollection = await bands();
    await bandCollection.updateOne(
        { _id: ObjectId(id) },
        { $set: updatedBand }
    );
}



module.exports = {
    create,
    get,
    getAll,
    remove,
    update,
    updateRating
}