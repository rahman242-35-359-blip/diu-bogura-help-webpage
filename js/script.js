// ==========================================
// DIU Bogura Association
// Main JavaScript File
// ==========================================


// ---------- Page Loaded ----------

document.addEventListener("DOMContentLoaded", function () {

    console.log("DIU Bogura Association website loaded successfully.");

    // Current year in footer
    const footerYear = document.querySelector("footer p");

    if (footerYear) {
        footerYear.innerHTML =
            `© ${new Date().getFullYear()} DIU Bogura Association. All Rights Reserved.`;
    }


    // ---------- Get Help Button ----------

    const helpButton = document.querySelector(".btn");

    if (helpButton) {

        helpButton.addEventListener("click", function () {
            console.log("Get Help button clicked.");
        });

    }


    // ---------- Navigation Active Link ----------

    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.forEach(function (item) {
                item.classList.remove("active");
            });

            this.classList.add("active");

        });

    });


    // ---------- Service Cards ----------

    const serviceCards = document.querySelectorAll(".service-card");

    serviceCards.forEach(function (card) {

        card.addEventListener("click", function () {

            const title = card.querySelector("h3");

            if (title) {
                console.log("Selected service:", title.textContent);
            }

        });

    });

});