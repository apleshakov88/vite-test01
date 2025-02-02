// TODO: Structure https://github.com/rahxd1/simple-vite-template-vanilla/tree/main/src
import jQuery from "jquery";
import skrollr from "skrollr";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
window.jQuery = window.$ = jQuery;

document.addEventListener("DOMContentLoaded", () => {
  initGlitchAnimation();
  initPageLoadedClass();
  initClassOnScroll();
  initSwiper();
//   initSkrollr();
});

function initSwiper() {
  const swiper = new Swiper(".swiper-js", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
    slidesPerView: "auto",
    slidesPerView: 1,
    spaceBetween: 0,
    watchSlidesProgress: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      800: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });
}

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
  skrollr.init({
    forceHeight: false,
  });
}

function initClassOnScroll() {
  const viteItems = jQuery(".js-item-onscroll");
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
