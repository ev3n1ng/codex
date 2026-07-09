(function () {
  document.documentElement.classList.add("js-enabled");

  var internalSections = new Set(["#top", "#work", "#about", "#contact"]);

  function scrollToHash(hash, replace) {
    if (!internalSections.has(hash)) return false;
    var target = document.querySelector(hash);
    if (!target) return false;

    if (replace) {
      history.replaceState(null, "", hash);
    } else if (location.hash !== hash) {
      history.pushState(null, "", hash);
    }

    requestAnimationFrame(function () {
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start"
      });
    });

    return true;
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest && event.target.closest("a[href^='#']");
    if (!link) return;
    var hash = link.getAttribute("href");
    if (!internalSections.has(hash)) return;
    event.preventDefault();
    scrollToHash(hash, false);
  });

  window.addEventListener("load", function () {
    if (location.hash) {
      scrollToHash(location.hash, true);
    }
  });
})();
