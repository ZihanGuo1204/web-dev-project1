function getSavedTheme() {
  return localStorage.getItem("theme");
}

function setTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

function updateButtonText(button) {
  const currentTheme = document.body.getAttribute("data-theme") || "light";
  button.textContent = currentTheme === "dark" ? "Light mode" : "Dark mode";
}

function setupThemeToggle() {
  const button = document.getElementById("themeToggle");
  if (!button) return;

  const saved = getSavedTheme();
  if (saved === "dark") {
    setTheme("dark");
  } else {
    setTheme("light");
  }

  updateButtonText(button);

  button.addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    updateButtonText(button);
  });
}

setupThemeToggle();

function setupProjectDetails() {
  const buttons = document.querySelectorAll(".project__btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".project");
      const details = card.querySelector(".project__details");

      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));

      if (expanded) {
        details.hidden = true;
        btn.textContent = "Show details";
      } else {
        details.hidden = false;
        btn.textContent = "Hide details";
      }
    });
  });
}

setupProjectDetails();

function setupImageLightbox() {
  const imgs = document.querySelectorAll(".lightbox-img");
  if (imgs.length === 0) return;

  // Create overlay once
  const overlay = document.createElement("div");
  overlay.id = "lightboxOverlay";

  // Hard-set styles to avoid CSS conflicts/caching issues
  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",
    background: "rgba(0,0,0,0.75)",
    display: "none",
    alignItems: "center",
    justifyContent: "center",
    padding: "18px",
    zIndex: "99999",
  });

  const content = document.createElement("div");
  Object.assign(content.style, {
    position: "relative",
    width: "min(1100px, 96vw)",
    maxHeight: "90vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  const bigImg = document.createElement("img");
  Object.assign(bigImg.style, {
    width: "100%",
    maxHeight: "90vh",
    objectFit: "contain",
    borderRadius: "14px",
    background: "white",
  });

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.textContent = "✕";
  closeBtn.setAttribute("aria-label", "Close preview");

  Object.assign(closeBtn.style, {
    position: "absolute",
    top: "-12px",
    right: "-12px",
    width: "36px",
    height: "36px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.25)",
    background: "rgba(20,20,20,0.85)",
    color: "white",
    cursor: "pointer",
  });

  content.appendChild(bigImg);
  content.appendChild(closeBtn);
  overlay.appendChild(content);
  document.body.appendChild(overlay);

  function openLightbox(src, alt) {
    bigImg.src = src;
    bigImg.alt = alt || "Preview image";
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    overlay.style.display = "none";
    bigImg.src = "";
    document.body.style.overflow = "";
  }

  // Click image -> open
  imgs.forEach((img) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => openLightbox(img.src, img.alt));
  });

  // Click outside content -> close
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeLightbox();
  });

  // Close button
  closeBtn.addEventListener("click", closeLightbox);

  // ESC to close
  document.addEventListener("keydown", (e) => {
    if (overlay.style.display === "flex" && e.key === "Escape") {
      closeLightbox();
    }
  });
}

setupImageLightbox();
