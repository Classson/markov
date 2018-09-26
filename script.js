// link to project specs
//https://learn.fullstackacademy.com/workshop/5ad39b73b73d520004c190d7/content/5ad39b73b73d520004c190da/text

let inputStr = 
    'The most remarkable thing about coming home to you Is the feeling of being in motion again; Its the most extraordinary thing in the world I have two big hands And a heart pumping blood And a nineteen sixty seven Colt forty five with a busted safety catch The world shines As I cross the Macon county line Going to Georgia The most remarkable thing about you standing in the doorway Is that its you and that you are standing in the doorway And you smile as you ease the gun from my hand I am frozen with joy right where I stand The world throws its light underneath your hair Forty miles from Atlanta This is nowhere Going to Georgia The world shines As I cross the Macon county line Going to Georgia'

//removes numbers and punctuation and converts to lowercase
let regNumandPunc = /\d|[.!,;']/gi;
let cleanStr = inputStr.toLowerCase().replace(regNumandPunc, );

// splits string into array of words
let strArr = cleanStr.split(" ");

//interates through string creating the markov object
const markovObjGen = (arr) => {
    let markObj = {};
    
    for(let i = 0; i < arr.length-1; i++){
        if(markObj[arr[i]]){
            markObj[arr[i]].push(arr[i+1]);
        } else {
            markObj[arr[i]] = [arr[i+1]];
        }
    }
    return markObj;
} 

let mountainObj = markovObjGen(strArr);


const writeLine = (markObj, lengthNum) => {
    let objKeysArr = Object.keys(markObj);
    
    //returns random word after input word
    const randGen = (word) => {
        return markObj[word][Math.floor(Math.random() * markObj[word].length)];
    }
    
    let poemLineArr = [];
    
    //grabs random first word from object keys
    let firstWord = objKeysArr[Math.floor(Math.random() * objKeysArr.length)];
    poemLineArr.push(firstWord);
    
    //iterates through line length calling randGen for the next word
    for(let i = 1; i <= lengthNum; i++){
        poemLineArr.push(randGen(poemLineArr[i-1]));

    }
    
    //joins words into a string and returns the string;
    return poemLineArr.join(" ");
    
}

console.log(writeLine(mountainObj, 5));
