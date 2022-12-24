const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const {ObjectId} = require('mongodb');
const validation = require('./validation');
const bandsFunc = require('./bands');
//const uuid = require('uuid');


async function create(bandId, title, releaseDate, tracks, rating){
    if(!bandId) throw 'All fields need to have valid values';
    bandId = validation.checkId(bandId);
    const newChanges = validation.check1(title, releaseDate, tracks, rating);
    title = newChanges[0]; releaseDate = newChanges[1]; tracks = newChanges[2];
    
    const bandCollection = await bands();

    let obj = await bandsFunc.get(bandId);

    const newAlbum = {
        _id: ObjectId(),
        title: title,
        releaseDate: releaseDate,
        tracks: tracks,
        rating: rating
    }

    let newArray = obj.albums;
    newArray.push(newAlbum);

    let totalRating = 0;
    for(let i=0; i<newArray.length; i++){
        totalRating += newArray[i].rating;
    }
    totalRating = (totalRating/(newArray.length)).toFixed(1);

    const updatedBand = {
        albums : newArray,
        overallRating : totalRating
    };

    const updatedInfo = await bandCollection.updateOne(
        { _id: ObjectId(bandId) },
        { $set: updatedBand }
    );

    if (updatedInfo.modifiedCount === 0) throw 'could not add album to the band successfully';
    
    let newband = await bandsFunc.get(bandId);
    return newband;
}


async function getAll(bandId){
    let band = await bandsFunc.get(bandId);
    for(let i=0; i<band.albums.length; i++){
        band.albums[i]._id = band.albums[i]._id.toString();
    }
    return band.albums;
}


async function get(albumId){
    albumId = validation.checkId(albumId);
    const bandCollection = await bands();
    const band = await bandCollection.findOne({'albums._id': ObjectId(albumId)},{'albums.$': true});
    if (!band) throw `Could not find album with albumId: ${albumId}`;
    let album;
    for(let i=0; i<band.albums.length; i++){
        if(band.albums[i]._id.toString().valueOf() === albumId.valueOf()){
            album = band.albums[i];
        }
    }
    album._id = album._id.toString();
    return album;
}


async function remove(albumId){
    albumId = validation.checkId(albumId);
    albumId = ObjectId(albumId);
    const bandCollection = await bands();
    const band = await bandCollection.findOne({'albums._id': albumId});
    let output = await bandCollection
        .updateOne({_id: band._id}, {$pull: {albums: {_id: albumId}}})
        .then(function () {
            return bandsFunc.get(band._id.toString());
    });
    await bandsFunc.updateRating(band._id.toString());
    return output; 
}


    

module.exports = {
    create,
    getAll,
    get,
    remove
}