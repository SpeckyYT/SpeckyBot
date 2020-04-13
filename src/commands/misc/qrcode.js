module.exports = {
    name: "qrcode",
    description: "Creates a QRCode for you!",
    usage: `<text>`,
    category: `misc`,
    accessableby: "Members",
    aliases: ["qr"]
}

const qrcode = require('qrcode');

module.exports.run = async (bot, msg) => {
    qrcode.toString(msg.content,(e,s)=>{
        return msg.channel.send(`\`\`\`\n${s.replace(/( +)\n( +)/g,'\n').trim()}\n\`\`\``);
    })
}
