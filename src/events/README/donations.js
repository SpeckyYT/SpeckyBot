module.exports = {
    event: 'ready'
}

const fs = require('fs/promises');
const { join } = require('path');
const SDB = require('specky-database');

const regex = /(?<=<!---donators--->)(\n|\r|.)*?(?=<!---donators--->)/;

module.exports.call = async (bot) => {
    const donations = await SDB('donations.json');
    const readmepath = join(process.cwd(),'..','README.md');
    const readme = await fs.readFile(readmepath, {encoding: 'utf-8'});

    const dnt = donations
    .sort((a,b) => b.donation[0] - a.donation[0])
    .map(({name,donation}) => `| ${name} | ${donation[0].toFixed(2)}${donation[1]||'€'} |`)
    .join('\r\n');

    const string = `\r\n| Donator | Donation |\r\n|-|-|\r\n${dnt}\r\n`;
    if(string == readme.match(regex)[0]) return;

    return fs.writeFile(readmepath, readme.replace(regex, string), {encoding:'utf-8'});
}

