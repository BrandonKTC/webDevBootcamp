let randomNumber = Math.floor(Math.random() * 6) + 1;
let randomNumber2 = Math.floor(Math.random() * 6) + 1;

document
    .querySelector(".dice .img1")
    .setAttribute("src", `images/dice${randomNumber}.png`);
document
    .querySelector(".dice .img2")
    .setAttribute("src", `images/dice${randomNumber2}.png`);

if (randomNumber > randomNumber2) {
    document.querySelector('h1').innerHTML = "🚩 Player 1 Wins!"
} else if (randomNumber2 > randomNumber) {
    document.querySelector('h1').innerHTML = "Player 2 Wins! 🚩"
} else {
    document.querySelector('h1').innerHTML = "Draw!"
}