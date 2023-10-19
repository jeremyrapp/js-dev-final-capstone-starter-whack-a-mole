const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
// TODO: Add the missing query selectors:
const score = document.querySelector('#score'); // Use querySelector() to get the score element
const timerDisplay = document.querySelector('#timer'); // use querySelector() to get the timer element.

let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "normal";
let gameRunning = false;
let lastTimeoutId;


/**
 * Generates a random integer within a range.
 *
 * The function takes two values as parameters that limits the range 
 * of the number to be generated. For example, calling randomInteger(0,10)
 * will return a random integer between 0 and 10. Calling randomInteger(10,200)
 * will return a random integer between 10 and 200.
 *
 */
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Sets the time delay given a difficulty parameter.
 *
 * The function takes a `difficulty` parameter that can have three values: `easy`
 * `normal` or `hard`. If difficulty is "easy" then the function returns a time delay
 * of 1500 milliseconds (or 1.5 seconds). If the difficulty is set to "normal" it should
 * return 1000. If difficulty is set to "hard" it should return a randomInteger between
 * 600 and 1200.
 *
 * Example: 
 * setDelay("easy") //> returns 1500
 * setDelay("normal") //> returns 1000
 * setDelay("hard") //> returns 856 (returns a random number between 600 and 1200).
 *
 */
function setDelay(difficulty) {
  // TODO: Write your code here.
  if (difficulty === "easy") {
    return 1500; // 1500 milliseconds 
  } else if (difficulty === "normal") {
    return 1000; // 1000 milliseconds 
  } else if (difficulty === "hard") {
    // Generate a random delay between 600 and 1200 milliseconds 
    return randomInteger(600, 1200);
  } else {
    // Handle invalid difficulty value
    // console.error("Invalid difficulty:", difficulty);
    return 1000; // Default to normal difficulty
  }
}

/**
 * Chooses a random hole from a list of holes.
 *
 * This function should select a random Hole from the list of holes.
 * 1. generate a random integer from 0 to 8 and assign it to an index variable
 * 2. get a random hole with the random index (e.g. const hole = holes[index])
 * 3. if hole === lastHole then call chooseHole(holes) again.
 * 4. if hole is not the same as the lastHole then keep track of 
 * it (lastHole = hole) and return the hole
 *
 * Example: 
 * const holes = document.querySelectorAll('.hole');
 * chooseHole(holes) //> returns one of the 9 holes that you defined
 */
function chooseHole(holes) {
  // TODO: Write your code here.
  const index = randomInteger(0, 8);
  // const index = randomInteger(0, holes.length - 1); 
  const hole = holes[index];
  if (hole === lastHole) {
    return chooseHole(holes);
  }
  lastHole = hole;
  return hole;
}

/**
*
* Calls the showUp function if time > 0 and stops the game if time = 0.
*
* The purpose of this function is simply to determine if the game should
* continue or stop. The game continues if there is still time `if(time > 0)`.
* If there is still time then `showUp()` needs to be called again so that
* it sets a different delay and a different hole. If there is no more time
* then it should call the `stopGame()` function. The function also needs to
* return the timeoutId if the game continues or the string "game stopped"
* if the game is over.
*
*  // if time > 0:
*  //   timeoutId = showUp()
*  //   return timeoutId
*  // else
*  //   gameStopped = stopGame()
*  //   return gameStopped
*
*/
function gameOver() {
  // TODO: Write your code here
  if(time > 0){
    let timeoutId = showUp();
    return timeoutId;
  } else {
    let gameStopped = stopGame();
    return gameStopped;
  }
}

/**
*
* Calls the showAndHide() function with a specific delay and a hole.
*
* This function simply calls the `showAndHide` function with a specific
* delay and hole. The function needs to call `setDelay()` and `chooseHole()`
* to call `showAndHide(hole, delay)`.
*
*/
function showUp() {
  let delay = setDelay(difficulty); // TODO: Update so that it uses setDelay()
  const hole = chooseHole(holes);  // TODO: Update so that it use chooseHole()
  // return showAndHide(hole, delay);
  lastTimeoutId = showAndHide(hole, delay);
  return lastTimeoutId;
}

/**
*
* The purpose of this function is to show and hide the mole given
* a delay time and the hole where the mole is hidden. The function calls
* `toggleVisibility` to show or hide the mole. The function should return
* the timeoutID
*
*/
function showAndHide(hole, delay){
  // TODO: call the toggleVisibility function so that it adds the 'show' class.
  toggleVisibility(hole);
  const timeoutID = setTimeout(() => {
    // TODO: call the toggleVisibility function so that it removes the 'show' class when the timer times out.
    toggleVisibility(hole);
    gameOver();
  }, delay); // TODO: change the setTimeout delay to the one provided as a parameter
  lastTimeoutId = timeoutID;  // Store the timeout ID
  return timeoutID;
}

/**
*
* Adds or removes the 'show' class that is defined in styles.css to 
* a given hole. It returns the hole.
*
*/
function toggleVisibility(hole){
  // TODO: add hole.classList.toggle so that it adds or removes the 'show' class.
//  if(document.getElementsByClassName('show').length === 0){
//       hole.classList.toggle("show")
//   }
//   else {
//     hole.classList.remove("show")
//   }
  hole.classList.toggle('show');
  return hole;
}

/**
*
* This function increments the points global variable and updates the scoreboard.
* Use the `points` global variable that is already defined and increment it by 1.
* After the `points` variable is incremented proceed by updating the scoreboard
* that you defined in the `index.html` file. To update the scoreboard you can use 
* `score.textContent = points;`. Use the comments in the function as a guide 
* for your implementation:
*
*/
function updateScore() {
  // TODO: Write your code here
  points+=1;
  score.textContent = points;
  return points;
}


/**
*
* This function clears the score by setting `points = 0`. It also updates
* the board using `score.textContent = points`. The function should return
* the points.
*
*/
function clearScore() {
  // TODO: Write your code here
  points = 0;
  score.textContent = points;
  return points;
}


/**
*
* Updates the control board with the timer if time > 0
*
*/

function updateTimer() {
  if (time > 0) {
    time -= 1;
    timerDisplay.textContent = time;
  } else {
    stopGame();
    stopMusic(); // Add this line to stop the music
  }
  return time;
}

function stopMusic() {
  song.currentTime = 0; // Reset audio playback position to the beginning
  song.pause();
}


/**
*
* Starts the timer using setInterval. For each 1000ms (1 second)
* the updateTimer function get called. This function is already implemented
*
*/
function startTimer() {
  // TODO: Write your code here
  timer = setInterval(updateTimer, 1000);
  return timer
}

/**
*
* This is the event handler that gets called when a player
* clicks on a mole. The setEventListeners should use this event
* handler (e.g. mole.addEventListener('click', whack)) for each of
* the moles.
*
*/
function whack(event) {
  // Reset points to 0 before updating the score
  points = 0;
  // Call updateScore();
  updateScore();
   // Play the hit sound
   playAudio(audioHit);
  // Return points;
  return points;
}
 
/**
*
* Adds the 'click' event listeners to the moles. See the instructions
* for an example on how to set event listeners using a for loop.
*/
function setEventListeners() {
  // TODO: Write your code here
  moles.forEach(mole => {
    mole.addEventListener('click', whack);
});
//Return moles;
return moles;
}
  

/**
*
* This function sets the duration of the game. The time limit, in seconds,
* that a player has to click on the sprites.
*
*/
function setDuration(duration) {
  time = duration;
  return time;
}

/**
*
* This function is called when the game is stopped. It clears the
* timer using clearInterval. Returns "game stopped".
*
*/
function stopGame(){
  // stopAudio(song);  
  clearInterval(timer);
  gameRunning = false;  // Mark the game as not running.
  clearTimeout(lastTimeoutId);
  startButton.textContent = "start"; // Change the button text to "start"
  // Hide any mole that might be showing
  holes.forEach(hole => {
    hole.classList.remove('show');
  });
  return "game stopped";
}

/**
*
* This is the function that starts the game when the `startButton`
* is clicked.
*
*/

// Initialize game settings
function initializeGame() {
  setDuration(15); // Set the initial game duration (15 seconds)
  clearScore();    // Clear the score
}

function startGame() {
  if (!gameRunning) {  // Check if the game is not already running.
    if (!time) {
      // Only initialize game settings when starting a new game
      initializeGame();
    }
    showUp();
    setEventListeners();
    startTimer();
    gameRunning = true;  // Mark the game as running.
    return "game started";
  } else {
    // Handle any behaviors you want when resuming the game (e.g., show a message).
  }
}

startButton.addEventListener("click", startGame);

function toggleGame() {
  if (startButton.classList.contains("game-start")) {
    startGame();
    startButton.textContent = "pause";
    startButton.classList.remove("game-start");
  } else {
    stopGame();
    startButton.textContent = "resume";
    startButton.classList.add("game-start");
  }
}

startButton.addEventListener("click", toggleGame);

function toggleAudio() {
  // If the audio is currently playing, we'll pause it. Otherwise, we'll play it.
  if (song.paused) {
      song.play();
      document.getElementById("audio").textContent = "pause";
  } else {
      song.pause();
      document.getElementById("audio").textContent = "play";
  }
}



const audioHit = new Audio('https://github.com/Thinkful-Ed/js-dev-final-capstone-starter/blob/main/assets/hit.mp3?raw=true');
const song = new Audio('https://github.com/Thinkful-Ed/js-dev-final-capstone-starter/blob/main/assets/molesong.mp3?raw=true');

function playAudio(audioObject) {
  audioObject.play();
}

function loopAudio(audioObject) {
  audioObject.loop = true;
  playAudio(audioObject);
}

function stopAudio(audioObject) {
  audioObject.pause();
}

function play(){
  playAudio(song);
}

song.addEventListener("ended", function() {
  document.getElementById("audio").textContent = "play";
});

// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
