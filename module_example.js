// 외부 모듈에서 객체 받아오기 : require
// const add = require("./modules/test_module").add;
// const square = require("./modules/test_module").square;
const { add, square } = require("./modules/test_module");


console.log("add:", add(10, 2));
console.log("square:", square(10));

const area = require("./modules/test_module2");

console.log(area.square(20));
console.log(area.circle(4));