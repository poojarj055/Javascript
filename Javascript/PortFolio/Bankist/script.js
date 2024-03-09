'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach((btn)=> btn.addEventListener('click',openModal))

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);


//Different ways of selecting elements
const header = document.querySelector('.header')
const selectAll=document.querySelectorAll('.section');
console.log(selectAll);
document.getElementById('section--1');
const allButtons=document.getElementsByTagName('button');
console.log(allButtons);
console.log(document.getElementsByClassName('btn'));

//Creating,Insering and deleting elements

const message=document.createElement('div');
//cookie-message is added from css file
message.classList.add('cookie-message');
message.innerHTML='This is cookie message for better experience and analytics. <button class="btn btn--close-cookie"> Got it! </button>'
//adds as a first child
//header.prepend(message);
//adds as a last child
header.append(message);
//other ways
//header.before(message);
// header.after(message);

//Deleting elements

document.querySelector('.btn--close-cookie').addEventListener('click',function(){
  message.remove();
  //Another way is through DOM traversing , ie remove parent element and then chil
  //message.parentElement.removeChild(message);
});

message.style.backgroundColor='#00674b';
message.style.width='120%';
message.style.height=Number.parseFloat(getComputedStyle(message).height,10) +30+ 'px';

document.documentElement.style.setProperty('--color-primary', '#87A96B');

const btnscrollTo = document.querySelector('.btn--scroll-to');
const section1=document.querySelector('#section--1');
btnscrollTo.addEventListener('click',function(e){
  //to get the coordinates of the section1
 const s1coords= section1.getBoundingClientRect(section1);
//  console.log(s1coords);
//  console.log(e.target.getBoundingClientRect());
//  console.log('current scroll (X/Y)', window.pageXOffset, pageYOffset);
//  console.log('View Port Height/Width', document.documentElement.clientHeight,document.documentElement.clientWidth);

//Scrolling
//window.scrollTo(s1coords.left + window.pageXOffset ,
//s1coords.top + window.pageYOffset);

//Smooth Scrolling , by passing the argument as objects
// window.scrollTo({
//   left: s1coords.left + window.pageXOffset,
//   top: s1coords.top + window.pageYOffset,
//   behaiviour:'smooth'
// });

// Smooth scrolling in modern browser
section1.scrollIntoView({behavior: 'smooth'});

});

//Tabbed Componenets

const tabs=document.querySelectorAll('.operations__tab');
const tabsContainer=document.querySelector('.operations__tab-container');
const tabsContent=document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function(e)
{
  const clicked=e.target.closest('.operations__tab');
  console.log(clicked);
  if(!clicked) return;

  //Remove active class
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //Add the active tab to the clicked one
clicked.classList.add('operations__tab--active');
console.log(clicked.dataset.tab);

document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

});

//Menu Fade Animation
const nav=document.querySelector('.nav');

const handleHover=function(e, opacity){
  if(e.target.classList.contains('nav__link')){
    const link=e.target;
    const siblings=link.closest('.nav').querySelectorAll('.nav__link');
    const logo=link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity=opacity;
  }
};

nav.addEventListener('mouseover', function(e){
  handleHover(e, 0.5);
} );
nav.addEventListener('mouseout', function(e){
  handleHover(e, 1);
});


//Sticky Navigation : Intersection Observer API
// so our target element here, is intersecting the root element at the threshold that we defined
// const obscallBack = function(enteries,observer) {
//       enteries.forEach(entry => {
//         console.log(entry);
//       })

// };
// const obsOptions = {
//   root : null,
//   threshold: [0, 0.2]

// };
// const observer= new IntersectionObserver(obscallBack, obsOptions);
// //target (section 1) is intersection the viewport by 10% (threshold)
// observer.observe(section1);

//const header=document.querySelector('.header');

//  calculate the hieght dynamically
const navHeight= nav.getBoundingClientRect().height;
//console.log(navHeight);

 const stickyNav=function(enteries){
   const [entry] = enteries;
   //console.log(entry);
   if (!entry.isIntersecting) 
   nav.classList.add('sticky');
   else
   nav.classList.remove('sticky');
 };

const headerObserver= new IntersectionObserver(stickyNav, {
  root: null,
  threshold:0,
  rootMargin : `-${navHeight}px`
});


headerObserver.observe(header);

// Reveal Sections
const allSections = document.querySelectorAll('.section');

const revealSection = function(enteries, observer)
{
  const [entry]=enteries;
//  console.log(entry);

  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection,{
   root: null,
   threshold: 0.15
});

allSections.forEach(function (section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});


//Lazy Loading images

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(enteries, observer){
  const [entry]= enteries;
  console.log(entry);
  if(!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src=entry.target.dataset.src;

  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold:0,
  rootMargin: '200px'
});
imgTargets.forEach(img => imgObserver.observe(img));





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

document.querySelectorAll('beforeunload', function(e){
  e.preventDefault();
  e,returnValue= '';
  console.log(e);
  console.log('Alert user before leaving the site!')
});