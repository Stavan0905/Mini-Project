document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  //  Load saved theme
  if (localStorage.getItem("theme") === "light") {
    body.classList.add("light-mode");
    themeToggle.textContent = "🌙";
  } else {
    themeToggle.textContent = "☀️";
  }

  // Toggle theme
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    const isLight = body.classList.contains("light-mode");
    themeToggle.textContent = isLight ? "🌙" : "☀️";
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
});
