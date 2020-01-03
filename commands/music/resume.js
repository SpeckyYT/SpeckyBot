module.exports.run = async (bot, msg) => {
    let { args } = msg;
    bot.music.resumeFunction(msg, args.join(' '))
}

module.exports.config = {
    name: "resume",
	description: "Resumes the paused song!",
    usage: ``,
    category: `music`,
	accessableby: "Members",
    aliases: ["resum"]
}
