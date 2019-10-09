const Discord = require("discord.js");
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

    rng = random.int(1, 3);
    console.log(rng);

    msg.channel.send(rng);
}

module.exports.help = {
    name: "rps"
}
