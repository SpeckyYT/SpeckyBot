module.exports = {
    name: "npm",
    description: "Updates/installs NPM dependencies!",
    category: "owner"
}

const npm = require('npm');

module.exports.run = async (bot, msg) => {
    npm.load({}, async () => {
        npm.commands.install([],async () => {
            return bot.cmdSuccess("Dependencies should be updated!");
        });
    })
}
