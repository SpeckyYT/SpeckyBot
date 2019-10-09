module.exports.run = async (bot, msg, args) => {
    console.log(`Avatar: actived by ${msg.author.username} (${msg.author.id})`);
    msg.reply(`${msg.author.avatarURL}`);
}

module.exports.help = {
    name: "avatar"
}