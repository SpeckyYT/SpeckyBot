module.exports = {
    name: "dependencies",
    description: "Gives you the versions of the dependencies used in the bot!",
    category: 'dev',
    type: 'send',
    aliases: ['dep']
}

const { promises: { readFile } } = require('fs');
const { join } = require('path');

module.exports.run = async (bot, msg) => {
    const string = await readFile(join(process.cwd(),'..','package.json'),{encoding:'utf-8'});
    const json = JSON.parse(string);
    return JSON.stringify(json.dependencies,null,2).code('json');
}
