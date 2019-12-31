const { appendFileSync, unlinkSync } = require('fs')
const { Attachment } = require('discord.js')

module.exports.run = async (bot, msg, args, config) => {
    msg.guild.members.forEach(member => {
        appendFileSync('./members.txt',member.user.id + " ")
    })
    let att = new Attachment('./members.txt',"members.txt")
    await msg.channel.send(att);
    unlinkSync('./members.txt')
}

module.exports.config = {
    name: "members",
	description: "Turns all user IDs into a txt file!",
    usage: ``,
    category: `misc`,
	accessableby: "Members",
    aliases: []
}
