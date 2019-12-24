const { RichEmbed } = require("discord.js");
const Math = require('mathjs');

module.exports.run = async (bot, msg, args, config) => {
    if(!args[0]){
        msg.channel.send("You have to define a difficulty (a number from 0 to 10)")
        return;
    }
    const diffNum = args[0];
    const featured = args[1];

    const bmsg = msg.channel.send("Generating difficulty image...")
    .then(m =>{
        var rate;
        
        switch(diffNum){
        
        case "0":
        case "na":
        case "n.a":
        case "n.a.":
            diffNum = 0; break;

        case "1":
        case "easy":
        case "ez":
        case "eas":
            diffNum = 1; break;

        case "2":
        case "normal":
        case "norm":
            diffNum = 2; break;

        case "3":
        case "hard":
        case "difficult":
            diffNum = 3; break;

        case "4":
        case "harder":
            diffNum = 4; break;

        case "5":
        case "insane":
        case "insan":
            diffNum = 5; break;

        case "6":
        case "harddemon":
        case "hardemon":
            diffNum = 6; break;

        case "7":
        case "easydemon":
        case "ezdemon":
        case "easdemon"
            diffNum = 7; break;

        case "8":
        case "mediumdemon":
        case "meddemon":
            diffNum = 8; break;

        case "9":
        case "insanedemon":
        case "insandemon":
            diffNum = 9; break;

        case "10":
        case "extremedemon":
        case "extremdemon":
            diffNum = 10; break;
        }

        switch(featured){

        case "2":
        case "2cp"
        case "feature":
        case "featured":
            rate = '_featured'; break;

        case "3":
        case "3cp"
        case "epic"
            rate = '_epic'; break;

        default:
            rate = '';
        }

        const link = `https://gdicon.net/icons/difficulty_${diffNum.padStart(2, "0")}${rate}.png`

        let cEmbed = new RichEmbed()
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
