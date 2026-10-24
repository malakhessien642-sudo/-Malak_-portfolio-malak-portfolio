
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const languageToggle = document.getElementById("languageToggle");
  const backToTop = document.getElementById("backToTop");
  const currentYear = document.getElementById("currentYear");

  let currentLanguage = "en";

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Mobile navigation
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
      });
    });
  }

  // English / Arabic language toggle
  if (languageToggle) {
    languageToggle.addEventListener("click", function () {
      currentLanguage = currentLanguage === "en" ? "ar" : "en";

      document.documentElement.lang = currentLanguage;
      document.documentElement.dir =
        currentLanguage === "ar" ? "rtl" : "ltr";

      document.body.dir =
        currentLanguage === "ar" ? "rtl" : "ltr";

      document.querySelectorAll("[data-en][data-ar]").forEach(function (element) {
        element.textContent = element.getAttribute(
          currentLanguage === "ar" ? "data-ar" : "data-en"
        );
      });

      languageToggle.textContent =
        currentLanguage === "ar" ? "English" : "عربي";
    });
  }

  // Back to top button
  function updateBackToTop() {
    if (backToTop) {
      backToTop.classList.toggle("visible", window.scrollY > 400);
    }
  }

  window.addEventListener("scroll", updateBackToTop);
  updateBackToTop();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Friendly fallback if a project image is missing
  document.querySelectorAll(".project-image").forEach(function (image) {
    image.addEventListener("error", function () {
      image.style.display = "none";
      const imageLink = image.closest(".project-image-link");

      if (imageLink) {
        imageLink.style.minHeight = "180px";
        imageLink.style.display = "grid";
        imageLink.style.placeItems = "center";
        imageLink.style.color = "#A7F3D0";
        imageLink.style.padding = "20px";
        imageLink.setAttribute(
          "aria-label",
          "Project image not found. Check the image filename."
        );

        const fallback = document.createElement("span");
        fallback.textContent = "Project Preview";
        imageLink.prepend(fallback);
      }
    });
  });
});
