module.exports = {
	name: "id2member",
	description: "Converts a user id to the username and discriminator.",
	usage: `<userid>`,
	category: `utilities`,
	accessableby: "Members",
    aliases: ["i2m"]
}

module.exports.run = async (bot, msg) => {
    id = parseInt(msg.args[0]);
    bot.fetchUser(id)
    .then(user => {
        msg.channel.send(user.tag)
    })
    .catch(err => {
        msg.channel.send("User not found.")
    })
} 
