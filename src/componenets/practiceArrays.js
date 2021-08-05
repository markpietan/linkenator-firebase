// const removeArray = (arr, promise) => {
//   return promise.then(function (value) {
//     arr.splice(value, 1);
//     return arr
//   });
// };
// removeArray([1, 5, 7], Promise.resolve(1)).then(function(value){
//     console.log(value)
// });

//Problem 1: Create a function that accepts a parameter "end" which is a number. Print all numbers from 0 to end.

// const printNumbers = (end) => {
// for(let i = 0; i < end; i++) {
//     console.log(i)
// }
// }

// printNumbers(10)

//Problem 2: Create a function with one parameter "obj". Print all the values corresponding to each key, and the number of keys in object.

const keyValues = (obj) => {
    for (let key in obj){
        console.log(obj[key])
    }
  ;
};

keyValues({ hello: "world", foo: "bar" });
