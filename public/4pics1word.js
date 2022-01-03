// GLOBAL VARIABLES
let guessedWordArray = [];
let givenLettersArray = [];
let renderLettersArray = [];
let mainWord;
let level = "";
let levelNo = 1;
let counter = 4;
let hintVanishflag = true;
let flagL = true;
let hintChar = true;
let soundEnabled = true;
let timer = 0;
let score = 0;
let totalTime = 0;

//mainWordpickerFromDataSets
function randomWordPicker() {
  let index;
  if (easyWords.length !== 0) {
    index = Math.floor(Math.random() * (easyWords.length - 1 - 0 + 1) + 0);
    level = "easy";
    mainWord = easyWords[index].toUpperCase();
    easyWords.splice(index, 1);
  } else if (mediumWords.length !== 0) {
    index = Math.floor(Math.random() * (mediumWords.length - 1 - 0 + 1) + 0);
    level = "medium";
    mainWord = mediumWords[index].toUpperCase();
    mediumWords.splice(index, 1);
  } else if (hardWords.length !== 0) {
    index = Math.floor(Math.random() * (hardWords.length - 1 - 0 + 1) + 0);
    level = "hard";
    mainWord = hardWords[index].toUpperCase();
    hardWords.splice(index, 1);
  } else {
    if (soundEnabled === true) {
      document.getElementById("gameWinAudio").play();
    }
    document.getElementById("displayScore").innerHTML = score;
    document.getElementById("displayTime").innerHTML =
      fancyTimeFormat(totalTime);
    document.getElementById("afterWinningDisplay").style.animation =
      "view-instructions-on-btn 0.8s ease 0s 1 normal forwards";
  }
}
//NewimagesCreatorAfterLevelChanges
function imgSourceGenerator() {
  for (let i = 1; i <= 4; i++) {
    document.getElementById(
      `guessingPicture${i}`
    ).src = `./assets/${level} words images/${mainWord}/${mainWord}${i}.jpg`;
    console.log(level);
  }
}
//Adding more random alphabets with main word included
function gameButtonAlphabets(str) {
  for (let i = 0; i < str.length; i++) {
    givenLettersArray.push(str[i]);
  }
  for (let i = str.length; i < 12; i++) {
    let num = Math.floor(Math.random() * (90 - 65 + 1) + 65);
    let char = String.fromCharCode(num);
    givenLettersArray.push(char);
  }
  return givenLettersArray;
}
//Randomizing all alphabets with main word included
function mixing(arr) {
  let deckShrinklength = arr.length;
  let mixedGivenLettersArray = [];
  let cardsToMix = arr.slice();
  for (let i = 0; i < arr.length; i++) {
    let randomNum = Math.random() * (deckShrinklength - 0) + 0;
    mixedGivenLettersArray.push(cardsToMix.splice(randomNum, 1)[0]);
    deckShrinklength--;
  }
  return mixedGivenLettersArray;
}
//checking of the guessed word and main word if its same or not
function wordChecker(orignalStr, inuptStr) {
  if (inuptStr.toUpperCase() === orignalStr.toUpperCase()) {
    return true;
  } else {
    return false;
  }
}
//this function will remove some alphabets from given letters array
function hintlettersVanish(arr) {
  for (let i = 0; i < 2; i++) {
    let index = Math.floor(Math.random() * (arr.length - 1 - 0 + 1) + 0);
    let char = arr[index];
    while (mainWord.includes(char, 0) === true || char === "") {
      index = Math.floor(Math.random() * (arr.length - 1 - 0 + 1) + 0);
      char = arr[index];
    }
    arr[index] = "";
  }
  return arr;
}
//this function will return a correct letter from given letters and index of that
//letter in which the letter will be placed
function hintCharacterTeller() {
  let flag;
  for (let i = 0; i < mainWord.length; i++) {
    if (guessedWordArray[i] === "") {
      flag = true;
      break;
    }
  }
  if (flag === true) {
    let index = Math.floor(Math.random() * (mainWord.length - 1 - 0 + 1) + 0);
    while (guessedWordArray[index] !== "") {
      index = Math.floor(Math.random() * (mainWord.length - 1 - 0 + 1) + 0);
    }
    let char = mainWord[index];
    let arr = [];
    arr.push(char);
    arr.push(index);
    return arr;
  } else {
    return "hintCannotBeUsed";
  }
}
//this function will render the starting screen of the main game
function renderStartingScreen() {
  let wordArea = document.getElementById("guessWord");
  let givenLetters = document.getElementById("givenLetters");
  for (let i = 0; i < mainWord.length; i++) {
    wordArea.innerHTML =
      wordArea.innerHTML +
      `<div class='buttons-div mobile-view-div' id="letterNo${i}"></div>`;
  }
  for (let i = 0; i < 12; i++) {
    givenLetters.innerHTML =
      givenLetters.innerHTML +
      `<div class='buttons-div' id='button-div${i}' style = "background-color: transparent"></div>`;
  }
  for (let i = 0; i < mainWord.length; i++) {
    guessedWordArray.push("");
  }
  imgSourceGenerator();
}
//this function will render given letter in the main game screen
function renderLetters(arr) {
  for (let i = 0; i < 12; i++) {
    let id = document.getElementById(`button-div${i}`);
    let x = document.createElement("INPUT");
    x.setAttribute("type", "button");
    x.setAttribute("value", `${arr[i]}`);
    x.setAttribute("class", "letter-buttons");
    x.setAttribute("id", `button${i}`);
    x.setAttribute("onclick", `givenLetterToGuessWord(${i})`);
    id.appendChild(x);
  }
}
//when a letter is clicked from given letters this function will render it to
//guessed word area
function givenLetterToGuessWord(num) {
  if (soundEnabled === true) {
    playSound();
  }
  let proceed = false;
  for (let i = 0; i < guessedWordArray.length; i++) {
    if (guessedWordArray[i] === "") {
      proceed = true;
      break;
    }
  }
  if (proceed === true) {
    let char = document.getElementById(`button${num}`);
    char.style.display = "none";
    givenLettersArray[num] = "";
    let i = 0;
    while (guessedWordArray[i] !== "") {
      i++;
      if (i === mainWord.length - 1) {
        break;
      }
    }
    let charShow = document.getElementById(`letterNo${i}`);
    let x = document.createElement("INPUT");
    x.setAttribute("type", "button");
    x.setAttribute("value", `${renderLettersArray[num]}`);
    x.setAttribute("class", "letter-buttons");
    x.setAttribute("id", `shiftedButton${num}`);
    x.setAttribute("onclick", `removeGuessLetter(${num} , ${i})`);
    charShow.appendChild(x);
    guessedWordArray[i] = x.value;
    if (wordChecker(guessedWordArray.join(""), mainWord) === true) {
      document.getElementById("correctAnswer").style.display = "block";
      setTimeout(afterWinningLevel, 900);
      setTimeout(curtainEffect, 500);
    }
    let wrongAnswerPic = true;
    for (let i = 0; i < guessedWordArray.length; i++) {
      if (guessedWordArray[i] === "") {
        wrongAnswerPic = false;
        break;
      }
    }
    if (
      wrongAnswerPic === true &&
      wordChecker(guessedWordArray.join(""), mainWord) === false
    ) {
      if (soundEnabled === true) {
        document.getElementById("wrongAnswerAudio").play();
      }
      document.getElementById("wrongAnswer").style.display = "block";
      setTimeout(() => {
        document.getElementById("wrongAnswer").style.display = "none";
      }, 800);
    }
  }
  // if (
  //   guessedWordArray[guessedWordArray.length - 1] !== "" &&
  //   wordChecker(guessedWordArray.join(""), mainWord) === false
  // ) {
  //   document.getElementById("wrongAnswer").style.display = "block";
  //   resetGuessLetters();
  // }
}
//this function will remove letter from guess word on click
function removeGuessLetter(indexOfGivenLetters, index) {
  if (soundEnabled === true) {
    playSound();
  }
  let char = document.getElementById(`shiftedButton${indexOfGivenLetters}`);
  char.remove();
  document.getElementById(`button${indexOfGivenLetters}`).style.display =
    "block";

  guessedWordArray[index] = "";
}
//when this hint is clicked it will unrender some letters from given letters
function hintlettersVanishButtonClicked() {
  if (counter === 0) {
    counter = 4;
  }
  if (counter === 4 && flagL === true) {
    if (soundEnabled === true) {
      document.getElementById("hintClicked").play();
    }
    let arr = hintlettersVanish(givenLettersArray);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "") {
        document.getElementById(`button${i}`).style.display = "none";
        hintVanishflag = false;
        flagL = false;
      }
    }
    document.getElementById("vanish-hint").style.filter = "brightness(30%)";
  }
}
//when you click a picture this picture will enlarge that picture
function guessingPictureClicked(pictureSrc) {
  document.getElementById("clickedPicture").style.display = "block";
  document.getElementById("clickedPicture").src = pictureSrc;
  if (soundEnabled === true) {
    playSound();
  }
}
//this picture will closes the enlarged picture
function closeZoomPicture() {
  document.getElementById("clickedPicture").style.display = "none";
  if (soundEnabled === true) {
    playSound();
  }
}
//when this hint is clicked it will render a letter to the main word area
function hintCharacterTellerButtonClicked() {
  let newArr = hintCharacterTeller();
  if (newArr !== "hintCannotBeUsed" && hintChar === true) {
    if (soundEnabled === true) {
      document.getElementById("hintClicked").play();
    }
    let char = newArr[0];
    let index = newArr[1];
    guessedWordArray[index] = char;
    let charShow = document.getElementById(`letterNo${index}`);
    let x = document.createElement("INPUT");
    x.setAttribute("type", "button");
    x.setAttribute("value", `${char}`);
    x.setAttribute("class", "letter-buttons");
    charShow.appendChild(x);
    hintChar = false;
    for (let i = 0; i < givenLettersArray.length; i++) {
      if (givenLettersArray[i] === char) {
        givenLettersArray[i] = "";
        document.getElementById(`button${i}`).style.display = "none";
        break;
      }
    }
    document.getElementById("char-teller").style.filter = "brightness(30%)";
  }
  if (wordChecker(guessedWordArray.join(""), mainWord) === true) {
    setTimeout(afterWinningLevel, 1400);
    setTimeout(curtainEffect, 1000);
  }
}
//this function will remove every renderings when the level changes
function removeRenderingAfterLevelChanges() {
  for (let i = 0; i < mainWord.length; i++) {
    document.getElementById(`letterNo${i}`).remove();
  }
  for (let i = 0; i < 12; i++) {
    document.getElementById(`button-div${i}`).remove();
  }
}
//effects afer wiining a level will occur because of this function
function afterWinningLevel() {
  if (soundEnabled === true) {
    document.getElementById("winningAudio").play();
  }
  removeRenderingAfterLevelChanges();
  hintChar = true;
  flagL = true;
  document.getElementById("char-teller").style.filter = "brightness(100%)";

  document.getElementById("correctAnswer").style.display = "none";
  score = scoreGenerator();
  document.getElementById("scoreDisplay").innerHTML = score;
  givenLettersArray = [];
  guessedWordArray = [];
  givenLettersArrayForReseting = [];
  randomWordPicker();
  givenLettersArray = mixing(gameButtonAlphabets(mainWord));
  renderLettersArray = [...givenLettersArray];
  renderStartingScreen();
  renderLetters(renderLettersArray);
  if (hintVanishflag === false) {
    counter--;
  }
  if (counter === 0)
    document.getElementById("vanish-hint").style.filter = "brightness(100%)";
  totalTime = totalTime + timer;
  timerFunc();
  levelNo++;
  document.getElementById("levelNoDisplay").innerHTML = levelNo;
}
//curtain effect is controlled by this function
function curtainEffect() {
  document.getElementById("curtainPanelLeft").style.transform = "translateX(0)";
  document.getElementById("curtainPanelRight").style.transform =
    "translateX(0)";
  setTimeout(() => {
    document.getElementById("curtainPanelLeft").style.transform =
      "translateX(-100%)";
  }, 1000);
  setTimeout(() => {
    document.getElementById("curtainPanelRight").style.transform =
      "translateX(100%)";
  }, 1000);
}
//this function will toggle image of sound enable/disable.
function toggleSound(el) {
  if (el.className != "pause") {
    el.src = "./assets/soundOff.jpg";
    el.className = "pause";
    soundEnabled = false;
  } else if (el.className == "pause") {
    el.src = "./assets/soundOn.jpg";
    el.className = "play";
    soundEnabled = true;
  }

  return false;
}
//when instruction button clicked this will render information on screen
function instructionBtnClicked() {
  if (soundEnabled === true) {
    playSound();
  }
  document.getElementById("instructions-area-on-btn").style.animation =
    "view-instructions-on-btn 1s ease 0s 1 normal forwards";
  document.getElementById("instructionsByBtn").innerHTML = instructions;
}
//exit button will close instructions
function exitInstructions() {
  if (soundEnabled === true) {
    playSound();
  }
  document.getElementById("instructions-area-on-btn").style.animation =
    "vanish-instructions-on-btn 1.3s ease 0s 1 normal forwards";
}
//this function will calculate score after every level changes according to time
function scoreGenerator() {
  if (level === "easy") {
    if (timer <= 30) {
      score = score + 8;
      return score;
    } else if (timer > 30 && timer <= 60) {
      score = score + 7;
      return score;
    } else if (timer > 60) {
      score = score + 5;
      return score;
    }
  }
  if (level === "medium") {
    if (timer <= 30) {
      score = score + 13;
      return score;
    } else if (timer > 30 && timer <= 60) {
      score = score + 12;
      return score;
    } else if (timer > 60) {
      score = score + 10;
      return score;
    }
  }
  if (level === "hard") {
    if (timer <= 30) {
      score = score + 18;
      return score;
    } else if (timer > 30 && timer <= 60) {
      score = score + 17;
      return score;
    } else if (timer > 60) {
      score = score + 15;
      return score;
    }
  }
}
//this function will display time in hr:min:s format
function fancyTimeFormat(duration) {
  let hrs = ~~(duration / 3600);
  let mins = ~~((duration % 3600) / 60);
  let secs = ~~duration % 60;

  let ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
}
//this function start a timer from 0 to infinite unless the level changes
function timerFunc() {
  timer = 0;
  let timerFunc = setInterval(function () {
    document.getElementById("timerDisplay").innerHTML = fancyTimeFormat(timer);
    timer++;
    if (wordChecker(guessedWordArray.join(""), mainWord) === true) {
      clearInterval(timerFunc);
    }
  }, 1000);
}
function playSound() {
  let sound = document.getElementById("selectOption");
  sound.load();
  sound.play();
}
//request to open game in full screen
function openFullscreen() {
  document.getElementsByClassName("full-screen-Button")[0].style.display =
    "none";
  elem = document.querySelector("html");
  elem.requestFullscreen();
  // window.requestFullscreen();
}
//this function will remove the first screen and reveal instructions
function playButtonClicked() {
  document.getElementById("home-screen").style.animation =
    "vanish-homescreen 1.5s";
  setTimeout(() => {
    document.getElementById("home-screen").style.display = "none";
  }, 1500);
  document.getElementById("instructions").innerHTML = instructions;
}
//this function closes instructions when proceed button clicked and start the main game
function playGame() {
  document.getElementById("instructions-area").style.animation =
    "vanish-instructions 1.5s";
  randomWordPicker();
  givenLettersArray = mixing(gameButtonAlphabets(mainWord));
  renderLettersArray = [...givenLettersArray];
  renderStartingScreen();
  renderLetters(renderLettersArray);
  timerFunc();
  setTimeout(() => {
    document.getElementById("instructions-area").style.display = "none";
  }, 1500);
}

// function resetGuessLetters() {
//   for (let i = 0; i < mainWord.length; i++) {
//     document.getElementById(`letterNo${i}`).remove();
//   }
//   for (let i = 0; i < 12; i++) {
//     document.getElementById(`button-div${i}`).remove();
//   }
//   setTimeout(() => {
//     document.getElementById("wrongAnswer").style.display = "none";
//   }, 400);
//   givenLettersArray = [];
//   guessedWordArray = [];
//   for (let i = 0; i < givenLettersArrayForReseting.length; i++) {
//     givenLettersArray.push(givenLettersArrayForReseting[i]);
//   }
//   console.log("givenLettersArray: ", givenLettersArray);
//   console.log("givenLettersArrayForReseting: ", givenLettersArrayForReseting);
//   renderLettersArray = [...givenLettersArray];
//   renderStartingScreen();
//   setTimeout(renderLetters(renderLettersArray), 400);
// }
