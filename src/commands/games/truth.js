module.exports = {
    name: "truth",
    description: "Gives you a question which you should answer honestly!",
    category: "games"
}

// Questions from:
// https://hobbylark.com/party-games/truth-or-dare-questions
// https://improb.com/best-truth-or-dare-questions/

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    const questions = (require(join(__dirname,'data','tod-t')) || '').split('\n');
    const question = questions.pick();
    return msg.channel.send(
        bot.embed()
        .setTitle("Truth!")
        .setDescription(question || "Do you like SpeckyBot?")
    );
}
