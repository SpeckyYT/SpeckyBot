const Canvas = require('canvas');
const gec = require('gifencoder');

const size = 512;
const frames = 256;
const gravity = size/128;
const maxSpeed = size/4;
const iconSize = size/16;
const bouncy = 0.9;

let posX = Math.floor(Math.random()*size);
let posY = Math.floor(Math.random()*size);
const vector = {
    x: Math.floor(Math.random()*2*maxSpeed-maxSpeed),
    y: Math.floor(Math.random()*2*maxSpeed-maxSpeed)
}

const g = new gec(size,size);
g.start();
g.setDelay(0);
g.setRepeat(-1);
g.setQuality(10);

let zeroCounter = 0;

for(let i = 0; i < frames; i++){
    const canvas = Canvas.createCanvas(size,size);
    const ctx = canvas.getContext('2d');

    // PHYSICS
    vector.y += gravity

    posX += vector.x
    posY += vector.y

    if(posY > size-iconSize){
        posY = size-iconSize;
        vector.y *= -bouncy;
    }else if(posY < 0){
        posY = 0;
        vector.y *= -bouncy;
    }
    if(posX > size-iconSize){
        posX = size-iconSize;
        vector.x *= -bouncy;
    }else if(posX < 0){
        posX = 0;
        vector.x *= -bouncy;
    }

    // DRAW
    ctx.fillStyle = '#000000';
    ctx.fillRect(0,0,size,size);
    ctx.fillStyle = '#FF00AA';
    ctx.fillRect(posX,posY,iconSize,iconSize);

    // GIF
    g.addFrame(ctx);

    if(posY > canvas.height-(1.5*iconSize)){
        zeroCounter++;
        if(zeroCounter > 9){
            break;
        }
    }else{
        zeroCounter = 0;
    }
}
g.finish();
console.log(Buffer.from(g.out.data).toString('base64'));
