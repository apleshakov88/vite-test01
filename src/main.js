import jQuery from "jquery";
import skrollr from "skrollr";
window.jQuery = window.$ = jQuery;

document.addEventListener("DOMContentLoaded", () => {
  initGlitchAnimation();
  initPageLoadedClass();
  initSkrollr();
  initClassOnScroll();
});

function initGlitchAnimation() {
  const items = jQuery(".js-glitch-animation");
  const animClass = "js-animation-active";

  setInterval(() => {
    items.addClass(animClass);
    setTimeout(() => items.removeClass(animClass), 600);
  }, 10000);
}

function initPageLoadedClass() {
  const className = "page-loaded";
  document.body.classList.add(className);
}

function initSkrollr() {
  const isTouch = matchMedia("(hover: none)").matches;
  if (isTouch) return;

  skrollr.init();
}

function initClassOnScroll() {
  const viteItems = jQuery(".vite-item");
  initViewportClass(viteItems);
}

function initViewportClass(items, options) {
  const settings = {
    once: false,
    className: "js-visible",
    ...(options || {}),
  };
  const items$ = jQuery(items);
  const win = jQuery(window);

  function handleVisibility(items) {
    const wBottom = win.scrollTop() + win.innerHeight();

    items.each(function () {
      const item = jQuery(this);
      if (item.offset().top + 50 < wBottom) {
        item.addClass(settings.className);
      } else {
        item.removeClass(settings.className);
      }
    });
  }

  handleVisibility(items$);
  win.on("scroll resize", () => handleVisibility(items$));
}
