
//random number generator between a max and min 
function randomNumGen(min, max) {
        return Math.floor(Math.random()*(max - min + 1) + min);
    }

// function that makes a poem using a one word deep markov dictionary
const poemMakerOne = (inputText, numLines, numLength) => {
    
    // function that creates Markov dictionary from string
    const MarkovDictBuilder = () => {
        
    let cleanerStr = formatStr(inputText);
        
    // splits string into array of words
    let strArr = cleanerStr.split(" ");

    //interates through string creating the markov dictionary
    const markovObjGen = () => {
    let markObj = {};
    
    for(let i = 0; i < strArr.length-1; i++){
        let currentWord = strArr[i];
        let secondWord = strArr[i+1];

        if(markObj[currentWord]){
            markObj[currentWord].push(secondWord);
            } else {
                markObj[currentWord] = [secondWord];
                }
            }
            return markObj;
        }
        return markovObjGen();
    }
    
    //function writing each line
    const writeLine = () => {
        let markObj = MarkovDictBuilder();
        let objKeysArr = Object.keys(markObj);

        //returns random word after input word
        const randGen = (word) => {
            if(!markObj[word]){
                word = objKeysArr[Math.floor(Math.random() * objKeysArr.length)];
            }
            
            return markObj[word][Math.floor(Math.random() * markObj[word].length)];
            
        }

        let poemLineArr = [];

        //grabs random first word from object keys
        let firstWord = objKeysArr[Math.floor(Math.random() * objKeysArr.length)];
        poemLineArr.push(firstWord);

        //iterates through line length calling randGen for the next word
        for(let i = 1; i < numLength; i++){
            poemLineArr.push(randGen(poemLineArr[i-1]));

        }

        //joins words into a string and returns the string;
        return poemLineArr.join(" ");

    }

    // function repeating writeLine for the selected number of lines with the selected linelength
    const lineRepeater = () => {
        let poem = '';
        for(let i = 0; i < numLines; i++){
            poem +=  `${writeLine()} <br>`
        }
        
        return poem;
    }
    
    return lineRepeater();
    
}


// function that makes a poem using a one two deep markov dictionary
const poemMakerTwo = (inputText, numLines, numLength) => {
    
    // function generating the markovObject
    const MarkovDictBuilder = () => {

    let cleanerStr = formatStr(inputText);
    
    // splits string into array of words
    let strArr = cleanerStr.split(" ");

    //interates through string creating the markov dictionary
    //keys are sets of two words, the first array in each element is also the two words so they can be searched seperately 
        const markovObjGen = () => {
        let markObj = {};

        for(let i = 0; i < strArr.length-1; i++){
            let currentWord = strArr[i];
            let secondWord = strArr[i+1];
            let thirdWord = strArr[i+2];
        
            let currentPhrase = [currentWord, secondWord];
        
            if(markObj[currentPhrase]){
                markObj[currentPhrase].push(thirdWord);
                    } else {
                        markObj[currentPhrase] = [currentPhrase];
                        markObj[currentPhrase].push(thirdWord);
                    }
                }
            return markObj;
            }
        return markovObjGen();
    }
    
    //function writing each line
    const writeLine = () => {
        let markObj = MarkovDictBuilder();
        let objKeysArr = Object.keys(markObj);
        
        //returns random word after input word
        const randGenWord = (words) => {

            let possibleNextWordArr = [];

            for(let i = 0; i < objKeysArr.length; i++){
            let currentFirstSearch = markObj[objKeysArr[i]][0][0];
            let currentSecSearch = markObj[objKeysArr[i]][0][1];

                
                
                if(words[0] === currentFirstSearch && words[1] === currentSecSearch){
                    let matchingArr = markObj[objKeysArr[i]];

                    for(let j = 1; j < matchingArr.length; j++){
                        possibleNextWordArr.push(matchingArr[j]);
                    }  
                }
            }
            
            let nextWord = possibleNextWordArr[Math.floor(Math.random() * possibleNextWordArr.length)];
            return nextWord;
        }

        let poemLineArr = [];

        //grabs random first word from object keys
        let firstPhrase = objKeysArr[Math.floor(Math.random() * objKeysArr.length)];
        
        // pushes first word to the array
        poemLineArr.push(markObj[firstPhrase][0][0]);
        
        //pushes second word to the array
        poemLineArr.push(markObj[firstPhrase][0][1]);
        
        
        //iterates through line length calling randGen for the next word
        //if there isn't a next word a random word is used
        for(let i = 0; i < numLength-2; i++){
            let searchPhrase = [poemLineArr[i], poemLineArr[i+1]];
            
            let nextWordinArr = randGenWord(searchPhrase);
            if(nextWordinArr === undefined){
                let randomWord = objKeysArr[Math.floor(Math.random() * objKeysArr.length)];
                nextWordinArr = markObj[randomWord][0][0];
            }
            
            poemLineArr.push(nextWordinArr);
        }
        
        //joins words into a string and returns the string;
        poemStr = poemLineArr.join(" ");
        return poemStr.replace(",", '')
    }
    

    // function repeating writeLine for the selected number of lines with the selected linelength
    const lineRepeater = () => {
        let poem = '';
        for(let i = 0; i < numLines; i++){
            poem +=  `${writeLine()} <br>`
        }
        
        return poem;
    }

    return lineRepeater();
}

// calls poemMaker one word deep and displays results
const displayResultsOne = () => {
    // gets input values
    let inputString = document.getElementById("inputText").value;
    let inputLines = document.getElementById("lineNum").value;
    let inputWordNum = document.getElementById("wordNum").value;
    
    //generates random amount of lines and words if none are specified
    if(!inputLines){
        inputLines = randomNumGen(4,8);
    }
    if(!inputWordNum){
        inputWordNum = randomNumGen(6, 8);
    }
    
    //builds poem
    resultPoem = poemMakerOne(inputString, inputLines, inputWordNum);

    //displays poem
    document.getElementById('poemDisplay').innerHTML = resultPoem;
    
}


// calls poemMaker two words deep and displays results
const displayResultsTwo = () => {
    // gets input values
    let inputString = document.getElementById("inputText").value;
    let inputLines = document.getElementById("lineNum").value;
    let inputWordNum = document.getElementById("wordNum").value;
    
    //generates random amount of lines and words if none are specified
    if(!inputLines){
        inputLines = randomNumGen(4,8);
    }
    if(!inputWordNum){
        inputWordNum = randomNumGen(6, 10);
    }

    //builds poem
    resultPoem = poemMakerTwo(inputString, inputLines, inputWordNum);
    
    //displays poem
    document.getElementById('poemDisplay').innerHTML = resultPoem;
    
}

// resets values
const reset = () => {
    inputString = null;
    inputLines = null;
    inputWordNum = null;
}


