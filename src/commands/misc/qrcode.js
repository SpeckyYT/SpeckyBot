module.exports = {
    name: "qrcode",
    description: "Creates a QRCode for you!",
    usage: `<text>`,
    category: "misc",
    aliases: ["qr"]
}

const qrcode = require('qrcode');

module.exports.run = async (bot, msg) => {
    return qrcode.toString(msg.cmdContent,(e,s)=>{
        return msg.channel.send(s.replace(/( +)\n( +)/g,'\n').trim(),{code:'js'});
    })
}
