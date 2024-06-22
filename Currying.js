// CURRYING Interview Question

// Question 1 : Currying

function f(a) {
    return (b) => {
         return "Works"
    }
}
console.log(f(1)(2));


// Question 2 : sum(2)(6)(1)

function sum(a) {
    return (b) => {
        return (c) => {
            return a + b + c
        }
    }
}
console.log(sum(1)(2)(3)) // 6


// 4 : Write a currying fn 
//       evaluate("sum")(4)(2)
//       evaluate("multiply")(4)(2)
//       evaluate("divide")(4)(2)
//       evaluate("substract")(4)(2);

function evaluate(operation) {
    return function (a) {
        return function (b) {
            if(operation === "sum") return a+b;
            else if(operation ==="multiply") return a*b;
            else if(operation ==="divide") return a/b;
            else if(operation ==="substract") return a-b;
            else return "Invalid Operation!"
        }
    }
}
console.log(evaluate("sum")(4)(2));
console.log(evaluate("multiply")(4)(2));
console.log(evaluate("divide")(4)(2));
console.log(evaluate("substract")(4)(2));
console.log(evaluate("substr")(4)(2));


// Question 5 : Infinite Currying -> sum(1)(2)(3)....(n)

function add(a) {
    return function (b) {
        if(b) return add(a+b);
        return a;
    };
}
console.log(add(5)(2)(4)(8)())


// Question 6 : currying vs partial application

// function sum(a) {
//     return (b, c) => {
//         return a * b * c
//     }
// }

// let x = sum(10);
// x(3,12);
// x(20,12);
// x(20,13);
// OR
// sum(10)(3,12);
// sum(10)(20,12);
// sum(10)(20,13);


// Question 7 : real world example of currying => Maniplating DOM

const updateElemText = id => content => document.querySelector(`#${id}`).textContent= content;
const updateHeaderText = updateElemText('header');
updateHeaderText('Subscribe to RoadsideCoder!');


// Question 8 : Curry() implementation

function curry(func) {
    return function curriedFunc(...args) {
        // console.log(args.length, func.length);
      if(args.length >= func.length) {
        return func(...args)
      } else {
        return function(...next) {
          return curriedFunc(...args,...next);
        };
      }
    };
}
  
const sumCurry = (a, b, c) => a + b + c;

const totalSum = curry(sumCurry);
console.log(totalSum(1)(6)(5));



Question 1: Currying
Explanation: Currying is a technique in functional programming where a function with multiple arguments is transformed into a sequence of functions, each taking a single argument. This improves composability and allows partial application of functions.

Question 2: sum(2)(6)(1)
Explanation: This function demonstrates currying by taking three separate arguments and adding them together in a sequence using nested functions.

Question 4: Write a currying function evaluate("sum")(4)(2)
Explanation: This question showcases a curried function evaluate that takes an operation string and two numbers, then performs the corresponding operation (sum, multiply, divide, subtract) based on the string input.

Question 5: Infinite Currying -> sum(1)(2)(3)....(n)
Explanation: This example illustrates how currying can be used recursively to handle an indefinite number of arguments, continually adding them together until a termination condition is met.

Question 6: Currying vs Partial Application
Explanation: This question compares currying and partial application, showing how currying allows for creating reusable functions with specific arguments filled in, while partial application involves pre-filling some arguments and leaving others for later.

Question 7: Real-world example of currying => Manipulating DOM
Explanation: In this example, currying is used to create a function that updates the text content of an HTML element identified by its ID. This showcases a practical application of currying in web development for DOM manipulation.

Question 8: Curry() implementation
Explanation: This code snippet demonstrates a custom implementation of the curry function, which transforms a multi-argument function into a curried function, enabling partial application and composability. It's applied to a simple sum function for demonstration.

Resources
Share and Earn
