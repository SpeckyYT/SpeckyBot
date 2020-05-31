module.exports = {
    name: "gddiff",
    description: "Gives you one of the difficulty icons of Geometry Dash!",
    usage: `<difficulty number (0-10)> <rate value (0-2)>`,
    category: `misc`,
    accessableby: "Members",
    aliases: ["gddifficulty","geometrydashdiff"]
}

const { RichEmbed } = require("discord.js");

module.exports.run = async (bot, msg) => {
    const { args } = msg;
    if(!args[0]){
        msg.channel.send("You have to define a difficulty (a number from 0 to 10)")
        return;
    }
    const diffNum = args[0];
    const featured = args[1];

    await msg.channel.send("Generating difficulty image...")
    .then(m =>{
        let rate = '';
        let diff = 0;
        
        switch(diffNum){
        
        case "0":
        case "na":
        case "n.a":
        case "n.a.":
            diff = 0; break;

        case "1":
        case "easy":
        case "ez":
        case "eas":
            diff = 1; break;

        case "2":
        case "normal":
        case "norm":
            diff = 2; break;

        case "3":
        case "hard":
        case "difficult":
            diff = 3; break;

        case "4":
        case "harder":
            diff = 4; break;

        case "5":
        case "insane":
        case "insan":
            diff = 5; break;

        case "6":
        case "harddemon":
        case "hardemon":
            diff = 6; break;

        case "7":
        case "easydemon":
        case "ezdemon":
        case "easdemon":
            diff = 7; break;

        case "8":
        case "mediumdemon":
        case "meddemon":
            diff = 8; break;

        case "9":
        case "insanedemon":
        case "insandemon":
            diff = 9; break;

        case "10":
        case "extremedemon":
        case "extremdemon":
            diff = 10; break;

        default:
            diff = 0;
        }

        switch(featured){

        case "2":
        case "2cp":
        case "feature":
        case "featured":
            rate = '_featured'; break;

        case "3":
        case "3cp":
        case "epic":
            rate = '_epic'; break;

        default:
            rate = '';
        }

        const link = `https://gdicon.net/icons/difficulty_${String(diff).padStart(2, "0")}${rate}.png`

        const embed = new RichEmbed()
        .setColor('#000000')
        .setAuthor(`Geometry Dash`, `https://upload.wikimedia.org/wikipedia/en/thumb/3/35/Geometry_Dash_Logo.PNG/250px-Geometry_Dash_Logo.PNG`)
        .setImage(link)
        .setTimestamp()
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL)


        m.edit(embed);
    })
}
