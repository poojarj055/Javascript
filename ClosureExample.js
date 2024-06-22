//1. Write a function createCounter that returns an object with two methods: increment and getValue. The increment method should increase the internal counter by 1, and getValue should return the current value of the counter.


function createCounter() {
    let count=0;
  return {
      increment : function (){
           count++;
      },
      getValue : function(){
          return count;
      }
  }
}

const counter = createCounter();
counter.increment();
counter.increment();
console.log(counter.getValue()); // 2



//2. Closure with Private Variables:
// Create a function createSecretHolder that accepts a secret and returns an object with two methods: getSecret and setSecret. getSecret should return the secret, and setSecret should change the secret.

function createSecretHolder(secret) {
    let currentSecret = secret;
    return {
        getSecret : function(){
            return currentSecret;
        },
        setSecret : function(newSecret){
            currentSecret=newSecret;
        }
    }
}

const holder = createSecretHolder(123);
console.log(holder.getSecret()); // 123
holder.setSecret(456);
console.log(holder.getSecret()); // 456


//3. Closures and Loops:
// Write a function createFunctions that returns an array of functions. Each function should return its index in the array. Use closures to achieve this.


function createFunctions(n) {
    let functions = [];

    for (let i = 0; i < n; i++) {
        functions[i] = (function(index) {
            return function() {
                return index;
            };
        })(i);
    }

    return functions;
}

const functions = createFunctions(5);
console.log(functions[0]()); // 0
console.log(functions[1]()); // 1
console.log(functions[2]()); // 2
console.log(functions[3]()); // 3
console.log(functions[4]()); // 4



//4. Partial Application with Closures:
// Write a function partial that takes a function fn and a fixed number of arguments, and returns a new function. When the new function is called, it should call fn with the fixed arguments and any additional arguments.

function partial(fn, ...fixedArgs) {
    return function(...additionalArgs) {
        return fn(...fixedArgs, ...additionalArgs);
    };
}

const add = (a, b) => a + b;
const add5 = partial(add, 5);
console.log(add5(10)); // 15


Explanation:

The partial function takes a function fn and some fixed arguments (fixedArgs).
It returns a new function that takes additional arguments (additionalArgs).
When the new function is called, it combines the fixed arguments with the additional arguments using the spread operator and calls the original function fn with the combined arguments.
This way, add5 becomes a partially applied function that always adds 5 to its argument.



//5. Memoization with Closures:
// Implement a function memoize that takes a function fn and returns a memoized version of fn. The memoized function should cache the results of previous calls with the same arguments.


function memoize(fn) {
    const cache = {};

    return function(...args) {
        const key = JSON.stringify(args);
        if (cache[key] !== undefined) {
            return cache[key];
        } else {
            const result = fn(...args);
            cache[key] = result;
            return result;
        }
    };
}

const factorial = memoize(function(n) {
    if (n === 0) return 1;
    return n * factorial(n - 1);
});

console.log(factorial(5)); // 120
console.log(factorial(5)); // 120 (retrieved from cache)






//another example

function memoize(fn) {
    // Your memoize function here
    let cache={};
    return function(...args){
    const key=JSON.stringify(args);
    if(cache[key]!==undefined)
    {
    return cache[key];
    }
    else
    {
        const result=fn(...args);
        cache[key]=result;
        return result;
    }
    }
}

const fib = memoize(function(n) {
    let sum=0;
    if(n>0)
    {
        for(i=1;i<=n;i++)
        sum=sum+i;
    }
    return sum;
});

console.time("fib");
console.log(fib(10)); // 55
console.timeEnd("fib");

console.time("fib");
console.log(fib(10)); // 55 (retrieved from cache)
console.timeEnd("fib");



function memoize(fn) {
    // Your memoize function here
    let cache={};
    return function(...args){
        const key=JSON.stringify(args);
        if(cache[key]!== undefined)
        {
            return cache[key];
        }
        else
        {
            const result=fn(...args)
            cache[key]=result;
            return result;
        }
    }
}

const factorial = memoize(function(n) {
    if (n === 0) return 1; 
        let fact=1;
        for(let i=1;i<=n;i++)
        {
             fact=fact*i;
        }
        return fact;
});

console.time("fib");
console.log(factorial(5)); // 120
console.timeEnd("fib");
console.time("fib");
console.log(factorial(5)); // 120 (retrieved from cache)
console.timeEnd("fib");
