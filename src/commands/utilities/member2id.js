module.exports = {
    name: "member2id",
    description: "Converts a username and discriminator to the user id.",
    usage: `<username>#<discriminator>`,
    category: `utilities`,
    aliases: ["m2i"]
}

module.exports.run = async (bot, msg) => {
    const user = bot.users.find('tag',msg.Args[0])
    if(user){
        msg.channel.send(user.id)
    }else{
        msg.channel.send("User not found.")
    }
}
