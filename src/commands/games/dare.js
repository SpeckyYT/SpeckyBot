module.exports = {
    name: "dare",
    description: "Gives you a task which you accomplish!",
    category: "games"
}

// Tasks from:
// https://improb.com/best-truth-or-dare-questions/

const { join } = require('path');
const { readFileSync } = require('fs');

module.exports.run = async (bot, msg) => {
    let { dare } = this;
    if(!dare) dare = readFileSync(join(__dirname,'data','tod-d.txt'),{encoding:'utf8'}).split('\n');
    const question = dare.pick();
    return msg.channel.send(
        bot.embed()
        .setTitle("Dare!")
        .setDescription(question || "Like SpeckyBot!")
    );
}
