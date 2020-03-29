module.exports = {
    name: "usersettings",
	description: "What about customization?",
    usage: `<setting> <values>`,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["us","usersetting"]
}

const { writeFile } = require('fs');
const dir = '../../u_settings';

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
            
            u_settings [msg.author.id] = {
                embedcolor: color.toUpperCase(),
            };

            writeFile('./u_settings.json', JSON.stringify(u_settings, null, 4), err => {
                if(err) console.log(err);
                msg.channel.send(`Changed your embed color to \`${color.toUpperCase()}\`!`)
            });
            break;
        default:
            let embed = bot.embed()
                .setTitle("User Settings Help Page!")
                .setDescription(`Here you can set some weird stuff, which you can't do anywhere else!`)
                .addBlankField()
                .addField(`Change Default Message to Embed color:`,`\`${bot.config.prefix}usersettings ec <HEX COLOR>\``);
            msg.channel.send(embed);

    }
}
