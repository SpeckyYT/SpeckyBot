module.exports = {
    event: "message"
}

const osr = require('node-osr');
const { parseReplay } = require('osureplayparser');
const { createWriteStream, unlink } = require('fs');
const { get } = require('https')

module.exports.call = async (bot, msg) => {
    if(msg.attachments.size < 1) return;

    msg.attachments.forEach(async attachment => {
        if(!attachment.filename.endsWith('.osr')) return;

        let sf = `${bot.snowflake()}.osr`;
    })
}