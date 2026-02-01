// ===== Contact Button =====
document.getElementById("contactBtn").addEventListener("click", () => {
  window.location.href = "mailto:yourname@example.com";
});

// ===== Dark / Light Mode =====
document.getElementById("modeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// ===== Back to Top + Sticky Header =====
const backTop = document.getElementById("backTop");
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  backTop.style.display = window.scrollY > 300 ? "block" : "none";
  header.classList.toggle("scrolled", window.scrollY > 50);
});

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
