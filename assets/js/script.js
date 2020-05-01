const slider = document.querySelector(`#pswd-length`);
const sliderVal = document.querySelector(`#val-holder`);
const pswdHolder = document.querySelector(`#generated-password`);
const refreshBtn = document.querySelectorAll(`.refresh-button`);
const copy2ClipBtn = document.querySelectorAll(`.copy-button`);
const optionsList = document.querySelector(`.options-list`);
const lCaseLI = document.querySelector(`#lower-case-li`);
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

init();

function init() {
  sliderVal.value = slider.value; // displaying default value
  lCaseCheck.checked = true;
  $(`.fa-check`).hide()
  // initializing lower case styling, as it's initially selected
  $(lCaseLI).attr(`style`, `background: #539667;`);
  $(lCaseLI.children[1]).show()
  isCheckboxSelected();
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
  sliderVal.value = slider.value;
};

function isCheckboxSelected() {
  if (
    !uCaseCheck.checked &&
    !lCaseCheck.checked &&
    !spCheck.checked &&
    !numCheck.checked
  ) {
    msg.textContent = "* must select one *";
    optionsList.setAttribute(`style`, `border: 4px groove red;`);
  } else {
    msg.textContent = "";
    optionsList.setAttribute(`style`, ``);
  }
}

// the generator
function runGenerator() {
  let currentString = ``;
  let generatedPswd = ``;

  pswdHolder.textContent = "";

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
  
  if (currentString !== ``) {
    // creating a random number used to pull from the currentString by index
    for (i = 0; i < slider.value; i++) {
      var j = Math.floor(Math.random() * currentString.length);
      generatedPswd = generatedPswd + currentString[j];
    }
  } else {

    pswdHolder.textContent(`Select an option below.`)
  }

  pswdHolder.textContent = generatedPswd;
}

$(copy2ClipBtn).on(`click`, () => {
  copyToClipboard(pswdHolder.textContent);
});

$(optionsList).on(`click`, () => {
  let target = $(event.target)[0];

  if (target.type === `checkbox`) {
    return;
  } else {
    let chosenInput = target.children[0];
    let chosenIcon = target.children[1]

    if ($(chosenInput).prop("checked") === true) {
      chosenInput.checked = false;
      $(chosenIcon).hide()
      $(event.target).attr(`style`, `background: white;`);
    } else {
      chosenInput.checked = true;
      $(chosenIcon).show()
      $(event.target).attr(`style`, `background: #539667;`);
    }

    isCheckboxSelected();
  }
});

$(refreshBtn).click(() => {
  // console.log(`hey`)
  runGenerator();
});
