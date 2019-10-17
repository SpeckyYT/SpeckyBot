const tts = require('play-tts')

module.exports.run = async (bot, msg, args, owner, prefix) => {
    if(!(msg.author.id === owner)){
        msg.channel.send("You aren't my owner.");
        return;
    }
    const lang = args[0]
    const text = args.slice(1).join(" ");
    tts.play(text, lang);
}

module.exports.config = {
    name: "tts",
	description: "Makes the bot say things!",
    usage: `<lang (en/it/...)> <text>`,
    category: `owner`,
	accessableby: "Bot Owner",
    aliases: ["texttospeach"]
}