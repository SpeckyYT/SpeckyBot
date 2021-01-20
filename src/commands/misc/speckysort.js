module.exports = {
    name: "speckysort",
    description: "Will sort an array with SpeckySort!",
    category: "misc"
}

const { Canvas } = require('canvas');
const GIFEncoder = require('gifencoder');

const size = 128;

function isSorted(array=[]){
    let prev = -Infinity;
    for(const item of array){
        if(item < prev) return false;
        prev = item;
    }
    return true;
}

module.exports.run = async (bot,msg) => {
    const m = await msg.channel.send('Generating your epic SpeckySort GIF!\n(this usually takes some time...)');
    const array = Array(size).fill(0).map((_,i) => i+1);

    const ctxs = [];

    for(let i = 0; i < array.length; i++){
        const rng = Math.floor(Math.random()*array.length);
        [array[i],array[rng]] = [array[rng],array[i]];
    }

    let groupSize;

    if(!array) return;
    if(!groupSize) groupSize = Math.ceil(Math.sqrt(array.length));
    if(groupSize < 2) groupSize = 2;
    let index = 0;
    let loops = 0;

    const encoder = new GIFEncoder(size,size);

    encoder.start();
    encoder.setRepeat(-1);
    encoder.setDelay(5);
    encoder.setQuality(0);

    while(!isSorted(array)){
        await bot.async();

        const group = array.slice(index, index+groupSize);
        const smallest = [Infinity, array.length];

        for(const [i, object] of group.entries()){
            if(object < smallest[0]){
                smallest[0] = object;
                smallest[1] = i;
            }
        }

        [array[index], array[index+smallest[1]]] = [array[index+smallest[1]], array[index]];
        index++;

        if(index > array.length-2 || index > Math.ceil(array.length-(loops*(groupSize-1))-2)){
            index = 0;
            loops++;
        }

        const canvas = new Canvas(size,size);
        const ctx = canvas.getContext('2d', {alpha:false});

        ctx.fillStyle = 'rgb(0,0,0)'
        ctx.fillRect(0,0,size,size);
        ctx.fillStyle = 'rgb(0,255,0)'
        array.forEach((v,i) => ctx.fillRect(i,size,1,-v));
        ctxs.push(ctx);
    }

    await m.edit('Finished sorting!\nGenerating the GIF...')

    for(let ctx of ctxs){
        await bot.async();
        encoder.addFrame(ctx)
    }
    encoder.finish();

    await m.delete().catch(()=>{})
    return msg.channel.send(Buffer.from(encoder.out.data).toAttachment('speckysort.gif'));
}
