const { RichEmbed } = require("discord.js");

module.exports.run = async (bot, msg) => {
    let { Args } = msg;
    let member, channel;
    if(Args.length == 0){
        member = msg.member;
        channel = msg.channel;
    }else{
        if(msg.mentions.members > 0){
            member = msg.mentions.members.first()
        }
        if(msg.mentions.channels > 0){
            channel = msg.mentions.channels.first()
        }
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
    usage: `@[User] #[Channel]`,
    category: `misc`,
	accessableby: "Members",
    aliases: ["checkpermissions","checkp","cp"]
}
