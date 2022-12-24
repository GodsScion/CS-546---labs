const mongoCollections = require('../config/mongoCollections');
const usersCollection = mongoCollections.users;
const {ObjectId} = require('mongodb');
const bcrypt = require('bcryptjs');
const { users } = require('../config/mongoCollections');


async function checkUser(username, password){
    username = validate(username, password);
    
    const users = await usersCollection();
    let user = await users.findOne({ username: username });
    if (!user) throw 'Either the username or password is invalid';
    
    if(! await bcrypt.compare(password,user.password))  throw 'Either the username or password is invalid';
    
    return {authenticated: true};
}


async function createUser(username, password){
    username = validate(username, password);
    const hash = await bcrypt.hash(password,10);

    let newUser = {
        username: username,
        password: hash
    };

    const usersCollection = await users();
    const insertInfo = await usersCollection.insertOne(newUser);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) 
        throw 'Could not add user';
     
    return {userInserted: true}; 
}


function validate(username, password){
    if (!username || !password) throw `Error: You must enter username and password!`;
    if (typeof username !== 'string' || typeof password !== 'string') throw `Error: username and password must be of string types only!`;
    username = username.trim();
    // 'wefew'.includes()
    if(username.includes(" ") || password.includes(" ")) throw `Error: Spaces are not allowed in username and password`;
    var regEx = /^[0-9a-zA-Z]+$/;
    if(!username.match(regEx)) throw 'Error: username must only have alphabets and numbers';
    if (username.length === 0) throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    if (username.length < 4) throw 'Error: username must have at least 4 characters long';
    if (password.length < 6) throw 'Error: password must have at least 6 characters long';

    return username;
}


module.exports = {
    createUser,
    checkUser
}