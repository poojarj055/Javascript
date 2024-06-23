Explanation: In JavaScript, this refers to the object it belongs to. In the given code, this.a inside the console.log refers to the property a of the global object, which is undefined unless explicitly defined elsewhere.

Question 2: this inside Method
Explanation: In an object method like getDetails() within the user object, this refers to the object itself. So, this.name will log the value of the name property inside the user object.

Question 3: Nested object
Explanation: When accessing properties in a nested object like user.childObj.getDetails(), this inside getDetails() refers to the childObj object, so this.newName refers to "Roadside Coder" and this.name refers to "Piyush".

Question 4: Class & Constructor
Explanation: In a class constructor, this refers to the instance of the class being created. So, this.name inside the getName() method of the user class instance will log the value passed during instantiation, which is "Piyush" in this case.

Question 5: Output
Explanation: There's an error in the code (object.getMessage() is undefined). It should be user.getName() to log "Piyush!" since this.firstName refers to the property inside the user object.

Question 6: Result of accessing its ref?
Explanation: The result is undefined. In makeUser(), this refers to the global object (in non-strict mode) or undefined (in strict mode), not the object being created. So, user.ref.name is trying to access a property of undefined.

Question 7: What logs to console?
Explanation: "Piyush Agarwa;!" logs to the console. The setTimeout function changes the context of this, but since logMessage is an arrow function inside the user object, this still refers to the user object.

Question 8: Output
Explanation: The output will be:

    "Hello, Piyush!" from user.greet() since this.name refers to the name property in the user object.
    "Goodbye, undefined!" from user.farewell() because arrow functions (() => {}) don't have their own this, so this.name refers to the name in the global scope, which is undefined.

Question 9: Calculator operations
Explanation: The sum() and mul() methods of the calculator object operate on this.a and this.b, which are set using the read() method with prompts. The alerts then show the sum and multiplication of the values entered via prompts.

Question 10: Output
Explanation: The output will be 4, not 5. This is because callback() is invoked without a specified context (this), so it defaults to the global object (window in a browser), where length is 4.

Question 11: Implement this Code
Explanation: The calc object is set up to perform chained arithmetic operations. The add(), subtract(), and multiply() methods update the total property of the calc object accordingly, allowing chaining of operations like .add().multiply().subtract().add().



// THIS KEYWORD

// Question 1 : this keyword

let a = 5

console.log(this.a);


// Question 2 : this inside Method

let user = {
    name: "Piyush",
    age: 24,
      getDetails() {
          console.log(this.name)
      }
};
  
user.getDetails(); 


// Question 3 : nested object 

let user = {
    name: "Piyush",
    age: 24,
      childObj:{
          newName:"Roadside Coder",
          getDetails() {
              console.log(this.newName, "and" ,this.name)
          }
      }
};
  
user.childObj.getDetails(); 


// Question 4 : Class & Constructor

class user {
    constructor(n){
        this.name = n
    }
    getName(){
        console.log(this.name);
    }
}

const User = new user("Piyush") 
User.getName();


// Question 5 : Output

const user = {
    firstName: 'Piyush!',
    getName() {
      const firstName = 'Piyush!';
      return this.firstName;
    }
};

console.log(object.getMessage());


// Question 6 : What is the result of accessing its `ref`? Why?

function makeUser() {
    return {
      name: "John",
      ref: this
    };
}
  
let user = makeUser();
  
alert( user.ref.name ); // What's the result?


// Question 7 : What logs to console the following code snippet:

const user = {
    name: 'Piyush Agarwa;!',
    logMessage() {
      console.log(this.name); 
    }
};
setTimeout(user.logMessage, 1000);


// Question 8 : Output

const user = {
    name: 'Piyush',
    greet() {
      return `Hello, ${this.name}!`;
    },
    farewell: () => {
      return `Goodbye, ${this.name}!`;
    }
};
console.log(user.greet());    
console.log(user.farewell()); 


// Question 9 :

let calculator = {
    sum() {
      return this.a + this.b;
    },
  
    mul() {
      return this.a * this.b;
    },
  
    read() {
      this.a = +prompt('a?', 0);
      this.b = +prompt('b?', 0);
    }
};
  
calculator.read();
alert( calculator.sum() );
alert( calculator.mul() );


// Question 10 : Output

var length = 4;
function callback() {
  console.log(this.length); // What is logged?
}
const object = {
  length: 5,
  method(callback) {
    callback();
  }
};
object.method(callback, 1, 2);


// Question 11 : Implement this Code

const result = calc.add(10).multiply(5).subtract(30).add(10)
console.log(result.total);

// My Answer
var calc = {
  total: 0,
  add(a) {
    this.total += a;
    return this;
  },
  subtract(a) {
    this.total -= a;
    return this;
  },
  multiply(a) {
    this.total *= a;
    return this;
  },
};
