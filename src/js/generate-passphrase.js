function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getDiceNumber() {
  const minimum = 1;
  const maximun = 6;

  return getRandomInt(minimum, maximun);
}

function createDiceThrows() {
  const passphraseLength = 12;
  const numberOfDiceThrows = 5;

  return Array.from({ length: passphraseLength }, () =>
    Array.from({ length: numberOfDiceThrows }, () => getDiceNumber())
  );
}

function throwDice() {
  const diceThrows = createDiceThrows();
  return diceThrows.map((value) => Number(value.join("")));
}

async function mapDiceNumbersToWords() {
  try {
    const wordslist = await import("../wordslist.json");
    const generatedPassphrase = throwDice().map((dice) => wordslist[dice]);
    return generatedPassphrase.join(" ");
  } catch (error) {
    console.error("Something went wrong with the words list.", error);
  }
}

export { mapDiceNumbersToWords as generatePassphrase };
