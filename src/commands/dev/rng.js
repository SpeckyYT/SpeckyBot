module.exports = {
    name: "rng",
    description: "Stuff!",
    usage: '[seed]',
    category: "dev",
}

const { Canvas } = require('canvas');
const seedrandom = require('seedrandom');

const outline = 50;
const divisions = 50;
const horizontals = 10;

module.exports.run = async (bot, msg) => {
    const rng = new seedrandom(msg.cmdContent);

    const canvas = new Canvas(2000,1000);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#000000';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle = '#00FF00';
    const rect = [
        outline,
        outline,
        canvas.width-2*outline,
        canvas.height-2*outline,
    ];
    ctx.fillRect(...rect);

    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#005500';
    for(let i = 1; i < horizontals; i++){
        const h = outline + i * (canvas.height-2*outline) / horizontals;
        ctx.moveTo(outline, h);
        ctx.lineTo(canvas.width-outline, h);
        ctx.stroke();
    }
    ctx.closePath();

    ctx.beginPath();
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#00FF00';
    for(let i = 0; i < divisions; i++){
        const input = [
            outline + i*(canvas.width-2*outline)/(divisions-1),
            outline + Math.abs(1 - rng()) * (canvas.height-2*outline)
        ]
        if(!i) ctx.moveTo(...input);
        else if(i) ctx.lineTo(...input)

    }
    ctx.stroke();
    ctx.closePath();

    ctx.lineWidth = 10;
    ctx.strokeRect(...rect);

    return msg.channel.send(canvas.toBuffer().toAttachment('rng.png'));
}
