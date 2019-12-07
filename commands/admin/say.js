const { RichEmbed } = require("discord.js");

module.exports.run = async (bot, msg, args, config) => {
    if(msg.content.split(/\s|\n/g).join(null).length < 7) return msg.channel.send('The message is too short.');
    args = msg.content.split(" ");
    while(args[0] == config.prefix){
        const fix = `${args[0]}${args[1]}`
        args[1] = fix;
        args = args.slice(1);
    }
    args = args.splice(1);
    let argsresult;
    let channel = msg.mentions.channels.first();
    let cEmbed = new RichEmbed()
        .setTitle(msg.author.username, msg.author.avatarURL)
        .setDescription(argsresult);

    if(channel){
        argsresult = msg.content.split(" ").slice(2).join(" ");
        channel.send(argsresult);
    }else{
        argsresult = args.join(" ");
        msg.channel.send(argsresult);
    }
    msg.delete();
}

module.exports.config = {
    name: "say",
	description: "Lets the bot say something for you!",
    usage: `<text>`,
    category: `admin`,
	accessableby: "Server Admins and Moderators",
    aliases: ["announcement"],
    perms: ['SEND_MESSAGES']
}