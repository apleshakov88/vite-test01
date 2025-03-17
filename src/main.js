// TODO: Structure https://github.com/rahxd1/simple-vite-template-vanilla/tree/main/src
import jQuery from "jquery";
import skrollr from "skrollr";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
window.jQuery = window.$ = jQuery;

initCommon();
initComingSoon();
initHomePage();
initProductPage();
initAboutPage();

function initCommon() {
  initBodyTouchClass();

  jQuery(function () {
    // initCartImage();
    initPageLoadedClass();
    initClassOnScroll();
    initMenu();
  });
}

function initHomePage() {
  jQuery(function () {
    initSkrollr();
    initSwiper();
    initVideoOnScroll();
  });
}

function initProductPage() {
  jQuery(function () {
    initProductTabs();
    initProductSwiper();
    initProductFancybox();
  });
}

function initComingSoon() {
  jQuery(function () {
    initGlitchAnimation();
  });
}

function initAboutPage() {
  jQuery(function () {
    initAboutVideoOnScroll();
  });
}

function initAboutVideoOnScroll() {
  const observer = new IntersectionObserver(function (entries) {
    const target = entries[0].target;
    if (!entries[0].isIntersecting) {
      target && target.pause && target.pause();
    } else {
      target && target.play && target.play();
    }
  });

  jQuery(".about-section video").each(function () {
    observer.observe(this);
  });
}

function initVideoOnScroll() {
  const observer = new IntersectionObserver(function (entries) {
    const target = entries[0].target;
    if (!entries[0].isIntersecting) {
      target && target.pause && target.pause();
    } else {
      target && target.play && target.play();
    }
  });

  jQuery(".visual video").each(function () {
    observer.observe(this);
  });
}

function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

function initBodyTouchClass() {
  document.documentElement.classList.add(
    isTouchDevice() ? "js-touch-device" : "js-desktop-device",
  );
}

function initSwiper() {
  const swiper = new Swiper(".category-section__container .swiper-js", {
    autoHeight: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpointsBase: "container",
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
        slidesPerView: 4,
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
  if (isTouchDevice()) return;

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
  win.on("scroll resize orientationchange", () => handleVisibility(items$));
}

function initProductTabs() {
  const activeLinkClass = "visual_link-active";
  const activeTabClass = "js-tab-active";

  jQuery(".product-tabs.js-tabs").each(function () {
    const wrapper = jQuery(this);
    const tabsetLinks = wrapper.find(".tabset a");
    const tabs = wrapper.find(".tab-container > div.tab-item");

    tabsetLinks.on("click", (e) => {
      e.preventDefault();
      const link = jQuery(e.currentTarget);
      const tab = jQuery(link.attr("href"));

      link.toggleClass(activeLinkClass);
      tab.toggleClass(activeTabClass);

      tabsetLinks.not(link).removeClass(activeLinkClass);
      tabs.not(tab).removeClass(activeTabClass);
    });
  });
}

function initProductSwiper() {
  let swiperInstance;
  const breakpoint = window.matchMedia("(max-width:1024px)");

  breakpoint.addEventListener("change", mediaChange);
  mediaChange(breakpoint);

  function mediaChange(e) {
    e.matches ? init() : destroy();
  }

  function init() {
    if (swiperInstance) return;
    swiperInstance = new Swiper(".product-visual .swiper", {
      autoHeight: true,
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
    });
  }
  function destroy() {
    if (swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;
    }
  }
}

function initProductFancybox() {
  Fancybox.bind("[data-fancybox]", {});
}

function initMenu() {
  const activeClass = "js-collection-active";
  const openerActiveClass = "visual_link-active";
  const container = jQuery("body");

  jQuery(".item-collection > a").each(function () {
    const opener = jQuery(this);
    const holder = opener.closest(".item-collection");
    const anchorLinks = holder.find(".collection-menu a");
    let isOpen = false;

    opener.on("click", (e) => {
      e.preventDefault();
      toggleMenu();
    });

    anchorLinks.on("click", (e) => {
      hideMenu();
    });

    container.on("click", (e) => {
      const target = jQuery(e.target);
      const isClickOutside = !target.closest(holder).length;
      if (isClickOutside) {
        hideMenu();
      }
    });

    function showMenu() {
      isOpen = true;
      container.addClass(activeClass);
      opener.addClass(openerActiveClass);
    }

    function hideMenu() {
      isOpen = false;
      container.removeClass(activeClass);
      opener.removeClass(openerActiveClass);
    }

    function toggleMenu() {
      isOpen ? hideMenu() : showMenu();
    }
  });
}

function initCartImage() {
  const imagesSet = [
    {
      url: "https://www.bold-type.store/wp-content/themes/vite/assets/images/dog-cart-01.gif",
    },
    {
      url: "https://www.bold-type.store/wp-content/themes/vite/assets/images/dog-cart-02.gif",
    },
    {
      url: "https://www.bold-type.store/wp-content/themes/vite/assets/images/dog-cart-03.jpg",
    },
    {
      url: "https://www.bold-type.store/wp-content/themes/vite/assets/images/dog-cart-04.gif",
    },
    {
      url: "https://www.bold-type.store/wp-content/themes/vite/assets/images/dog-03-transparent.gif",
    },
  ];

  jQuery(
    ".woocommerce-cart .wp-block-woocommerce-empty-cart-block .wc-block-cart__empty-cart__title",
  )
    .each(function () {
      const randomImage = imagesSet[getRandomInt(0, imagesSet.length - 1)];
      jQuery('<div class="empty-card-image"></div>')
        .html(`<img class="js-empty-cart-image" src="${randomImage.url}" />`)
        .prependTo(this);
    })
    .addClass("js-empty-cart-inited");
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initRandomDog() {
  //   const imagesSet = [
  //     {
  //       url: "https://www.bold-type.store/wp-content/themes/vite/assets/images/dog-02.gif",
  //     },
  //     {
  //       url: "https://www.bold-type.store/wp-content/themes/vite/assets/images/dog-03.gif",
  //     },
  //     {
  //       url: "https://www.bold-type.store/wp-content/themes/vite/assets/images/dog-04.gif",
  //     },
  //     {
  //       url: "https://www.bold-type.store/wp-content/themes/vite/assets/images/dog-05.gif",
  //     },
  //     {
  //       url: "https://www.bold-type.store/wp-content/themes/vite/assets/images/dog-06.gif",
  //     },
  //     {
  //       url: "https://www.bold-type.store/wp-content/themes/vite/assets/images/dog-07.gif",
  //     },
  //     {
  //       url: "https://www.bold-type.store/wp-content/themes/vite/assets/images/dog-08.gif",
  //     },
  //     {
  //       url: "https://www.bold-type.store/wp-content/themes/vite/assets/images/dog-09.gif",
  //     },
  //     {
  //       url: "https://www.bold-type.store/wp-content/themes/vite/assets/images/dog-10.gif",
  //     },
  //     {
  //       url: "https://www.bold-type.store/wp-content/themes/vite/assets/images/dog-11.gif",
  //     },
  //     {
  //       url: "https://www.bold-type.store/wp-content/themes/vite/assets/images/dog-12.gif",
  //     },
  //   ];

  const imagesSet = [
    {
      url: "/vite-test01/dist/public/images/img-05.jpg",
      class: "img-01",
      start: {
        cssStyles: () => ({
          left: "-100%",
          top: getRandomInt(0, 80) + "%",
        }),
        animStyles: () => ({
          left: "200px",
        }),
        animOptions: { duration: 300, delay: 2000 },
      },
      end: {
        animStyles: () => ({
          left: "-100%",
          opacity: 0,
        }),
        animOptions: { duration: 2500 },
      },
    },
    {
      url: "/vite-test01/dist/public/images/img-05.jpg",
      class: "img-02",
      start: {
        cssStyles: () => ({
          top: "100%",
          marginTop: "100px",
          left: getRandomInt(0, 80) + "%",
        }),
        animStyles: () => ({
          top: "100%",
          marginTop: "-100px",
        }),
        animOptions: { duration: 300, delay: 5000 },
      },
      end: {
        animStyles: () => ({
          marginTop: "100px",
          opacity: 0,
        }),
        animOptions: { duration: 500 },
      },
    },
  ];

  const dog$ = jQuery('<div class="js-random-dog"></div>')
    .hide()
    .appendTo(document.body);
  const image$ = jQuery("<img />").appendTo(dog$);

  let timer = startRandom();

  function startRandom() {
    const randomDelayInSec = getRandomInt(5, 10) * 1000;
    return setTimeout(showImage, randomDelayInSec);
  }

  function stopRandom() {
    clearTimeout(timer);
  }

  function showImage() {
    const randomImageData = imagesSet[getRandomInt(0, imagesSet.length - 1)];
    const { start, end, url } = randomImageData;

    image$.attr("src", url);
    dog$
      .css(start.cssStyles())
      .show()
      .animate(start.animStyles(), {
        duration: start.animOptions.duration,
      })
      .delay(start.animOptions.duration + start.animOptions.delay)
      .animate(end.animStyles(), {
        duration: end.animOptions.duration,
        complete: () => {
          dog$.removeAttr("style").hide();
          startRandom();
        },
      });
  }
}
