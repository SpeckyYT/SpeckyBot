const Discord = require("discord.js");
const Math = require('mathjs');

module.exports.run = async (bot, msg, args, config) => {
    if(!args[0] || args[0] >= 11){
        msg.channel.send("You have to define a difficulty (a number from 0 to 10)")
        return;
    }
    const diffNum = Math.sqrt(args[0]**2).toString();
    const featured = args[1];
    //https://gdicon.net/icons/difficulty_09_featured.png

    const bmsg = msg.channel.send("Generating difficulty image...").then(m =>{
        var rate = '';

        if(featured == `1`){
            rate = '_featured';
        }else if(featured == `2`){
            rate = '_epic';
        }else{
            rate = '';
        }
        const link = `https://gdicon.net/icons/difficulty_${diffNum.padStart(2, "0")}${rate}.png`

        let cEmbed = new Discord.RichEmbed()
        .setColor('#000000')
        .setAuthor(`Geometry Dash`, `https://upload.wikimedia.org/wikipedia/en/thumb/3/35/Geometry_Dash_Logo.PNG/250px-Geometry_Dash_Logo.PNG`)
        .setImage(link)
        .setTimestamp()
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL)


        m.edit(cEmbed);
    })
}

module.exports.config = {
    name: "gddiff",
	description: "Gives you one of the difficulty icons of Geometry Dash!",
    usage: `<difficulty number (0-10)> <rate value (0-2)>`,
    category: `misc`,
	accessableby: "Members",
    aliases: ["gddifficulty","geometrydashdiff"]
}