module.exports = {
    name: "npm",
    description: "Updates/installs NPM dependencies!",
    category: "owner"
}

const npm = require('npm');
const { promisify } = require('util');
const { exec } = require('child_process')

module.exports.run = async (bot, msg) => {
    try{
        await promisify(npm.load)({});
        await promisify(npm.commands.install)([]);
    }catch(err){
        await new Promise((res, rej) => exec('npm i', (err) => err ? rej(err) : res()));
    }
    return bot.cmdSuccess("Dependencies should be updated!");
}
