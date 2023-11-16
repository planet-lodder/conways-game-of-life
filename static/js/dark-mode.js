tailwind.config = {
  darkMode: "class",
};

var get = (id) => document.getElementById(id);
var stored = (k) => localStorage.getItem(k);
var stores = (k, v) => localStorage.setItem(k, v);
var target = document.body;
var themeToggleDarkIcon = get("theme-toggle-dark-icon");
var themeToggleLightIcon = get("theme-toggle-light-icon");

// Change the icons inside the button based on previous settings
var hasLocal = "color-theme" in localStorage;
var localValue = hasLocal && stored("color-theme");
var mediaDark = "(prefers-color-scheme: dark)";
var isDark =
  (hasLocal && localValue === "dark") ||
  (!hasLocal && window.matchMedia(mediaDark).matches);
if (isDark) {
  themeToggleLightIcon.classList.remove("hidden");
  target.classList.add("dark");
} else {
  themeToggleDarkIcon.classList.remove("hidden");
  target.classList.remove("dark");
}

var themeToggleBtn = get("theme-toggle");
themeToggleBtn.addEventListener("click", function () {
  // toggle icons inside button
  themeToggleDarkIcon.classList.toggle("hidden");
  themeToggleLightIcon.classList.toggle("hidden");

  // if set via local storage previously
  var value = stored("color-theme");
  if (value == "light" || !target.classList.contains("dark")) {
    target.classList.add("dark");
    stores("color-theme", "dark");
  } else {
    target.classList.remove("dark");
    stores("color-theme", "light");
  }
});
