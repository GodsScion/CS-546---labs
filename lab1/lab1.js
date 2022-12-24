const questionOne = function questionOne(arr) {
    // Implement question 1 here
    try{
        if(arr === null || arr === undefined  || arr === []  || arr.length < 1){ //just in case
            return 'Please provide atleast one number and ONLY numbers. Please with a cherry on top!';
        }
        else{
            let totalVal = 0;
            for(let i=0; i<arr.length; i++) {
                totalVal += (arr[i] * arr[i]);
            }
            return totalVal;
        }
        
        /*    //ver 1
        if(arr === null || arr === undefined  || arr === []  || arr.length < 1){
            return 'Please provide atleast one number and ONLY numbers. Please with a cherry on top!';
        }
        else{
            let totalVal = 0;
            for(let i=0; i<arr.length; i++) {
                if(isNaN(arr[i])){
                    return 'Firstly thanks for giving some non empty inputs. Secondly try again with valid inputs (NUMBERS ONLY!!!!!!!)';
                }
                else{
                    totalVal += (arr[i] * arr[i]);
                    //Not accounting for floats or doubles
                }
            }
            return totalVal;
        }
        */
    }catch(e){
        console.log(e);
        return 'Why God! Why!?   Ahem.. Error Occured! Please try again';
    }
}

const questionTwo = function questionTwo(num) { 
    // Implement question 2 here
    try{

        //Saw this in slack "Correct, you do not have to worry about types or valid input. From lab 2 onward, you will though. We get to input checking and error handling in lecture 2" @Patrick Hill
        //So commented prev version and ignoring validations for future ones. Thanks!
        if(num<1){
            return 0;
        }
        else if(num === 1){
            return 1;
        }
        else{
            let tnum = questionTwo(num-1) + questionTwo(num-2);  //Please don't carsh bruh! I'm begging you!
            //let tnum = parseInt(questionTwo(num-1)) + parseInt(questionTwo(num-2));
            return tnum;
        }

    }catch(e){
        console.log(e);
        return 'Not Again man';
    }        
}

const questionThree = function questionThree(text) {
    // Implement question 3 here
    try{ 
        let vowels = ['a','e','i','o','u','A','E','I','O','U']; 
        let count = 0;
        for(let i=0; i<text.length; i++){
            for(let j=0; j<vowels.length; j++){
                if(text[i] === vowels[j]){
                    count++;
                }
            }
        }
        return count;

    }catch(e){
        console.log(e);
        return 'I might know what the PC is thinking "Just kill me already!!!"'
    }
}

const questionFour = function questionFour(num) {
    // Implement question 4 here
    try{
        if(num < 0){
            return 'NaN';
        }
        else if(num === 0){
            return 1;
        }
        else{
            return num * questionFour(num-1); 
        }

    }catch(e){
        console.log(e);
        return 'That is it, I am done.';
    }
}

module.exports = {
    firstName: "Sai Vignesh", 
    lastName: "Golla", 
    studentId: "20008561",
    questionOne,
    questionTwo,
    questionThree,
    questionFour      
};