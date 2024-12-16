"use strict";

///////////////////////////////////////
// Modal window
const nav = document.querySelector(".nav");
const footer = document.querySelector(".footer");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

const sidebar = document.querySelector(".sidebar");
const menu = document.querySelector(".nav__icon");
const sidebarMenu = document.querySelector(".sidebar__nav--icon");

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const menuOverlay = document.querySelector(".menu__overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((button) => button.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////// NAVIGATION

btnScrollTo.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    // console.log(link);

    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((cur) => {
      if (cur !== link) cur.style.opacity = this;
    });
    logo.style.opacity = this;
    menu.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link--btn")) return;

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Footer Scroll
footer.addEventListener("click", function (e) {
  if (!e.target.classList.contains("footer__link")) return;

  if (!e.target.classList.contains("instagram-link")) {
    e.preventDefault();
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Reveal Sections
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect();
// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0.15,
  rootMargin: `-${navHeight.height}px`,
});

headerObserver.observe(header);

// sidebar animation
const sideBarAnimations = function () {
  const enterSideBar = function () {
    sidebar.style.position = "fixed";
    sidebar.style.transform = "translateX(11rem)";
    sidebar.style.width = "300px";
    sidebar.classList.toggle("hidden");
    menuOverlay.classList.toggle("hidden");
  };

  const exitSideBar = function () {
    sidebar.style.transform = "translateX(0rem)";
    sidebar.style.width = "60px";
    menuOverlay.classList.toggle("hidden");
    sidebar.classList.toggle("hidden");
  };

  let count = 0;
  const menuBarInteract = function (menuType, sidebar = false) {
    count++;

    const deg = sidebar === true ? count * 360 : count * 45;
    menuType.style.transform = `rotate(${deg}deg)`;
  };

  const menuExit = function () {
    menuBarInteract(menu, true);
    menuBarInteract(sidebarMenu, false);
    exitSideBar();
  };

  let clicked = false;
  menu.addEventListener("click", function () {
    menuBarInteract(menu, true);
    menuBarInteract(sidebarMenu, false);
    if (clicked === false) enterSideBar();
    clicked = !clicked;
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !sidebar.classList.contains("hidden")) {
      clicked = !clicked;
      menuExit();
    }
  });

  menuOverlay.addEventListener("click", function () {
    clicked = !clicked;
    menuExit();
  });
  sidebarMenu.addEventListener("click", function () {
    clicked = !clicked;
    menuExit();
  });
  // menu.addEventListener("mouseenter", enterSideBar);
  // menu.addEventListener("mouseleave", exitSideBar);
};
sideBarAnimations();
