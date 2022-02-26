module.exports = {
    name: "delet",
    description: "Deletes the last 3 messages!",
    category: "admin",
    aliases: ["..","."],
    userPerms: 8192n,
    botPerms: 8192n
}

module.exports.run = (bot, msg) => msg.channel.bulkDelete(3);
