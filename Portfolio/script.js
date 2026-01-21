document.getElementById("contactBtn").addEventListener("click", function() {
  window.location.href = "mailto:yourname@example.com";
});

document.getElementById("modeToggle").addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");
});