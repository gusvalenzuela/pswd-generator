const input = document.querySelector(`#passwordNum`)
const submitBtn = document.querySelector(`#submit`)
const contentHolder = document.querySelector(`#content-here`)
const inputOptions = document.querySelector(`#inputs`)
const lCaseString = `abcdefghijklmnopqrstuvwxyz`
const uCaseString = lCaseString.toUpperCase() 
const spCharsString = ` !"#$%&'()*+,-./:;<=>?@[]^_{|}~`
const numString = `0123456789`
var userNum = 8;

// console.log(uCaseString)

// there's gotta be a better way to do this? 
// function stringToArray(x, y){
//     for(i=0;i<x.length;i++){
//         y.push(x[i])
//     }
// }

// stringToArray(lCaseString, lCaseArray)
// stringToArray(uCaseString, uCaseArray)
// // stringToArray(spCharsString, spCharsArray)
// console.log(uCaseArray)



uCaseCheck = document.querySelector(`#upper-case`)
lCaseCheck = document.querySelector(`#lower-case`)
spCheck = document.querySelector(`#special-characters`)
numCheck = document.querySelector(`#numbers`)

// uCaseCheck.checked

input.addEventListener('input', updateValue);

function updateValue(e) {
  userNum = e.target.value;
  console.log(userNum)
}

submitBtn.addEventListener(`click`, runGenerator)


function runGenerator (){

    var currentString = ""
    var generatedPswd = ""

    // four straight if statements checking to see which checkboxes have been checked
    // and adding them to the currentString to use for grabbing characters in the generator
    if(uCaseCheck.checked){
        currentString = currentString + uCaseString
    }
    if(lCaseCheck.checked){
        currentString = currentString + lCaseString
    }   
    if(spCheck.checked){
        currentString = currentString + spCharsString
    }
    if(numCheck.checked){
        currentString = currentString + numString
    }

    // checking to see that the user input is between 8 and 128
    // otherwise alerting them to enter a valid number
    if(userNum >= 8 && userNum <= 128){  
        for(i=0;i<userNum;i++){
            var j = Math.floor((Math.random()*currentString.length)+1)
            generatedPswd = generatedPswd + currentString[j]
        }
        
        // checking the magic 
        // console.log(generatedPswd)
    } else{
        alert(`You must enter a valid number (between 8 - 128)`)
    }
    
}


// function listChars(){
    //     for(i=61;i<75;i++){
//         contentHolder.textContent = String.fromCharCode([i]);
//     }
// }

// submitBtn.addEventListener(`click`, function(){
//     listChars();
// });


// userNum = prompt("Please ENTER desired length of password (must be between: 8 - 128)")