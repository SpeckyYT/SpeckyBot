module.exports = {
    name: "help",
    description: "The help for this bot!",
    usage: `<command>`,
    category: `utilities`,
    accessableby: "Members",
    aliases: ["h", "halp", "hel","hwlp","hewlp","cmd","cmds","command","commands","undefined","info","informations","information"]
}

const { readdirSync } = require("fs")

module.exports.run = async (bot, msg) => {
    const { config } = bot;
    const { args } = msg;
    
    const embed = bot.embed()
    .setAuthor(`${msg.guild.me.displayName} Help`, msg.guild.iconURL)

    if(!args[0] || (bot.checkOwner(msg.author.id) && args[0] == "all")) {
        const categories = readdirSync('./commands/')

        embed.setDescription(`These are the avaliable commands for ${msg.guild.me.displayName}\nThe bot prefix is: **${config.prefix}**`)
        embed.setFooter(`Based on SpeckyBot | Total Commands: ${bot.commands.size}`, bot.user.displayAvatarURL);

        categories.forEach(category => {
            const dir = bot.commands.filter(c => (c.category == category && c.category != "private"))

            const capitalise = bot.highFirst(category)

            try{
                if(args[0] == "all" || categoryCheck(category, msg, config, bot)){
                    embed.addField(`❯ ${capitalise} [${dir.size}]:`, `${dir.map(c => `\`${c.name}\``).join(" ")}`)
                }
            }catch{}
        })
        const diduknow = [
            `you can use the \`${config.prefix}serversettings\` command to personalize your server!`,
            `you can use the \`${config.prefix}usersettings\` command to personalize your profile!`,
            `you can send a message that contains \`:EMB:\` to turn your message into an embed!`,
            `you can include \`--emb\` in the \`${config.prefix}say\` command to turn the text into an embed!`,
            `you can type in a channel topic \`Next number: 1\` to turn it into a counting-up channel!`,
            `in any text channel, you can include \`[ALTERNATE]\` in the channel topic, so all users have to alternate!`,
            `in any text channel, you can include \`[ONE-WORD]\` in the channel topic, so all users can only type one word per message!`,
            `in any text channel, you can include \`[NO-MEDIA]\` in the channel topic, so nobody can share links/images in the channel!`,
            `in any text channel, you can include \`[NO-NSFW]\` in the channel topic, so every NSFW command is not executable!`,
            `commands usually have aliases? Just execute the command \`${config.prefix}help <command>\` to check them!`,
            `most of the people don't read the helpful tricks that are written here?`
        ];

        embed.addField('Did you know that', diduknow.pick())

        return msg.channel.send(embed)
    } else {
        const command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase());
        if(!command) return msg.channel.send(invalidcmd(embed,config));

        if(!categoryCheck(command.category, msg, bot)) return msg.channel.send(invalidcmd(embed,config));
        
        const cmd = bot.highFirst(command.name);
        const description = command.description || "No Description provided.";
        const usage = `${command.usage ? `\`${config.prefix}${command.name} ${command.usage}\`` : `\`${config.prefix}${command.name}\``}`;
        const aliases = `${command.aliases ? command.aliases.length > 0 ? command.aliases.join(", ") : '' : ''}`;
        const perms = `${command.perms ? command.perms.length > 0 ? command.perms.join(", ") : '' : ''}`;
        const cmdperms = `${command.cmdperms ? command.cmdperms.length > 0 ? command.cmdperms.join(", ") : '' : ''}`;

        let commandinfo = "";
        commandinfo += `The bot's prefix is: \`${config.prefix}\`\n\n`;
        commandinfo += `**Command:** ${cmd}\n`;
        commandinfo += `**Description:** ${description}\n`;
        commandinfo += `**Usage:** ${usage}\n`;
        if(aliases) commandinfo += `**Aliases:** ${aliases}\n`;
        if(perms) commandinfo += `**Required User Permissions:** ${perms}\n`;
        if(cmdperms) commandinfo += `**Required Bot Permissions:** ${cmdperms}\n`;

        embed.setDescription(commandinfo);
        return msg.channel.send(embed);
    }
}

function invalidcmd(embed,config){
    return embed.setTitle("Invalid Command.")
    .setDescription(`Do \`${config.prefix}help\` for the list of the commands.`)
}

function categoryCheck(category,msg,bot){
    category = category.toLowerCase()

    switch(category){

        case "owner":
            return bot.checkOwner(msg.author.id);

        case "admin":
            return msg.member.permissions.toArray().join(' ').includes('MANAGE_');

        case "nsfw":
            return !(msg.channel.topic ? msg.channel.topic.toLowerCase().includes('[no-nsfw]') : false) && msg.channel.nsfw;

        default:
            return true;
    }
}
