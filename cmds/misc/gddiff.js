let { getDifficultyImg } = require('gdprofiles');

module.exports.run = async (bot, msg, args) => {
    console.log(`GDDiff: actived by ${msg.author.username} (${msg.author.id})`);
    if(!args[0]) return;
    if(!args[1]) return;
    if(!args[2]) return;

    let img = getDifficultyImg((args[1]), (args[2]), (args[3]));
    msg.reply(`${img}`);
}

module.exports.help = {
    name: "gddiff"
}