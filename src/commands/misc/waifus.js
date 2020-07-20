module.exports = {
    name: "waifus",
    description: "Gives you waifus to choose from!",
    usage: '',
    category: 'misc',
    aliases: ['ws']
}

const waifulabs = new (require('waifulabs'))();
const Canvas = require('canvas');
const { Attachment } = require('discord.js');

const waifuSize = 200;

module.exports.run = async (bot, msg) => {
    const canvas = Canvas.createCanvas(waifuSize*4, waifuSize*4);
    const waifuCanvas = canvas.getContext("2d", {alpha: false});

    async function request(prevWaifu, step = 0){
        if(step > 3){
            return waifulabs.generateBigWaifu(prevWaifu)
            .then(w => {
                msg.channel.send(new Attachment(Buffer.from(w.image, 'base64'), "waifu.png"));
            })
        }
        let newWaifus;
        await waifulabs.generateWaifus(prevWaifu || undefined, step || 0)
        .then(async waifus => {
            newWaifus = waifus;
            return waifus.forEach((w,i) => {
                Canvas.loadImage(Buffer.from(w.image, 'base64'))
                .then(img => waifuCanvas.drawImage(img, (i%4)*waifuSize, Math.floor(i/4)*waifuSize))
            })
        }).then(() => {
            if(step > 0){
                msg.channel.send(new Attachment(Buffer.from(prevWaifu.image, 'base64'), "waifu.png"));
            }
            return msg.channel.send(
                "```diff\n+ "
                +[
                    "Choose your initial waifu",
                    "Tune the color palette",
                    "Fine tune the details",
                    "Finish with your favourite pose!"
                ][step]+
                "\n```\n"+
                "```md\n"+
                (step != 0 ? "# C to cancel\n# S to skip\n# B to go back\n":"")+"# R to reload the grid"+
                "\n```\n"+
                "```c\n"+
                "| 1  | 2  | 3  | 4  |\n"+
                "| 5  | 6  | 7  | 8  |\n"+
                "| 9  | 10 | 11 | 12 |\n"+
                "| 13 | 14 | 15 | 16 |\n"+
                "\n```\n",
                new Attachment(canvas.toBuffer(), "waifus.png"))
            .then(m => {
                const filter = (ms) => (ms.author.id == msg.author.id) && [...(step != 0 ? ['c','s','b'] : []),'r',...Array(16).fill().map((_,i)=>(i+1).toString())].some(v => ms.content.toLowerCase() == v.toLowerCase());
                let runned = false;
                const collector = m.channel.createMessageCollector(filter, {time: 30000});
                collector.on('collect', async m => {
                    runned = true;
                    collector.stop();
                    switch(m.content.toLowerCase()){
                        case "c":
                            if(prevWaifu) msg.channel.send(new Attachment(Buffer.from((await waifulabs.generateBigWaifu(prevWaifu)).image, 'base64'), "waifu.png")); break;
                        case "s":
                            request(prevWaifu, step+1); break;
                        case "b":
                            request(prevWaifu, step-1); break;
                        case "r":
                            request(prevWaifu, step); break;
                        default:
                            request(newWaifus[Number(m.content-1)], step+1);
                    }
                })
                collector.on('end', async () => {
                    if(!runned && prevWaifu){
                        m.edit(m.content+"\nTIME ELAPSED!");
                        msg.channel.send(new Attachment(Buffer.from((await waifulabs.generateBigWaifu(prevWaifu)).image, 'base64'), "waifu.png"));
                    }
                })
            })
        })
    }
    return await request();
}
