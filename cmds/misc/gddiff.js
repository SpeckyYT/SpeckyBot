const Discord = require("discord.js");
const Math = require('mathjs');

module.exports.run = async (bot, msg, args, owner, prefix) => {
    if(!args[0] || args[0] >= 11){
        msg.channel.send("You have to define a difficulty (a number from 0 to 10)")
        return;
    }
    const diffNum = Math.sqrt(args[0]**2);
    const featured = args[1];
    const epic = args[2];
    //https://gdicon.net/icons/difficulty_09_featured.png

    const bmsg = msg.channel.send("Generating difficulty image...").then(m =>{
        var rate = '';

        if(featured == true){
            rate = '_featured';
        }
        if(epic == true){
            rate = '_epic';
        }else{
            rate = '';
        }
        const link = `https://gdicon.net/icons/difficulty_${diffNum.padStart(2, "0")}${rate}.png`

        m.edit(link);
    })
}

module.exports.config = {
    name: "gddiff",
	description: "Gives you one of the difficulty icons of Geometry Dash!",
    usage: `<difficulty number (0-10)> <featured (0/1)> <epic (0/1)>`,
    category: `misc`,
	accessableby: "Members",
    aliases: ["gddifficulty","geometrydashdiff"]
}