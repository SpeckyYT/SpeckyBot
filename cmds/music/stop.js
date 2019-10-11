const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
    var voiceChannel = msg.member.voiceChannel;
    var connection = await voiceChannel.join();
    const dispatcher = connection.playFile(`./mp3/${args[0]}.mp3`);
}

module.exports.help = {
	name: "stop"
}