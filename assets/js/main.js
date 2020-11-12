
// 1. Variablen festlegen

let userPoints = 0;
let comPoints = 0;
const userScore = document.getElementById("user-score")
const comScore = document.getElementById("computer-score")
const scoreBoard = document.querySelector(".spielstand")
const result = document.querySelector(".result > p")
const rock = document.getElementById("r")
const paper = document.getElementById("p")
const scissors = document.getElementById("s")

const roundsDiv = document.getElementById("rounds")
const roundCount = document.getElementById("round-count")
const roundNow = document.getElementById("roundNow")
const roundTotal = document.getElementById("roundTotal")
let currentRound=1;
let maxRounds =1;


// 2. Funktion, die prüft, welcher Radiobutton gecheckt ist.
// übergibt den tries Wert weiter an die nächste Funktion
function radioRounds() {
    let five= document.getElementById("five").checked;
    let ten = document.getElementById("ten").checked;
    let fifteen = document.getElementById("fifteen").checked;
    let twenty = document.getElementById("twenty").checked;
  
    if (five === true) {
        maxRounds = 5;
    } else if (ten === true) {
        maxRounds = 10;
    } else if (fifteen === true) {
        maxRounds = 15;
    } else if (twenty === true) {
        maxRounds = 20;
    }
    return maxRounds;
  }
  


// 3. Random Auswahl vom Computer erzeugen
// => Array mit den drei Möglichkeiten erstellen
// => eine Random Nummer zwischen 0 und 2 generieren mit Math.random
function getComputerChoice(){
    const choices = ["r", "p", "s"]
    const randomNumber = Math.floor(Math.random()*3);
    return choices[randomNumber]
}

// 4. Damit im HTML nicht "r" sondern Rock steht werden die buchstaben in Wörter konvertiert
function convertWords(letter) {
    if(letter ==="r") {
        return "Rock"
} else if (letter === "p") {
    return "Paper"
} else {
    return "Scissors"
}
}

// 5. Funktion für den Fall, dass der User gewinnt! 
function win(userChoice, computerChoice) {
    const smallUserWord = "user".fontsize(2).sup();
    const smallCompWord = "comp".fontsize(2).sup();
    let userChoices = document.getElementById(userChoice);
      userPoints++;
    userScore.innerHTML = userPoints
    comScore.innerHTML = comPoints

    result.innerHTML = `${convertWords(userChoice)}${smallUserWord} beats ${convertWords(computerChoice)}${smallCompWord} You win!`;
    userChoices.classList.add('green-glow');
    setTimeout(() => userChoices.classList.remove('green-glow'), 300)

}

// 6. Funktion für den Fall, dass der Computer gewinnt und der User verliert!
function lose(userChoice, computerChoice) {
    comPoints++;
    userScore.innerHTML = userPoints
    comScore.innerHTML = comPoints
    const smallUserWord = "user".fontsize(2).sup();
    const smallCompWord = "comp".fontsize(2).sup();
    let userChoices = document.getElementById(userChoice);
    result.innerHTML = `${convertWords(computerChoice)}${smallCompWord} beats ${convertWords(userChoice)}${smallUserWord} You lose!`;
    userChoices.classList.add('red-glow');
    setTimeout(() =>userChoices.classList.remove('red-glow'), 300)
}

// 7. Funktion für den Fall, dass beide das gleiche Zeichen auswählen.
function draw(userChoice) {
    userScore.innerHTML = userPoints
    comScore.innerHTML = comPoints
    let userChoices = document.getElementById(userChoice);
    result.innerHTML = `It's a draw! You both chose ${convertWords(userChoice)}!`;
    userChoices.classList.add('grey-glow');
    setTimeout( () => userChoices.classList.remove('grey-glow'), 300)
}

//8. Funktion, die das Spiel überhaupt starten lässt. Hier werden die Wahl des Computers mit dem Klick des Users verglichen und zur jeweiligen funktion (win, lose oder draw) geleitet. 
function game(userChoice) {
    //wenn die Funktion aufgerufen wird, werden folgende Daten im HTML und CSS ausgelöst: 
    roundNow.innerHTML = currentRound;
    roundTotal.innerHTML = maxRounds
    roundsDiv.style.display = "none"
    roundCount.style.display ="block"

    const computerChoice = getComputerChoice();
    switch (userChoice + computerChoice) {
        case "rs":
        case "pr":
        case "sp":
           win(userChoice, computerChoice);
            break;
        case "rp":
        case "ps":
        case "sr":
            lose(userChoice, computerChoice)
            break;
        case "rr":
        case "pp":
        case "ss":
            draw(userChoice, computerChoice)
            break;
    }

//if-funktion, die prüft, ob die aktuelle Spielrunde die letzte ist oder ob noch eine weitere Runde gespielt werden kann. 

    if (currentRound < maxRounds) {
        console.log(currentRound, maxRounds);
        console.log(userPoints, comPoints);
    } else if (currentRound == maxRounds && userPoints > comPoints) {
            result.innerHTML ='<img src="assets/img/trophy.png" alt=""> Congratulations!! You have won!! <img src="assets/img/trophy.png" alt="">';
        } else if (currentRound == maxRounds && userPoints < comPoints) {
            result.innerHTML ='Oh No! You have lost!!'
        } else {
            result.innerHTML = "It's a draw! Try again? Press restart!"
        }
        currentRound++;
    }
  
// 9. Funktion, die die funktion Game beim Klick von eden Icons auslöst.
// Die Funktionen Radio und Game werden nur abgerufen, solange der endgültige Spielstand noch nicht erreicht ist. 
// ---> Zu viel doppelt! Hier muss noch aufgeräumt werden!!! 
function main() {
     
        rock.addEventListener("click", () => {
            if (currentRound <= maxRounds) {
            radioRounds();
            game("r")
        }
        })
        paper.addEventListener("click", () => {
            if (currentRound <= maxRounds) {
            radioRounds()
            game("p")
            }
        })
        scissors.addEventListener("click", () => {
            if (currentRound <= maxRounds) {
            radioRounds()
            game("s")
            }
        })
    }



// 10. Funktion wird ausgeführt. 
main();