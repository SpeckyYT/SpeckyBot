module.exports = {
    name: "checkperms",
    description: "Checks the permissions of the user in a specific channel!",
    usage: `@[User] #[Channel]`,
    category: `misc`,
    aliases: ["checkpermissions","checkp","cp"]
}

const { RichEmbed } = require("discord.js");

module.exports.run = async (bot, msg) => {
    let member, channel;

    member = msg.member;
    channel = msg.channel;

    if(msg.mentions.members.size > 0){
        member = msg.mentions.members.first();
    }
    
    if(msg.mentions.channels.size > 0){
        channel = msg.mentions.channels.first();
    }

    const embed = new RichEmbed()
    .setTitle(`Permissions of ${member.user.username} in #${channel.name}`)
    .setThumbnail(member.user.avatarURL)
    .setColor(member.displayHexColor)
    .addField(`Permissions:`, `\`\`\`${member.permissionsIn(channel).toArray().join('\n')}\`\`\``)

    msg.channel.send(embed);
}
