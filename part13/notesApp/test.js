console.log(require('crypto').randomBytes(16).toString('hex'));
const test = require('crypto').randomBytes(16).toString('hex').split("");
console.log(test.length);