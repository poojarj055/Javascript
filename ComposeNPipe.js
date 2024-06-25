(Notes) Compose and Pipe
Question: What is the purpose of the compose and pipe functions in JavaScript?

Explanation:
- compose and pipe are higher-order functions used for function composition in JavaScript.
- compose takes multiple functions as arguments and returns a new function that applies these functions from right to left.
- pipe, on the other hand, applies the functions from left to right.
- Both compose and pipe are commonly used in functional programming to create new functions by combining existing ones in a specific order.


// Compose and Pipe

const addFive = (num) => {
  return num + 5;
};

const subtractTwo = (num) => {
  return num - 2;
};

const multiplyFour = (num) => {
  return num * 4;
};

// Compose Implementation
function compose(...fns) {
  return function (init) {
    // let result = init;
    // for (let i = fns.length - 1; i >= 0; i--) {
    //   result = fns[i](result);
    // }

    // return result;

    return fns.reduceRight((acc, curr) => {
      return curr(acc);
    }, init);
  };
}

const evaluate = compose(addFive, subtractTwo, multiplyFour);
console.log(evaluate(5)); // 23

// Pipe Implementation
function pipe(...fns) {
  return function (init) {
    // let result = init;
    // for (let i = fns.length - 1; i >= 0; i--) {
    //   result = fns[i](result);
    // }

    // return result;

    return fns.reduce((acc, curr) => {
      return curr(acc);
    }, init);
  };
}

const evaluatePipe = pipe(addFive, subtractTwo, multiplyFour);
console.log(evaluatePipe(5)); // 32
