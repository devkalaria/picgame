let arr = [];
let mainWord = "DRINK";
function gameButtonAlphabets(str) {
  for (let i = 0; i < str.length; i++) {
    arr.push(str[i]);
  }
  for (let i = str.length; i < 12; i++) {
    let num = Math.floor(Math.random() * (90 - 65 + 1) + 65);
    //console.log(num);
    let char = String.fromCharCode(num);
    arr.push(char);
  }
  return arr;
}
function mixing(arr) {
  let deckShrinklength = arr.length;
  let mixedDeck = [];
  let cardsToMix = arr.slice();
  for (let i = 0; i < arr.length; i++) {
    let randomNum = Math.random() * (deckShrinklength - 0) + 0;
    mixedDeck.push(cardsToMix.splice(randomNum, 1)[0]);
    deckShrinklength--;
  }
  return mixedDeck;
}
arr = mixing(gameButtonAlphabets(mainWord));
function wordChecker(orignalStr, inuptStr) {
  if (inuptStr.toUpperCase() === orignalStr.toUpperCase()) {
    return true;
  } else {
    return false;
  }
}
function hintlettersVanish(arr) {
  for (let i = 0; i < 3; i++) {
    let index = Math.floor(Math.random() * (arr.length - 1 - 0 + 1) + 0);
    let char = arr[index];
    console.log(arr);
    while (mainWord.includes(char, 0) === true) {
      index = Math.floor(Math.random() * (arr.length - 1 - 0 + 1) + 0);
      char = arr[index];
    }
    console.log(char);
    arr.splice(index, 1);
    console.log(index);
  }
  return arr;
}
function hintCharacterTeller(str) {
  let index = Math.floor(Math.random() * (str.length - 1 - 0 + 1) + 0);
  let char = str[index];
  return char;
}

function renderStartingScreen() {
  let wordArea = document.getElementById("guessWord");
  let givenLetters = document.getElementById("givenLetters");
  for (let i = 0; i < mainWord.length; i++) {
    wordArea.innerHTML =
      wordArea.innerHTML + `<div class='buttons-div' id=""></div>`;
  }
  for (let i = 0; i < 12; i++) {
    givenLetters.innerHTML =
      givenLetters.innerHTML +
      `<div class='buttons-div' id='button-div${i}'></div>`;
  }
}
renderStartingScreen();
function renderLetters(arr) {
  for (let i = 0; i < 12; i++) {
    let id = document.getElementById(`button-div${i}`);
    let x = document.createElement("INPUT");
    x.setAttribute("type", "button");
    x.setAttribute("value", `${arr[i]}`);
    x.setAttribute("class", "letter-buttons");
    id.appendChild(x);
  }
}
renderLetters(arr);
