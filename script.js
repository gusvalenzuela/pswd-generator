const input = document.querySelector(`#passwordNum`)
const submitBtn = document.querySelector(`#submit`)
const contentHolder = document.querySelector(`#content-here`)
const inputOptions = document.querySelector(`#inputs`)
const lCaseString = `abcdefghijklmnopqrstuvwxyz`
const uCaseString = lCaseString.toUpperCase() 
const spCharsString = `~!@#$%^&*()_` // only top bar special characters
const numString = `0123456789`
var userNum = 0;


uCaseCheck = document.querySelector(`#upper-case`)
lCaseCheck = document.querySelector(`#lower-case`)
spCheck = document.querySelector(`#special-characters`)
numCheck = document.querySelector(`#numbers`)

input.addEventListener('input', updateValue);

// if(userNum >= 8 && userNum <= 128){
//     input.setAttribute(`style`, `border: 2px green`)        
// } else {
//     input.setAttribute(`style`, `border: 2px red`)  
// }

function updateValue(e) {
    userNum = e.target.value;
}

submitBtn.addEventListener(`click`, runGenerator)

function runGenerator(){
    // event.preventDefault()
    var currentString = ""
    var generatedPswd = ""

    // four straight if statements checking to see which checkboxes have been checked
    // and adding them to the currentString to use for grabbing characters in the generator
    if((uCaseCheck.checked || lCaseCheck.checked || spCheck.checked || numCheck.checked)){
        if(uCaseCheck.checked){
            currentString = currentString + uCaseString
        }git 
        if(lCaseCheck.checked){
            currentString = currentString + lCaseString
        }   
        if(spCheck.checked){
            currentString = currentString + spCharsString
        }
        if(numCheck.checked){
            currentString = currentString + numString
        }
    } else {
        console.log(`no boxes have been checked`)
    }

    // checking to see that the user input is between 8 and 128
    // otherwise alerting them to enter a valid number
    if(userNum >= 8 && userNum <= 128){
        input.classList.add(`success`)  
        
        // creating a random number used to pull from the currentString by index 
        for(i=0;i<userNum;i++){
            var j = Math.floor((Math.random()*currentString.length)+1)
            generatedPswd = generatedPswd + currentString[j]
        }
        
        // checking the magic 
        console.log(generatedPswd)
    } else{
        input.classList.add(`failure`) 
        console.log(`You must enter a valid number (between 8 - 128)`)
    }
    
}


// userNum = prompt("Please ENTER desired length of password (must be between: 8 - 128)")