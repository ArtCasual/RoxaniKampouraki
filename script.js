const navContainer = document.querySelector(".navContainer");
const linksIds = ["link1", "link2", "link3", "link4"];
const burgerShow = document.querySelector(".show");
const closeX = document.querySelector(".closeX");

function showLinks() {
  for (i = 0; i < linksIds.length; i++) {
    document.getElementById(linksIds[i]).style.visibility = "initial";
  }
}
function hideLinks() {
  for (i = 0; i < linksIds.length; i++) {
    document.getElementById(linksIds[i]).style.visibility = "hidden";
  }
}

burgerShow.addEventListener("click", () => {
  navContainer.setAttribute("data-show", "true");
  burgerShow.setAttribute("data-show", "true");
  closeX.setAttribute("data-show", "true");
  showLinks();
});

//  closeX
closeX.addEventListener("click", () => {
  navContainer.setAttribute("data-show", "false");
  burgerShow.setAttribute("data-show", "false");
  closeX.setAttribute("data-show", "false");
  hideLinks();
  browserLinks(browserSize);
  browserSize.addEventListener("change", browserLinks);
});

navContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "a") {
    navContainer.setAttribute("data-show", "false");
    burgerShow.setAttribute("data-show", "false");
    closeX.setAttribute("data-show", "false");
    hideLinks();
    browserLinks(browserSize);
    browserSize.addEventListener("change", browserLinks);
  }
});

// resize browser fix
const browserSize = window.matchMedia("(min-width:700px)");
function browserLinks(x) {
  if (x.matches && closeX.dataset.show === "false") {
    showLinks();
  } else if (!x.matches && closeX.dataset.show === "false") {
    hideLinks();
  }
}

// Touch Event Slider
let startPos, endPos, offset;

function getPositionX(e) {
  return e.touches[0].clientX;
}

function getPositionXEnd(e) {
  return e.changedTouches[0].clientX;
}
function touchStart(e) {
  startPos = getPositionX(e);
  return startPos;
}
//
function touchEnd(e) {
  endPos = getPositionXEnd(e);
  let distance = endPos - startPos;
  if (distance > 70) {
    offset = -1;
    touchSLide(offset);
  } else if (distance < -70) {
    offset = 1;
    touchSLide(offset);
  }
}

// Carousel component with arrows

const slidesContainer = document.querySelector("[data-slides");
const slides = [...slidesContainer.children];
console.log(slidesContainer.children, slides);
slides.forEach((slide) => {
  slide.addEventListener("touchstart", touchStart);
  slide.addEventListener("touchend", touchEnd);
});
const buttons = document.querySelectorAll("[data-button]");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    changeSlide(button);
  });
});

// Next Button plus counter
function touchSLide(offset) {
  const activeSlide = slidesContainer.querySelector("[data-active]");
  let newIndex = slides.indexOf(activeSlide) + offset;
  if (newIndex < 0) newIndex = slides.length - 1;
  if (newIndex >= slides.length) newIndex = 0;
  slides[newIndex].dataset.active = true;
  delete activeSlide.dataset.active;
  carouselButtons.forEach((dot) =>
    dot.classList.remove("carousel--btnCurrent")
  );
  carouselButtons[newIndex].classList.add("carousel--btnCurrent");
}

function changeSlide(button) {
  let offset = button.dataset.button === "next" ? 1 : -1;
  const activeSlide = slidesContainer.querySelector("[data-active]");
  let newIndex = slides.indexOf(activeSlide) + offset;
  if (newIndex < 0) newIndex = slides.length - 1;
  if (newIndex >= slides.length) newIndex = 0;
  slides[newIndex].dataset.active = true;
  delete activeSlide.dataset.active;
}

//Carousel Round Indicators

const carouselSec = document.querySelector(".carousel--buttons");
const carouselButtons = Array.from(carouselSec.children);
carouselButtons[0].classList.add("carousel--btnCurrent");

carouselSec.addEventListener("click", (e) => {
  const slides = document.querySelector("[data-slides");
  const activeSlide = slides.querySelector("[data-active]");

  const targetDot = e.target;
  const targetIndex = carouselButtons.findIndex((btn) => btn === targetDot);

  if (!slides.children[targetIndex].dataset.active) {
    delete activeSlide.dataset.active;
    slides.children[targetIndex].dataset.active = true;
  }
  if (
    !carouselButtons[targetIndex].classList.contains("carousel--btnCurrent")
  ) {
    carouselButtons.forEach((Dot) =>
      Dot.classList.remove("carousel--btnCurrent")
    );
    carouselButtons[targetIndex].classList.add("carousel--btnCurrent");
    dotIndicator = carouselSec.querySelector(`.carousel--btn${targetIndex}`);
  }
});

// Modal__Cards

const openModalLinks = document.querySelectorAll(".modal__open");
const closeModalButtons = document.querySelectorAll(".modal__close");

openModalLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const modal = link.nextElementSibling;
    modal.classList.remove("modal--hidden");
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal__container");
    modal.classList.add("modal--hidden");
  });
});
