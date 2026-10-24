
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const languageToggle = document.getElementById("languageToggle");

let currentLanguage = "en";

// Mobile navigation
menuToggle.addEventListener("click", function () {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close mobile menu after selecting a section
document.querySelectorAll(".nav-links a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// English and Arabic language toggle
languageToggle.addEventListener("click", function () {
  currentLanguage = currentLanguage === "en" ? "ar" : "en";

  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  document.body.dir = currentLanguage === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-en][data-ar]").forEach(function (element) {
    const translation = element.getAttribute("data-" + currentLanguage);

    if (translation !== null) {
      if (translation.includes("<span>")) {
        element.innerHTML = translation;
      } else {
        element.textContent = translation;
      }
    }
  });

  languageToggle.textContent = currentLanguage === "en" ? "العربية" : "English";
});

// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Show a message if a project screenshot is missing
document.querySelectorAll(".project-image img").forEach(function (image) {
  image.addEventListener("error", function () {
    const imageContainer = image.parentElement;

    image.style.display = "none";
    imageContainer.classList.add("image-missing");

    if (!imageContainer.querySelector(".image-placeholder")) {
      const placeholder = document.createElement("span");
      placeholder.className = "image-placeholder";
      placeholder.textContent = "Project Screenshot";
      imageContainer.appendChild(placeholder);
    }
  });
});
