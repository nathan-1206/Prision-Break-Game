


//MAKE SURE KEYS ARE LOWERCASE
const flowChart = {"start" : {"prompt": "You are in your cell and a guard walks by", "choices": ["do nothing", "grab your weapon", "wake up your cellmate"]},
                  "grab your weapon" : {"prompt": "The guard notices your weapon", "choices": ["drop your weapon", "attack", "scream for help"]}, 
                  "attack": {"prompt": "The guard gets knocked out", "choices": ["run towards the light", "alert other cellmates", "retrieve"]}
                };


setTimeout(fade, 1500, document.getElementById("startingText"));
setTimeout(setVisible, 3000);
setTimeout(updateCard, 3000, flowChart.start)
// Game Logic Starts here;

function setVisible() {
  document.getElementById("mainPanel").classList.remove("uk-hidden");
}

function fade(element) {
  var op = 1;  // initial opacity
  var timer = setInterval(function () {
      if (op <= 0.1){
          clearInterval(timer);
          element.style.display = 'none';
      }
      element.style.opacity = op;
      element.style.filter = 'alpha(opacity=' + op * 100 + ")";
      op -= op * 0.1;
  }, 50);
  
}

function updateCard(promptChoiceMap) {
    document.getElementById("prompt").innerHTML = promptChoiceMap.prompt;
    document.getElementById("choice1").innerHTML = promptChoiceMap.choices[0];
    //document.getElementById("choice1").value = promptChoiceMap.choices[0];

    document.getElementById("choice2").innerHTML = promptChoiceMap.choices[1];
    //document.getElementById("choice2").value = promptChoiceMap.choices[1];

    document.getElementById("choice3").innerHTML = promptChoiceMap.choices[2];
    //document.getElementById("choice2").value = promptChoiceMap.choices[2];

}

function displayWin() {
  document.getElementById("mainPanel").classList.add("uk-hidden");
  document.getElementById("endingText").classList.remove("uk-hidden");

}


function displayDeath(deathText) {
  document.getElementById("mainPanel").classList.add("uk-hidden");
  document.getElementById("death").classList.remove("uk-hidden");
  document.getElementById("deathtext").innerHTML = deathText;
}


function gameLogic(choice) {
  console.log(choice);
  //MAKE SURE PHRASES ARE LOWERCASE
  const victoryPhrases = ["run towards the light"]
  const deathPhrases = {"drop your weapon": "The guard attacked and you were defenseless, refresh to start"};
  var txt = document.getElementById(choice).innerText.toLowerCase();
  if (victoryPhrases.includes(txt)) {
    displayWin();
  } else if (txt in deathPhrases) {
    displayDeath(deathPhrases[txt]);
  } else {
    updateCard(flowChart[txt]);
  }
}

document.getElementById("choice1").addEventListener("click", function(e) {
  gameLogic("choice1");
});
document.getElementById("choice2").addEventListener("click", function(e) {
  gameLogic("choice2");
});
document.getElementById("choice3").addEventListener("click", function(e) {
  gameLogic("choice3");
});