module.exports = {
    name: "chatbot",
    description: "What about chatting to an AI?",
    usage: `<text>`,
    category: "misc",
    aliases: ["cb","chatai","cleverbot"]
}

const cleverbot = require("cleverbot-free");

module.exports.run = async (bot, msg) => {
    const { Args } = msg;

    if(!Array.isArray(bot.cache.chatbot[msg.channel.id])) bot.cache.chatbot[msg.channel.id] = [];

    return cleverbot(Args.join(" "),bot.cache.chatbot[msg.channel.id])
    .then(response => msg.channel.send(response))
    .finally(() => bot.cache.chatbot[msg.channel.id].push(Args.join(" ")));
}
