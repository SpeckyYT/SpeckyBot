const dir = '../../../u_settings';
const { writeFile } = require('fs');

module.exports.run = async (bot, msg, args, owner, prefix) => {
    const u_settings = require(dir);
    switch(args[0]){
        case "embedcolor":
        case "ec":
        case "embcol":
            const color = args[1]
            if(color == null) return msg.channel.send("You have to define a color (in HEX format)");
            
            var temp = parseInt(color, 16);
            if(temp.toString(16) != color.toLowerCase()) return msg.channel.send("The provided HEX color is invalid (wrong characters)");
            if(color.length != 3 && color.length != 6) return msg.channel.send("The provided HEX color is invalid (wrong length)")
            
            u_settings [msg.author.id] = {
                embedcolor: color.toUpperCase(),
            };

            writeFile('../u_settings.json', JSON.stringify(u_settings, null, 4), err => {
                if(err) console.log(err);
                msg.channel.send(`Changed your embed color to \`${color.toUpperCase()}\`!`)
            });
            break;

        case 'uwu':
            msg.channel.send("uwu");
            break;

        case !null:
            msg.channel.send("You fucced up stuff");
            break;
        
        default:
            msg.channel.send("You have to define a setting to edit (list will be completed in the future)")

    }
};

module.exports.config = {
    name: "usersettings",
	description: "What about customization?",
    usage: `<setting> <values>`,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["us","usersetting"]
}