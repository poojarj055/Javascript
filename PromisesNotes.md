What are Promises?
According to MDN The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

Basically it allows you to add handlers with an asynchronous action's eventual success value or failure. So you get the result with little bit of delay which is a promise which will give the result at some point.

A Promise is in one of these states:

pending: initial state, neither fulfilled nor rejected.
fulfilled: meaning that the operation was completed successfully.
rejected: meaning that the operation failed.
If you want to know all about Promises in a video format here is the video link

Promises and Interview questions

So why polyfills for promises? To know about the internal working of Promises.

A promise looks like 👇🏼


COPY

COPY
let promise = new Promise((resolve, reject) => setTimeout(() => resolve(100), 3000));

// tasks to be completed after promise resolution

promise.then((val) => console.log(val)).catch(err => console.log(err));
How to create our own promise called PromisePolyFill?


COPY

COPY
function PromisePolyFill(executor) {
}
Steps

Prerequisites (What we know already)
We have a promise constructor function (new Promise((resolve, reject) => setTimeout(() => resolve(100), 3000))) which accepts a callback as an argument which will be executor in our case.

constructor function will return an object with two properties then and catch. Then and catch are functions which accepts a callback and also can be chained. They should return a reference to this.

store the reference to callback function passed to then and catch so that it can be executed at a later stage basis on the status returned by executor.

If executor resolves then we invoke then callback else reject callback.


COPY

COPY
function PromisePolyFill(executor) {

   let onResolve; // this will store the callback passed to then and catch function

    this.then = function(callback) {
        onResolve = callback;
        return this;
    };

    this.catch = function(callback) {
        return this;
    }
}
Part two :

let executor = (resolve, reject) => setTimeout(() => resolve(1000), 1000);

executor function which we will be executed that will either invoke resolve or reject depending on the status of async operation.

We define our resolve callback function passed as an argument to executor. It is the callback function passed to then which we stored in onResolve variable.


COPY

COPY
function resolve(val) {
 onResolve(val);
}
So now the function looks like this


COPY

COPY

function PromisePolyFill(executor) {

    let onResolve;

    function resolve(val) {
      onResolve(val);
    }


    this.then = function(callback) {
        onResolve = callback;
        return this;
    };

    this.catch = function(callback) {
        return this;
    }

    executor(resolve);
}

// you can test in case of asynchronous operation

new PromisePolyFill((resolve) => setTimeout(() => resolve(1000), 1000)).then(val => console.log(val));
Now the above will work if we have a delay but what if we have a synchronous operation and the executor is synchronous

new PromisePolyFill((resolve) => resolve(1000)).then(val => console.log(val))

it will give TypeError: onResolve is not a function

why? ❌

executor invoking gets completed even before we assign value of then callback to onResolve.

So in this case it's not possible for us to execute onResolve callback from our resolve function .

So onResolve callback has to be executed from somewhere else.

We will add two boolean type variables

fulfilled : Boolean indicating if the executor has been resolved or not
called: boolean indicating if the then callback has been called or not .

COPY

COPY

function PromisePolyFill(executor) {

    let onResolve;
    let fulfilled = false,
    called = false,
    value;


    function resolve(val) {

        fulfilled = true;
        value = val;

        if(typeof onResolve === 'function') { // it will be a function only if then callback is assigned to onResolve variable 
            onResolve(val);
            called = true; // indicates then callback has been called
        }
    }


    this.then = function(callback) {

        onResolve = callback;
        return this;
    };

    this.catch = function(callback) {
        return this;

    }

    executor(resolve);
}

//new PromisePolyFill((resolve) => setTimeout(() => resolve(1000), 0)).then(val => console.log(val));
new PromisePolyFill((resolve) => Promise.resolve(resolve(1000)));
Now onResolve method will be implemented in then


COPY

COPY

if (fulfilled && !called) {
      called = true;
      onResolve(value);
    }
Final Implementation

COPY

COPY

function PromisePolyFill(executor) {
  let onResolve,
      onReject,
      fulfilled = false,
      rejected = false,
      called = false,
      value;

  function resolve(v) {
    fulfilled = true;
    value = v;

    if (typeof onResolve === "function") { // for async
      console.log("inside resolve")
      onResolve(value);
      called = true;
    }
  }

  function reject(reason) {
    rejected = true;
    value = reason;

    if (typeof onReject === "function") {
      onReject(value);
      called = true;
    }
  }

  this.then = function (callback) {
    onResolve = callback;

    if (fulfilled && !called) { // for sync
      console.log("inside then")
      called = true;
      onResolve(value);
    }
    return this;
  };

  this.catch = function (callback) {
    onReject = callback;

    if (rejected && !called) {
      called = true;
      onReject(value);
    }
    return this;
  };

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

const promise1 = new PromisePolyFill((resolve, reject) => {
  console.log(1)
  setTimeout(() => {
      resolve(2)
    }, 1000);
  console.log(3)
})

promise1.then(res => {
  console.log(res)
});
Implementing PromisePolyFill.resolve and PromisePolyFill.reject
resolve and reject are simple which will return a PromisePolyfill object having an executor which will either resolve or reject.


COPY

COPY
PromisePolyFill.resolve = (val) =>
  new PromisePolyFill(function executor(resolve, _reject) {
    resolve(val);
  });

PromisePolyFill.reject = (reason) =>
  new PromisePolyFill(function executor(resolve, reject) {
    reject(reason);
  });
Promise.all Polyfill
Promise.all takes an array of promises as an input, and returns a single Promise that resolves to an array of the results of the input promises.

Here again we create our own executor function, and return back our promise object which would take in this executor.

We create an array named fulfilledPromises and push values to it whenever any promise is resolved.
If all promises are resolved ( fulfilledPromises.length === promises.length ) we invoke resolve .
If any promise is rejected we invoke the reject

COPY

COPY
PromisePolyFill.all = (promises) => {
  let fulfilledPromises = [],
    result = [];

  function executor(resolve, reject) {
    promises.forEach((promise, index) =>
      promise
        .then((val) => {
          fulfilledPromises.push(true);
          result[index] = val;

          if (fulfilledPromises.length === promises.length) {
            return resolve(result);
          }
        })
        .catch((error) => {
          return reject(error);
        })
    );
  }
  return new PromisePolyFill(executor);
};
Promise.race Polyfill
Promise.race() returns the first settled value (either fulfillment or rejection).
It takes an iterable object as input like array.

COPY

COPY
export function promiseRace(promisesArray) {
  return new Promise((resolve, reject) => {
    promisesArray.forEach((promise) => {
      promise
        .then(resolve) // resolve outer promise, as and when any of the input promise resolves
        .catch(reject); // reject outer promise, as and when any of the input promise rejects
    });
  });
}
Promise.allSettled Polyfill
The Promise.allSettled() method returns a promise that fulfills after all of the given promises have either fulfilled or rejected, with an array of objects that each describes the outcome of each promise.

It is used when you have multiple asynchronous tasks that are not dependent on one another to complete successfully, or you'd always like to know the result of each promise.


COPY

COPY
function allSettled(promises) {
  let mappedPromises = promises.map((p) => {
    return p.then((value) => {
        return {
          status: 'fulfilled',
          value,
        };
      })
      .catch((reason) => {
        return {
          status: 'rejected',
          reason,
        };
      });
  });
  return Promise.all(mappedPromises);
};
Promise.any() Polyfill
Promise.any() takes an iterable of Promise objects which is promises in our polyfill.
It returns a single promise that fulfills as soon as any of the promises in the iterable fulfills, with the value of the fulfilled promise.
If no promises in the iterable fulfill (if all of the given promises are rejected), then the returned promise is rejected with an AggregateError, a new subclass of Error that groups together individual errors.

COPY

COPY
function any(promises) {
  let results = [];
  var counter = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((p, index) => {
      p.then((result) => {
        resolve(result)
      }).catch((err) => {
         results.push(err);
         ++counter;
        if (counter === promises.length) {
          reject(results);
        }
      });
    });
  });
};
