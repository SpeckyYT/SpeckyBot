module.exports = {
    name: "sliding",
    description: "Lets you play a sliding puzzle!",
    usage: "",
    category: "games",
    aliases: ["slide","slidingpuzzle"]
}

const Canvas = require('canvas');
const gec = require('gifencoder');

const size = 512;
const sortedField = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];

module.exports.run = async (bot, msg) => {
    const field = Array(16).fill(0).map((v,i) => i);

    const encoder = new gec(size,size);
    encoder.setRepeat(-1);
    encoder.setDelay(150);
    encoder.setQuality(1);
    encoder.start();

    function isSorted(arr){
        return arr.every((v,i) => v == sortedField[i]);
    }
    function toPosition(ind){
        return [ind % 4, Math.floor(ind / 4)];
    }
    function shuffle(){
        for(let i = 0; i < 64; i++){
            const ind = field.indexOf(0);
            let a = Math.floor(Math.random()*16);
            while(a == ind) a = Math.floor(Math.random()*16);
            [field[ind],field[a]] = [field[a],field[ind]];
        }

        const newField = [...field];
        let steps = 0;
        for(let i = 0; i < field.length; i++){
            for(let j = i+1; j < field.length; j++){
                if(newField[i] === sortedField[j]){
                    if(i!=j){
                        [newField[i],newField[j]] = [newField[j],newField[i]];
                        steps++;
                    }
                }
            }
        }
        const [x,y] = toPosition(field.indexOf(0));
        if(isSorted(field) || ((steps%2) != ((x+y)%2))){
            shuffle();
        }
    }
    shuffle();

    let moves = 0;
    const start = new Date();

    function recursion(m){
        if(m) m.delete().catch(()=>{});
        return msg.channel.send(
            ["up","down","left","right",null,"u","d","l","f",null,"8","5","4","6"]
            .map(v => v ? "`"+v+"`," : '\n')
            .join(' '),
            draw(field,encoder))
        .then(ms => {
            const collector = ms.channel.createCollector(m => m.author.id == msg.author.id, {time: 30000});
            let runned = false;
            collector.on('collect', m => {
                if(['up','down','left','right','u','d','l','r','4','5','6','8'].includes(m.content.toLowerCase())){
                    m.delete().catch(()=>{});
                    runned = true;
                    moves++;
                    const index0 = field.indexOf(0);
                    const [x,y] = toPosition(index0);
                    switch(m.content.toLowerCase()){
                        case 'up':
                        case 'u':
                        case '8':
                            if(y > 0)
                                [field[index0],field[index0-4]] = [field[index0-4],field[index0]];
                            break;
                        case 'down':
                        case 'd':
                        case '5':
                            if(y < 3)
                                [field[index0],field[index0+4]] = [field[index0+4],field[index0]];
                            break;
                        case 'left':
                        case 'l':
                        case '4':
                            if(x > 0)
                                [field[index0],field[index0-1]] = [field[index0-1],field[index0]];
                            break;
                        case 'right':
                        case 'r':
                        case '6':
                            if(x < 3)
                                [field[index0],field[index0+1]] = [field[index0+1],field[index0]];
                            break;
                    }
                    collector.stop();
                    if(isSorted(field)){
                        ms.delete().catch(()=>{});
                        msg.channel.send(`YOU WON!\nMoves: ${moves}\nTime: ${Math.floor((new Date().getTime()-start.getTime())/1000)} seconds`, draw(field,encoder));
                        encoder.finish();
                        return msg.channel.send(Buffer.from(encoder.out.data).toAttachment('SlidingPuzzle.gif'))
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

function draw(arr,encoder){
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
    if(encoder){
        encoder.addFrame(ctx);
    }
    return canvas.toBuffer().toAttachment('field.png');
}
