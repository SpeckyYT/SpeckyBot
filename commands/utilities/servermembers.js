const { RichEmbed } = require('discord.js')
const { emotes, listCreator, statusCheckQuantity } = require('./functions/misc.js')

module.exports.run = async (bot, msg, args, config) => {
    let members = [];
    let list = [];
    msg.guild.members.forEach(async member => {
        if(!members.includes(member)) members.push(member);
    })

    list = listCreator(members, list)

    let online, idle, dnd, offline;

    online = statusCheckQuantity(list,'online');
    idle = statusCheckQuantity(list,'idle');
    dnd = statusCheckQuantity(list,'dnd');
    offline = statusCheckQuantity(list,'offline');

    let { Eonline, Eidle, Ednd, Eoffline } = emotes;

    let embed = new RichEmbed()
    .setTitle("__Members__:")
    .setThumbnail(msg.guild.iconURL);

    let maxmsglength = 1965;

    [[online,Eonline],[idle,Eidle],[dnd,Ednd],[offline,Eoffline]].forEach(async items => {
        if(items[0].length < maxmsglength){
            embed.setDescription(`${items[1]} ${items[0]}`);
            await msg.channel.send(embed)
        }else{
            embed.setDescription(`${items[1]} ${items[0].split(' ')[0]} *Too many people...*`);
            await msg.channel.send(embed)
        }
    })
}

module.exports.config = {
	name: "allmembers",
	description: "Gives you the active/inactive members list!",
    usage: ``,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["servermembers"]
}
