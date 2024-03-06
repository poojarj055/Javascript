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


