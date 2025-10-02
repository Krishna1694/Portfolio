// Hamburger menu
const menuBtn = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Lazy scroll reveal for sections
document.addEventListener("DOMContentLoaded", () => {
  const aboutContainers = document.querySelectorAll(".about-container");
  const aboutImages = document.querySelectorAll(".about-image img");
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  // Track global mouse position
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Lazy reveal function
  function handleScrollReveal() {
    const windowHeight = window.innerHeight;

    aboutContainers.forEach(container => {
      const rect = container.getBoundingClientRect();
      if (rect.top <= windowHeight * 0.85) {
        container.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", handleScrollReveal);
  handleScrollReveal(); // trigger on load

  // Tilt animation function
  function animateAboutTilt() {
    aboutImages.forEach(img => {
      const container = img.closest(".about-container");
      const rect = container.getBoundingClientRect();

      // Only tilt if container is visible
      if (container.classList.contains("visible")) {
        // Check if mouse is inside container bounds
        if (
          mouseX >= rect.left && mouseX <= rect.right &&
          mouseY >= rect.top && mouseY <= rect.bottom
        ) {
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const rotateX = ((mouseY - centerY) / rect.height) * 20; // max tilt
          const rotateY = ((mouseX - centerX) / rect.width) * 30;

          img.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
        } else {
          // Slight default tilt toward center of container
          img.style.transform = `rotateX(0deg) rotateY(0deg)`;
        }
      }
    });

    requestAnimationFrame(animateAboutTilt);
  }

  animateAboutTilt();
});


// thumbs-glitch.js (integrate into animations.js)
function showThumbAndGlitch(targetEl, options = {}) {
  const {
    emoji = "👍",
    label = "Nice!",
    sound = true,
    glitch = true
  } = options;

  const rect = targetEl.getBoundingClientRect();

  // --- THUMBS-UP STICKER ---
  const sticker = document.createElement("div");
  sticker.className = "thumb-sticker";
  sticker.innerHTML = `<span class="thumb-emoji">${emoji}</span>`;
  if (label) {
    const lbl = document.createElement("span");
    lbl.className = "thumb-label";
    lbl.textContent = label;
    sticker.appendChild(lbl);
  }

  const left = rect.left + rect.width / 2 - 28 + window.scrollX;
  const top = rect.top - 10 + window.scrollY;
  sticker.style.left = `${left}px`;
  sticker.style.top  = `${top}px`;

  document.body.appendChild(sticker);

  // Remove sticker after animation ends
  sticker.addEventListener("animationend", () => {
    if (sticker.parentNode) sticker.parentNode.removeChild(sticker);
  }, { once: true });

  // --- GLITCH STAMP ---
    if (glitch) {
    const stamp = document.createElement("div");
    stamp.className = "glitch-stamp";
    stamp.textContent = "SAVED!!"; 
    const stampLeft = rect.left + rect.width/2 - -100 + window.scrollX;
    const stampTop = rect.top - -10 + window.scrollY;
    stamp.style.left = `${stampLeft}px`;
    stamp.style.top = `${stampTop}px`;
    document.body.appendChild(stamp);

    stamp.addEventListener("animationend", () => {
        if (stamp.parentNode) stamp.parentNode.removeChild(stamp);
    }, { once: true });
    }


  // --- Optional sound feedback ---
  if (sound && window.AudioContext) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(880, ctx.currentTime);
      g.gain.setValueAtTime(0.001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.20);
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.22);
    } catch (e) {}
  }
}

// Attach to download buttons
document.addEventListener("DOMContentLoaded", () => {
  const downloadButtons = document.querySelectorAll(".btn.primary[download]");
  downloadButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      showThumbAndGlitch(btn, { emoji: "👍", label: "Nice!", sound: true, glitch: true });
    });
  });
});


// Project Section 
document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card");

  function handleProjectReveal() {
    const windowHeight = window.innerHeight;
    projectCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top <= windowHeight * 0.85) {
        card.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", handleProjectReveal);
  handleProjectReveal(); 
});

// Contact Section
document.addEventListener("DOMContentLoaded", () => {
  const contactCards = document.querySelectorAll(".contact-item");

  // Lazy reveal on scroll
  function handleContactReveal() {
    const windowHeight = window.innerHeight;
    contactCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top <= windowHeight * 0.85) {
        card.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", handleContactReveal);
  handleContactReveal(); // trigger on load

  // Click to copy with glitch effect
  contactCards.forEach(card => {
    let busy = false; // prevent spam

    card.addEventListener("click", async () => {
      if (busy) return;
      busy = true;

      const info = card.dataset.copy;
      const infoParagraph = card.querySelector(".contact-info p");
      if (!info || !infoParagraph) return;

      try {
        await navigator.clipboard.writeText(info);
      } catch (err) {
        console.error("Clipboard copy failed", err);
      }

      const originalText = infoParagraph.textContent;
      infoParagraph.textContent = "Copied!";
      infoParagraph.style.animation = "glitch-copy 0.6s ease";

      setTimeout(() => {
        infoParagraph.textContent = originalText;
        infoParagraph.style.animation = "";
        busy = false;
      }, 1200);
    });
  });
});
