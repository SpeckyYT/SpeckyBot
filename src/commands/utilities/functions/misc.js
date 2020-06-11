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
    const { RichEmbed } = require('discord.js');
    const maxmsglength = 1965;
    online = `${Eonline} ${online}`;
    idle = `${Eidle} ${idle}`;
    dnd = `${Ednd} ${dnd}`;
    offline = `${Eoffline} ${offline}`;

    const embed = new RichEmbed()
    .setTitle(`__${title}__:`)
    .setThumbnail(msg.guild.iconURL);

    const statusArray = [online,idle,dnd,offline];

    let currentMessage = '';

    for (const message of statusArray) {

        if (currentMessage.length + message.length > maxmsglength) {
            msg.channel.send(embed.setDescription(currentMessage));
            currentMessage = '';
        }

        currentMessage = `${currentMessage}\n${message}`;
    }

    if (currentMessage.length < maxmsglength) {

        msg.channel.send(embed.setDescription(currentMessage));

    }
}
