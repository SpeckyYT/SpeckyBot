module.exports = {
    name: "delet",
    description: "Deletes the last 3 messages!",
    category: "admin",
    aliases: ["..","."],
    userPerms: ['MANAGE_MESSAGES'],
    botPerms: ['MANAGE_MESSAGES']
}

module.exports.run = (bot, msg) => msg.channel.bulkDelete(3);
