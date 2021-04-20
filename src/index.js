import "babel-polyfill";
import { generatePassphrase } from "./generate-passphrase";

init();

async function init() {
  try {
    const generateButton = document.querySelector("[data-generate]");
    const copyButton = document.querySelector("[data-passphrase-copy]");
    const input = document.querySelector("[data-passphrase]");

    generateButton.removeAttribute("disabled");
    generateButton.textContent = "Generate secure passphrase";

    generateButton.onclick = async function () {
      input.textContent = `Just a moment. Generating your secure passphrase...`;
      const generatedPassphrase = await generatePassphrase();
      input.textContent = generatedPassphrase;
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
