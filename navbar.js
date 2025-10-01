const header = document.getElementById("siteHeader");

function updateHeader() {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
    header.classList.remove("transparent");
  } else {
    header.classList.add("transparent");
    header.classList.remove("scrolled");
  }
}

// Run on load + scroll
updateHeader();
window.addEventListener("scroll", updateHeader);
