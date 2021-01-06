const { Message, User, GuildMember } = require('discord.js');

module.exports = (bot) => {
    bot.checkCategory = (category, item) => {
        if(!category || typeof category != 'string') return true;

        category = category.toLowerCase();

        let id, channel, member;

        if(item instanceof Message){
            id = item.author.id;
            channel = item.channel;
            member = item.member;
        }else if(item instanceof User){
            id = item.id;
        }else if(item instanceof GuildMember){
            id = item.id;
            member = item;
        }else if(typeof item == 'string'){
            id = item;
        }
        if(typeof id != 'string'){
            id = '';
        }

        if(['owner','private','tmp'].includes(category)) return false;

        if(channel){
            if(category == 'nsfw') return channel.isNSFW();
        }

        if(member){
            if(category == 'admin') return member.permissions.toArray().join(' ').includes('MANAGE_');
        }

        return true;
    }
}
