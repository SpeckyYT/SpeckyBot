module.exports = {
    name: "logisticmap",
    description: "Generates the sequence obtained by Xn+1 = L*Xn*(1-Xn) ",
    category: "math",
    usage: '<number>',
    aliases: ["logistic"]
}

const { createCanvas } = require('canvas');

function formula(x,l){
    return l * x * (1-x);
}

const HEIGHT = 100;
const WIDTH = 400;
const SIZE = 5;
const OFFSET = Math.floor(SIZE/2);

module.exports.run = async (bot, msg) => {
    const canvas = createCanvas(WIDTH,HEIGHT);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#00FF00';
    ctx.fillRect(0,0,WIDTH,HEIGHT);
    ctx.fillStyle = '#000000';

    const lambda = parseFloat(msg.args[0]) || Math.random()*5;
    let xn = 0.5;

    for(let i = 0; i < WIDTH; i++){
        ctx.fillRect(i-OFFSET,xn*HEIGHT-OFFSET,SIZE,SIZE);
        xn = formula(xn,lambda);
    }

    return msg.channel.send(canvas.toBuffer().toAttachment('feigenbaum.png'))
}
