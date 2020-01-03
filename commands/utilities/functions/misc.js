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
    }else{
        return `[${list[status].length}] ${list[status].join(', ')}`;
    }
}

module.exports.membersEmbed = (title,msg,desc) => {
    let { RichEmbed } = require('discord.js');
    return new RichEmbed()
    .setTitle(`__${title}__:`)
    .setThumbnail(msg.guild.iconURL)
    .setDescription(desc);
}