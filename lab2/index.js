const arrayUtils = require("./arrayUtils");
const stringUtils = require("./stringUtils");
const objUtils = require("./objUtils");

console.log("\n\n<--------- arrayUtils testing ---------> \n\n 1. mean testing \n");

try{
    console.log(arrayUtils.mean([1,2,3,6,7,4,5,1])); //Pass 3.625
}catch(e){
    console.log(e);
}

try{
    console.log(arrayUtils.mean()); //fail
}catch(e){
    console.log(e);
}

try{
    console.log(arrayUtils.mean([])); //fail
}catch(e){
    console.log(e);
}

try{
    console.log(arrayUtils.mean({})); //fail
}catch(e){
    console.log(e);
}

try{
    console.log(arrayUtils.mean('banana')); //fail
}catch(e){
    console.log(e);
}

try{
    console.log(arrayUtils.mean([1,2,'hef'])); //fail
}catch(e){
    console.log(e);
}

try{
    console.log(arrayUtils.mean([1,2,[6,9]])); //fail
}catch(e){
    console.log(e);
}

try{
    console.log(arrayUtils.mean([1,2,[]])); //fail
}catch(e){
    console.log(e);
}

try{
    console.log(arrayUtils.mean([1,2],[4],9)); //fail
}catch(e){
    console.log(e);
}

try{
    console.log(arrayUtils.mean([2,24.5,9.5])); //Pass 12
}catch(e){
    console.log(e);
}

console.log("\n 2. medianSquared testing \n");

try{
    console.log(arrayUtils.medianSquared([1,2,4,3,5,7])); //Pass
}catch(e){
    console.log(e);
}

try{
    console.log(arrayUtils.medianSquared([1,2,4,3,'a'])); //Fail
}catch(e){
    console.log(e);
}

console.log('\n 3. maxElement testing \n');

try{
    console.log(arrayUtils.maxElement([1,2,4,3])); //Pass { '4': 2 }
}catch(e){
    console.log(e);
}

try{
    console.log(arrayUtils.maxElement([1,2,4,3,'g'])); //Fail
}catch(e){
    console.log(e);
}

console.log("\n 4. fill testing \n");

try{
    console.log(arrayUtils.fill(6)); // Returns: [0, 1, 2, 3, 4, 5]
}catch(e){
    console.log(e);
}

try{
    console.log(arrayUtils.fill(3, 'Welcome')); // Returns: ['Welcome', 'Welcome', 'Welcome']
}catch(e){
    console.log(e);
}

try{
    console.log(arrayUtils.fill()); // Throws error
}catch(e){
    console.log(e);
}

try{
    console.log(arrayUtils.fill("test")); // Throws error
}catch(e){
    console.log(e);
}

try{
    console.log(arrayUtils.fill(0)); // Throws Error
}catch(e){
    console.log(e);
}

try{
    console.log(arrayUtils.fill(-4)); // Throws Error
}catch(e){
    console.log(e);
}

try{
    console.log(arrayUtils.fill(4,"")); // Throws Error
}catch(e){
    console.log(e);
}

console.log("\n 5. countRepeating testing \n")

try{
    console.log(arrayUtils.countRepeating([7, '7', 13, true, true, true, "Hello","Hello", "hello"]));
    /* Returns: 
    {
      "7": 2,
      true: 3,
      "Hello": 2,
    }
    */
}catch(e){
    console.log(e);
}

try{
    console.log(arrayUtils.countRepeating("foobar"));  //throws an error
}catch(e){
    console.log(e);
}

try{
    console.log(arrayUtils.countRepeating()); //throws an error
}catch(e){
    console.log(e);
}

try{
    console.log(arrayUtils.countRepeating([])); //returns {}
}catch(e){
    console.log(e);
}

try{
    console.log(arrayUtils.countRepeating({a: 1, b: 2, c: "Patrick"})); //throws an error
}catch(e){
    console.log(e);
}

try{
    console.log(arrayUtils.countRepeating([7, '7', 13, true, true, true, "Hello","Hello", "hello",[2,3,3,'rte'],[3,'2',3,'rte'],[3,3,2,'rte'],[2,3,3,'rte'],{'h':3,'rte':2},{'h':3,'rte':2}]));
}catch(e){
    console.log(e);
} //Pass returns { '7': 2, true: 3, Hello: 2, '2,3,3,rte': 3, '[object Object]': 2 }

try{
    console.log(arrayUtils.countRepeating([7, '7', 13, true, true, true,undefined," ", " ", 'Hello', "Hello","Hello", "hello",[2,3,3,'rte'],[3,'2',3,'rte'],{'h':3,'rte':2},{'h':3,'rte':2}]));
}catch(e){
    console.log(e);
} //fail

try{
    console.log(arrayUtils.countRepeating(['7', 13, true, " ", 'Hello', "hello",[2,3,3,'rte'],{'h':3,'rte':2}]));
}catch(e){
    console.log(e);
} //Pass returns {}

console.log("\n 6. isEqual testing \n");

try{
    console.log(arrayUtils.isEqual([ 'Z', 'R', 'B', 'C', 'A' ], ['R', 'B', 'C', 'A', 'Z', 'H'])); // Returns: false
}catch(e){
    console.log(e);
}

console.log(arrayUtils.isEqual([2,5,'h','l',[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [2,[ 3, 1, 2 ], [ 5, 4, 6 ], [ 9, 7, 8 ],5,'h','l']));
//Pass true

try {
    console.log(arrayUtils.isEqual([ 'Z', 'R', 'B', 'C', 'A' ], {'R' : 'B', 'C' : 'A', 'Z': 'H'}));  // fail
} catch (e) {
    console.log(e);
}

console.log("\n<--------- stringUtils testing ---------> \n");

console.log("\n 7. camelCase testing \n");

console.log(stringUtils.camelCase('      hello World this is 1 test')); //Pass helloWorldThisIs1Test
console.log(stringUtils.camelCase('my function rocks')); // Returns: "myFunctionRocks"
console.log(stringUtils.camelCase('FOO BAR')); // Returns: "fooBar"
console.log(stringUtils.camelCase("How now brown cow")); // Returns: "howNowBrownCow"

try {
    stringUtils.camelCase(); // Throws Error
} catch (e) {
    console.log(e);
}

try {
    stringUtils.camelCase(''); // Throws Error
} catch (e) {
    console.log(e);
}

try {
    stringUtils.camelCase(123); // Throws Error
} catch (e) {
    console.log(e);
}

try {
    stringUtils.camelCase(["Hello", "World"]); // Throws Error
} catch (e) {
    console.log(e);
}

console.log("\n 8. replaceChar testing \n");

console.log(stringUtils.replaceChar("Daddy")); // Returns: "Da*$y"

console.log(stringUtils.replaceChar("babbbbble")); // Returns: "ba*$*$*le"

console.log(stringUtils.replaceChar("Hello, How are you? I hope you are well")); // Returns: "Hello, *ow are you? I $ope you are well"

try{
    console.log(stringUtils.replaceChar("")); // Throws Error
}catch(e){ 
    console.log(e)
}

console.log("\n 9. mashUp testing \n");

console.log(stringUtils.mashUp("Patrick", "Hill")); //Returns "Hitrick Pall"

console.log(stringUtils.mashUp("hello", "world")); //Returns "wollo herld"

try {
    console.log(stringUtils.mashUp("Patrick", "")); //Throws error
}catch (e) {
    console.log(e);
}

try {
    console.log(stringUtils.mashUp()); // Throws Error
}catch (e) {
    console.log(e);
}

try {
    console.log(stringUtils.mashUp("John")); // Throws error
}catch (e) {
    console.log(e);
}

try {
    console.log(stringUtils.mashUp ("h", "Hello")); // Throws Error
}catch (e) {
    console.log(e);
}

try {
    console.log(stringUtils.mashUp ("h","e")); // Throws Error
}catch (e) {
    console.log(e);
}

console.log("\n<--------- objUtils testing ---------> \n\n 10. makeArrays testing \n");

const first = { x: 2, y: 3};
const second = { a: 70, x: 4, z: 5 };
const third = { x: 0, y: 9, q: 10 };

const firstSecondThird = objUtils.makeArrays([first, second, third]);
// [ ['x',2],['y',3], ['a',70], ['x', 4], ['z', 5], ['x',0], ['y',9], ['q',10] ]

const secondThird = objUtils.makeArrays([second, third]);
// [ ['a',70], ['x', 4], ['z', 5], ['x',0], ['y',9], ['q',10] ]

const thirdFirstSecond = objUtils.makeArrays([third, first, second]);
// [  ['x',0], ['y',9], ['q',10], ['x',2],['y',3], ['a',70], ['x', 4], ['z', 5] ]

console.log(firstSecondThird,'\n\n',secondThird,'\n\n',thirdFirstSecond); //All 3 Pass

try {
    objUtils.makeArrays(first); //fail
} catch (e) {
    console.log(e);
}

try {
    objUtils.makeArrays([]); //fail
} catch (e) {
    console.log(e);
}

try {
    objUtils.makeArrays([2,3]); //fail
} catch (e) {
    console.log(e);
}

try {
    console.log(objUtils.makeArrays([{h:2}])); //fail
} catch (e) {
    console.log(e);
}

console.log("\n 11. isDeepEqual testing \n");

const first1 = {a: 2, b: 3};
const second1 = {a: 2, b: 4};
const third1 = {a: 2, b: 3};
const forth1 = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
const fifth1  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}

console.log(objUtils.isDeepEqual(first1, second1)); // false
console.log(objUtils.isDeepEqual(forth1, fifth1)); // true
console.log(objUtils.isDeepEqual(forth1, third1)); // false
console.log(objUtils.isDeepEqual({}, {})); // true

try {
    console.log(objUtils.isDeepEqual([1,2,3], [1,2,3])); // throws error 
} catch (e) {
    console.log(e);   
}

try {
    console.log(objUtils.isDeepEqual("foo", "bar")); // throws error
} catch (e) {
    console.log(e);  
}

console.log("\n 12. computeObject testing \n");

console.log(objUtils.computeObject({ a: 3, b: 7, c: 5 }, n => n * 2));
/* Returns:
{
  a: 6,
  b: 14,
  c: 10
}
*/

try {
    console.log(objUtils.computeObject({ a: 3, b: 7, c: NaN }, n => n * 2)); // fail
} catch (e) {
    console.log(e);
}