/* Negentropic Solutions — progressive enhancement only. Site is fully usable without it. */
(function () {
  "use strict";

  /* ---- dropdown: click/tap toggle. Hover and keyboard focus already work via CSS;
         this adds click/tap open-close (needed on touch, where there is no hover). ---- */
  var dropdowns = document.querySelectorAll(".dropdown");
  if (dropdowns.length) {
    var closeAll = function (except) {
      dropdowns.forEach(function (dd) {
        if (dd === except) return;
        dd.classList.remove("open");
        var t = dd.querySelector(".dd-toggle");
        if (t) t.setAttribute("aria-expanded", "false");
      });
    };
    dropdowns.forEach(function (dd) {
      var toggle = dd.querySelector(".dd-toggle");
      if (!toggle) return;
      toggle.addEventListener("click", function (e) {
        e.preventDefault();
        var open = dd.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        if (open) closeAll(dd);
      });
    });
    document.addEventListener("click", function (e) {
      dropdowns.forEach(function (dd) {
        if (!dd.contains(e.target)) {
          dd.classList.remove("open");
          var t = dd.querySelector(".dd-toggle");
          if (t) t.setAttribute("aria-expanded", "false");
        }
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" || e.keyCode === 27) closeAll(null);
    });
  }

  /* ---- scroll reveal (skipped for reduced-motion or when IntersectionObserver is absent) ---- */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;

  var targets = document.querySelectorAll(
    "main > section, main > .case, section.cta, footer"
  );
  if (!targets.length) return;

  targets.forEach(function (el) { el.classList.add("reveal"); });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

  targets.forEach(function (el) { io.observe(el); });
})();
