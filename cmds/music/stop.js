const Discord = require("discord.js");

module.exports.run = async (bot, msg, args, owner, prefix) => {
    var voiceChannel = msg.member.voiceChannel;
    var connection = await voiceChannel.join();
    const dispatcher = connection.playFile(`./mp3/${args[0]}.mp3`);
}

module.exports.config = {
    name: "stop",
	description: "Stops the music that is playing!",
    usage: ``,
    category: `music`,
	accessableby: "Members",
    aliases: ["s"]
}