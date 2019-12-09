const path = require('path')
const gitP = require('simple-git/promise')
const git = gitP(path.join(__dirname, '../../'));

module.exports.run = async (bot, msg, args, config) => {
    git.checkIsRepo()
   .then(() => {git.fetch()})
   .catch(e => {msg.channel.send(`An error occurred ${e.message}`)})
}

module.exports.config = {
    name: "gitupdate",
	description: "The bot will fetch the latest version of the SpeckyBot repository!",
    usage: ``,
    category: `owner`,
	accessableby: "Bot Owner",
    aliases: ["gu"]
}
