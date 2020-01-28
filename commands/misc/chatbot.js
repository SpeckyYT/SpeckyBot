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
    cleverbot(Args.join(" "))
    .then(response => {
        msg.channel.send(response)
    })
}
