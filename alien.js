// /* Alien Battle OOP Lab*/

// //Earth has been attacked by a horde of aliens! You are the captain of the USS Assembly, on a mission to destroy every last alien ship.

// Battle the aliens as you try to destroy them with your lasers.

// There are six alien ships. The aliens' weakness is that they are too logical and attack one at a time: they will wait to see the outcome of a battle before deploying another alien ship. Your strength is that you have the initiative and get to attack first. However, you do not have targeting lasers and can only attack the aliens in order. After you have destroyed a ship, you have the option to make a hasty retreat.

//Make the  Game/Ship Objects
window.onload = function(){
    class Spaceship {
        constructor(hull=20, firepower=5, accuracy=7){
            this.hull = hull;
            this.firepower = firepower;
            this.accuracy = accuracy;
        }
//Make ATTACK functions ==> math.random
        attackNow(target) {
            if (Math.random() < (this.accuracy/10)){
                target.hull -= this.firepower;
                if (target.hull > 0){
                    alert(`YES! You got 'em! \n The alien has ${alienships.spaceship[0].hull} health left and there are ${alienships.spaceship.length} alien ships left to battle!`);
                } else {
                    alert(`Yes! You hit 'em with the laser! That alien is defeated, there are ${alienships.spaceship.length-1} alien ships left to battle!`)
                };
            } else {
                alert(`You tried to shoot your laser at them but the aliens got away! The alien has ${alienships.spaceship[0].hull} health remaining. `)
            }
        }
    }

    const captainShip = new Spaceship();

    // Random Number Generator
    const randomNum = function(min, max){
        if (min || max > 0){
            return Math.floor((Math.random()*(max-1)) + min);
        }
    }

      // creating objects for spaceship and alien ships==>
    class AlienSpaceship {
        constructor(serialNumber){
            this.hull = randomNum(3, 6);
            this.firepower = randomNum(2, 4),
            this.accuracy = randomNum(6, 8),
            this.serialNumber = serialNumber;
        }
    //attack function using math.random
        attackNow(target) {
            if (Math.random() < (this.accuracy/10)){
                target.hull -= this.firepower;
                alert(`The USS Assembly has been hit! Your health is down to ${captainShip.hull}.`);
            } else {
                alert(`They almost to hit you! You got out of the way just in time!\n Awesome job!`);
            }

        }
    }

    class Factory {
        constructor(){
            this.spaceship = [];
        }

        generateShip(){
            const newAlienSpaceship = new AlienSpaceship (this.spaceship.length);
            this.spaceship.push(newAlienSpaceship);
        }
    }


    const alienships = new Factory();
    alienships.generateShip();
    for(let i = 0; i < 5 ; i++){
        alienships.generateShip();
    }

// console.log(alienships);
//console.log(alienships.spaceship[0])

// Start Battle //
    function gameStart() {
        alert(`Shoot the aliens with your laser gun!`)
        while(captainShip.hull >= 0 && alienships.spaceship.length > 0){
            captainShip.attackNow(alienships.spaceship[0]);
            if(alienships.spaceship[0].hull <= 0 && alienships.spaceship.length > 0){
                alienships.spaceship.shift();
                var playerInput = prompt(`Good job USS Assembly! You hit one of 'em!! \n You have ${captainShip.hull} health left and  ${alienships.spaceship.length} aliens coming to attack! \n Would you like to retreat? Yes or No?`);
                if (playerInput == "Yes" || playerInput == "yes" ){
                        alert("you retreated successfully");
                        document.getElementById("resultText").innerHTML = `Better luck next time! \n You have ${captainShip.hull} health left, and there are ${alienships.spaceship.length} alien ships left to attack`;
                        break;
                } else {
                        alert("Alright! Let's do it!!")
                };
            }
            alienships.spaceship[0].attackNow(captainShip);
            if(captainShip.hull <= 0){
                document.getElementById("resultText").innerHTML = "The Alien Won! The USS Assembly was DEFEATED!";
                break;

            }
            if(alienships.spaceship.length <= 0) {
                document.getElementById("resultText").innerHTML = "The USS Assembly has DESTROYED the Alien!!";
                break;
            };
        };
    }



    document.getElementById("start").addEventListener("click", gameStart);

}