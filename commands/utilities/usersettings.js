const dir = '../../../u_settings.json';
const u_settings = require(dir);
const fs = require('fs');

module.exports.run = async (bot, msg, args, owner, prefix) => {
    switch(args[0]){
        case "embedcolor":
        case "ec":
        case "embcol":
            const color = args[1]
            if(color == null) return msg.channel.send("You have to define a color (in HEX format)");
            
            var temp = parseInt(color, 16);
            if(temp.toString(16) != color.toLowerCase()) return msg.channel.send("The color in HEX format is invalid");
            
            u_settings [msg.author.id] = {
                embedcolor: color,
            }
            fs.writeFile(dir, JSON.stringify(u_settings, null, 4), err => {
                if(err) throw err;
                msg.channel.send(`Changed your embed color to \`${args[1]}\`!`)
            });
            break;

        case 'uwu':
            msg.channel.send("uwu");
            break;

        default:
            msg.channel.send("You fucced up stuff");

    }
};

module.exports.config = {
    name: "usersettings",
	description: "What about custumization?",
    usage: `<setting> <values>`,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["us"]
}