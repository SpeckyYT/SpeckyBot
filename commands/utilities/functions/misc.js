module.exports.emotes = {
    Eonline: "<:online:661611929332219905>",
    Eidle: "<:idle:661611969131970580>",
    Ednd: "<:dnd:661612025943818265>",
    Eoffline: "<:offline:661612200527396865>"
}

module.exports.listCreator = (memberTypeCollection,list) => {
    memberTypeCollection.forEach(async memberType => {
        if(list[memberType.user.presence.status]){
            list[memberType.user.presence.status].push([memberType.user.username]);
        }else{
            list[memberType.user.presence.status] = [memberType.user.username];
        }
    })
    return list;
}

module.exports.statusCheckQuantity = (list,status) => {
    if(!list[status]){
        return "[0] *Nobody*";
    }else if(list[status].join(', ').length > 1965){
        return `[${list[status].length}] *Too many people...*`;
    }else{
        return `[${list[status].length}] ${list[status].join(', ')}`;
    }
}

module.exports.membersEmbed = (title,msg,[[online,Eonline],[idle,Eidle],[dnd,Ednd],[offline,Eoffline]]) => {
    let { RichEmbed } = require('discord.js');
    let maxmsglength = 1965;
    let fulldesc = `${Eonline} ${online}\n${Eidle} ${idle}\n${Ednd} ${dnd}\n${Eoffline} ${offline}`;

    let embed = new RichEmbed()
    .setTitle(`__${title}__:`)
    .setThumbnail(msg.guild.iconURL);

    if(fulldesc.length < maxmsglength){
        msg.channel.send(embed.setDescription(fulldesc))
    }else{
        [[online,Eonline],[idle,Eidle],[dnd,Ednd],[offline,Eoffline]].forEach(async items => {
            embed.setDescription(`${items[1]} ${items[0]}`);
            await msg.channel.send(embed)
        })
    }
}