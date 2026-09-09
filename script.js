document.addEventListener("DOMContentLoaded", function () {

  // ==========================================
  // SCREENS + NAVIGATION
  // ==========================================

  const beginButton = document.getElementById("begin-button");
  const continueButton = document.getElementById("continue-button");
  const digitalButton = document.getElementById("digital-button");

  const landingScreen = document.getElementById("landing-screen");
  const missionScreen = document.getElementById("mission-screen");
  const physicalScreen = document.getElementById("physical-screen");
  const digitalScreen = document.getElementById("digital-screen");


  // ==========================================
  // PHYSICAL ARCHIVE
  // ==========================================

  const archiveButtons = document.querySelectorAll(".archive-button");

  const floatingRemainingDisplay =
    document.getElementById("physical-remaining-floating");

  let remainingWeight = 25;


  // ==========================================
  // LANDING → MISSION
  // ==========================================

  if (beginButton) {

    beginButton.addEventListener("click", function () {

      landingScreen.classList.add("hidden");
      missionScreen.classList.remove("hidden");

      window.scrollTo(0, 0);

    });

  }


  // ==========================================
  // MISSION → PHYSICAL
  // ==========================================

  if (continueButton) {

    continueButton.addEventListener("click", function () {

      missionScreen.classList.add("hidden");
      physicalScreen.classList.remove("hidden");

      window.scrollTo(0, 0);

    });

  }


  // ==========================================
  // PHYSICAL → DIGITAL
  // ==========================================

  if (digitalButton) {

    digitalButton.addEventListener("click", function () {

      physicalScreen.classList.add("hidden");
      digitalScreen.classList.remove("hidden");

      window.scrollTo(0, 0);

    });

  }


  // ==========================================
  // PHYSICAL — ARCHIVE / REMOVE OBJECT
  // ==========================================

  archiveButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const card = button.closest(".archive-card");

      const weight = Number(card.dataset.weight);

      const isSelected =
        card.classList.contains("selected");


      // REMOVE FROM ARCHIVE

      if (isSelected) {

        remainingWeight = remainingWeight + weight;

        card.classList.remove("selected");

        button.textContent = "+ ARCHIVE";

      }


      // ADD TO ARCHIVE

      else {

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


      if (floatingRemainingDisplay) {

        floatingRemainingDisplay.textContent =
          remainingWeight;

      }

    });

  });


  // ==========================================
  // MORE INFO
  // ==========================================

  const infoButtons =
    document.querySelectorAll(".info-button");

  infoButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const card =
        button.closest(".archive-card");

      const details =
        card.querySelector(".card-details");

      const isOpen =
        !details.classList.contains("hidden");


      if (isOpen) {

        details.classList.add("hidden");

        button.textContent = "MORE INFO";

      }

      else {

        details.classList.remove("hidden");

        button.textContent = "CLOSE INFO";

      }

    });

  });

});
