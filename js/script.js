document.addEventListener("DOMContentLoaded", () => {
  /* ------- Year ------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ------- Mobile Nav ------- */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const navAnchors = navLinks.querySelectorAll("a");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
    const isOpen = navLinks.classList.contains("open");
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  navAnchors.forEach((a) => {
    a.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  /* ------- Active nav link on scroll ------- */
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links a");

  function setActiveSection() {
    let current = "";
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navItems.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  }
  window.addEventListener("scroll", setActiveSection);

  /* ------- Navbar background on scroll ------- */
  const navbar = document.getElementById("navbar");
  navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";

  /* ------- Typed effect ------- */
  const roles = [
    "Civil Engineer",
    "Construction Engineer",
    "Instructor (CTEVT)",
    "Total Station Surveyor",
    "Site Supervisor",
  ];
  const typedEl = document.getElementById("typed");
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const role = roles[roleIndex];
    if (!deleting) {
      typedEl.textContent = role.slice(0, ++charIndex);
      if (charIndex === role.length) {
        deleting = true;
        return setTimeout(type, 1800);
      }
    } else {
      typedEl.textContent = role.slice(0, --charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(type, deleting ? 45 : 85);
  }
  type();

  /* ------- Scroll reveal ------- */
  const revealEls = document.querySelectorAll(
    ".about-box, .timeline-item, .card, .skill-cat, .competency-list, .lang-grid, .contact-info, .contact-form"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });

  /* ------- Language bars ------- */
  const langObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          langObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  document.querySelectorAll(".lang-bar").forEach((bar) => {
    bar.style.setProperty("--width", bar.getAttribute("data-width"));
    langObserver.observe(bar);
  });

  /* ------- Contact form (Formspree) ------- */
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const submitBtn = contactForm.querySelector("button");

  function setStatus(msg, type) {
    formStatus.textContent = msg;
    formStatus.className = "form-status " + (type || "");
  }

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    setStatus("Sending your message...", "info");

    try {
      const res = await fetch(contactForm.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(contactForm),
      });

      if (res.ok) {
        setStatus("✓ Message sent successfully! I'll get back to you soon.", "success");
        contactForm.reset();
      } else {
        setStatus("Something went wrong. Please try again.", "error");
      }
    } catch (err) {
      setStatus("Network error. Please check your connection and try again.", "error");
    } finally {
      submitBtn.disabled = false;
      setTimeout(() => setStatus("", ""), 6000);
    }
  });
});