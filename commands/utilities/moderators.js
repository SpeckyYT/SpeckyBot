const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg, args, config) => {
    let mods = [];
    let list = [];
    msg.guild.members.forEach(async member => {
        if(member.hasPermission('MANAGE_MESSAGES') || member.hasPermission('ADMINISTRATOR')){
            if(!mods.includes(member) && !member.user.bot) mods.push(member);
        }
    })

    mods.forEach(async mod => {
        if(list[mod.user.presence.status]){
            list[mod.user.presence.status].push([mod.user.username]);
        }else{
            list[mod.user.presence.status] = [mod.user.username];
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
    .setTitle("__Mods__:")
    .setThumbnail(msg.guild.iconURL)
    .setDescription(`${Eonline} ${online}\n${Eidle} ${idle}\n${Ednd} ${dnd}\n${Eoffline} ${offline}`);

    msg.channel.send(embed);
}
    
function check(list,status){
    if(!list[status]){
        return "*Nobody*";
    }else if(list[status].length == 1){
        return list[status];
    }else{
        return list[status].join(', ');
    }
}

module.exports.config = {
	name: "moderators",
	description: "Gives you the active/inactive moderators list!",
    usage: ``,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["moderator","mods"]
}
