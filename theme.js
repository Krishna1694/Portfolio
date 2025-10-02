const toggleBtn = document.getElementById("themeToggle");

// Default to dark unless "light" is saved
if (localStorage.getItem("theme") === "light") {
  document.body.classList.remove("dark");
  toggleBtn.textContent = "🌙";
} else {
  document.body.classList.add("dark");
  toggleBtn.textContent = "☀️";
  localStorage.setItem("theme", "dark");
}

// Toggle on click
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const darkMode = document.body.classList.contains("dark");
  toggleBtn.textContent = darkMode ? "☀️" : "🌙";
  localStorage.setItem("theme", darkMode ? "dark" : "light");
});
