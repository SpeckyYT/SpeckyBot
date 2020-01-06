const m3u8stream = require('m3u8stream');

const parseTime = require('m3u8stream/dist/parse-time');

require('./handlers/generalhandler')();

const { prefix } = require("./config.json");

console.log(`Bot prefix: ${prefix}`);
