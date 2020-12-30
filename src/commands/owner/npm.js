module.exports = {
    name: "npm",
    description: "Updates/installs NPM dependencies!",
    category: "owner"
}

const npm = require('npm');
const { promisify } = require('util');

module.exports.run = async (bot, msg) => {
    await promisify(npm.load)();
    await promisify(npm.commands.install)([]);
    return bot.cmdSuccess("Dependencies should be updated!");
}
