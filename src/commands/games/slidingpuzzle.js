module.exports = {
    name: "sliding",
    description: "Lets you play a sliding puzzle!",
    usage: "",
    category: "games",
    aliases: ["slide","slidingpuzzle"]
}

const Canvas = require('canvas');
const size = 512;

module.exports.run = async (bot, msg) => {
    const field = Array(16).fill(0).map((v,i) => i);

    function isSorted(arr){
        return arr.every((v,i) => v == [1,2,3,4,5,6,7,8,9,10,12,13,14,15,0][i]);
    }

    /*
    NOTE: By swapping two items of the array (without doing "fake" swaps)
    an even amount of times it won't create impossible scenarios
    */
    function shuffle(){
        for(let i = 0; i < 128; i++){
            const ind = field.indexOf(0);
            let a = Math.floor(Math.random()*16);
            while(a == ind) a = Math.floor(Math.random()*16);
            [field[ind],field[a]] = [field[a],field[ind]];
        }
        if(isSorted(field)){
            shuffle();
        }
    }
    shuffle();

    let moves = 0;
    const start = new Date();

    function recursion(m){
        if(m) m.delete().catch(()=>{});
        return msg.channel.send("`up`, `down`, `left`, `right`", draw(field))
        .then(ms => {
            const collector = ms.channel.createCollector(m => m.author.id == msg.author.id, {time: 30000});
            let runned = false;
            collector.on('collect', m => {
                if(['up','down','left','right','u','d','l','r'].includes(m.content.toLowerCase())){
                    m.delete().catch(()=>{});
                    runned = true;
                    moves++;
                    const index0 = field.indexOf(0);
                    const [x,y] = [index0 % 4, Math.floor(index0 / 4)];
                    switch(m.content.toLowerCase()){
                        case 'up':
                        case 'u':
                            if(y > 0)
                                [field[index0],field[index0-4]] = [field[index0-4],field[index0]];
                            break;
                        case 'down':
                        case 'd':
                            if(y < 3)
                                [field[index0],field[index0+4]] = [field[index0+4],field[index0]];
                            break;
                        case 'left':
                        case 'l':
                            if(x > 0)
                                [field[index0],field[index0-1]] = [field[index0-1],field[index0]];
                            break;
                        case 'right':
                        case 'r':
                            if(x < 3)
                                [field[index0],field[index0+1]] = [field[index0+1],field[index0]];
                            break;
                    }
                    collector.stop();
                    if(isSorted(field)){
                        ms.delete().catch(()=>{});
                        return msg.channel.send(`YOU WON!\nMoves: ${moves}\nTime: ${Math.floor((new Date().getTime()-start.getTime())/1000)} seconds`, draw(field));
                    }else{
                        return recursion(ms);
                    }
                }
            })
            collector.on('end', () => {
                if(!runned){
                    return ms.edit(`${ms.content}\n\nTIME ELAPSED`);
                }
            })
        })
        .catch(e => bot.cmdError('Unexpected error happened'));
    }

    return recursion();
}

function draw(arr){
    const canvas = Canvas.createCanvas(size,size);
    const ctx = canvas.getContext('2d',{alpha: true});
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.font = `${Math.ceil(size/16)}px sans-serif`;
    ctx.textAlign = "center";
    arr.forEach((v,i) => {
        if(v > 0){
            if(v%2){
                ctx.fillStyle = "rgb(255,0,0)";
            }else{
                ctx.fillStyle = "rgb(255,255,255)";
            }
        }else{
            ctx.fillStyle = "rgb(0,0,0)"
        }
        ctx.fillRect((size/4)*(i%4),(size/4)*(Math.floor(i/4)),size/4,size/4);

        if(v > 0){
            if(v%2){
                ctx.fillStyle = "rgb(255,255,255)";
            }else{
                ctx.fillStyle = "rgb(255,0,0)";
            }
        }
        ctx.fillText(String(v),(size/4)*(i%4)+(size/8),(size/4)*(Math.floor(i/4))+(size/8));
    });
    return canvas.toBuffer().toAttachment('field.png');
}
