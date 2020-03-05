module.exports = {
    name: "npm",
	description: "Updates/installs NPM dependencies!",
    usage: ``,
    category: `owner`,
	accessableby: "Bot Owner",
    aliases: []
}

const npm = require('npm');

module.exports.run = async (bot, msg) => {
    npm.load({}, async () => {
        npm.commands.install([],async () => {
            return msg.channel.send("Dependencies should be updated!");
        });
    })
}
