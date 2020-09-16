module.exports = {
    name: "broke",
    description: "it broke",
    usage: "[text]",
    category: "misc"
}

const fetch = require('node-fetch');
const Canvas = require('canvas');
const fs = require('fs');

const brokeURL = "https://i.imgflip.com/1qge7m.jpg";

const promises = [];

const fts = (url,fn) => fetch(url)
.then(d => d.buffer())
.then(l => fs.writeFileSync(`${__dirname}\\assets\\${fn}`,l));

if(!fs.existsSync(__dirname+'\\assets')) fs.mkdirSync(__dirname+'\\assets');
if(!fs.existsSync(__dirname+'\\assets\\broke.jpg')) promises.push(fts(brokeURL,'broke.jpg'));

module.exports.run = async (bot, msg) => {
    await Promise.all(promises);

    const canvas = Canvas.createCanvas(1509,1348);
    const ctx = canvas.getContext('2d');

    let { broke } = this;
    if(!broke) broke = await Canvas.loadImage(__dirname+'\\assets\\broke.jpg');

    ctx.font = "90px IMPACT";
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.lineWidth = 15;

    const text = msg.cmdContent || bot.user.username;

    ctx.drawImage(broke,0,0);
    [
        [`hello, ${text}?`,22,640,700],
        [`${text} BROKE`,800,640,700],
        ["understandable. have a great day",22,1300,1400]
    ]
    .forEach(([t,...p]) => ctx.strokeText(t.toUpperCase(),...p) || ctx.fillText(t.toUpperCase(),...p))

    return msg.channel.send(canvas.toBuffer('image/jpeg', {quality: 0.25}).toAttachment('broke.jpg'));
}
