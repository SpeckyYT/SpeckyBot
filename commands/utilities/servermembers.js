const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg, args, config) => {
    let members = [];
    let list = [];
    msg.guild.members.forEach(async member => {
        if(!members.includes(member)) members.push(member);
    })

    members.forEach(async bot => {
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
    .setTitle("__Members__:")
    .setThumbnail(msg.guild.iconURL);

    let maxmsglength = 1970;

    [[online,Eonline],[idle,Eidle],[dnd,Ednd],[offline,Eoffline]].forEach(async items => {
        if(items[0].length < maxmsglength){
            embed.setDescription(`${items[1]} ${items[0]}`);
            await msg.channel.send(embed)
        }else{
            embed.setDescription(`${items[1]} ${items[0].split(' ')[0]} *Too many people*`);
            await msg.channel.send(embed)
        }
    })
}
    
function check(list,status){
    if(!list[status]){
        return "[0] *Nobody*";
    }else{
        return `[${list[status].length}] ${list[status].join(', ')}`;
    }
}

module.exports.config = {
	name: "allmembers",
	description: "Gives you the active/inactive members list!",
    usage: ``,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["servermembers"]
}
