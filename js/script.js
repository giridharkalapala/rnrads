/**
 * RNR ADS — PREMIUM JAVASCRIPT
 * Auto Rickshaw Advertising Hyderabad
 * Clean Vanilla JavaScript
 */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /* ============================================================
     1. AUTO UPDATE COPYRIGHT YEAR
  ============================================================ */
  const yearElements = document.querySelectorAll(".current-year, #currentYear, #year");
  const currentYear = new Date().getFullYear();
  yearElements.forEach(function (el) {
    el.textContent = currentYear;
  });

  /* ============================================================
     2. STICKY NAVBAR SCROLL EFFECT
  ============================================================ */
  const navbar = document.querySelector(".main-navbar");
  const backToTopBtn = document.getElementById("backToTop");

  function handleScroll() {
    const scrollPos = window.scrollY || window.pageYOffset;

    // Navbar scrolled state
    if (navbar) {
      if (scrollPos > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    // Back-to-top button visibility
    if (backToTopBtn) {
      if (scrollPos > 300) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // Initial check on load

  /* ============================================================
     2. BACK TO TOP BUTTON CLICK
  ============================================================ */
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* ============================================================
     3. MOBILE NAVBAR COLLAPSE AUTO-CLOSE
  ============================================================ */
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navCollapse = document.getElementById("navbarNav");
  if (navCollapse && window.bootstrap) {
    const bsCollapse = new bootstrap.Collapse(navCollapse, { toggle: false });
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (navCollapse.classList.contains("show")) {
          bsCollapse.hide();
        }
      });
    });
  }

  /* ============================================================
     4. HERO SWIPER SLIDER INITIALIZATION
  ============================================================ */
  const heroSwiperEl = document.querySelector(".hero-swiper");
  if (heroSwiperEl && typeof Swiper !== "undefined") {
    new Swiper(".hero-swiper", {
      loop: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true
      },
      speed: 900,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      navigation: {
        nextEl: ".hero-swiper .swiper-button-next",
        prevEl: ".hero-swiper .swiper-button-prev"
      },
      pagination: {
        el: ".hero-swiper .swiper-pagination",
        clickable: true
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true
      },
      grabCursor: true
    });
  }

  /* ============================================================
     5. CLIENTS LOGO CAROUSEL INITIALIZATION
  ============================================================ */
  const clientsSwiperEl = document.querySelector(".clients-swiper");
  if (clientsSwiperEl && typeof Swiper !== "undefined") {
    new Swiper(".clients-swiper", {
      loop: true,
      slidesPerView: 2,
      spaceBetween: 20,
      speed: 700,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      breakpoints: {
        480: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 24
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 30
        },
        1200: {
          slidesPerView: 6,
          spaceBetween: 30
        }
      }
    });
  }

  /* ============================================================
     6. NUMBER COUNTER ANIMATION (INTERSECTION OBSERVER)
  ============================================================ */
  const countElements = document.querySelectorAll(".counter-value");

  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-target"), 10);
    const suffix = el.getAttribute("data-suffix") || "";
    const prefix = el.getAttribute("data-prefix") || "";
    const duration = 1800; // ms
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const counter = setInterval(function () {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quad
      const current = Math.round(target * (1 - Math.pow(1 - progress, 3)));
      el.innerText = prefix + current.toLocaleString() + suffix;

      if (frame >= totalFrames) {
        clearInterval(counter);
        el.innerText = prefix + target.toLocaleString() + suffix;
      }
    }, frameRate);
  }

  if ("IntersectionObserver" in window && countElements.length > 0) {
    const counterObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    countElements.forEach(function (el) {
      counterObserver.observe(el);
    });
  } else {
    // Fallback if IntersectionObserver not supported
    countElements.forEach(function (el) {
      const target = el.getAttribute("data-target");
      const suffix = el.getAttribute("data-suffix") || "";
      const prefix = el.getAttribute("data-prefix") || "";
      el.innerText = prefix + target + suffix;
    });
  }

  /* ============================================================
     7. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  ============================================================ */
  const animateElements = document.querySelectorAll(
    ".animate-fade-up, .animate-fade-left, .animate-fade-right"
  );

  if ("IntersectionObserver" in window && animateElements.length > 0) {
    const scrollObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    animateElements.forEach(function (el) {
      scrollObserver.observe(el);
    });
  } else {
    animateElements.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ============================================================
     8. CONTACT & QUOTE FORM VALIDATION
  ============================================================ */
  const contactForms = document.querySelectorAll(".rnr-contact-form");

  contactForms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      e.stopPropagation();

      let isValid = true;

      // Inputs
      const nameInput = form.querySelector('[name="name"]');
      const phoneInput = form.querySelector('[name="phone"]');
      const emailInput = form.querySelector('[name="email"]');
      const serviceInput = form.querySelector('[name="service"]');
      const messageInput = form.querySelector('[name="message"]');
      const successBanner = form.querySelector(".form-success-banner");

      // Validate Name
      if (nameInput) {
        if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
          nameInput.classList.add("is-invalid");
          nameInput.classList.remove("is-valid");
          isValid = false;
        } else {
          nameInput.classList.remove("is-invalid");
          nameInput.classList.add("is-valid");
        }
      }

      // Validate Phone (Indian 10-digit format or general phone)
      if (phoneInput) {
        const phoneVal = phoneInput.value.replace(/\s+/g, "");
        const phoneRegex = /^[0-9+\-()]{8,15}$/;
        if (!phoneVal || !phoneRegex.test(phoneVal)) {
          phoneInput.classList.add("is-invalid");
          phoneInput.classList.remove("is-valid");
          isValid = false;
        } else {
          phoneInput.classList.remove("is-invalid");
          phoneInput.classList.add("is-valid");
        }
      }

      // Validate Email
      if (emailInput) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
          emailInput.classList.add("is-invalid");
          emailInput.classList.remove("is-valid");
          isValid = false;
        } else {
          emailInput.classList.remove("is-invalid");
          emailInput.classList.add("is-valid");
        }
      }

      // Validate Service Select
      if (serviceInput) {
        if (!serviceInput.value || serviceInput.value === "") {
          serviceInput.classList.add("is-invalid");
          serviceInput.classList.remove("is-valid");
          isValid = false;
        } else {
          serviceInput.classList.remove("is-invalid");
          serviceInput.classList.add("is-valid");
        }
      }

      // Validate Message
      if (messageInput) {
        if (!messageInput.value.trim() || messageInput.value.trim().length < 5) {
          messageInput.classList.add("is-invalid");
          messageInput.classList.remove("is-valid");
          isValid = false;
        } else {
          messageInput.classList.remove("is-invalid");
          messageInput.classList.add("is-valid");
        }
      }

      // Submit success
      if (isValid) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          const originalText = submitBtn.innerHTML;
          submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Submitting...';

          setTimeout(function () {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            form.reset();

            // Clear validation classes
            form.querySelectorAll(".is-valid, .is-invalid").forEach(function (el) {
              el.classList.remove("is-valid", "is-invalid");
            });

            // Show Success Banner
            if (successBanner) {
              successBanner.style.display = "block";
              successBanner.scrollIntoView({ behavior: "smooth", block: "nearest" });
              setTimeout(function () {
                successBanner.style.display = "none";
              }, 8000);
            }
          }, 1000);
        }
      }
    });

    // Real-time input clearing of error states
    form.querySelectorAll("input, select, textarea").forEach(function (input) {
      input.addEventListener("input", function () {
        if (input.classList.contains("is-invalid")) {
          input.classList.remove("is-invalid");
        }
      });
    });
  });

  /* ============================================================
     9. MODAL QUOTE FORM VALIDATION & SUBMISSION
  ============================================================ */
  const modalForm = document.getElementById("quoteModalForm");
  const modalSuccessBanner = document.getElementById("modalSuccessBanner");

  if (modalForm) {
    modalForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let isValid = true;

      const nameInput = document.getElementById("modalFullName");
      const phoneInput = document.getElementById("modalPhone");
      const emailInput = document.getElementById("modalEmail");
      const serviceInput = document.getElementById("modalService");

      // Validate Name
      if (nameInput) {
        if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
          nameInput.classList.add("is-invalid");
          isValid = false;
        } else {
          nameInput.classList.remove("is-invalid");
        }
      }

      // Validate Phone
      if (phoneInput) {
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        if (!phoneRegex.test(phoneInput.value.trim())) {
          phoneInput.classList.add("is-invalid");
          isValid = false;
        } else {
          phoneInput.classList.remove("is-invalid");
        }
      }

      // Validate Email
      if (emailInput) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
          emailInput.classList.add("is-invalid");
          isValid = false;
        } else {
          emailInput.classList.remove("is-invalid");
        }
      }

      // Validate Service
      if (serviceInput) {
        if (!serviceInput.value) {
          serviceInput.classList.add("is-invalid");
          isValid = false;
        } else {
          serviceInput.classList.remove("is-invalid");
        }
      }

      if (isValid) {
        const submitBtn = modalForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          const origText = submitBtn.innerHTML;
          submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Submitting...';

          setTimeout(function () {
            submitBtn.disabled = false;
            submitBtn.innerHTML = origText;
            modalForm.reset();

            if (modalSuccessBanner) {
              modalSuccessBanner.classList.remove("d-none");
              setTimeout(function () {
                modalSuccessBanner.classList.add("d-none");
                const quoteModalEl = document.getElementById("quoteModal");
                if (quoteModalEl && window.bootstrap) {
                  const modalInstance = bootstrap.Modal.getInstance(quoteModalEl);
                  if (modalInstance) {
                    modalInstance.hide();
                  }
                }
              }, 4000);
            }
          }, 900);
        }
      }
    });

    modalForm.querySelectorAll("input, select, textarea").forEach(function (input) {
      input.addEventListener("input", function () {
        if (input.classList.contains("is-invalid")) {
          input.classList.remove("is-invalid");
        }
      });
    });
  }
});
