const Discord = require("discord.js");

module.exports.run = async (bot, msg, args, owner, prefix) => {
    var voiceChannel = msg.member.voiceChannel;
    var connection = voiceChannel.join();
    const dispatcher = await connection.playFile(`./mp3/${args[0]}.mp3`)
        .on('end', () => {
            msg.channel.send("Song finished! Did you like it?");
        })
}

module.exports.config = {
    name: "play",
	description: "Plays a song by choice!",
	usage: `<song>`,
	accessableby: "Members",
    aliases: ["p"]
}
