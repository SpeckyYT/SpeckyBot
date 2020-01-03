const { RichEmbed } = require("discord.js");

module.exports.run = async (bot, msg) => {
    let { args } = msg;
    var member, channel;
    if(args.length == 1 && msg.mentions.channels.first() || args.length == 0){
        member = msg.member
    }else{
        if(msg.mentions.members > 0){
            member = msg.mentions.members.first()
        }else{
            if(!args[0]) return;
            msg.guild.fetchMember(args[0])
                .then(memb => {if(memb){member = memb}})
                .catch(e => console.error(e))
            if(args[1]){
                msg.guild.fetchMember(args[1])
                    .then(memb => {if(memb){member = memb}})
                    .catch(e => console.error(e))
            }
        }
    }

    if(msg.mentions.channels.first()){
        channel = msg.mentions.channels.first()
    }else{
        channel = msg.channel;
    }

    let cEmbed = new RichEmbed()
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
