document.addEventListener("DOMContentLoaded", function () {

  // ==========================================
  // 1. RÉCUPÉRATION DES BOUTONS DE NAVIGATION
  // ==========================================

  const beginButton = document.getElementById("begin-button");
  const continueButton = document.getElementById("continue-button");
  const digitalButton = document.getElementById("digital-button");


  // ==========================================
  // 2. RÉCUPÉRATION DES DIFFÉRENTS ÉCRANS
  // ==========================================

  const landingScreen = document.getElementById("landing-screen");
  const missionScreen = document.getElementById("mission-screen");
  const physicalScreen = document.getElementById("physical-screen");
  const digitalScreen = document.getElementById("digital-screen");


  // ==========================================
  // 3. PHYSICAL ARCHIVE — VARIABLES
  // Gère les KG restants
  // ==========================================

  const physicalArchiveButtons =
    document.querySelectorAll(".archive-button");

  const physicalRemainingDisplay =
    document.getElementById("physical-remaining-floating");

  let remainingWeight = 25;


  // ==========================================
  // 4. DIGITAL ARCHIVE — VARIABLES
  // Gère les TB restants
  // ==========================================

  const digitalArchiveButtons =
    document.querySelectorAll(".digital-archive-button");

  const digitalRemainingDisplay =
    document.getElementById("digital-remaining");

  let remainingStorage = 10;


  // ==========================================
  // 5. LANDING → MISSION
  // ==========================================

  if (beginButton) {

    beginButton.addEventListener("click", function () {

      landingScreen.classList.add("hidden");
      missionScreen.classList.remove("hidden");

      window.scrollTo(0, 0);

    });

  }


  // ==========================================
  // 6. MISSION → PHYSICAL
  // ==========================================

  if (continueButton) {

    continueButton.addEventListener("click", function () {

      missionScreen.classList.add("hidden");
      physicalScreen.classList.remove("hidden");

      window.scrollTo(0, 0);

    });

  }


  // ==========================================
  // 7. PHYSICAL → DIGITAL
  // ==========================================

  if (digitalButton) {

    digitalButton.addEventListener("click", function () {

      physicalScreen.classList.add("hidden");
      digitalScreen.classList.remove("hidden");

      window.scrollTo(0, 0);

    });

  }


  // ==========================================
  // 8. PHYSICAL ARCHIVE — SÉLECTION
  // Ajoute ou retire un objet physique
  // ==========================================

  physicalArchiveButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const card = button.closest(".archive-card");

      const weight = Number(card.dataset.weight);

      const isSelected =
        card.classList.contains("selected");


      // ------------------------------------------
      // RETIRER DE L'ARCHIVE
      // ------------------------------------------

      if (isSelected) {

        remainingWeight = remainingWeight + weight;

        card.classList.remove("selected");

        button.textContent = "+ ARCHIVE";

      }


      // ------------------------------------------
      // AJOUTER À L'ARCHIVE
      // ------------------------------------------

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


      // ------------------------------------------
      // MET À JOUR LE COMPTEUR KG
      // ------------------------------------------

      if (physicalRemainingDisplay) {

        physicalRemainingDisplay.textContent =
          remainingWeight;

      }

    });

  });


  // ==========================================
  // 9. DIGITAL ARCHIVE — SÉLECTION
  // Ajoute ou retire un dataset numérique
  // ==========================================

  digitalArchiveButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const card = button.closest(".digital-card");

      const storage = Number(card.dataset.storage);

      const isSelected =
        card.classList.contains("selected");


      // ------------------------------------------
      // RETIRER DE L'ARCHIVE
      // ------------------------------------------

      if (isSelected) {

        remainingStorage =
          remainingStorage + storage;

        card.classList.remove("selected");

        button.textContent = "+ ARCHIVE";

      }


      // ------------------------------------------
      // AJOUTER À L'ARCHIVE
      // ------------------------------------------

      else {

        if (storage > remainingStorage) {

          button.textContent = "NO SPACE";

          setTimeout(function () {

            button.textContent = "+ ARCHIVE";

          }, 1000);

          return;

        }

        remainingStorage =
          remainingStorage - storage;

        card.classList.add("selected");

        button.textContent = "✓ ARCHIVED";

      }


      // ------------------------------------------
      // MET À JOUR LE COMPTEUR TB
      // ------------------------------------------

      if (digitalRemainingDisplay) {

        digitalRemainingDisplay.textContent =
          remainingStorage;

      }

    });

  });


  // ==========================================
  // 10. MORE INFO — TOUTES LES CARTES
  // Fonctionne pour Physical + Digital
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


      // ------------------------------------------
      // FERMER LES DÉTAILS
      // ------------------------------------------

      if (isOpen) {

        details.classList.add("hidden");

        button.textContent = "MORE INFO";

      }


      // ------------------------------------------
      // OUVRIR LES DÉTAILS
      // ------------------------------------------

      else {

        details.classList.remove("hidden");

        button.textContent = "CLOSE INFO";

      }

    });

  });

});
