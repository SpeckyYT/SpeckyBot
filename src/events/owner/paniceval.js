module.exports = {
    event: "messages"
}

const { inspect } = require("util");
const i = (c) => inspect(c,{depth:0});

module.exports.call = async (bot, msg) => {
    if(bot.config.owner.includes(msg.author.id)){
        const secret = "sse ";
        if(!msg.content.toLowerCase().startsWith(secret)) return;
        msg.content = msg.content.slice(secret.length);

        const evaluated = JSON.stringify(
            i(
                eval(
                    msg.cmdContent
                )
            )
        )
        return msg.channel.send(String(evaluated).slice(0,1980).code('js'), { split: '\n' })
    }
}
