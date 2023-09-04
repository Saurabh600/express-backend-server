const magicBtn = document.getElementById("magic-btn");
const magicText = document.getElementById("magic-text");

if (typeof magicBtn != null) {
  magicBtn.onclick = () => {
    if (magicText) {
      if (magicText.textContent) {
        magicText.textContent += " yah!";
        return;
      }

      magicText.textContent = "wanna clap?";
    }
  };
}
