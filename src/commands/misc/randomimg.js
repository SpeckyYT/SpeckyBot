module.exports = {
    name: "randomimg",
    description: "Gives you a random image from loremflickr.com!",
    usage: `<keyword>`,
    category: `misc`,
    accessableby: "Members",
    aliases: ["randomimage","rimg"]
}

const { RichEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports.run = async (bot, msg) => {
    await msg.channel.send("Generating...")
    .then(async ms => {
        let kw;

        const { args } = msg;

        if(args[0]){
            kw = `${args.join(",")}`;
        }else{
            kw = `all`
        }

        const body = await (await fetch("https://loremflickr.com/json/p/1024/1024/"+kw)).json();

        const embed = new RichEmbed()
        .setColor(bot.config.color)
        .setAuthor(`Random Image!`, msg.guild.iconURL)
        .setImage(body.file)
        .setTimestamp()
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL)

        ms.edit(embed);
    })
}
