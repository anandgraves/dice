import "babel-polyfill";

init();

async function init() {
  try {
    const response = await import("./wordslist.json");
    const button = document.querySelector("[data-generate]");
    const input = document.querySelector("[data-passphrase]");

    button.onclick = function() {
      const passphrase = diceThrows().map(dice => response[dice]);
      input.textContent = passphrase.join(" ");
    };
  } catch (error) {
    console.error(error);
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getDiceNumber() {
  var MINIMUM = 1;
  var MAXIMUM = 6;
  return getRandomInt(MINIMUM, MAXIMUM);
}

function createDiceThrows() {
  return Array.from({ length: 12 }, () =>
    Array.from({ length: 5 }, () => getDiceNumber())
  );
}

function joinDiceThrows(array) {
  return array.map(value => Number(value.join("")));
}

function diceThrows() {
  return joinDiceThrows(createDiceThrows());
}
