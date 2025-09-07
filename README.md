### 1) What is the difference between var, let, and const?
var is  function scoped 
let and const are block scoped

var and let can be reassigned
const can not be reassigned

var can re redeclare but let and const can't

var , let and const can hoisted .
var can initialized with undefined but const and let not initialized

### 2) What is the difference between map(), forEach(), and filter()?

map return a array 
filter return a array which contain the element that return true for define condition
forEach() return nothing

### 3) What are arrow functions in ES6?

shorter syntax for writing functions in JS , use => instead of the function keyword

### 4) How does destructuring assignment work in ES6?

destructuring allows to unpack values form arrays or objects
example:
        let {name} = {
                name: "rofiq",
                age: 24
        }

        let [a] = [1,3];

### 5) Explain template literals in ES6. How are they different from string concatenation?

template literals is a new way to create string using backticks instead of '' or "" in ES6.
allow multi-line strings
we can use variable inside the backticks using ${} this
no need inbuilt function need for concatenation multi line string.
inside backticks we can write normally using without using \n