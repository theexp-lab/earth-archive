const beginButton = document.getElementById("begin-button");

const continueButton = document.getElementById("continue-button");

const landingScreen = document.getElementById("landing-screen");

const missionScreen = document.getElementById("mission-screen");

const physicalScreen = document.getElementById("physical-screen");


beginButton.addEventListener("click", function () {

  landingScreen.classList.add("hidden");

  missionScreen.classList.remove("hidden");

  window.scrollTo(0, 0);

});


continueButton.addEventListener("click", function () {

  missionScreen.classList.add("hidden");

  physicalScreen.classList.remove("hidden");

  window.scrollTo(0, 0);

});
