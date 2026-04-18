// ============================================
// FREZOOL INDUSTRIES — Main JavaScript
// No SPA routing. Each page is a real HTML file.
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  initRevealAnimations();
  initCounters();
  initNavScroll();
  setActiveNavLink();
  document.getElementById("currentYear").textContent = new Date().getFullYear();
});

// ---- Active Nav Link Highlight ----
function setActiveNavLink() {
  const currentPage = document.body.getAttribute("data-page");
  if (!currentPage) return;
  const navLinks = document.querySelectorAll(".nav-link[data-nav]");
  navLinks.forEach((link) => {
    if (link.getAttribute("data-nav") === currentPage) {
      link.classList.add("active-link");
    }
  });
}

// ---- Nav Scroll Effect ----
function initNavScroll() {
  const nav = document.getElementById("mainNav");
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      nav.classList.add("nav-scrolled");
      const icon = nav.querySelector(".nav-icon-color");
      if (icon) {
        icon.classList.remove("text-white");
        icon.classList.add("text-navy-700");
      }
    } else {
      nav.classList.remove("nav-scrolled");
      const icon = nav.querySelector(".nav-icon-color");
      if (icon) {
        icon.classList.add("text-white");
        icon.classList.remove("text-navy-700");
      }
    }

    // Back to top button
    const btn = document.getElementById("backToTop");
    if (scrollY > 600) {
      btn.classList.remove("opacity-0", "translate-y-4", "pointer-events-none");
      btn.classList.add("opacity-100", "translate-y-0");
    } else {
      btn.classList.add("opacity-0", "translate-y-4", "pointer-events-none");
      btn.classList.remove("opacity-100", "translate-y-0");
    }
  });
  // Trigger once on load
  window.dispatchEvent(new Event("scroll"));
}
// Handle page load when already scrolled
if (window.scrollY > 50) {
  nav.classList.add("nav-scrolled");
}

// ---- Reveal on Scroll ----
function initRevealAnimations() {
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );
  reveals.forEach((el) => {
    el.classList.remove("visible");
    observer.observe(el);
  });
}

// ---- Stat Counters ----
function initCounters() {
  const counters = document.querySelectorAll(".stat-counter");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute("data-target"));
          if (el.dataset.counted) return;
          el.dataset.counted = "true";
          let current = 0;
          const increment = target / 40;
          const suffix = el.parentElement
            .querySelector("p")
            ?.textContent.includes("%")
            ? "%"
            : "+";
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = Math.floor(current) + suffix;
          }, 40);
        }
      });
    },
    { threshold: 0.5 },
  );
  counters.forEach((c) => observer.observe(c));
}

// ---- Mobile Menu ----
function toggleMobileMenu() {
  document.getElementById("mobileMenu").classList.toggle("open");
  document.getElementById("mobileOverlay").classList.toggle("open");
  document.body.classList.toggle("overflow-hidden");
}

// ---- Contact Form ----
function handleContactForm(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const originalHTML = btn.innerHTML;
  btn.innerHTML =
    '<svg class="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" class="opacity-25"></circle><path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" class="opacity-75"></path></svg> Sending...';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.disabled = false;
    form.reset();
    showToast(
      "Thank you! Your inquiry has been submitted successfully. We will get back to you soon.",
      "success",
    );
  }, 1500);
}

// ---- Toast ----
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "toast toast-" + type + " show";
  setTimeout(() => {
    toast.classList.remove("show");
  }, 5000);
}

// ---- Close Dropdown on Outside Click ----
document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown")) {
    document.querySelectorAll(".dropdown-menu").forEach((m) => {
      m.style.opacity = "0";
      m.style.visibility = "hidden";
      m.style.transform = "translateY(8px)";
    });
  }
});
