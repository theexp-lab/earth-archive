const beginButton = document.getElementById("begin-button");
const continueButton = document.getElementById("continue-button");

const landingScreen = document.getElementById("landing-screen");
const missionScreen = document.getElementById("mission-screen");
const physicalScreen = document.getElementById("physical-screen");

const archiveButtons = document.querySelectorAll(".archive-button");
const remainingDisplay = document.getElementById("physical-remaining");

let remainingWeight = 25;


// LANDING → MISSION BRIEF

beginButton.addEventListener("click", function () {

  landingScreen.classList.add("hidden");

  missionScreen.classList.remove("hidden");

  window.scrollTo(0, 0);

});


// MISSION BRIEF → PHYSICAL ARCHIVE

continueButton.addEventListener("click", function () {

  missionScreen.classList.add("hidden");

  physicalScreen.classList.remove("hidden");

  window.scrollTo(0, 0);

});


// PHYSICAL ARCHIVE SELECTION

archiveButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    const card = button.closest(".archive-card");

    const weight = Number(card.dataset.weight);

    const isSelected = card.classList.contains("selected");


    // SI LA CARTE EST DÉJÀ ARCHIVÉE :
    // on la retire et on rend le poids disponible

    if (isSelected) {

      remainingWeight = remainingWeight + weight;

      card.classList.remove("selected");

      button.textContent = "+ ARCHIVE";

    }


    // SINON : on essaie de l'ajouter

    else {

      // PAS ASSEZ DE PLACE

      if (weight > remainingWeight) {

        button.textContent = "NO SPACE";

        setTimeout(function () {

          button.textContent = "+ ARCHIVE";

        }, 1000);

        return;

      }


      // ASSEZ DE PLACE

      remainingWeight = remainingWeight - weight;

      card.classList.add("selected");

      button.textContent = "✓ ARCHIVED";

    }


    // MET À JOUR LE COMPTEUR

    remainingDisplay.textContent = remainingWeight;

  });

});
