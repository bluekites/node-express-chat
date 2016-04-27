var moment = require('moment');
var now = moment(); // the now variable is now a moment object. we will use it to manipulate time

// keep in mind moment output strings. use valueof() at the end to turn it into a number

console.log(now.format()); // give us the current time stamp
// now.subtract(1, 'year'); // this subtracts a year off of our time. we can manipulate time

console.log(now.format()); // give us the current time stamp
console.log(now.format('MMM Do YYYY h:mm A')); // formatted time ex: Apr 5th 2016 6:45 PM
console.log(now.format('X')); // this formats it to unix time in seconds
console.log(now.format('x')); // this is milliseconds instead of seconds (this is how javascript timestamp works)
console.log(now.valueOf()); // this is same as 'x' but returns it as a number

// in the chat app, server will pass the timestamp to the client for processing
var timestamp = 1461782595582;
var timestampMoment = moment.utc(timestamp); // this will give us the UTC

console.log(timestampMoment.local().format('h:mm a')); // the local will change the timezone for us
