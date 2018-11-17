const moment = require('moment');

let x = new Date("2018-11-16T15:53:49.685");
let y = x.toISOString().replace('Z','')
let z = new Date(y)
console.log(y)