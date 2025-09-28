// -------Element Selection ----------------------
let bank = document.querySelector("#bank");
let r1 = document.querySelector("#r1");
let r2 = document.querySelector("#r2");
let r3 = document.querySelector("#r3");
let Bet = document.querySelector("#Bet");
let slotBtn = document.querySelector("#slotBtn");
let resetBtn = document.querySelector("#resetBtn");
let message = document.querySelector("#message");
let resultImg = document.querySelector("#resultImg");
let togglePayouts = document.querySelector("#togglePayouts");
let payouts = document.querySelector("#payouts");
//------------------------------------------------

// Emojis sourced from https://emojipicker.com/
// const symbols = ["🍒", "BAR", "7", "⭐"];

// wanted to do simply weighted outcomes (got lost in the math sauce)
// The weights are just vibes. If i were to do this more seriously there would be more logic and math behind my weights and payouts
const symbols = ["🍒", "🍒", "🍒", "⭐", "⭐", "⭐", "⭐", "BAR", "BAR", "7"];

let balance = 1000;

// game Loop
function playSlots() {
  const bet = parseInt(Bet.value, 10);

  // Validate bet
  if (!bet) {
    message.textContent = "Please enter your bet.";
    return;
  }
  if (bet > balance) {
    message.textContent =
      "You are too broke for that bet! Add more funds and you will definitely win next time... I promise!";
    return;
  }

  // Deduct bet
  balance -= bet;

  // Randomly "spin" the reels. I read that many casino machines actually use RNG for all outcomes.
  // So in a real game all of the outcomes are dependant on a single random number (not individual reels)
  // Im not good enough to do that so i made simple weights above and Math.Random for individual reels
  const reels = [
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
  ];

  // Set the text content of the "spin" to the respective reels
  r1.textContent = reels[0];
  r2.textContent = reels[1];
  r3.textContent = reels[2];

  const mult = payoutMultiplier(reels);
  const winnings = Math.floor(bet * mult);

  balance += winnings;
  bank.textContent = balance;

  //I had to look up how to do the formatted message stuff:
  // Link for my studying reference https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

  // Message
  if (mult > 0) {
    message.textContent = `WIN! ${reels.join(" ")} → ${mult}x → +$${winnings-25}`;
    message.style.color = "green";
    resultImg.src = "img/win.png";
    resultImg.style.display = "block";
  } else {
    message.textContent = `No win. (${reels.join(" ")})`;
    message.style.color = "crimson";
    resultImg.src = "img/lose.png";
    resultImg.style.display = "block";
  }
}

/* Payout Logic Table. I googled a standard payout table and simplified it for my game */

function payoutMultiplier(reels) {
  const [a, b, c] = reels;
  let cherryCount = 0;
  let starCount = 0;

  // Loop to count cherries and stars. Other outcomes only happen if all 3 are the same
  for (const symbol of reels) {
    if (symbol === "🍒") {
      cherryCount++;
    }
    if (symbol === "⭐") {
      starCount++;
    }
  }

  // Big Money Wins
  if (a === "7" && b === "7" && c === "7") return 100;
  if (a === "BAR" && b === "BAR" && c === "BAR") return 25;

  // Cherries
  if (cherryCount === 3) return 4;
  if (cherryCount === 2) return 1.2;
  if (cherryCount === 1) return 1.1;

  // Stars (Originally )
  if (starCount === 3) return 4;
  if (starCount == 2) return 2;

  // Everything else
  return 0;
}
function resetGame() {
  balance = 1000;
  bank.textContent = balance;
  r1.textContent = "?";
  r2.textContent = "?";
  r3.textContent = "?";
  Bet.value = "";
  message.textContent = "Game reset!";
}

slotBtn.addEventListener("click", playSlots);
resetBtn.addEventListener("click", resetGame);
togglePayouts.addEventListener("click", () => {
  payouts.classList.toggle("show");
});
