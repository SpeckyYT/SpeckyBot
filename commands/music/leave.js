const Discord = require("discord.js");

module.exports.run = async (bot, msg, args, config) => {
	if(msg.member.voiceChannel){
		console.log(`Leave: actived by ${msg.author.username} (${msg.author.id})`);
		msg.member.voiceChannel.leave();
	}else{
		msg.reply("you aren't in a voice channel")
	}
}

module.exports.config = {
	name: "leave",
	description: "Does the bot leave the VC!",
	usage: ``,
	category: `music`,
	accessableby: "Members",
	aliases: ["l"]
}
