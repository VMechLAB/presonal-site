
(function () {
  "use strict";

  var root = document.documentElement;
  var themeBtn = document.getElementById("theme-toggle");
  var themeLabel = themeBtn ? themeBtn.querySelector(".theme-toggle-label") : null;
  var STORAGE_KEY = "vmechlab-theme";

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
      if (themeLabel) themeLabel.textContent = "Dark";
      if (themeBtn) themeBtn.setAttribute("aria-pressed", "true");
      if (themeBtn) themeBtn.setAttribute("aria-label", "Switch to light mode");
    } else {
      root.setAttribute("data-theme", "light");
      if (themeLabel) themeLabel.textContent = "Light";
      if (themeBtn) themeBtn.setAttribute("aria-pressed", "false");
      if (themeBtn) themeBtn.setAttribute("aria-label", "Switch to dark mode");
    }
  }

  var stored = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  applyTheme(stored === "light" ? "light" : "dark");

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var current = root.getAttribute("data-theme");
      var next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
    });
  }

  var navToggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("main-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var filterButtons = document.querySelectorAll(".filter-btn");
  var projectCards = document.querySelectorAll(".project-card");
  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var filter = btn.getAttribute("data-filter");
      projectCards.forEach(function (card) {
        var tags = card.getAttribute("data-tags") || "";
        var show = filter === "all" || tags.indexOf(filter) !== -1;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  var repositories = [
    {
      name: "VMechLAB_Robotic_Arm_Simulation",
      description: "Kinematics and motion-planning simulator with 3D visualization.",
      language: "Python",
      url: "https://github.com/vmechlab"
    },
    {
      name: "Mudrac",
      description: "Local voice-assistant experiment: automation + local LLMs + speech.",
      language: "Python",
      url: "https://github.com/vmechlab"
    },
    {
      name: "TerOS",
      description: "Nature-inspired web OS experiment, in early development.",
      language: "JavaScript",
      url: "https://github.com/vmechlab"
    }
  ];

  var repoList = document.getElementById("repo-list");
  if (repoList) {
    repositories.forEach(function (repo) {
      var li = document.createElement("li");
      var link = document.createElement("a");
      link.href = repo.url;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = repo.name;
      var lang = document.createElement("span");
      lang.className = "repo-lang";
      lang.textContent = repo.language;
      var desc = document.createElement("p");
      desc.style.margin = "6px 0 0";
      desc.style.color = "var(--fg-muted)";
      desc.textContent = repo.description;
      li.appendChild(link);
      li.appendChild(lang);
      li.appendChild(desc);
      repoList.appendChild(li);
    });
  }

  var yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealTargets = document.querySelectorAll(".section h2, .project-card, .philosophy-item, .learning-block, .pin-note");
  if (!prefersReduced && "IntersectionObserver" in window) {
    revealTargets.forEach(function (el) { el.classList.add("reveal"); });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealTargets.forEach(function (el) { observer.observe(el); });
  }
})();
