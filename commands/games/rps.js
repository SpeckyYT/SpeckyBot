const discord = require('discord.js');
const random = require('random');

module.exports.run = async (bot, msg, args, owner, prefix) => {
    if(!msg.content) return msg.channel.send("You have to define a handsign (Rock | Scissors | Paper)");

    var value = 4;
    var rng = 4;
    
    var hands = msg.content.toLowerCase();
    
    if(hands == ("rock" || "stone" || "fist")){
        value = 1;
    }else if(hands == ("paper" || "raised_hand")){
        value = 2;
    }else if(hands == ("scissors" || "scissor" || "v")){
        value = 3;
    }else{
        msg.channel.send("Invalid hand sign");
        return;
    }

    rng = (random.int(1, 3));
    var rng_str;

    if(rng == 1){
        rng_str = ':fist: Rock';
    }else if(rng == 2){
        rng_str = ':raised_hand: Paper';
    }else{
        rng_str = ':v: Scissors';
    }

    result.channel.send(rng_str);

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

    if(win === 0){
        result.channel.send('> You lost');
    }else if(win === 1){
        result.channel.send('> This was a draw');
    }else if(win === 2){
        result.channel.send('> You won!!!');
    }else {
        result.channel.send("An error occurred")
    }
}

module.exports.config = {
    name: "rps",
	description: "Lets you play Rock Paper Scissors with the bot!",
    usage: `<handsign>`,
    category: `games`,
	accessableby: "Members",
    aliases: ["rsp", "rockpaperscissors","rockscissorspaper"]
}
