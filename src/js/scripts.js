import { generatePassphrase } from "./generate-passphrase";

function init() {
  const generateButton = document.querySelector("[data-generate]");
  const copyButton = document.querySelector("[data-passphrase-copy]");

  generateButton.removeAttribute("disabled");
  generateButton.textContent = "Generate secure passphrase";

  generateButton.onclick = onButtonGeneratePassphrase;
  copyButton.onclick = onCopyToClipboard;
}

async function onButtonGeneratePassphrase() {
  const input = document.querySelector("[data-passphrase]");
  const copyButton = document.querySelector("[data-passphrase-copy]");

  input.textContent = `Just a moment. Generating your secure passphrase...`;
  const generatedPassphrase = await generatePassphrase();
  input.textContent = generatedPassphrase;
  copyButton.classList.remove("hidden");
}

async function onCopyToClipboard() {
  const textCopy = document.querySelector("[data-text-copy]");
  const textCopyDone = document.querySelector("[data-text-copy-done]");
  const pathCopy = document.querySelector("[data-passphrase-path-copy]");
  const pathCopied = document.querySelector("[data-passphrase-path-copied]");
  const input = document.querySelector("[data-passphrase]");
  const copyButton = document.querySelector("[data-passphrase-copy]");

  if (!navigator.clipboard) {
    copyButton.classList.add("hidden");
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

export { init };
