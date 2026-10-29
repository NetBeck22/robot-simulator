import { Game } from "./game.js";
import nl from "../json/nl.json" assert { type: "json" };

Blockly.setLocale(nl);
const game = new Game();

function update() {
  game
    .getContext()
    .clearRect(0, 0, game.getCanvas().width, game.getCanvas().height);
  game.getDebugger().getCurrentLevel().drawGrid(420, 420, game.getContext());
  game.getDebugger().getCurrentLevel().drawAttributes(game.getContext());
  game.getDebugger().setStars();
  if (game.getDebugger().getCurrentLevel().getComplete()) {
    document.getElementById("levelStar").style.display = "inline-block";
  } else {
    document.getElementById("levelStar").style.display = "none";
  }
  requestAnimationFrame(update);
}

update();

function setNewLevel() {
  document.getElementById("debugVarsDiv").style.display = "none";
  document.getElementById("debugDiv").style.display = "none";
  document.getElementById("feedbackDiv").style.display = "none";
  document.getElementById("stopButtonRun").style.display = "none";
  document.getElementById("startDebugButton").style.display = "block";
  document.getElementById("runButton").style.display = "block";
  document.getElementById("stepButton").style.display = "none";
  document.getElementById("startDebugButton").style.display = "block";
  document.getElementById("stopButtonDebug").style.display = "none";
  document.getElementById("terminal").style.display = "none";

  myPopup.classList.remove("show");
}

// on click listeners
document.getElementById("runButton").onclick = async function () {
  document.getElementById("stopButtonRun").style.display = "block";
  document.getElementById("startDebugButton").style.display = "none";
  game.getDebugger().startRun();
};

document.getElementById("stepButton").onclick = function () {
  var text = game.getDebugger().setStep();
  if (text == null) {
    document.getElementById("stopButtonDebug").click();
  }
};

document.getElementById("startDebugButton").onclick = function () {
  document.getElementById("stepButton").style.display = "block";
  document.getElementById("startDebugButton").style.display = "none";
  document.getElementById("stopButtonDebug").style.display = "block";
  document.getElementById("runButton").style.display = "none";
  document.getElementById("debugDiv").style.display = "block";
  game.getDebugger().startDebug();
};

document.getElementById("stopButtonRun").onclick = function () {
  game.getDebugger().stopRun();
  document.getElementById("stopButtonRun").style.display = "none";
  document.getElementById("startDebugButton").style.display = "block";
};

document.getElementById("stopButtonDebug").onclick = function () {
  document.getElementById("stepButton").style.display = "none";
  document.getElementById("startDebugButton").style.display = "block";
  document.getElementById("runButton").style.display = "block";
  document.getElementById("stopButtonDebug").style.display = "none";

  document.getElementById("debugVarsDiv").style.display = "none";
  document.getElementById("debugDiv").style.display = "none";
};

document.getElementById("level1").onclick = function () {
  setNewLevel();
  game.getDebugger().setCurrentLevel(0);
};

document.getElementById("level2").onclick = function () {
  setNewLevel();
  game.getDebugger().setCurrentLevel(1);
};

document.getElementById("level3").onclick = function () {
  setNewLevel();
  game.getDebugger().setCurrentLevel(2);
};

document.getElementById("level4").onclick = function () {
  setNewLevel();
  game.getDebugger().setCurrentLevel(3);
};

document.getElementById("levelMenu").onclick = function () {
  myPopup.classList.add("show");
};

document.getElementById("closePopup").onclick = function () {
  myPopup.classList.remove("show");
};

window.addEventListener("click", function (event) {
  if (event.target == myPopup) {
    myPopup.classList.remove("show");
  }
});

document.getElementById("terminalMenu").onclick = function () {
  document.getElementById("terminal").style.display = "block";
};

document.getElementById("closeTerminal").onclick = function () {
  document.getElementById("terminal").style.display = "none";
};
