const beginButton = document.getElementById("begin-button");
const continueButton = document.getElementById("continue-button");

const landingScreen = document.getElementById("landing-screen");
const missionScreen = document.getElementById("mission-screen");
const physicalScreen = document.getElementById("physical-screen");
const digitalScreen = document.getElementById("digital-screen");
const digitalButton = document.getElementById("digital-button");

const archiveButtons = document.querySelectorAll(".archive-button");
const infoButtons = document.querySelectorAll(".info-button");

const floatingRemainingDisplay =
  document.getElementById("physical-remaining-floating");

let remainingWeight = 25;


// LANDING → MISSION

beginButton.addEventListener("click", function () {

  landingScreen.classList.add("hidden");

  missionScreen.classList.remove("hidden");

  window.scrollTo(0, 0);

});


// MISSION → PHYSICAL

continueButton.addEventListener("click", function () {

  missionScreen.classList.add("hidden");

  physicalScreen.classList.remove("hidden");

  window.scrollTo(0, 0);

});


// ARCHIVE / REMOVE OBJECT

archiveButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    const card = button.closest(".archive-card");

    const weight = Number(card.dataset.weight);

    const isSelected = card.classList.contains("selected");


    if (isSelected) {

      remainingWeight = remainingWeight + weight;

      card.classList.remove("selected");

      button.textContent = "+ ARCHIVE";

    } else {

      if (weight > remainingWeight) {

        button.textContent = "NO SPACE";

        setTimeout(function () {
          button.textContent = "+ ARCHIVE";
        }, 1000);

        return;
      }

      remainingWeight = remainingWeight - weight;

      card.classList.add("selected");

      button.textContent = "✓ ARCHIVED";

    }


    floatingRemainingDisplay.textContent = remainingWeight;

  });

});


// MORE INFO

infoButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    const card = button.closest(".archive-card");

    const details = card.querySelector(".card-details");

    const isOpen = !details.classList.contains("hidden");


    if (isOpen) {

      details.classList.add("hidden");

      button.textContent = "MORE INFO";

    } else {

      details.classList.remove("hidden");

      button.textContent = "CLOSE INFO";

    }

  });

});
digitalButton.addEventListener("click", function () {
  physicalScreen.classList.add("hidden");
  digitalScreen.classList.remove("hidden");

  window.scrollTo(0, 0);
});
