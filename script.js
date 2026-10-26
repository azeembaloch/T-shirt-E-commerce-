
const burger = document.getElementById("burger");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");

function showPage(pageId) {
  let selectedPage = document.getElementById(pageId);

  if (!selectedPage || !selectedPage.classList.contains("page")) {
    pageId = "home";
    selectedPage = document.getElementById("home");
  }

  // Sirf selected page show hoga
  for (let i = 0; i < pages.length; i++) {
    pages[i].classList.remove("active");
  }

  selectedPage.classList.add("active");

  // Navigation ka active link
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].classList.remove("active");

    if (navLinks[i].getAttribute("href") === "#" + pageId) {
      navLinks[i].classList.add("active");
    }
  }

  // Mobile menu band karo
  navbar.classList.remove("open");
  burger.classList.remove("open");
  burger.setAttribute("aria-expanded", "false");

  // Har page top se khulega
  window.scrollTo({
    top: 0,
    behavior: "auto"
  });
}

// Navigation links
for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function(event) {
    event.preventDefault();

    const pageId = navLinks[i].getAttribute("href").slice(1);

    showPage(pageId);
    history.replaceState(null, "", "#" + pageId);
  });
}

// Burger menu
burger.setAttribute("aria-expanded", "false");

burger.addEventListener("click", function() {
  const isOpen = navbar.classList.toggle("open");

  burger.classList.toggle("open", isOpen);
  burger.setAttribute("aria-expanded", String(isOpen));
});

// Home ke Explore Shirts button se Shirt page khulega
const exploreButtons = document.querySelectorAll(".hero .gold-button");

for (let i = 0; i < exploreButtons.length; i++) {
  exploreButtons[i].addEventListener("click", function(event) {
    event.preventDefault();

    showPage("shirt");
    history.replaceState(null, "", "#shirt");
  });
}

// URL hash ke mutabiq initial page
const startingPage = window.location.hash.slice(1);

if (["home", "about", "shirt", "contact"].includes(startingPage)) {
  showPage(startingPage);
} else {
  showPage("home");
}

// Agar shirt ki image load na ho
const shirtImages = document.querySelectorAll(".shirt-card img");

for (let i = 0; i < shirtImages.length; i++) {
  shirtImages[i].addEventListener("error", function() {
    shirtImages[i].style.display = "none";
    shirtImages[i].parentElement.style.background =
      "linear-gradient(135deg, #e8e1d3, #b8ad9a)";
  });
}
