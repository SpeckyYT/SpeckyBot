let {getDiffImg} = require('gdprofiles');
const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
    console.log(`GDDiff: actived by ${msg.author.username} (${msg.author.id})`);
    let bmsg = await msg.channel.send("Generating difficulty image...");

    if(!args[0]) return;
    console.log("1");
    if(!args[0].isInteger) return;
    console.log("2");
    if(!args[1]) return;
    console.log("3");
    if(!args[2]) return;
    console.log("4");


    let diffNum = 10;
    let featured = false;
    let epic = true;

    const attachment = new Discord.Attachment(`${getDiffImg(diffNum, featured, epic)}`); // => String
    console.log(attachment);
    msg.channel.send(attachment);
    await bmsg.delete();
}

module.exports.help = {
    name: "gddiff"
}
