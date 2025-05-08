function openLightbox(el) {
    const src = el.querySelector("img").src;
    document.getElementById("lightbox-img").src = src;
    document.getElementById("lightbox").classList.remove("hidden");
  }

  function closeLightbox() {
    document.getElementById("lightbox").classList.add("hidden");
  }

  // Optional: close with ESC
  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") closeLightbox();
  });