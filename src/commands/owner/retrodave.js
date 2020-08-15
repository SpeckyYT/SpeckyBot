module.exports = {
    name: "retrodave",
    description: "Creates an image from Retro Dave's level data!",
    usage: `<level data>`,
    category: `owner`,
    aliases: ["rd"]
}

const { Canvas } = require('canvas');
const { Attachment } = require('discord.js');

module.exports.run = async (bot, msg) => {
    const level = msg.cmdContent
    .replace(/{/g, '[')
    .replace(/}/g,']')
    .replace(/s(Up|Down|Left|Right)/g, '"s$1"')
    .replace(/,\W*\]/g, ']');
    try{
        const levelData = JSON.parse(level);

        const canvas = new Canvas(1280,720);
        const context = canvas.getContext('2d',{alpha: false});

        context.strokeStyle = 'rgba(0,100,0,1)'
        context.fillStyle = context.strokeStyle
        context.fillRect(0,0,1280,720);
        context.strokeStyle = 'rgba(0,255,0,1)'
        context.fillStyle = context.strokeStyle
        levelData.forEach((object, i, a) => {
            if(typeof object[0] == "string"){
                if(typeof object.last() == "string"){
                    context.beginPath();
                    if(object.last() == "sUp"){
                        object[1] = object[1]-100; object[2] = object[2];
                        context.moveTo(object[1], object[2]);
                        context.lineTo(object[1]+25, object[2]-50);
                        context.lineTo(object[1]+50, object[2]);
                    }else if(object.last() == "sDown"){
                        object[1] = object[1]+50; object[2] = object[2]+50;
                        context.moveTo(object[1], object[2]);
                        context.lineTo(object[1]+25, object[2]+50);
                        context.lineTo(object[1]+50, object[2]);
                    }else if(object.last() == "sLeft"){
                        context.lineTo(object[1], object[2]+50);
                        context.lineTo(object[1], object[2]);
                    }else if(object.last() == "sRight"){
                        context.lineTo(object[1]+25, object[2]+50);
                        context.lineTo(object[1]+50, object[2]);
                    }
                    context.closePath();
                    context.stroke();
                    context.fill();
                }else{

                }
            }else{
                context.fillRect(...object);
            }

            if(i+1 >= a.length){
                return msg.channel.send(new Attachment(canvas.toBuffer(),'level.png'));
            }
        })

    }catch(err){
        return bot.cmdError('Level is invalid')
    }
}
