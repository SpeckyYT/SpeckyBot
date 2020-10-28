module.exports.statuses = ({type,check}) => {
    return async function(bot,msg){
        const list = listCreator(msg.guild.members.cache.filter(member => check(member)));

        const online = statusCheckQuantity(list,'online');
        const idle = statusCheckQuantity(list,'idle');
        const dnd = statusCheckQuantity(list,'dnd');
        const offline = statusCheckQuantity(list,'offline');

        const [
            Eonline,
            Eidle,
            Ednd,
            Eoffline
        ] = ['online','idle','dnd','offline'].map(e => bot.emotes[e]);

        return msg.channel.send(await membersEmbed(type, msg, [[online,Eonline],[idle,Eidle],[dnd,Ednd],[offline,Eoffline]]))
    }
}

function listCreator(memberTypeCollection){
    const list = [];
    memberTypeCollection.forEach(memberType => {
        if(list[memberType.user.presence.status]){
            list[memberType.user.presence.status].push([memberType.user.username]);
        }else{
            list[memberType.user.presence.status] = [memberType.user.username];
        }
    })
    return list;
}

function statusCheckQuantity(list,status){
    if(!list[status]){
        return "[0] *Nobody*";
    }else if(list[status].join(', ').length > 1965){
        return `[${list[status].length}] *Too many people...*`;
    }else{
        return `[${list[status].length}] ${list[status].join(', ')}`;
    }
}

async function membersEmbed(title,msg,[[online,Eonline],[idle,Eidle],[dnd,Ednd],[offline,Eoffline]]){
    const { MessageEmbed } = require('discord.js');
    const maxmsglength = 1965;
    online = `${Eonline} ${online}`;
    idle = `${Eidle} ${idle}`;
    dnd = `${Ednd} ${dnd}`;
    offline = `${Eoffline} ${offline}`;

    const embed = new MessageEmbed()
    .setTitle(`__${title}__:`)
    .setFooter('Note: Only cached users will show up')
    .setThumbnail(msg.guild.iconURL());

    const statusArray = [online,idle,dnd,offline];

    let currentMessage = '';

    for (const message of statusArray) {

        if (currentMessage.length + message.length > maxmsglength) {
            await msg.channel.send(embed.setDescription(currentMessage));
            currentMessage = '';
        }

        currentMessage = `${currentMessage}\n${message}`;
    }
    return embed.setDescription(currentMessage);
}

