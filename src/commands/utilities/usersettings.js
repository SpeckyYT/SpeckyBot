module.exports = {
    name: "usersettings",
	description: "What about customization?",
    usage: `<setting> <values>`,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["us","usersetting"]
}

const { writeFile } = require('fs');
const dir = '../../../db/u_settings';

module.exports.run = async (bot, msg) => {
    let { args } = msg;
    const u_settings = require(dir);
    switch(args[0]){
        case "embedcolor":
        case "ec":
        case "embcol":
            let color = args[1];
            if(color == null) return msg.channel.send("You have to define a color (in HEX format)");
            color = color.replace("#",'');
            let temp = parseInt(color, 16);
            if(temp.toString(16) != color.toLowerCase()) return msg.channel.send("The provided HEX color is invalid (wrong characters)");
            if(color.length != 6) return msg.channel.send("The provided HEX color is invalid (wrong length)")
            
            u_settings[msg.author.id].embedcolor = color.toUpperCase();
            
            msg.channel.send(`Changed your embed color to \`${color.toUpperCase()}\`!`);
            break;

        case "ghostping":
        case "gp":
            if(u_settings[msg.author.id]){
                u_settings[msg.author.id].ghostping = !u_settings[msg.author.id].ghostping;
            }else{
                u_settings[msg.author.id].ghostping = true;
            }

            msg.channel.send(`Your Ghostping option got changed to \`${u_settings[msg.author.id].ghostping}\``);
            break;

        default:
            let embed = bot.embed()
                .setTitle("User Settings Help Page!")
                .setDescription(`Here you can set some weird stuff, which you can't do anywhere else!`)
                .addBlankField()
                .addField(`Change Default Message to Embed color:`,`\`${bot.config.prefix}usersettings ec <HEX COLOR>\``)
                .addField(`Will give you a notification if someone Ghostpinged you:`,`\`${bot.config.prefix}usersettings gp\``)
            return msg.channel.send(embed);

    }

    writeFile('../db/u_settings.json', JSON.stringify(u_settings, null, 4), err => {
        if(err){
            msg.channel.send("Error while saving...");
            console.error(err);
        }else{
            msg.channel.send("Saved sucessfully!");
        }
    })
}
