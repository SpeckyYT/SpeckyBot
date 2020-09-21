module.exports = {
    event: "message"
}

const { MessageEmbed } = require('discord.js');
const poop = "https://images-ext-1.discordapp.net/external/qDr7Y7SwTvJ3D_jZOYRNU-Vak5cGKw3zlZfFT2t-Ihc/https/i.imgur.com/jNz2Dwp.png"

module.exports.call = async (bot, msg) => {
    if (msg.author.bot) return;
    await bot.loadSettings();
    const u_settings = bot.settings.user || {};
    if(!(u_settings[msg.author.id] ? u_settings[msg.author.id].messagelink : false)) return;

    const m = msg.extend();
    if(!m.links.length) return;

    const perms = msg.guild.me.permissionsIn(msg.channel).toArray();
    if(!perms.includes('SEND_MESSAGES')) return;

    const regex = /https?:\/\/(?:\w+\.)?discord(?:app)?\.com\/channels\/(\d+)\/(\d+)\/(\d+)\/?/g;

    m.links.unique().forEach(async link => {
        if(m.content.includes(`<${link}>`)) return;

        const discordLink = regex.exec(link);
        if(!discordLink) return;
        const [, serverID, channelID, messageID] = discordLink;
        const server = bot.guilds.cache.get(serverID);
        const channel = bot.channels.cache.get(channelID);
        const message = await (channel && channel.messages.fetch && channel.messages.fetch(messageID));

        try{
            await msg.channel.send(
                new MessageEmbed()
                .setAuthor(message ? `${message.author.tag} (ID: ${message.author.id})` : "Unknown User", message ? message.author.avatarURL() : poop)
                .setDescription(`[Message](${link}) in <#${channelID}>\n${message ? message.content || "" : "Unknown Message"}`)
                .setFooter(`${server ? server.name : "Unknown Server"} - Quoted by ${msg.author.tag}`, server ? server.iconURL : poop)
                .setTimestamp(message && message.createdAt || messageID.snowflake && messageID.snowflake().date)
                .setColor(message ? 'GREEN' : 'RED')
            )
            if(message && message.embeds && message.embeds.length){
                message.embeds.forEach(embed =>
                    msg.channel.send(new MessageEmbed(embed)).catch(()=>{})
                )
            }
        }catch(e){}
    })
}
