/Tabbed Componenets

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
