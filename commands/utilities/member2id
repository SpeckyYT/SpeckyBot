module.exports.run = async (bot, msg) => {
    let user = bot.users.find('tag',msg.Args[0])
    if(user){
        msg.channel.send(user.tag)
    }else{
        msg.channel.send("User not found.")
    }
}

module.exports.config = {
	name: "member2id",
	description: "Converts a username and discriminator to the user id.",
	usage: `<username>#<discriminator>`,
	category: `utilities`,
	accessableby: "Members",
    aliases: ["m2i"]
}
