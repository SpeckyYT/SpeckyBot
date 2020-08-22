const { Attachment } = require('discord.js');
const { Canvas } = require('canvas');
const GIFEncoder = require('gifencoder');

const size = 100;

module.exports = {
    name: "speckysort",
    description: "Will sort an array with SpeckySort!",
    usage: "",
    category: "misc",
    aliases: []
}

function isSorted(array=[]){
    let prev = -Infinity;
    for(const item of array){
        if(item < prev) return false;
        prev = item;
    }
    return true;
}

module.exports.run = async (bot,msg) => {
    const canvas = new Canvas(size,size);
    const ctx = canvas.getContext('2d', {alpha:false});
    const encoder = new GIFEncoder(size,size);

    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(5);
    encoder.setQuality(10);

    encoder.out.data

    const array = Array(size).fill(0).map((_,i) => i+1).shuffle();
    let groupSize;

    if(!array) return;
    if(!groupSize) groupSize = Math.ceil(Math.sqrt(array.length));
    if(groupSize < 2) groupSize = 2;
    let index = 0;
    let loops = 0;
    return new Promise((res) => {
        function sort(){
            const group = array.slice(index, index+groupSize);
            let smallest = [Infinity, array.length];
            for(const [i, object] of group.entries()){
                if(object < smallest[0]){
                    smallest = [object, i];
                }
            }
            [array[index], array[index+smallest[1]]] = [array[index+smallest[1]], array[index]];
            index++;
            if(index > array.length-2 || index > Math.ceil(array.length-(loops*(groupSize-1))-2)){
                index = 0;
                loops++;
            }
            ctx.fillStyle = 'black'
            ctx.fillRect(0,0,size,size);
            ctx.fillStyle = 'blue'
            array.forEach((v,i,a) => {
                ctx.fillRect(i,size,1,-v)
                if(i+1 == a.length){
                // fs.writeFile("./test/img/"+iterations+".png", canvas.toBuffer(),()=>{})
                    encoder.addFrame(ctx);
                }
            });
            if(isSorted(array)){
                encoder.finish();
                return res(new Attachment(Buffer.from(encoder.out.data),'SpeckySort.gif'));
            }else{
                sort();
            }
        }
        sort();
    }).then(gif => msg.channel.send(gif));
}
