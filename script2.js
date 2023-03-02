const jsTest = document.querySelector(".jsTest");
const linksIds = ["link1", "link2", "link3", "link4"];
const burgerShow = document.querySelector(".show");
const closeX = document.querySelector(".closeX");
const browserSize = window.matchMedia("(min-width: 700px)");

function toggleLinksVisibility(show) {
  const visibility = show ? "initial" : "hidden";
  linksIds.forEach((id) => {
    document.getElementById(id).style.visibility = visibility;
  });
}

function toggleElementsDataAttribute(show) {
  const dataAttribute = show ? "true" : "false";
  jsTest.setAttribute("data-show", dataAttribute);
  burgerShow.setAttribute("data-show", dataAttribute);
  closeX.setAttribute("data-show", dataAttribute);
}

function handleBurgerClick() {
  toggleElementsDataAttribute(true);
  toggleLinksVisibility(true);
}

function handleCloseClick() {
  toggleElementsDataAttribute(false);
  toggleLinksVisibility(false);
  browserLinks();
}

function handleBrowserSizeChange() {
  if (!closeX.dataset.show) {
    browserLinks();
  }
}

function browserLinks() {
  const isWideViewport = browserSize.matches;
  isWideViewport ? toggleLinksVisibility(true) : toggleLinksVisibility(false);
}

// Setup event listeners
burgerShow.addEventListener("click", handleBurgerClick);
closeX.addEventListener("click", handleCloseClick);
browserSize.addEventListener("change", handleBrowserSizeChange);
browserLinks(); // Call initially to setup visibility based on viewport size

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

function touchEnd(e) {
  endPos = getPositionXEnd(e);
  let distance = endPos - startPos;
  console.log(distance);
  if (distance > 70) {
    offset = 1;
    touchSlide(offset);
  } else if (distance < -70) {
    offset = -1;
    touchSlide(offset);
  }
}

// Carousel component with arrows
const slidesContainer = document.querySelector("[data-slides]");
const slides = [...slidesContainer.children];

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
function touchSlide(offset) {
  const activeSlide = slidesContainer.querySelector("[data-active]");
  let newIndex = [...slides].indexOf(activeSlide) + offset;
  if (newIndex < 0) {
    newIndex = slides.length - 1;
  }
  if (newIndex >= slides.length) {
    newIndex = 0;
  }
  slides[newIndex].dataset.active = true;
  delete activeSlide.dataset.active;
}

function changeSlide(button) {
  let offset = button.dataset.button === "next" ? 1 : -1;
  const activeSlide = slidesContainer.querySelector("[data-active]");
  let newIndex = [...slides].indexOf(activeSlide) + offset;
  if (newIndex < 0) {
    newIndex = slides.length - 1;
  }
  if (newIndex >= slides.length) {
    newIndex = 0;
  }
  slides[newIndex].dataset.active = true;
  delete activeSlide.dataset.active;
}

//Carousel Round Indicators
const carouselSec = document.querySelector(".carousel--buttons");
const carouselButtons = Array.from(carouselSec.children);

carouselSec.addEventListener("click", (e) => {
  const slides = document.querySelector("[data-slides]");
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
