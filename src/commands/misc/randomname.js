module.exports = {
    name: "randomname",
    description: "Gives you a random person name!\nThanks to Nickguimond for the randomQuestions module\nhttps://github.com/nickguimond/randomQuestions",
    category: "misc",
    aliases: ["rn","randname","randn","name"]
}

module.exports.run = async (bot, msg) => {
    const { getPersonName } = require('.\\functions\\misc');

    const embed = bot.embed()
    .setAuthor(msg.author.username,msg.author.avatarURL)
    .setTitle('Random Person Name')
    .setDescription(getPersonName());
    msg.channel.send(embed)
}
