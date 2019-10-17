const cleverbot = require("cleverbot-free");

module.exports.run = async (bot, msg, args, owner, prefix) => {
    cleverbot(args.join(" ")).then(response => msg.channel.send(response))
}

module.exports.config = {
    name: "chatbot",
	description: "What about chatting to an AI?",
    usage: `<text>`,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["cb","chatai","cleverbot"]
}