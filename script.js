
const langToggle = document.getElementById("langToggle");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const backToTop = document.getElementById("backToTop");

let currentLang = "en";

function setLanguage(lang) {
  currentLang = lang;

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-en][data-ar]").forEach(function (element) {
    const translation = element.dataset[lang];

    if (translation !== undefined) {
      element.innerHTML = translation;
    }
  });

  langToggle.textContent = lang === "en" ? "عربي" : "English";
  document.title = lang === "en"
    ? "Malak Hussein | Developer Portfolio"
    : "ملك حسين | معرض أعمالي";

  document.querySelector('meta[name="description"]').content =
    lang === "en"
      ? "Malak Hussein's developer portfolio, projects, skills and contact information."
      : "معرض أعمال ملك حسين، ومشاريعها ومهاراتها وطرق التواصل معها.";
}

langToggle.addEventListener("click", function () {
  setLanguage(currentLang === "en" ? "ar" : "en");
});

menuToggle.addEventListener("click", function () {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

nav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

window.addEventListener("scroll", function () {
  backToTop.classList.toggle("visible", window.scrollY > 350);
});

backToTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

setLanguage("en");
