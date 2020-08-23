module.exports = {
    name: "randomquestion",
    description: "Thanks to Nickguimond for the randomQuestions module\nhttps://github.com/nickguimond/randomQuestions",
    usage: "",
    category: `misc`,
    aliases: ["rq","randquest","randq","question"]
}

module.exports.run = async (bot, msg) => {
    const { getQuestion } = require('.\\functions\\misc');

    const embed = bot.embed()
    .setAuthor(msg.author.username,msg.author.avatarURL)
    .setTitle('Random Question')
    .setDescription(getQuestion());
    msg.channel.send(embed)
}
