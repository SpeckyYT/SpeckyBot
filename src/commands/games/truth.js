module.exports = {
    name: "truth",
    description: "Gives you a question which you should answer honestly!",
    category: "games"
}

// Questions from:
// https://hobbylark.com/party-games/truth-or-dare-questions
// https://improb.com/best-truth-or-dare-questions/

const { join } = require('path');
const { readFileSync } = require('fs');

module.exports.run = async (bot, msg) => {
    let { truth } = this;
    if(!truth) truth = readFileSync(join(__dirname,'data','tod-t.txt'),{encoding:'utf8'}).split('\n');
    const question = truth.pick();
    return msg.channel.send(
        bot.embed()
        .setTitle("Truth!")
        .setDescription(question || "Do you like SpeckyBot?")
    );
}
