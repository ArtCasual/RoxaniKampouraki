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





