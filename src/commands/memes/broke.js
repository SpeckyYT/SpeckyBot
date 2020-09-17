module.exports = {
    name: "broke",
    description: "it broke",
    usage: "[text]",
    category: "memes"
}

const fetch = require('node-fetch');
const Canvas = require('canvas');
const fs = require('fs');

const promises = [];

const fts = (url,fn) => fetch(url)
.then(d => d.buffer())
.then(l => fs.writeFileSync(`.\\assets\\${fn}`,l));

if(!fs.existsSync('.\\assets')) fs.mkdirSync('.\\assets');
if(!fs.existsSync('.\\assets\\broke.jpg')) promises.push(fts("https://i.imgflip.com/1qge7m.jpg",'broke.jpg'));

module.exports.run = async (bot, msg) => {
    await Promise.all(promises);

    const canvas = Canvas.createCanvas(1509,1348);
    const ctx = canvas.getContext('2d');

    let { broke } = this;
    if(!broke) broke = await Canvas.loadImage('.\\assets\\broke.jpg');

    ctx.font = "90px IMPACT";
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.lineWidth = 15;

    if(msg.cmdContent.toLowerCase() == bot.user.username.toLowerCase()){
        return bot.cmdError(`${bot.user.username} broke`)
    }

    const text = (msg.cmdContent || bot.user.username).trim();

    ctx.drawImage(broke,0,0);
    [
        [`hello, ${text}?`,22,640,700],
        [`${text} broke`,800,640,700],
        ["understandable. have a great day",22,1300,1400]
    ]
    .forEach(([t,...p]) => ctx.strokeText(t.toUpperCase(),...p) || ctx.fillText(t.toUpperCase(),...p))

    return msg.channel.send(canvas.toBuffer('image/jpeg', {quality: 0.25}).toAttachment('broke.jpg'));
}
