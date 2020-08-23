module.exports = {
    name: "resume",
    description: "Resumes the paused song!",
    usage: "",
    category: `music`,
    aliases: ["resum"]
}

module.exports.run = async (bot, msg) => {
    bot.music.resume(msg);
}
