document.addEventListener("DOMContentLoaded", function () {


  // ==========================================
  // 1. SCREENS
  // Tous les écrans principaux du parcours
  // ==========================================

  const landingScreen =
    document.getElementById("landing-screen");

  const missionScreen =
    document.getElementById("mission-screen");

  const physicalScreen =
    document.getElementById("physical-screen");

  const digitalScreen =
    document.getElementById("digital-screen");

  const biologicalScreen =
  document.getElementById("biological-screen");


  // ==========================================
  // 2. NAVIGATION BUTTONS
  // Boutons pour passer d'un écran à l'autre
  // ==========================================

  const beginButton =
    document.getElementById("begin-button");

  const continueButton =
    document.getElementById("continue-button");

  const digitalButton =
    document.getElementById("digital-button");

  const biologicalButton =
  document.getElementById("biological-button");


  // ==========================================
  // 3. LANDING → MISSION
  // ==========================================

  if (beginButton) {

    beginButton.addEventListener("click", function () {

      landingScreen.classList.add("hidden");

      missionScreen.classList.remove("hidden");

      window.scrollTo(0, 0);

    });

  }


  // ==========================================
  // 4. MISSION → PHYSICAL
  // ==========================================

  if (continueButton) {

    continueButton.addEventListener("click", function () {

      missionScreen.classList.add("hidden");

      physicalScreen.classList.remove("hidden");

      window.scrollTo(0, 0);

    });

  }


  // ==========================================
  // 5. PHYSICAL → DIGITAL
  // ==========================================

  if (digitalButton) {

    digitalButton.addEventListener("click", function () {

      physicalScreen.classList.add("hidden");

      digitalScreen.classList.remove("hidden");

      window.scrollTo(0, 0);

    });

  }


  // ==========================================
  // 6. PHYSICAL ARCHIVE — VARIABLES
  // ==========================================

  const physicalArchiveButtons =
    document.querySelectorAll(".archive-button");

  const physicalRemainingDisplay =
    document.getElementById("physical-remaining-floating");

  let remainingWeight = 25;


  // ==========================================
  // 7. PHYSICAL ARCHIVE — SELECTION
  // ==========================================

  physicalArchiveButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const card =
        button.closest(".archive-card");

      const weight =
        Number(card.dataset.weight);

      const isSelected =
        card.classList.contains("selected");


      // ------------------------------------------
      // REMOVE FROM ARCHIVE
      // ------------------------------------------

      if (isSelected) {

        remainingWeight =
          remainingWeight + weight;

        card.classList.remove("selected");

        button.textContent = "+ ARCHIVE";

      }


      // ------------------------------------------
      // ADD TO ARCHIVE
      // ------------------------------------------

      else {

        if (weight > remainingWeight) {

          button.textContent = "NO SPACE";

          setTimeout(function () {

            button.textContent = "+ ARCHIVE";

          }, 1000);

          return;

        }

        remainingWeight =
          remainingWeight - weight;

        card.classList.add("selected");

        button.textContent = "✓ ARCHIVED";

      }


      // ------------------------------------------
      // UPDATE KG COUNTER
      // ------------------------------------------

      if (physicalRemainingDisplay) {

        physicalRemainingDisplay.textContent =
          remainingWeight;

      }

    });

  });


  // ==========================================
  // 8. MORE INFO — PHYSICAL CARDS
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


  // ==========================================
  // 9. DIGITAL ARCHIVE — VARIABLES
  // ==========================================

  const digitalFiles =
    document.querySelectorAll(".digital-file");

  const digitalRemainingDisplay =
    document.getElementById("digital-remaining");

  const digitalStorageFill =
    document.getElementById("digital-storage-fill");

  const digitalActionButton =
    document.getElementById("digital-action-button");

  const digitalLogText =
    document.getElementById("digital-log-text");

  let remainingStorage = 10;

  let currentDigitalFile = null;


  // ==========================================
  // 10. DIGITAL DETAIL PANEL — ELEMENTS
  // ==========================================

  const detailId =
    document.getElementById("digital-detail-id");

  const detailTitle =
    document.getElementById("digital-detail-title");

  const detailFormat =
    document.getElementById("digital-detail-format");

  const detailSize =
    document.getElementById("digital-detail-size");

  const detailDescription =
    document.getElementById("digital-detail-description");

  const detailSignificance =
    document.getElementById("digital-detail-significance");


  // ==========================================
  // 11. DIGITAL — OPEN FILE
  // Cliquer sur une ligne affiche son détail
  // ==========================================

  digitalFiles.forEach(function (file) {

    file.addEventListener("click", function () {


      // ------------------------------------------
      // REMOVE ACTIVE STATE FROM OTHER FILES
      // ------------------------------------------

      digitalFiles.forEach(function (otherFile) {

        otherFile.classList.remove("active");

      });


      // ------------------------------------------
      // MARK THIS FILE AS ACTIVE
      // ------------------------------------------

      file.classList.add("active");

      currentDigitalFile = file;


      // ------------------------------------------
      // UPDATE DETAIL PANEL
      // ------------------------------------------

      detailId.textContent =
        file.dataset.id;

      detailTitle.textContent =
        file.dataset.title;

      detailFormat.textContent =
        file.dataset.format;

      detailSize.textContent =
        file.dataset.storage + " TB";

      detailDescription.textContent =
        file.dataset.description;

      detailSignificance.textContent =
        file.dataset.significance;


      // ------------------------------------------
      // UPDATE ACTION BUTTON
      // ------------------------------------------

      if (file.classList.contains("archived")) {

        digitalActionButton.textContent =
          "REMOVE FROM ARCHIVE";

      }

      else {

        digitalActionButton.textContent =
          "ADD TO ARCHIVE";

      }


      // ------------------------------------------
      // UPDATE SYSTEM LOG
      // ------------------------------------------

      digitalLogText.textContent =
        "> opened " + file.dataset.id;

    });

  });


  // ==========================================
  // 12. DIGITAL — ADD / REMOVE ARCHIVE
  // ==========================================

  if (digitalActionButton) {

    digitalActionButton.addEventListener("click", function () {


      // ------------------------------------------
      // NOTHING SELECTED
      // ------------------------------------------

      if (!currentDigitalFile) {

        digitalLogText.textContent =
          "> select a file before allocation";

        return;

      }


      const storage =
        Number(currentDigitalFile.dataset.storage);

      const status =
        currentDigitalFile.querySelector(".file-status");

      const isArchived =
        currentDigitalFile.classList.contains("archived");


      // ------------------------------------------
      // REMOVE FILE
      // ------------------------------------------

      if (isArchived) {

        remainingStorage =
          remainingStorage + storage;

        currentDigitalFile.classList.remove("archived");

        status.textContent =
          "OPEN";

        digitalActionButton.textContent =
          "ADD TO ARCHIVE";

        digitalLogText.textContent =
          "> " +
          currentDigitalFile.dataset.id +
          " removed from archive";

      }


      // ------------------------------------------
      // ADD FILE
      // ------------------------------------------

      else {

        if (storage > remainingStorage) {

          digitalLogText.textContent =
            "> ALLOCATION FAILED // " +
            storage +
            " TB REQUIRED // " +
            remainingStorage +
            " TB AVAILABLE";

          return;

        }


        remainingStorage =
          remainingStorage - storage;

        currentDigitalFile.classList.add("archived");

        status.textContent =
          "ARCHIVED";

        digitalActionButton.textContent =
          "REMOVE FROM ARCHIVE";

        digitalLogText.textContent =
          "> integrity check complete // " +
          currentDigitalFile.dataset.id +
          " archived";

      }


      // ==========================================
      // 13. UPDATE DIGITAL STORAGE
      // Compteur + barre de remplissage
      // ==========================================

      digitalRemainingDisplay.textContent =
        remainingStorage;

      const usedStorage =
        10 - remainingStorage;

      const usedPercentage =
        (usedStorage / 10) * 100;

      digitalStorageFill.style.width =
        usedPercentage + "%";

    });

  }


  // ==========================================
  // 14. DIGITAL — DEFAULT FILE
  // Ouvre le premier fichier automatiquement
  // ==========================================

  if (digitalFiles.length > 0) {

    digitalFiles[0].click();

  }
// ==========================================
// 15. DIGITAL → BIOLOGICAL
// Passe du système informatique à la biobanque
// ==========================================

if (biologicalButton) {

  biologicalButton.addEventListener("click", function () {

    digitalScreen.classList.add("hidden");

    biologicalScreen.classList.remove("hidden");

    window.scrollTo(0, 0);

  });

}


/* ==========================================
   16. BIOLOGICAL ARCHIVE — VARIABLES
   5 collections maximum
========================================== */

const bioCards =
  document.querySelectorAll(".bio-card");

const bioArchiveButtons =
  document.querySelectorAll(".bio-archive-button");

const bioInfoButtons =
  document.querySelectorAll(".bio-info-button");

const bioRemainingDisplay =
  document.getElementById("bio-remaining");

let remainingBioSlots = 5;


/* ==========================================
   17. BIOLOGICAL — ARCHIVE SELECTION
   Chaque collection utilise 1 slot
========================================== */

bioArchiveButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    const card =
      button.closest(".bio-card");

    const isSelected =
      card.classList.contains("selected");


    // ------------------------------------------
    // REMOVE COLLECTION
    // ------------------------------------------

    if (isSelected) {

      card.classList.remove("selected");

      remainingBioSlots =
        remainingBioSlots + 1;

      button.textContent =
        "+ ARCHIVE";

    }


    // ------------------------------------------
    // ADD COLLECTION
    // ------------------------------------------

    else {

      if (remainingBioSlots <= 0) {

        button.textContent =
          "NO SLOT AVAILABLE";

        setTimeout(function () {

          button.textContent =
            "+ ARCHIVE";

        }, 1200);

        return;

      }

      card.classList.add("selected");

      remainingBioSlots =
        remainingBioSlots - 1;

      button.textContent =
        "✓ ARCHIVED";

    }


    // ------------------------------------------
    // UPDATE SLOT COUNTER
    // ------------------------------------------

    if (bioRemainingDisplay) {

      bioRemainingDisplay.textContent =
        remainingBioSlots;

    }

  });

});


/* ==========================================
   18. BIOLOGICAL — MORE INFO
   Ouvre / ferme les informations scientifiques
========================================== */

bioInfoButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    const card =
      button.closest(".bio-card");

    const details =
      card.querySelector(".bio-details");

    const isOpen =
      !details.classList.contains("hidden");


    // ------------------------------------------
    // CLOSE
    // ------------------------------------------

    if (isOpen) {

      details.classList.add("hidden");

      button.textContent =
        "MORE INFO";

    }


    // ------------------------------------------
    // OPEN
    // ------------------------------------------

    else {

      details.classList.remove("hidden");

      button.textContent =
        "CLOSE INFO";

    }

  });

});
  // ==========================================
// 19. BIOLOGICAL → MISSING ITEM
// Termine les trois catégories
// ==========================================

const finalButton =
  document.getElementById("final-button");

const missingScreen =
  document.getElementById("missing-screen");

const missingInput =
  document.getElementById("missing-input");

const missingCount =
  document.getElementById("missing-count");


if (finalButton) {

  finalButton.addEventListener("click", function () {

    biologicalScreen.classList.add("hidden");

    missingScreen.classList.remove("hidden");

    window.scrollTo(0, 0);

  });

}


// ==========================================
// 20. MISSING ITEM — CHARACTER COUNTER
// Compte les caractères tapés
// ==========================================

if (missingInput && missingCount) {

  missingInput.addEventListener("input", function () {

    missingCount.textContent =
      missingInput.value.length;

  });

}
});
