const people = require("./people");
const stocks = require("./stocks");

async function main(){

    
    console.log("\n 1. getPersonById testing ---------------------------------------------------------------------------------\n");

    console.log(await people.getPersonById("7989fa5e-8f3f-458d-ad58-23c8d9ef5a10")); //Returns an object of person id
    
    try {
        console.log(await people.getPersonById(-1)); // Throws Error
    } catch (error) {
        console.log(error);
    }

    try {
        console.log(await people.getPersonById('     ')); // Throws Error 
    } catch (error) {
        console.log(error);
    }

    try {
        console.log(await people.getPersonById()); // Throws Error
    } catch (error) {
        console.log(error);
    }

    try {
        console.log(await people.getPersonById('7989fa5e-5617-43f7-a931-46036f9dbcff')); // Throws person not found Error
    } catch (error) {
        console.log(error);
    }

    console.log("\n 2. sameEmail testing ---------------------------------------------------------------------------------\n");

    console.log(await people.sameEmail("harvard.edu"));

    try {
        console.log(await people.sameEmail("foobar")); // Throws Error
    } catch (error) {
        console.log(error);
    }

    try {
        console.log(await people.sameEmail("foobar.")); // Throws Error
    } catch (error) {
        console.log(error);
    }
    
    try {
        console.log(await people.sameEmail("foobar.123")); // Throws Error
    } catch (error) {
        console.log(error);
    }
    
    try {
        console.log(await people.sameEmail(".com")); // Throws Error
    } catch (error) {
        console.log(error);
    }
    
    try {
        console.log(await people.sameEmail()); // Throws Error 
    } catch (error) {
        console.log(error);
    }
    
    try {
        console.log(await people.sameEmail("google.com.hk")); // Throws Error since there are not at least two people that have the email domain google.com.hk
    } catch (error) {
        console.log(error);
    }
    
    console.log("\n 3. manipulateIp testing ---------------------------------------------------------------------------------\n");

    console.log(await people.manipulateIp());

    console.log("\n 4. sameBirthday testing ---------------------------------------------------------------------------------\n");

    try {
        console.log(await people.sameBirthday(9, 25)); // Returns: ['Khalil Ovitts',  'Erny Van Merwe', 'Emanuel Saben', 'Iorgos Tembridge']
        console.log(await people.sameBirthday("09", "25")); // Returns: ['Khalil Ovitts',  'Erny Van Merwe', 'Emanuel Saben', 'Iorgos Tembridge'] because the parameters can be parsed into valid numbers.        
    } catch (error) {
        console.log(error);   
    }
    
    try {
        console.log(await people.sameBirthday(9, 31)); // Throws Error: There are not 31 days in Sept
    } catch (error) {
        console.log(error);
    }
         
    try {
        console.log(await people.sameBirthday(13, 25)); // Throws Error: Month > 12
    } catch (error) {
        console.log(error);
    }
        
    try {
        console.log(await people.sameBirthday(2, 29)); // Throws Error: There are not 29 days in Feb
    } catch (error) {
        console.log(error);
    }
        
    try {
        console.log(await people.sameBirthday("09", "31")); // Throws Error: There are not 31 days in Sept //Check this!
    } catch (error) {
        console.log(error);
    }
        
    try {
        console.log(await people.sameBirthday("      ", "25")); // Throws Error
    } catch (error) {
        console.log(error);
    }
        
    try {
        console.log(await people.sameBirthday()); // Throws Error:
    } catch (error) {
        console.log(error);
    }


    console.log("\n 5. listShareholders testing ---------------------------------------------------------------------------------\n");    
     
    console.log(await stocks.listShareholders("Aeglea BioTherapeutics, Inc."));

    console.log(await stocks.listShareholders("Powell Industries, Inc."));

    try {
        await stocks.listShareholders('foobar'); // Throws Error
    } catch (error) {
        console.log(error);
    }

    try {
        await stocks.listShareholders(); // Throws Error
    } catch (error) {
        console.log(error);
    }

    

    console.log("\n 6. totalShares testing ---------------------------------------------------------------------------------\n"); 

    console.log(await stocks.totalShares('Aeglea BioTherapeutics, Inc.')); 
    // Returns: "Aeglea BioTherapeutics, Inc., has 5 shareholders that own a total of 663 shares."

    console.log(await stocks.totalShares('Nuveen Preferred and Income 2022 Term Fund')); 
    // Returns: "Nuveen Preferred and Income 2022 Term Fund, has 1 shareholder that owns a total of 285 shares."

    console.log(await  stocks.totalShares('Aeglea BioTherapeutics, Inc.')); 
    // Returns: "Aeglea BioTherapeutics, Inc., has 5 shareholders that own a total of 663 shares."

    console.log(await  stocks.totalShares('Powell Industries, Inc.')); 
    // Returns: "Powell Industries, Inc. currently has no shareholders."
    
    try {
        await stocks.totalShares(43); // Throws Error
        await stocks.totalShares(' '); // Throws error
        await stocks.totalShares('Foobar Inc'); // Throws error No stock with that name
        await stocks.totalShares(); // Throws Error
    } catch (error) {
        console.log(error);
    }   


console.log("\n 7. listStocks testing ---------------------------------------------------------------------------------\n"); 

    try {
        console.log(await stocks.listStocks("Grenville", "Pawelke" ));

        //await stocks.listStocks('Patrick', "Hill"); // Throws Error because Patrick Hill is not in people.json
        //await stocks.listStocks(); // Throws Error
        //await stocks.listStocks("foo"); // Throws Error 
        //await stocks.listStocks("      ", "        "); // Throws Error
        await stocks.listStocks(1,2); // Throws Error

    } catch (error) {
        console.log(error);
    }

    console.log("\n 7. listStocks testing ---------------------------------------------------------------------------------\n"); 

    try {
        console.log(await stocks.getStockById("f652f797-7ca0-4382-befb-2ab8be914ff0"));

        await stocks.getStockById(-1);  // Throws Error 
        await stocks.getStockById(1001);  // Throws Error 
        await stocks.getStockById(); // Throws Error
        await stocks.getStockById('7989fa5e-5617-43f7-a931-46036f9dbcff');// Throws stock not found Error

    } catch (error) {
        console.log(error);
    }

}

main()