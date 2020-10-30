const fetch = require('node-fetch');
const { buffer } = require('terminal-image');


fetch(process.argv[2])
.then(data => data.buffer())
.then(data => buffer(data))
.then(data => console.log(data))
.then(() => process.exit(0))
