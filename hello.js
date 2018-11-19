const moment = require('moment');

let x = new Date("2018-11-18T14:25:16.943");
let y = new Date("2018-11-18T17:00:00.000");
console.log(moment(x).format("LLLL"))
console.log(moment(y).format("LLLL"))
//let y = x.setHours(24,0,0,0);
//let z = y.toISOString().replace('Z','')
console.log(y>=x)