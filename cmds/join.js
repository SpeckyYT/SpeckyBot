const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
	console.log(`Join: actived by ${msg.author.username} (${msg.author.id})`);
	if(msg.member.voiceChannel){
		var voiceChannel = msg.member.voiceChannel;
		var connection = await voiceChannel.join();
		voiceChannel.join()
  		.then(connection => console.log('Connected!'))
		return;
	}else{
		msg.reply("you aren't in a voice channel")
	}
}

module.exports.help = {
	name: "join"
}
