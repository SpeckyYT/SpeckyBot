module.exports = {
    name: "randomquestion",
    description: "Thanks to Nickguimond for the randomQuestions module\nhttps://github.com/nickguimond/randomQuestions",
    category: "misc",
    aliases: ["rq","randquest","randq","question"]
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    const { getQuestion } = require(join(__dirname,'functions','misc'));

    const embed = bot.embed()
    .setAuthor(msg.author.username,msg.author.avatarURL)
    .setTitle('Random Question')
    .setDescription(getQuestion());
    msg.channel.send(embed)
}
