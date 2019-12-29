const { RichEmbed } = require("discord.js");
const { get } = require('superagent')

module.exports.run = async (bot, msg, args, config) => {
    let mesg = await msg.channel.send("Generating...")
    let kw = ``;
    if(args[0]){
        kw = `${args.join(" ")}`;
    }else{
        kw = `all`
    }
    let {body} = await get(`https://loremflickr.com/json/g/1024/1024/${kw}`)
    if(!{body}) return msg.channel.send("I broke! Try again.")

        let cEmbed = new RichEmbed()
        .setColor('#FF00AA')
        .setAuthor(`Random Image!`, msg.guild.iconURL)
        .setImage(body.file)
        .setTimestamp()
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL)

        msg.channel.send({embed: cEmbed})

        mesg.delete();
}

module.exports.config = {
    name: "randomimg",
	description: "Gives you a random image from loremflickr.com!",
    usage: `<keyword>`,
    category: `misc`,
	accessableby: "Members",
    aliases: ["randomimage","rimg"]
}
