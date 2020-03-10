module.exports = {
    name: "kitsune",
	description: "Gives you a kitsune!",
    usage: ``,
    category: `nsfw`,
	accessableby: "Members",
    aliases: ["kitsu"]
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')(["kitsune","eroKitsune"].pick(),msg);
}
