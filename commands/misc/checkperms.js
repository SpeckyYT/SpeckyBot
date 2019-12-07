const Discord = require("discord.js");

module.exports.run = async (bot, msg, args, config) => {
    var member, channel;
    if(args.length == 1 && msg.mentions.channels.first() || args.length == 0){
        member = msg.member
    }else{
        if(msg.mentions.members.first() != null){
            member = msg.mentions.members.first()
        }else{
            if(msg.guild.fetchMember(args[0]) != null){
                member = msg.guild.fetchMember(args[0])
            }else if(msg.guild.fetchMember(args[1] != null)){
                member = msg.guild.fetchMember(args[1])
            }else{
                return msg.channel.send('No user was found.')
            }
        }
    }

    if(msg.mentions.channels.first()){
        channel = msg.mentions.channels.first()
    }else{
        channel = msg.channel;
    }

    let cEmbed = new Discord.RichEmbed()
    .setTitle(`Permissions of ${member.user.username} in #${channel.name}`)
    .setThumbnail(member.user.avatarURL)
    .setColor(member.displayHexColor)
    .addField(`Permissions:`, `\`\`\`${member.permissionsIn(channel).toArray().join('\n')}\`\`\``)
    msg.channel.send(cEmbed);
}

module.exports.config = {
    name: "checkperms",
	description: "Checks the permissions of the user!",
    usage: `[userID / userMention] #[Channel]`,
    category: `misc`,
	accessableby: "Members",
    aliases: ["checkpermissions","checkp","cp"]
}