import "babel-polyfill";

init();

async function init() {
  try {
    const response = await import("./wordslist.json");
    const generateButton = document.querySelector("[data-generate]");
    const copyButton = document.querySelector("[data-passphrase-copy]");
    const input = document.querySelector("[data-passphrase]");

    generateButton.removeAttribute("disabled");
    generateButton.textContent = "Generate secure passphrase";

    generateButton.onclick = function () {
      const passphrase = diceThrows().map((dice) => response[dice]);
      input.textContent = passphrase.join(" ");
    };

    copyButton.onclick = handleCopyToClipboard;
  } catch (error) {
    console.error("Oops, problem with generating pasphrase");
  }
}

async function handleCopyToClipboard() {
  const textCopy = document.querySelector("[data-text-copy]");
  const textCopyDone = document.querySelector("[data-text-copy-done]");
  const pathCopy = document.querySelector("[data-passphrase-path-copy]");
  const pathCopied = document.querySelector("[data-passphrase-path-copied]");
  const input = document.querySelector("[data-passphrase]");
  if (!input.textContent) {
    return;
  }

  if (!navigator.clipboard) {
    return;
  }

  try {
    await navigator.clipboard.writeText(input.textContent);
    toggleSvgPaths([pathCopy, pathCopied]);
    toggleElements([textCopy, textCopyDone]);
    setTimeout(() => {
      toggleSvgPaths([pathCopy, pathCopied]);
      toggleElements([textCopy, textCopyDone]);
    }, 1000);
  } catch (error) {
    console.log("Oops, unable to copy to clipboard", error);
  }
}

function toggleElements(elements) {
  if (!Array.isArray(elements)) {
    return;
  }

  elements.forEach((element) => {
    element.classList.toggle("hidden");
  });
}

function toggleSvgPaths(paths) {
  if (!Array.isArray(paths)) {
    return;
  }

  paths.forEach((path) => {
    const visibility = path.getAttribute("visibility");
    if (visibility === "visible") {
      path.setAttribute("visibility", "hidden");
    } else {
      path.setAttribute("visibility", "visible");
    }
  });
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
  return array.map((value) => Number(value.join("")));
}

function diceThrows() {
  return joinDiceThrows(createDiceThrows());
}
