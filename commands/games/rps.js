module.exports = {
    name: "rps",
	description: "Lets you play Rock Paper Scissors with the bot!",
    usage: `<handsign>`,
    category: `games`,
	accessableby: "Members",
    aliases: ["rsp", "rockpaperscissors","rockscissorspaper"]
}

const { int } = require('random');

module.exports.run = async (bot, msg) => {
    let { args } = msg;
    if(!msg.content) return msg.channel.send("You have to define a handsign (Rock | Scissors | Paper)");

    var value = 4;
    var rng = 4;
    
    var hands = args[0];
    
    if(         hands == "rock" ||
                hands == "stone" ||
                hands == ":fist:" ){
                    value = 1;
    }else if(   hands == "paper" ||
                hands == ":raised_hand:"){
                    value = 2;
    }else if(   hands == "scissors" ||
                hands == "scissor" ||
                hands == ":v:"){
                    value = 3;
    }else{
        msg.channel.send("Invalid hand sign");
        return;
    }

    rng = (int(1, 3));
    var rng_str;

    if(rng == 1){
        rng_str = ':fist: Rock';
    }else if(rng == 2){
        rng_str = ':raised_hand: Paper';
    }else{
        rng_str = ':v: Scissors';
    }

    var win = 0;    //0 = lose | 1 = draw | 2 = win

    if(value === 1){
        if(rng == 1){win = 1}
        if(rng == 2){win = 0}
        if(rng == 3){win = 2}
    }else if(value == 2){
        if(rng == 1){win = 2}
        if(rng == 2){win = 1}
        if(rng == 3){win = 0}
    }else{
        if(rng == 1){win = 0}
        if(rng == 2){win = 2}
        if(rng == 3){win = 1}
    }

    let signs = [
        `:v:`,
        `:raised_hand:`,
        `:fist:`
    ]

    msg.channel.send(rng_str);

    if(win === 0){
        msg.channel.send('> You lost');
    }else if(win === 1){
        msg.channel.send('> This was a draw');
    }else if(win === 2){
        msg.channel.send('> You won!!!');
    }else {
        msg.channel.send("An error occurred")
    }
}
