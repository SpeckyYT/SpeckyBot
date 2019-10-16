const Discord = require("discord.js");
const fs = require('fs');

module.exports.run = async (bot, msg, args, owner, prefix) => {
    var data = fs.readFileSync('servers.json');
    var words = JSON.parse(data);
    console.log(words);

    var voiceChannel = msg.member.voiceChannel;
    if(!voiceChannel) return msg.channel.send("You have to be in a voice channel to play music!");
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
    category: `music`,
	accessableby: "Members",
    aliases: ["p"]
}
