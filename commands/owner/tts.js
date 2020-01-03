const { play } = require('play-tts')

module.exports.run = async (bot, msg) => {
    let { args } = msg;
    const lang = args[0]
    const text = args.slice(1).join(" ");
    try{
        play(text, lang);
    }catch(e){
        msg.channel.send(`Language \`${lang}\` is not supported,`)
    }
}

module.exports.config = {
    name: "tts",
	description: "Makes the bot say things!",
    usage: `<lang (en/it/...)> <text>`,
    category: `owner`,
	accessableby: "Bot Owner",
    aliases: ["texttospeach"]
}
