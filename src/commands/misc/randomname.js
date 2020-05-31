module.exports = {
    name: "randomname",
    description: "Gives you a random person name!\nThanks to Nickguimond for the randomQuestions module\nhttps://github.com/nickguimond/randomQuestions",
    usage: ``,
    category: `misc`,
    accessableby: "Members",
    aliases: ["rn","randname","randn","name"]
}

const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg) => {
    const { getPersonName } = require('./functions/misc');

    const embed = new RichEmbed()
    .setAuthor(msg.author.username,msg.author.avatarURL)
    .setColor("#FF00AA")
    .setTitle('Random Person Name')
    .setDescription(getPersonName());
    msg.channel.send(embed)
}
