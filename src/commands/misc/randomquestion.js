module.exports = {
    name: "randomquestion",
    description: "Thanks to Nickguimond for the randomQuestions module\nhttps://github.com/nickguimond/randomQuestions",
    usage: ``,
    category: `misc`,
    accessableby: "Members",
    aliases: ["rq","randquest","randq","question"]
}

const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg) => {
    const { getQuestion } = require('./functions/misc');

    const embed = new RichEmbed()
    .setAuthor(msg.author.username,msg.author.avatarURL)
    .setColor("#FF00AA")
    .setTitle('Random Question')
    .setDescription(getQuestion());
    msg.channel.send(embed)
}
