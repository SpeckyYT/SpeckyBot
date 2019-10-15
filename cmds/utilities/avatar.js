module.exports.run = async (bot, msg, args, owner, prefix) => {
    msg.reply(`${msg.author.avatarURL}`);
}

module.exports.config = {
    name: "avatar",
	description: "Wanna see your profile picture at highest resolution?",
    usage: ``,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["a","ava"]
}