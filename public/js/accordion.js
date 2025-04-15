
document.addEventListener("DOMContentLoaded", function () {
  const toggles = document.querySelectorAll(".accordion-toggle");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("active");
      const content = toggle.nextElementSibling;
      content.style.display = content.style.display === "block" ? "none" : "block";
    });
  });
});