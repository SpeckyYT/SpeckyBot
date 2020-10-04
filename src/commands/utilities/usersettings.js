module.exports = {
    name: "usersettings",
    description: "What about customization?",
    usage: `<setting> <values>`,
    category: "utilities",
    aliases: ["us","usersetting"]
}

const { writeFile } = require('fs');
const { join } = require('path');
const dir = join(process.cwd(),'..','db','u_settings');
const { resolveColor } = global.modules;

module.exports.run = async (bot, msg) => {
    const { args } = msg;
    const u_settings = require(dir);
    let changed = false;
    if(!u_settings[msg.author.id]){
        u_settings[msg.author.id] = {};
        changed = true;
    }
    switch(args[0]){
        case "embedcolor":
        case "ec":
        case "embcol":
            const color = resolveColor(args[1].toUpperCase());
            if(!color) return bot.cmdError('Invalid color');
            u_settings[msg.author.id].embedcolor = color;

            msg.channel.send(`Changed your embed color to \`${args[1].toUpperCase()}\`!`);
            changed = true;
            break;

        case "ghostping":
        case "gp":
            u_settings[msg.author.id].ghostping = !u_settings[msg.author.id].ghostping;
            msg.channel.send(`Your Ghostping option got changed to \`${u_settings[msg.author.id].ghostping}\``);
            changed = true;
            break;

        case "math":
            u_settings[msg.author.id].math = !u_settings[msg.author.id].math;
            msg.channel.send(`Your Math option got changed to \`${u_settings[msg.author.id].math}\``);
            changed = true;
            break;

        case "messagelink":
        case "ml":
            u_settings[msg.author.id].messagelink = !u_settings[msg.author.id].messagelink;
            msg.channel.send(`Your MessageLink option got changed to \`${u_settings[msg.author.id].messagelink}\``);
            changed = true;
            break;

        default:
            const embed = bot.embed()
            .setTitle("User Settings Help Page!")
            .setDescription(`Here you can set some weird stuff, which you can't do anywhere else!`)
            .addField('\u200b','\u200b')
            .addField(`Change Default Message to Embed color:`,`\`${bot.config.prefix}usersettings ec <HEX COLOR>\``)
            .addField(`Will give you a notification if someone Ghostpinged you:`,`\`${bot.config.prefix}usersettings gp\``)
            .addField(`Will automatically do maths for you:`,`\`${bot.config.prefix}usersettings math\``)
            .addField(`Will quote your message's message-links:`,`\`${bot.config.prefix}usersettings ml\``)
            return msg.channel.send(embed);
    }

    if(changed){
        writeFile(join(process.cwd(),'..','db','u_settings.json'), JSON.stringify(u_settings, null, 4), err => {
            if(err){
                msg.channel.send("Error while saving...");
                console.error(err);
            }else{
                msg.channel.send("Saved sucessfully!");
            }
        })
    }
}
