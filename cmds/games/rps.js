const random = require('random');

random.int(min = 0, max = 1)

module.exports.run = async (bot, msg, args) => {
    console.log(`RPS: actived by ${msg.author.username} (${msg.author.id})`);

    if(!args[0]) return msg.channel.send("You have to define a handsign (Rock | Scissors | Paper)");

    var value;
    var rng;

    if(args[0] === "rock"){
        value = 1;
        console.log("Rock");
    }
    if(args[1] === "paper"){
        value = 2;
        console.log("Paper");
    }
    if(args[0] === "scissors"){
        value = 3;
        console.log("Scissors");
    }

    rng = (random.int(0, 99999999) % 3) + 1;
    var rng_str

    if(rng === 1){
        rng_str = 'Rock';
    }else if(rng === 2){
        rng_str = 'Paper'
    }else{
        rng_str = 'Scissors'
    }

    msg.channel.send(rng_str);

    var win = 0;    //0 = lose | 1 = draw | 2 = win

    if(value === 1){
        if(rng === 1){win = 1}
        if(rng === 2){win = 0}
        if(rng === 3){win = 2}
    }else if(value === 2){
        if(rng === 1){win = 2}
        if(rng === 2){win = 1}
        if(rng === 3){win = 0}
    }else{
        if(rng === 1){win = 0}
        if(rng === 2){win = 2}
        if(rng === 3){win = 1}
    }

    if(win === 0){
        msg.channel.send('> You lost');
    }else if(win === 1){
        msg.channel.send('> This was a draw');
    }else if(win === 2){
        msg.channel.send('> You won!!!');
    }
}

module.exports.help = {
    name: "rps"
}
