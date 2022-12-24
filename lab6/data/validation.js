const {ObjectId} = require('mongodb');

module.exports = {
  checkId(id) {
    if (!id) throw 'Error: You must provide an id to search for';
    if (typeof id !== 'string') throw 'Error: id must be a string';
    id = id.trim();
    if (id.length === 0)
      throw 'Error: id cannot be an empty string or just spaces';
    if (!ObjectId.isValid(id)) throw 'Error: invalid object ID';
    return id;
  },

  checkString(strVal, varName) {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    if (!isNaN(strVal))
      throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    return strVal;
  },

  checkValidDate(month,day){
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
    return true;
  },

  checkYear(yearFormed){
    if(typeof yearFormed != 'number') throw 'year must be of number type!'
    if(isNaN(yearFormed)) throw 'NaN is not allowed as year!'
    if(yearFormed < 1900) throw `Given ${yearFormed} year is invalid. Must be greater than or equal to 1900!`
    if(yearFormed > 2022) throw `Given ${yearFormed} year is invalid. Must be less than or equal to 2022!`
  },

  check1(title, releaseDate, tracks, rating){
    if(!title || !releaseDate || !tracks || !rating) throw 'All fields need to have valid values';
    
    title = this.checkString(title, "title");
    releaseDate = this.checkString(releaseDate, "releaseDate");
    this.checkValidDate(releaseDate.substring(0,2),releaseDate.substring(3,5));
    this.checkYear(parseInt(releaseDate.substring(6)));

    if(!Array.isArray(tracks)){
        throw 'tracks must be of array type only!'
    }else{
        for (let i=0; i<tracks.length; i++){
            if(typeof tracks[i] == 'string'){
                if(tracks[i].trim().length === 0){tracks.pop(tracks[i]);}
                else{tracks[i] = tracks[i].trim();}
            }
            else{tracks.pop(tracks[i]);}
        }
        if(tracks.length < 3){
            throw "tracks must have atleast three valid string elements in it. \nNote: Empty white spaces are considered as invalid!"
        }
    }

    if(typeof rating != 'number') throw 'rating must be of number type only!';
    if(!(rating >= 1 && rating <= 5)) throw 'rating must be in between 1 and 5 inclusive!';

    return [title, releaseDate, tracks];
  },

  check(name, genre, website, recordLabel, bandMembers, yearFormed){
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
    this.checkYear(yearFormed);

    return [name, genre, website, recordLabel, bandMembers, yearFormed];
  }
};