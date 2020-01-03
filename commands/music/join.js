const Discord = require("discord.js");

module.exports.run = async (bot, msg) => {
	if(msg.member.voiceChannel){
                msg.member.voiceChannel.join()
	}else{
		msg.reply("you aren't in a voice channel")
	}
}

module.exports.config = {
	name: "join",
	description: "Makes the bot join a VC!",
	usage: ``,
	category: `music`,
	accessableby: "Members",
	aliases: ["j"]
}
