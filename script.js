// Cpntact Button
document.getElementById("contactBtn").addEventListener("click", function() {
  window.location.href = "mailto:yourname@example.com";
});
//Dark/Light Mode Toggle
document.getElementById("modeToggle").addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");
});

// Back to top button
const backTop = document.getElementById("backTop");
window.addEventListener("scroll", function() {
  // Show button after scrolling 300px
  backTop.style.display = window.scrollY > 300 ? "block" : "none";

  // Add shadow to header after scrolling
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

backTop.addEventListener("click", function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});