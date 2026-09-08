const beginButton = document.getElementById("begin-button");

const landingScreen = document.getElementById("landing-screen");

const missionScreen = document.getElementById("mission-screen");


beginButton.addEventListener("click", function () {

  landingScreen.classList.add("hidden");

  missionScreen.classList.remove("hidden");

  window.scrollTo(0, 0);

});
