/// Building a slider components
let slideIndex = 1;

function showSlide(n) {
    const slides = document.getElementsByClassName("slide");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

// Next/previous controls
function plusSlide(n) {
    showSlide(slideIndex += n);
}

// Initialize the slideshow
showSlide(slideIndex);

// Event listeners for buttons
document.querySelector(".slider__btn--left").addEventListener("click", () => plusSlide(-1));
document.querySelector(".slider__btn--right").addEventListener("click", () => plusSlide(1));



//DOM Lifecycle events
document.querySelectorAll('DOMContentLoaded', function(e){
  console.log('html page is parsed and DOM tree is built!')
});

document.querySelectorAll('load', function(e){
  console.log('page is fully loaded!')
});

// document.querySelectorAll('beforeunload', function(e){
//   e.preventDefault();
//   e,returnValue= '';
//   console.log(e);
//   console.log('Alert user before leaving the site!')
// });
