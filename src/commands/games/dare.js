module.exports = {
    name: "dare",
    description: "Gives you a task which you accomplish!",
    category: "games",
    aliases: []
}

// Tasks from:
// https://improb.com/best-truth-or-dare-questions/

module.exports.run = async (bot, msg) => {
    const questions = (require('.\\data\\tod-d') || '').split('\n');
    const question = questions.pick();
    return msg.channel.send(
        bot.embed()
        .setTitle("Dare!")
        .setDescription(question || "Like SpeckyBot!")
    );
}
