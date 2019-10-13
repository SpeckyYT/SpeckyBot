const Discord = require("discord.js");

module.exports.run = async (bot, msg, args, owner) => {
    if(!msg.member.hasPermission(["MANAGE_MESSAGES"]) || !msg.member.hasPermission(["MANAGE_MESSAGES"])){
        if(!msg.member.id == owner){
            msg.channel.send("You can't use this command!");
            return;
        }
    }

    let argsresult;
    let channel = msg.mentions.channels.first()

    if(channel){
        argsresult = args.slice(1).join(" ");
        channel.send(argsresult);
    }else{
        argsresult = args.join(" ");
        msg.channel.send(argsresult);
    }
    msg.delete(5000);
}

module.exports.config = {
    name: "say",
    aliases: ["announcement"]
}