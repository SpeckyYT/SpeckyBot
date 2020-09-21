module.exports = {
    name: "gitupdate",
    description: "Updates the bot!",
    category: "owner"
}

const cp = require('child_process');

module.exports.run = async (bot, msg) => {
    cp.exec('git',['pull','origin'],()=>{})
    .on('close', () => {
        msg.channel.send('Bot should be successfully updated!');
    });
}
