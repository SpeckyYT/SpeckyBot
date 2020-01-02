const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg, args, config) => {
    let bots = [];
    let list = [];
    msg.guild.members.forEach(async member => {
        if(member.user.bot){
            if(!bots.includes(member)) bots.push(member);
        }
    })

    bots.forEach(async bot => {
        if(list[bot.user.presence.status]){
            list[bot.user.presence.status].push([bot.user.username]);
        }else{
            list[bot.user.presence.status] = [bot.user.username];
        }
    })

    let online, idle, dnd, offline;

    online = check(list,'online');
    idle = check(list,'idle');
    dnd = check(list,'dnd');
    offline = check(list,'offline');

    let Eonline = "<:online:661611929332219905>"
    let Eidle = "<:idle:661611969131970580>"
    let Ednd = "<:dnd:661612025943818265>"
    let Eoffline = "<:offline:661612200527396865>"

    let embed = new RichEmbed()
    .setTitle("__Bots__:")
    .setThumbnail(msg.guild.iconURL)
    .setDescription(`${Eonline} ${online}\n${Eidle} ${idle}\n${Ednd} ${dnd}\n${Eoffline} ${offline}`);

    msg.channel.send(embed);
}
    
function check(list,status){
    if(!list[status]){
        return "[0] *Nobody*";
    }else{
        return `[${list[status].length}] ${list[status].join(', ')}`;
    }
}

module.exports.config = {
	name: "bots",
	description: "Gives you the online/offline bots list!",
    usage: ``,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["bot","robot","robots"]
}
