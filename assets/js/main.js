/* Amivra Ark / MariAma — shared site behavior (no build step, no dependencies) */
(function () {
  "use strict";

  /* ---- Mobile navigation ---- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");

  if (toggle && nav) {
    var closeNav = function () {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      document.body.style.overflow = "";
    };

    var openNav = function () {
      toggle.setAttribute("aria-expanded", "true");
      nav.classList.add("is-open");
      document.body.style.overflow = "hidden";
    };

    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      if (isOpen) { closeNav(); } else { openNav(); }
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeNav(); }
    });

    var mq = window.matchMedia("(min-width: 900px)");
    mq.addEventListener("change", function (e) {
      if (e.matches) { closeNav(); }
    });
  }

  /* ---- Gentle reveal-on-scroll (skipped if reduced motion is preferred) ---- */
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll("[data-reveal]");

  if (!prefersReducedMotion && "IntersectionObserver" in window && revealEls.length) {
    revealEls.forEach(function (el) { el.classList.add("reveal"); });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal--visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) { observer.observe(el); });
  }
})();
