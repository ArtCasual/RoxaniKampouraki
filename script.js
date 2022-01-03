const jsTest = document.querySelector(".jsTest");
const linksIds = ["link1", "link2", "link3", "link4"];
const burgerShow = document.querySelector(".show");
const closeX = document.querySelector(".closeX");
// const trigLink =document.getElementById("link1");
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
  jsTest.setAttribute("data-show", "true");
  burgerShow.setAttribute("data-show", "true");
  closeX.setAttribute("data-show", "true");
  showLinks();
});

//  closeX
closeX.addEventListener("click", () => {
  jsTest.setAttribute("data-show", "false");
  burgerShow.setAttribute("data-show", "false");
  closeX.setAttribute("data-show", "false");
  hideLinks();
  browserLinks(browserSize);
  browserSize.addEventListener("change",browserLinks);


});
// resize browser fix 
const browserSize = window.matchMedia("(min-width:700px)");
function browserLinks(x){
  if (x.matches && closeX.dataset.show === "false"){
    showLinks();
  }
  else if (!x.matches && closeX.dataset.show === "false") {
    hideLinks();
  }
};


// carousel component
const buttons = document.querySelectorAll("[data-button]");
buttons.forEach(button => {
  button.addEventListener("click", () => {
  const offset = button.dataset.button === "next" ? 1 : -1;

  const slides = document.querySelector("[data-slides");
  const activeSlide = slides.querySelector("[data-active]");

  let newIndex = [...slides.children].indexOf(activeSlide) + offset;
  if (newIndex < 0) newIndex = slides.children.length - 1;
  if (newIndex >= slides.children.length) newIndex = 0;

  slides.children[newIndex].dataset.active = true;
  delete activeSlide.dataset.active;
  
})
});



