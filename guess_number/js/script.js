//Global variables
let randomNumber;
let attempts = 0;
let totalWins = 0;
let totalLosses =0;

document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click",initializeGame)
initializeGame();

function initializeGame() {
   randomNumber = Math.floor(Math.random() * 99) + 1;
   console.log("randomNumber: " + randomNumber);
    attempts = 0;
   //hiding the Reset button
   document.querySelector("#resetBtn").style.display = "none";

   //showing the Guess button
   document.querySelector("#guessBtn").style.display = "inline";
  
   //adding focus to textbox
   let playerGuess = document.querySelector("#playerGuess");
   playerGuess.focus() // adds focus to textboxt
   playerGuess.value = ""; // clear

   let feedback = document.querySelector ("#feedback");
   feedback.textContent ="";

   // clear previous guesses
   document.querySelector("#guesses").textContent="";

   // clear previous attempts
   document.querySelector("#remainingAttempts").textContent = 7;
}
function checkGuess(){
    let feedback = document.querySelector("#feedback");
    feedback.textContent ="";
    let guess = document.querySelector("#playerGuess").value;
    console.log ("Player guess: "+ guess);
    if (guess <1 || guess>99){
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        // alert("Guess out of range!");
        return;
    }
    
    attempts++;
    let rAttempts = 7 - attempts
    document.querySelector("#remainingAttempts").textContent = rAttempts; 
    console.log ("Attempts:"+ attempts);
    feedback.style.color = "orange";
    if (guess == randomNumber){
        feedback.textContent = "You guessed it correctly! You Won!";
        feedback.style.color = "darkgreen";
        gameOver(true);
    }else{
        document.querySelector("#guesses").textContent+= guess +" ";
        if (attempts == 7){
            feedback.textContent = "Sorry you lost!";
            feedback.style.color = "red";
            gameOver(false);
        }else if (guess>randomNumber){
            feedback.textContent = "Guess was high";
        }else{
            feedback.textContent = "Guess was low";
        }
    }

    function gameOver(win = false){
        let guessBtn = document.querySelector("#guessBtn");
        let resetBtn = document.querySelector("#resetBtn");
        guessBtn.style.display = "none";
        resetBtn.style.display = "inLine";

        if (win){
            totalWins++;
            document.querySelector("#totalWins").textContent = totalWins;
        }
        else{
            totalLosses++;
            document.querySelector("#totalLosses").textContent= totalLosses;
        }
    }
    
}

