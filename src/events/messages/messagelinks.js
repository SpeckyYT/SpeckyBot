module.exports = {
    event: "cleanMessage"
}

const qdb = require('quick.db');
const usersettings = new qdb.table('usersettings');
const poop = "https://images-ext-1.discordapp.net/external/qDr7Y7SwTvJ3D_jZOYRNU-Vak5cGKw3zlZfFT2t-Ihc/https/i.imgur.com/jNz2Dwp.png"

module.exports.call = async (bot, msg) => {
    if(msg.author.bot) return;
    if(!usersettings.get(`${msg.author.id}.messagelink`)) return;

    const m = msg.extend().cmdExtend();
    if(!m.links.length) return;

    const perms = msg.guild.me.permissionsIn(msg.channel).toArray();
    if(!perms.includes('SEND_MESSAGES')) return;

    m.links.unique().forEach(async link => {
        if(m.content.includes(`<${link}>`)) return;

        const discordLink = bot.regex.messageLink.exec(link);
        if(!discordLink) return;
        const [, serverID, channelID, messageID] = discordLink;
        const server = bot.guilds.cache.get(serverID);
        const channel = bot.channels.cache.get(channelID);
        const message = await (channel && channel.messages.fetch && channel.messages.fetch(messageID));

        try{
            await msg.channel.send(
                bot.membed()
                .setAuthor(message ? `${message.author.tag} (ID: ${message.author.id})` : "Unknown User", message ? message.author.displayAvatarURL() : poop)
                .setDescription(`[Message](${link}) in <#${channelID}>\n${message ? message.content || "" : "Unknown Message"}`)
                .setFooter(`${server ? server.name : "Unknown Server"} - Quoted by ${msg.author.tag}`, server ? server.iconURL() : poop)
                .setTimestamp(message && message.createdAt || messageID.snowflake && messageID.snowflake().date)
                .setColor(message ? 'GREEN' : 'RED')
            )
            if(message && message.embeds){
                for(const embed of message.embeds)
                    msg.channel.send(bot.membed(embed)).catch(()=>{});
            }
        }catch(e){}
    })
}
