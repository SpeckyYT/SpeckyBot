module.exports = {
    name: "gameoflife",
    description: "Gives you a Game Of Life GIF!",
    category: "misc",
    aliases: ["gol"]
}

const Canvas = require('canvas');
const GIFEncoder = require('gifencoder');

const pixels = 50;
const multiplier = 2;
const size = pixels * multiplier;

module.exports.run = async (bot, msg) => {
    const frames = [];
    const proofs = [];

    const GOL = Array(pixels).fill().map(()=>Array(pixels).fill().map(()=>Math.round(Math.random())));

    for(let i=0; i<100; i++){
        const oldGOL = [...GOL];

        for(let x=0; x<pixels; x++){
            for(let y=0; y<pixels; y++){
                await bot.async();
                let aliveNear = 0;
                for(let i=-1; i<=1; i++){
                    for(let j=-1; j<=1; j++){
                        if(j==0 && i==0) continue;
                        if(x+i < 0 || x+i >= pixels) continue;
                        if(y+j < 0 || y+j >= pixels) continue;
                        aliveNear += oldGOL[x+i][y+j];
                    }
                }
                if(oldGOL[x][y]){ // is alive
                    if(aliveNear < 3 || aliveNear > 3) GOL[x][y] = 0; // die
                }else{ // is dead
                    if(aliveNear == 3) GOL[x][y] = 1; // revive
                }
            }
        }

        const canvas = Canvas.createCanvas(size,size);
        const ctx = canvas.getContext('2d',{alpha:false});

        for(let x=0; x<pixels; x++){
            for(let y=0; y<pixels; y++){
                ctx.fillStyle = GOL[x][y] ? 'rgb(255,255,255)' : 'rgb(0,0,0)';
                ctx.fillRect(x*multiplier,y*multiplier,multiplier,multiplier);
            }
        }

        frames.push(ctx);
        if(proofs.includes(GOLtoString(GOL))) break;
        proofs.push(GOLtoString(GOL));
    }

    const encoder = new GIFEncoder(size,size);
    encoder.start();
    encoder.setRepeat(-1);
    encoder.setDelay(250);
    encoder.setQuality(0);

    for(let ctx of frames){
        await new Promise(res => bot.setImmediate(res));
        encoder.addFrame(ctx)
    }
    encoder.finish();

    return msg.channel.send(Buffer.from(encoder.out.data).toAttachment('GameOfLife.gif'));
}

function GOLtoString(GOL){
    return GOL.map(v=>v.join('')).join('');
}
