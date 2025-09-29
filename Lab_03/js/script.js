document.querySelector("button").addEventListener("click", gradeQuiz);

var score = 0;
var attempts = Number(localStorage.getItem("total_attempts") || 0);

displayQ4Choices();

function isFormValid(){
  let isValid = true;
  if (document.querySelector("#q1").value.trim() === "") {
    isValid = false;
    document.querySelector("#validationFdbk").innerHTML = "Question 1 was not answered";
  }
  return isValid;
}

function rightAnswer(index){
  document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
  document.querySelector(`#q${index}Feedback`).className = "bg-success text-white";
  document.querySelector(`#markImg${index}`).innerHTML = `<img src="img/checkmark.png" alt="checkmark">`;
  score += 20;
}

function wrongAnswer(index){
  document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
  document.querySelector(`#q${index}Feedback`).className = "bg-warning text-white";
  document.querySelector(`#markImg${index}`).innerHTML = `<img src="img/xmark.png" alt="xmark">`;
}

function displayQ4Choices(){
  let q4ChoicesArray = ["Kakarot", "Bardock", "Vegeta", "Raditz"];
  q4ChoicesArray = _.shuffle(q4ChoicesArray);
  document.querySelector("#q4Choices").innerHTML = "";
  for (let i = 0; i < q4ChoicesArray.length; i++) {
    document.querySelector("#q4Choices").innerHTML += `
      <input type="radio" name="q4" id="${q4ChoicesArray[i]}" value="${q4ChoicesArray[i]}">
      <label for="${q4ChoicesArray[i]}">${q4ChoicesArray[i]}</label><br>
    `;
  }
}

function gradeQuiz(){
  document.querySelector("#validationFdbk").innerHTML = "";
  if (!isFormValid()) return;

  score = 0;

  let q1Response = document.querySelector("#q1").value.toLowerCase().trim();
  if (q1Response === "straw hat pirates" || q1Response === "straw hats") { rightAnswer(1); }
  else { wrongAnswer(1); }

  let q2Response = document.querySelector("#q2").value;
  if (q2Response === "kishimoto") { rightAnswer(2); }
  else { wrongAnswer(2); }

  const ttr = document.querySelector("#Totoro").checked;
  const spa = document.querySelector("#SpiritedAway").checked;
  const yrn = document.querySelector("#YourName").checked;
  const akr = document.querySelector("#Akira").checked;
  if (ttr && spa && !yrn && !akr) { rightAnswer(3); }
  else { wrongAnswer(3); }

  const checked = document.querySelector('input[name=q4]:checked');
  if (checked && checked.value === "Kakarot") { rightAnswer(4); }
  else { wrongAnswer(4); }

  let q5Response = document.querySelector("#q5").value.trim();
  if (q5Response === "7") { rightAnswer(5); }
  else { wrongAnswer(5); }

  const scoreEl = document.querySelector("#totalScore");
  scoreEl.innerHTML = `Total Score: ${score}`;
  if (score > 80) {
    scoreEl.className = "text-success";
    scoreEl.innerHTML += "<br>Great job!";
  } else {
    scoreEl.className = "text-danger";
  }

  attempts += 1;
  document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${attempts}`;
  localStorage.setItem("total_attempts", attempts);
}


