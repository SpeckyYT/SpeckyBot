module.exports = {
    name: "chatbot",
	description: "What about chatting to an AI?",
    usage: `<text>`,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["cb","chatai","cleverbot"]
}

const cleverbot = require("cleverbot-free");

module.exports.run = async (bot, msg) => {
    let { Args } = msg;

    if(typeof bot.cache.chatbot[msg.channel.id] != "object"){
        bot.cache.chatbot[msg.channel.id] = [];
    }

    return cleverbot(Args.join(" "),bot.cache.chatbot[msg.channel.id])
    .then(response => {
        msg.channel.send(response)
    })
    .finally(() => {
        bot.cache.chatbot[msg.channel.id].push(Args.join(" "));
    })
}
