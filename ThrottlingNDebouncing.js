Question: How does the JavaScript code implement debounce functionality for button clicks?
Explanation: The JavaScript code uses lodash's _.debounce function to create a debounced version of a callback function. It tracks the number of times a button is pressed and updates the count after a specified debounce time (800ms in this case).

Question: How does the JavaScript code implement throttle functionality for button clicks?
Explanation: The JavaScript code uses lodash's _.throttle function to create a throttled version of a callback function. It tracks the number of times a button is pressed and updates the count at intervals of 1000ms, ensuring that the callback function is not invoked more than once in that interval.

Question: What is the purpose of the JavaScript code for a custom debounce function (polyfill)?
Explanation: The JavaScript code defines a custom debounce function myDebounce that mimics the behavior of lodash's _.debounce. It creates a debounced version of a callback function and ensures that the callback is executed only after a specified debounce time (800ms in this case) since the last invocation.

Question: What is the purpose of the JavaScript code for a custom throttle function (polyfill)?
Explanation: The JavaScript code defines a custom throttle function myThrottle that mimics the behavior of lodash's _.throttle. It creates a throttled version of a callback function and ensures that the callback is invoked at most once per specified interval (1000ms in this case), preventing rapid successive invocations.


// Debounce & Throttling Interview Question

// Question 1 :   Create a button UI and add debounce as follows =>
//          --> Show "Button Pressed <X> Times" every time button is pressed
//          --> Increase "Triggered <Y> Times" count after 800ms of debounce

const btn = document.querySelector(".increment_btn");
const btnPress = document.querySelector(".increment_pressed");
const count = document.querySelector(".increment_count");

var triggerCount = 0;
var pressedCount = 0;

const debouncedCount = _.debounce(() => {
  triggerCount += 1;
  count.innerHTML = triggerCount;
}, 800);

btn.addEventListener("click", () => {
  btnPress.innerHTML = ++pressedCount;

  debouncedCount();
});


// Question 2 : Create a button UI and add throttle as follows =>
//          --> Show "Button Pressed <X> Times" every time button is pressed
//          --> Increase "Triggered <Y> Times" count after 800ms of debounce

const btn = document.querySelector(".increment_btn");
const btnPress = document.querySelector(".increment_pressed");
const count = document.querySelector(".increment_count");

var triggerCount = 0
var pressedCount = 0

const start = new Date().getTime()

var throttled = _.throttle(()=>{
    triggerCount+=1
    count.innerHTML=triggerCount
}, 1000);

btn.addEventListener("click", () => {
    btnPress.innerHTML=pressedCount++
    const now = new Date().getTime()
    const seconds = (now-start)/1000
    console.log(seconds.toFixed());
    throttled()
});


// Question 3 : Debounce Polyfill

const btn = document.querySelector(".increment_btn");
const btnPress = document.querySelector(".increment_pressed");
const count = document.querySelector(".increment_count");

var triggerCount = 0;
var pressedCount = 0;

const myDebounce = function (cb, d) {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        cb(...args);
      }, d);
    };
};

const debouncedCount = myDebounce(() => {
    triggerCount += 1;
    count.innerHTML = triggerCount;
  }, 800);

btn.addEventListener("click", () => {
  btnPress.innerHTML = ++pressedCount;
  debouncedCount();
});


// Question 4 : Throttle Polyfill

const btn = document.querySelector(".increment_btn");
const btnPress = document.querySelector(".increment_pressed");
const count = document.querySelector(".increment_count");

var triggerCount = 0
var pressedCount = 0

const start = new Date().getTime();

const myThrottle = function (cb, d) {
    let last = 0;
    return (...args) => {
      let now = new Date().getTime();
      if (now - last < d) return;
      last = now;
      return cb(...args);
    };
};

var throttled = _.throttle(()=>{
    triggerCount+=1
    count.innerHTML=triggerCount
}, 1000);

btn.addEventListener("click", () => {
    btnPress.innerHTML=pressedCount++
    const now = new Date().getTime()
    const seconds = (now-start)/1000
    console.log(seconds.toFixed());
    throttled()
});
