
"use strict";
const diceEl = document.getElementById("dice");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const btnNewgame = document.querySelector(".newgame");
const btnRolldice = document.querySelector(".rolldice");
const btnHold = document.querySelector(".hold");

let playing = true;
let currentScore = 0;
let activeplayer = 0;
const scores = [0, 0];

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

const switchPlayer = () => {
    currentScore = 0;
    document.querySelector(`.p${activeplayer}`).classList.toggle("active");
    document.getElementById(`current--${activeplayer}`).textContent = 0;
    activeplayer = activeplayer === 0 ? 1 : 0;
    document.querySelector(`.p${activeplayer}`).classList.toggle("active");
};

btnRolldice.addEventListener("click", () => {
    if (playing) {
        const diceIdx = Math.trunc(Math.random() * 6) + 1;
        diceEl.classList.remove("hidden");
        diceEl.src = `assets/img/dice-${diceIdx}.png`;

        if (diceIdx !== 1) {
            currentScore += diceIdx;;
            document.getElementById(`current--${activeplayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener("click", () => {
    if (playing) {
        scores[activeplayer] += currentScore;
        document.getElementById(`score--${activeplayer}`).textContent = scores[activeplayer];

        if (scores[activeplayer] >= 20) {
            playing = false
            document.querySelector(`.p${activeplayer}`).classList.add("winner");
        }
        else
            switchPlayer();
    }

});

btnNewgame.addEventListener('click', () => {
    playing = true;
    currentScore = 0;
    document.querySelector(`.p${activeplayer}`).classList.remove("winner");
    document.getElementById(`current--0`).textContent = 0;
    document.getElementById(`current--1`).textContent = 0;
    document.getElementById(`score--0`).textContent = 0;
    document.getElementById(`score--1`).textContent = 0;
    diceEl.classList.add("hidden");
})