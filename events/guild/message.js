const { prefix, owner } = require('../../../config.json')
const settings = require('../../../settings.json')
const { RichEmbed } = require('discord.js')

module.exports = async (bot, msg) => { 
    if (msg.author.bot || msg.channel.type === "dm") return;
	if(msg.channel.id == settings[msg.guild.id].mte){
		try{
			var embed = new RichEmbed()
				.setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
				.setDescription(`${msg.content}`)
				.setColor('#000000');
			msg.channel.send(embed);
		}catch(e){
			return console.log(e);
		}
		msg.delete();
    }
    

    if (!msg.content.toLowerCase().startsWith(prefix) || msg.author.bot || msg.channel.type === "dm") return;
    
    let args = msg.content.toLowerCase().split(" ");
    let command = args[0];
    args = args.slice(1);
    
    let cmd = bot.commands.get(command.slice(prefix.length)) || bot.commands.get(bot.aliases.get(command.slice(prefix.length)));
    if(cmd){
        console.log(`${command.toUpperCase().slice(prefix.length)}: actived by ${msg.author.username} (${msg.author.id}, ${msg.channel.id}, ${msg.guild.id})`);
        cmd.run(bot, msg, args, owner, prefix);
    }else{
        console.log(`${command.toUpperCase().slice(prefix.length)}: (REJECTED) actived by ${msg.author.username} (${msg.author.id})`);
        msg.reply("we didn't find the commad you were looking for. Sowwy UwU");
    }
}