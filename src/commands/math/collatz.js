module.exports = {
    name: "collatz",
    description: "Gives you the collatz sequence!",
    usage: "[number]",
    category: "math",
    aliases: ["coll"]
}

const qdb = require('quick.db');
const misc = new qdb.table('misc');

module.exports.run = async (bot, msg) => {
    const collatz = [];
    let numb = misc.get('collatz') || 2;

    let startNumb = numb;

    if(!isNaN(msg.args[0])){
        numb = msg.args[0];
        startNumb = false;
    }

    async function coll(){
        collatz.push(numb);
        if(numb == 1){
            return;
        }
        numb = numb%2 ? 3*numb+1 : numb/2;
        if(collatz.join(" ").length >= 1980){
            collatz.pop();
            return;
        }else{
            await coll();
        }
    }
    await coll();

    if(startNumb) misc.set('collatz', startNumb + 1);
    return msg.channel.send(collatz.join(" "),{code:'js'});
}
