const slider = document.querySelector(`#pswd-length`);
const sliderVal = document.querySelector(`#val-holder`);
const submitBtn = document.querySelector(`#submit`);
const pswdHolder = document.querySelector(`#generated-password`);
const pswdDiv = document.querySelector(`#password-holder`);
const optionsList = document.querySelector(`.options-list`);
const inputOptions = document.querySelector(`#inputs`);
const copy2ClipBtn = document.querySelector(`#copyBtn`);
const lCaseString = `abcdefghijklmnopqrstuvwxyz`;
const uCaseString = lCaseString.toUpperCase();
const spCharsString = `!"#$%&'()*+,-./:;<=>?@[]^_{|}~`; // removed space, \, and `
const numString = `0123456789`;
const msg = document.querySelector(`#display-msg`);

// grabbing all the checkboxes and their bootstrap elements
uCaseCheck = document.querySelector(`#upper-case`);
lCaseCheck = document.querySelector(`#lower-case`);
spCheck = document.querySelector(`#special`);
numCheck = document.querySelector(`#numbers`);
uCaseCheckBS = document.querySelector(`#upper-case-bs`);
lCaseCheckBS = document.querySelector(`#lower-case-bs`);
spCheckBS = document.querySelector(`#special-bs`);
numCheckBS = document.querySelector(`#numbers-bs`);

init();

function init() {
  sliderVal.textContent = slider.value; // displaying default value
  runGenerator();
}

// copy to Clipboard

const copyToClipboard = (str) => {
  const el = document.createElement("textarea"); // Create a <textarea> element
  el.value = str; // Set its value to the string that you want copied
  el.setAttribute("readonly", ""); // Make it readonly to be tamper-proof
  el.style.position = "absolute";
  el.style.left = "-9999px"; // Move outside the screen to make it invisible
  document.body.appendChild(el); // Append the <textarea> element to the HTML document
  const selected =
    document.getSelection().rangeCount > 0 // Check if there is any content selected previously
      ? document.getSelection().getRangeAt(0) // Store selection if found
      : false; // Mark as false to know no selection existed before
  el.select(); // Select the <textarea> content
  document.execCommand("copy"); // Copy - only works as a result of a user action (e.g. click events)
  document.body.removeChild(el); // Remove the <textarea> element
  if (selected) {
    // If a selection existed before copying
    document.getSelection().removeAllRanges(); // Unselect everything on the HTML document
    document.getSelection().addRange(selected); // Restore the original selection
  }
};

// updating displayed value when value is changed (slider moved)
slider.oninput = function () {
  sliderVal.textContent = slider.value;
};

function isCheckboxSelected() {
  event.stopPropagation();
  var el = event.target;

  //   console.log(el);

  if (el.type === `checkbox`) {
    if (
      uCaseCheck.checked ||
      lCaseCheck.checked ||
      spCheck.checked ||
      numCheck.checked
    ) {
      msg.textContent = "";
      optionsList.setAttribute(`style`, ``);
    } else {
      msg.textContent = "* must select one *";
      optionsList.setAttribute(`style`, `border: 4px groove red;`);
    }
  }
}

// the generator
function runGenerator() {
  var currentString = "";
  var generatedPswd = "";

  pswdHolder.textContent = "";

  // validating that at least one option has been checked
  if (
    uCaseCheck.checked ||
    lCaseCheck.checked ||
    spCheck.checked ||
    numCheck.checked
  ) {
    // checking to see which checkboxes have been checked
    // and adding relevant options subsection to the currentString to use for grabbing characters in the generator
    if (lCaseCheck.checked) {
      currentString = currentString + lCaseString;
    }
    if (uCaseCheck.checked) {
      currentString = currentString + uCaseString;
    }
    if (spCheck.checked) {
      currentString = currentString + spCharsString;
    }
    if (numCheck.checked) {
      currentString = currentString + numString;
    }
  } else {
    msg.textContent = "* must select one *";
    optionsList.setAttribute(`style`, `border: 4px groove red;`);
    return;
  }

  // creating a random number used to pull from the currentString by index
  for (i = 0; i < slider.value; i++) {
    var j = Math.floor(Math.random() * currentString.length);
    generatedPswd = generatedPswd + currentString[j];
  }

  // checking the magic
  console.log("password is: " + generatedPswd);
  pswdHolder.textContent = generatedPswd;
}

// listening for click on my submit button to trigger password generator
submitBtn.addEventListener(`click`, runGenerator);
copy2ClipBtn.addEventListener(`click`, function (e) {
  e.preventDefault();
  copyToClipboard(pswdHolder.textContent);
});
optionsList.addEventListener(`click`, isCheckboxSelected);

$(optionsList).on(`click`, (event) => {
  //   event.preventDefault();
  let target = $(event.target)[0];

  if (target.type === `checkbox`) {
    return;
  } else {
    let chosenInput = target.children[0];

    if ($(chosenInput).prop("checked") === true) {
      $(chosenInput).prop("checked", false);
      $(event.target).attr(`style`, `background: white;`);
    } else {
      $(chosenInput).prop("checked", true);
      $(event.target).attr(`style`, `background: red;`);
    }
  }
});

// userNum = prompt("Please ENTER desired length of password (must be between: 8 - 128)")
