module.exports = {
    name: "bouncy",
    description: "Gives yo a gif of a bouncing ball!",
    category: "utilities",
}

const Canvas = require('canvas');
const gec = require('gifencoder');

const size = 512;
const frames = 256;
const gravity = size/128;
const maxSpeed = size/4;
const iconSize = size/16;
const bouncy = 0.9;

module.exports.run = async (bot, msg) => {
    const m = await msg.channel.send('Generating your epic bouncing cube GIF!\n(this usually takes a lot of time...)');

    const pos = {
        x: Math.floor(Math.random()*size),
        y: Math.floor(Math.random()*size)
    }
    const speed = {
        x: Math.floor(Math.random()*2*maxSpeed-maxSpeed),
        y: Math.floor(Math.random()*2*maxSpeed-maxSpeed)
    }

    const g = new gec(size,size);
    g.start();
    g.setDelay(0);
    g.setRepeat(-1);
    g.setQuality(10);

    const canvas = Canvas.createCanvas(size,size);
    const ctx = canvas.getContext('2d');

    let zeroCounter = 0;

    for(let i = 0; i < frames; i++){
        await new Promise(res => bot.setImmediate(res));

        // PHYSICS
        speed.y += gravity

        pos.x += speed.x
        pos.y += speed.y

        if(pos.y > size-iconSize){
            pos.y = size-iconSize;
            speed.y *= -bouncy;
        }else if(pos.y < 0){
            pos.y = 0;
            speed.y *= -bouncy;
        }
        if(pos.x > size-iconSize){
            pos.x = size-iconSize;
            speed.x *= -bouncy;
        }else if(pos.x < 0){
            pos.x = 0;
            speed.x *= -bouncy;
        }

        // DRAW
        ctx.fillStyle = '#000000';
        ctx.fillRect(0,0,size,size);
        ctx.fillStyle = '#FF00AA';
        ctx.fillRect(pos.x,pos.y,iconSize,iconSize);

        // GIF
        g.addFrame(ctx);

        if(pos.y > canvas.height-(1.5*iconSize)){
            zeroCounter++;
            if(zeroCounter > 9){
                break;
            }
        }else{
            zeroCounter = 0;
        }
    }
    g.finish();

    await m.delete().catch(()=>{});
    return msg.channel.send(Buffer.from(g.out.data).toAttachment('bouncy.gif'));
}
