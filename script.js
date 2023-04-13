
// Create a function to generate the aliens and set the properties of each. This will include generating random values for their hull, firepower, and accuracy. 

// Create a function that will represent the battle. This should include a loop that will keep track of the number of rounds of battle. It should also include logic that checks if either of the ships have been destroyed.

// Create a function to check if the alien ship has been destroyed. This should include logic to check if the alien ship's hull is less than or equal to 0.

// Create a function that will represent the attack. This should include logic to check if the attack is successful, based on the accuracy of the attacking ship.

// Create a function to check if the player's ship has been destroyed. This should include logic to check if the player ship's hull is less than or equal to 0.

// Create a function to display the status of the battle. This should include logic to display the number of rounds, the hull of each ship, and the outcome of each attack. 

// Create a function to check if the player has won the battle. This should include logic to check if all of the alien ships have been destroyed.

// Create a function to check if the player has lost the battle. This should include logic to check if the player's ship has been destroyed.

// Create a function to give the player the option to retreat from the battle. This should include logic to check if the player has chosen to retreat.

// Finally, create a main function that ties all of these pieces together. This should include a loop that continues until either the player has won or lost the battle. 

// SPACE BATTLE CONSOLE GAME

//PSEUDO CODE
//Make the  Game/Ship Objects
//Make ATTACK functions using math.random
//Make the Alien ship constructor
//Make an Array with the alien ship specifications
//Make a Function that builds the alien ships using the alien array parameters 
//Make a Function for the Spaceship battle
//Use While Loop for Battle function
//Create a Function to check user prompts

//Make the GAME an OBJECT

//need to add code to make onclick/hoover to open box and start game with prompts and directions
let game = {
    round: 0,
    targetShip: 0,
    userResponse: "",
  };
  
  // creating objects for spaceship and alien ships==>
  let ussAssembly= {
    name: "USS Assembly",
    hull: 20,
    firePower: 5,
    accuracy: 0.7,
    attack: function () {
      //attack function using math.random
      let attackChance = Math.random();
      if (attackChance <= this.accuracy) {
        return true;
      } else {
        return false;
      }
    },
  };
  
  // create a constructor function for each, set properties of each object
  class AlienShip {
    constructor(name, hull, firePower, accuracy) {
      this.name = name;
      this.hull = hull;
      this.firePower = firePower;
      this.accuracy = accuracy;
    }
    attack() {
      //Attack function using math.random
      let attackChance = Math.random();
      if (attackChance <= this.accuracy) {
        return true;
      } else {
        return false;
      }
    }
  }
  
  // Alien Arrays-Will Loop through these values to configure ship
  let alienShips = []; // alien ships
  let alienHullValues = [3, 4, 5, 6]; // alien hull values
  let alienFirePowerValues = [2, 3, 4]; // alien fire power values
  let alienAccValues = [0.6, 0.7, 0.8]; // alien accuracy values
  
  // Build Alien Ship Function. Create a For loop that uses the arrays above using math.floor & math.random
  let createAlienShips = () => {
    for (let i = 0; i < 6; i++) {
      //Iterate 6 values
      let name = "Alien Ship " + (i + 1);
      let hull = alienHullValues[Math.floor(Math.random() * 4)];
      let firePower = alienFirePowerValues[Math.floor(Math.random() * 3)];
      let accuracy = alienAccValues[Math.floor(Math.random() * 3)];
      alienShips[i] = new AlienShip(name, hull, firePower, accuracy); //The result will be a new alien ship with the new parameters
    }
  };

  // Battle Function=Set up a function that "Holds" the battle
  
  let shipsBattle = (ship1, ship2) => {
    // put the ships into an array
    let ships = [ship1, ship2];
    let attack = false;
    let attacking = 0;
    let beingAttacked = 1;
    let temp;
    console.log("%c Attack Begins =================", "font-size: 30px");
    while (ships[beingAttacked].hull > 0) {
      //While the hull is greater than 0...Keep attacking
      // Attacking Sequence
      if (ships[beingAttacked].hull > 0) {
        // Console log the attack information
        console.log("\n");
        console.log(
          `%c ${ships[attacking].name} attacked ${ships[beingAttacked].name}`,
          "color: purple; border: 1px solid grey; font-size: 18px;"
        );
        // Generate the attack on the enemy ship
        attack = ships[attacking].attack();
        if (attack === true) {
          ships[beingAttacked].hull -= ships[attacking].firePower; //Increase Fire power
          console.log(
            `%c Attack Successful! ${ships[beingAttacked].name} Hull: ${ships[beingAttacked].hull}`,
            "color: green; font-weight: bold; font-size: 16px;"
          );
        } else {
          console.log(
            `%c Attack Unsuccessful! ${ships[beingAttacked].name} Hull: ${ships[beingAttacked].hull}`,
            "color: red; font-size: 16px;"
          );
        }
        // Check if the ship being attacked is still alive
        if (ships[beingAttacked].hull <= 0) {
          console.log(
            `%c ${ships[beingAttacked].name} has been destroyed`,
            "color: red; border: 1px solid grey; font-size: 16px;"
          );
          if (ships[beingAttacked] === ussAssembly) {
            ///If the USS SHip is being attacked and is destroyed THEN alert player Game is Over
            alert("Game Over!!!");
          } else if (
            ships[beingAttacked].name === alienShips[alienShips.length - 1].name
          ) {
            alert(
              `%c ${ships[beingAttacked].name} destroyed!\nAlien fleet has been destroyed!\nyou have been victorious`,
              "color: green;"
            );
          } //If USS destroys alien fleet, then alert player of victory
          else {
            game.userResponse = prompt(
              `${alienShips[game.targetShip].name} destroyed!!\n${
                ussAssembly.name
              } Hull: ${
                ussAssembly.hull
              }\nWould you like to ATTACK the next ship or RETREAT from battle?`,
              ""
            );
            game.targetShip += 1; //PROMPT PLAYER IF THEY WNAT TO CONTINUE OR RETREAT
            checkUserPrompt();
            return;
          }
        } else {
          // Switch the attacking/attacked ships
          temp = attacking;
          attacking = beingAttacked;
          beingAttacked = temp;
        }
      }
    }
  };
  // Function to check user prompts
  let checkUserPrompt = () => {
    let responseUpperCase = game.userResponse.toUpperCase();
    if (responseUpperCase === "ATTACK!") {
      shipsBattle(ussAssembly, alienShips[game.targetShip]);
    } else if (responseUpperCase === "RETREAT!") {
      alert("Game Over! You Live to Fight Again Another Day.");
    }
  };
  
  let startGame = () => {
    // Build alien fleets
    createAlienShips();
  
    game.userResponse = prompt(
      "Alien fleet approaching\nWould you like to ATTACK the first ship or RETREAT?",
      ""
    );
    checkUserPrompt();
  };
  
  // Initialize game
  startGame();