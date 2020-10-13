module.exports = {
    name: "waifulabs",
    description: "Gives you waifus to choose from!",
    category: 'misc',
    cooldown: 30000,
    aliases: ['ws','waifus']
}

const waifulabs = require('waifulabs');
const Canvas = require('canvas');

const waifuSize = 200;

module.exports.run = async (bot, msg) => {
    async function generateWaifuAttachment(prevWaifu){
        const waifuImage = (await waifulabs.generateBigWaifu(prevWaifu)).image;
        const waifuBuffer = Buffer.from(waifuImage, 'base64');
        const waifuAttachment = waifuBuffer.toAttachment("waifu.png");
        return waifuAttachment;
    }

    const stepsWaifus = []
    const canvas = Canvas.createCanvas(waifuSize*4, waifuSize*4);
    const waifuCanvas = canvas.getContext("2d", {alpha: false});

    async function request(prevWaifu, step = 0){
        if(step > 3) return prevWaifu && msg.channel.send(await generateWaifuAttachment(prevWaifu));
        let newWaifus;
        Promise.all([
            (async () => stepsWaifus[step] || waifulabs.generateWaifus(prevWaifu || undefined, step || 0))()
            .then(waifus => {
                newWaifus = waifus;
                stepsWaifus[step] = newWaifus
                return waifus.forEach((w,i) => {
                    Canvas.loadImage(Buffer.from(w.image, 'base64'))
                    .then(img => waifuCanvas.drawImage(img, (i%4)*waifuSize, Math.floor(i/4)*waifuSize))
                })
            }),
            prevWaifu && generateWaifuAttachment(prevWaifu)
        ]).then(async ([_,att]) => {
            if(step > 0 && att){
                await msg.channel.send(att);
            }
            return msg.channel.send(
                String(
                    [
                        "+ Choose your initial waifu",
                        "+ Tune the color palette",
                        "+ Fine tune the details",
                        "+ Finish with your favourite pose!"
                    ][step]
                )
                .code('diff')
                +
                String(
                    (step != 0 ? "# C to cancel\n# S to skip\n# B to go back\n":"")+"# R to reload the grid"
                )
                .code('md')
                +
                String(
                    "| 1  | 2  | 3  | 4  |\n"+
                    "| 5  | 6  | 7  | 8  |\n"+
                    "| 9  | 10 | 11 | 12 |\n"+
                    "| 13 | 14 | 15 | 16 |"
                )
                .code('c'),
                canvas.toBuffer().toAttachment("waifus.png")
            )
            .then(m => {
                const filter = (ms) => (ms.author.id == msg.author.id) && [...(step != 0 ? ['c','s','b'] : []),'r',...Array(16).fill().map((_,i)=>(i+1).toString())].some(v => ms.content.toLowerCase() == v.toLowerCase());
                let runned = false;
                const collector = m.channel.createMessageCollector(filter, {time: 30000});
                collector.on('collect', async m => {
                    runned = true;
                    collector.stop();
                    switch(m.content.toLowerCase()){
                        case "c":
                            att && msg.channel.send(att); break;
                        case "s":
                            request(prevWaifu, step+1); break;
                        case "b":
                            stepsWaifus[step] = null;
                            request(prevWaifu, step-1); break;
                        case "r":
                            stepsWaifus[step] = null;
                            request(prevWaifu, step); break;
                        default:
                            request(newWaifus[Number(m.content-1)], step+1);
                    }
                })
                collector.on('end', async () => {
                    if(!runned){
                        att && msg.channel.send(att);
                        return m.edit(m.content+"\nTIME ELAPSED!");
                    }
                })
            })
        })
    }
    return request();
}
