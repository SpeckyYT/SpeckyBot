const Discord = require("discord.js");
const Math = require('mathjs');
const superagent = require('superagent')

module.exports.run = async (bot, msg, args, owner, prefix) => {
    let mesg = await msg.channel.send("Generating...")
    let kw = ``;
    if(args[0]){
        kw = `/${args.join(" ")}`;
    }else{
        kw = `/all`
    }
    let {body} = await superagent
    .get(`https://loremflickr.com/json/g/400/400${kw}`)
    //console.log(body.file)
    if(!{body}) return msg.channel.send("I broke! Try again.")

        let cEmbed = new Discord.RichEmbed()
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