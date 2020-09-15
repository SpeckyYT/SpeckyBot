module.exports = {
    name: "resume",
    description: "Resumes the paused song!",
    category: `music`,
    aliases: ["resum"]
}

module.exports.run = async (bot, msg) => {
    bot.music.resume(msg);
}
