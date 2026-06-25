/* Lokesh S. — Portfolio (vanilla JS) */
(function () {
  // Live IST clock
  function updateTime() {
    var el = document.getElementById("ls-time");
    if (!el) return;
    var now = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
    var h = String(now.getHours()).padStart(2, "0");
    var m = String(now.getMinutes()).padStart(2, "0");
    el.textContent = h + ":" + m + " IST";
  }
  updateTime();
  setInterval(updateTime, 30000);

  // Footer year
  var yearEl = document.getElementById("ls-year");
  if (yearEl) {
    yearEl.textContent = "© " + new Date().getFullYear() + " Lokesh S.";
  }

  // Scroll-spy active nav state
  var ids = ["home", "about", "work", "contact"];
  var links = {};
  ids.forEach(function (id) {
    links[id] = document.querySelector('[data-nav="' + id + '"]');
  });
  var sections = ids
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            var id = e.target.id;
            ids.forEach(function (n) {
              if (links[n]) links[n].classList.toggle("is-active", n === id);
            });
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { observer.observe(s); });
  }

  // Copy email
  var copyBtn = document.getElementById("ls-copy");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var email = "lokeshsdev11@gmail.com";
      var done = function () {
        var original = "Copy email";
        copyBtn.textContent = "Copied ✓";
        setTimeout(function () { copyBtn.textContent = original; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done, function () {
          fallbackCopy(email); done();
        });
      } else {
        fallbackCopy(email); done();
      }
    });
  }

  function fallbackCopy(text) {
    try {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    } catch (e) { /* no-op */ }
  }
})();
