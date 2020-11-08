module.exports = {
    name: "coinflip",
    description: "Flips a coin for you!",
    category: "games"
}

const { Canvas } = require('canvas');

const size = 512;

module.exports.run = async (bot, msg) => {
    const canvas = new Canvas(size,size);
    const ctx = canvas.getContext('2d');

    const middle = size/2;
    const radius = size/2-middle/16;
    const second = radius*0.75;

    const sil = ctx.createLinearGradient(0, 0, size, size);
    const colorSilA = 'rgb(150,150,150)';
    const colorSilB = 'rgb(255,255,255)';
    sil.addColorStop(0, colorSilA);
    sil.addColorStop(0.5, colorSilB);
    sil.addColorStop(1, colorSilA);

    const gol = ctx.createLinearGradient(0, 0, size, size);
    const colorGolA = 'rgb(210,178,124)';
    const colorGolB = 'rgb(255,239,198)';
    gol.addColorStop(0, colorGolA);
    gol.addColorStop(0.5, colorGolB);
    gol.addColorStop(1, colorGolA);

    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.beginPath();
    ctx.ellipse(middle, middle, radius+5, radius+5, Math.PI, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = sil;
    ctx.beginPath();
    ctx.ellipse(middle, middle, radius, radius, Math.PI, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.beginPath();
    ctx.ellipse(middle, middle, second+2, second+2, Math.PI, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = gol;
    ctx.beginPath();
    ctx.ellipse(middle, middle, second, second, Math.PI, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.textAlign = "center";
    ctx.font = `${Math.ceil(size/5)}px Arial`;
    ctx.fillText(Math.round(Math.random()) ? 'HEAD' : 'TAIL', middle, middle+Math.ceil(size/4)/3);

    return msg.channel.send(canvas.toBuffer().toAttachment('coin.png'))
}
