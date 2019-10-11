module.exports.run = async (bot, msg, args) => {
    msg.reply(`${msg.author.avatarURL}`);
}

module.exports.help = {
    name: "avatar"
}