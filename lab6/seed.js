const bands = require('./data/bands');
const connection = require('./config/mongoConnection');

async function main(){
    const db = await connection.connectToDb();
    await db.dropDatabase();
    let bandCollection;

    try{
        const pinkFloyd = await bands.create("Pink Floyd", ["Progressive Rock", "Psychedelic rock", "Classic Rock"], "http://www.pinkfloyd.com", "EMI", ["Roger Waters", "David Gilmour", "Nick Mason", "Richard Wright", "Sid Barrett" ], 1965);
        console.log(pinkFloyd);
    }catch(error){ console.log(error);}

    try{
        await bands.create("The Beatles",["Rock", "Pop", "Psychedelia"],"http://www.thebeatles.com","Parlophone",["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"],1960);
    }catch(error){ console.log(error);}
    
    try{
        bandCollection = await bands.getAll();
        console.log(bandCollection);
    }catch(error){ console.log(error);}
    
    try{
        console.log(await bands.create("Linkin Park",["Alternative Rock", "Pop Rock", "Alternative Metal"],"http://www.linkinpark.com","Warner",["Chester Bennington", "Rob Bourdon", "Brad Delson", "Mike Shinoda", "Dave Farrell", "Joe Hahn"],1996));
    }catch(error){ console.log(error);}


    try{
        console.log(await bands.remove(bandCollection[1]._id));
    }catch(error){ console.log(error);}

    try{
        bandCollection = await bands.getAll();
        console.log(bandCollection);
    }catch(error){ console.log(error);}

    try{
        await bands.create(16616161,["Rock", "Pop", "Psychedelia"],"http://www.thebeatles.com","Parlophone",["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"],1960);
    }catch(error){ console.log(error);}
    
    try{
        console.log(await bands.get("620dd277e6f398de3752f2a7"));
    }catch(error){ console.log(error);}

    
    await connection.closeConnection();
    //console.log('Done!');

}

main();