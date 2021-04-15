module.exports = {
    name: "spongebob",
    description: "Me when e, me when h",
    usage: "[text] | [text]",
    category: "memes",
    aliases: ['mewhen']
}

const Canvas = require('canvas');
const save = global.modules.saveAsset;

const promise = save("https://i.imgur.com/DfAA2DY.png",'spongebob.png')

module.exports.run = async (bot, msg) => {
    await promise;

    const canvas = Canvas.createCanvas(790,544);
    const ctx = canvas.getContext('2d');

    let { spongebob } = this;
    if(!spongebob) spongebob = await Canvas.loadImage(global.assets.spongebob);

    ctx.drawImage(spongebob,0,0);

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(116,96,183,41);
    ctx.fillRect(515,64,190,44);

    const texts = msg.cmdContent.split('|').filter(s=>s);

    const examples = [
        ['cereal without milk','cereal with milk'],
        ['math with calculator','math by head'],
        ['me when e','me when h'],
        ['me when mee6','me when speckybot'],
        ['me when 3d model','me when 2d drawing'],
        ['Python','JavaScript'],
        ['my signature',"my mom's signature"],
    ];

    let text1, text2;

    if(texts.length >= 2) [text1,text2] = texts;
    if(!text1 || !text2) [text1,text2] = examples.pick().map(t=>t.trim());

    ctx.textAlign = 'center';
    ctx.font = '32px Arial';
    ctx.fillStyle = '#000000';

    ctx.fillText(text1,200,150,400);
    ctx.fillText(text2,575,75,400);

    return msg.channel.send(canvas.toBuffer().toAttachment('spongebob.png'));
}
