// Questions from:
// https://hobbylark.com/party-games/truth-or-dare-questions
// https://improb.com/best-truth-or-dare-questions/

const { join } = require('path');
const { readFileSync } = require('fs');

module.exports.tod = ({tod}) => {
    const todT = readFileSync(
        join(__dirname,'data',`tod-${tod.charAt(0).toLowerCase()}.txt`),
        {encoding:'utf8'}
    ).split('\n');

    return function(bot,msg){
        return msg.channel.send(
            bot.embed()
            .setTitle(`${tod}!`)
            .setDescription(todT.pick() || "Do you like SpeckyBot?")
        );
    }
}
