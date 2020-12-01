


//MAKE SURE KEYS ARE LOWERCASE
//const flowChart = {"start" : {"prompt": "You are in your cell and a guard walks by", "choices": ["do nothing", "grab your weapon", "wake up your cellmate"]},
//                  "do nothing" : {"prompt": "The guard notices your weapon", "choices": ["drop your weapon", "attack", "scream for help"]}, 
//                  "grab your weapon" : {"prompt": "The guard notices your weapon", "choices": ["drop your weapon", "attack", "scream for help"]}, 
//                  "attack": {"prompt": "The guard gets knocked out", "choices": ["run towards the light", "alert other cellmates", "retrieve"]}
//               };

const flowChart = {"start" : {"prompt": "You wake up in your cell. It is early in the morning, and you walk towards the cell door to discover it is unlocked.", "choices": ["run", "leave                                  it alone", "let your cell mate know"]},
                                      
                   "let your cell mate know": {"prompt": "Your cell mate appreciates letting him know, and he suggests waiting until the coast is clear."},
                   
                   "leave it alone": {"prompt": "You wait until there are no guards nearby and leave your cell. What do you do?", "choices": ["hide in supply closet", "jump guard", "head down main corridor"]},
                   
                   "hide in supply closet": {"prompt": "You escape to the supply closet and find some itmes. But you can only carry one. Which do you choose?", "choices": ["take weapon", "take walkie-walkies"]},
                   
                   "jump guard": {"prompt": "You catch the guard by surprise and are able to fight him off.", "choices": ["take weapon", "go to warden's office"]},
                   
                   "go to warden's office": {"prompt": "You walk in to the warden's office to find it empty. What do you do?", "choices": ["steal uniform", "steal keys"]},
                   
                   "head down main corridor": {"prompt": "You sneakily walk down the main corridor and find a fork in the hallway.", "choices": ["go to warden's office", "go to mess hall", "go to security office"]},
                   
                   "go to mess hall": {"prompt": "You arrive in the empty mess hall.", "choices": ["steal food", "steal utensil", "hide in closet"]},
                   
                   "take weapon": {"prompt": "Weapon in hand, you see a guard down the hall.", "choices": ["attack guard", "find different hallway"]},
                   
                   "take walkie-talkie": {"prompt": "You go back to your cell to give your cell mate the other walkie talkie. He thanks you and suggests going to the warden's office. You follow his instructions and find that the warden's office is empty.", "choices": ["steal uniform", "steal keys"]},

                   "attack guard": {"prompt": "You successfully fight off the guard and head see that the warden's office is straight ahead. Boldy you step in. It is empty. What do you do?", "choices": ["steal uniform", "steal keys"]},
                   
                   "steal keys": {"prompt": "You steal the keys and unlock the door to the security office. It is empty.", "choices": ["disable cams", "open all cells", "call cell mate on walkie-talkie"]}, 
                                                         
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
  //const victoryPhrases = ["hide in closet"] - You go and hide in the closet and find a crack in the wall from the mold of the old food. You begin to chip away and eventually find that the other side of the wall is the outside.
  //const victoryPhrases = ["steal uniform"] - You quickly change and put on the uniform. You walk out of the office and down the hall right out the door.
  //const victoryPhrases = ["open all cells"] - You open all the cells and the alarm goes off. You expect guards to rush in but you see the prisoners starting a riot. It is too much for the guards to handle and you slip away in the midst of the chaos.
  
  const deathPhrases = {"run": "You make a break for it down the hallway just to get tackled from behind by a guard. Refresh to restart."};
  //const deathPhrases = {"steal food": "You open the fridge and begin to eat the food but you are too noisy and the chef comes and catches you."};        
  //const deathPhrases = {"steal utensil": "You open the utensil drawer to find something to use as a tool, but are too noisy and the chef comes in and catches you."};    
  //const deathPhrases = {"find different hallway": "You turn the corner to walk straight into a pair of guards."};    
  //const deathPhrases = {"disable cams": "You disable the security cameras and immediately the alarm goes off. Guards rush into the office and you are caught red-handed."};   
    
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