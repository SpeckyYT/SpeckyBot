const { Canvas } = require('canvas');
const GIFEncoder = require('gifencoder');

const size = 100;
const canvas = new Canvas(size,size);
const ctx = canvas.getContext('2d', {alpha:false});
const encoder = new GIFEncoder(size,size);

const array = Array(size).fill(0).map((_,i) => i+1);

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

function isSorted(array=[]){
    let prev = -Infinity;
    for(const item of array){
        if(item < prev) return false;
        prev = item;
    }
    return true;
}

encoder.start();
encoder.setRepeat(-1);
encoder.setDelay(5);
encoder.setQuality(0);

while(!isSorted(array)){
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
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,size,size);
    ctx.fillStyle = 'blue'
    array.forEach((v,i,a) => {
        ctx.fillRect(i,size,1,-v)
        if(i+1 == a.length){
            encoder.addFrame(ctx);
        }
    });
}
encoder.finish();
console.log(Buffer.from(encoder.out.data).toString('base64'));
