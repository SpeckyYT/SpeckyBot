module.exports = {
    name: "help",
    description: "Gives you the help page for this bot!",
    usage: `<command>`,
    category: "important",
    aliases: ["h", "halp", "hel","hwlp","hewlp","cmd","cmds","command","commands","undefined","info","informations","information","?"]
}

const asciiTable = require('ascii-table');

module.exports.run = async (bot, msg) => {
    const { args } = msg;

    const diduknow = [
        `you can use the \`${bot.config.prefix}usersettings\` command to personalize your experience!`,
        `you can send a message that contains \`:EMB:\` to turn your message into an embed!`,
        `you can include \`--emb\` in the \`${bot.config.prefix}say\` command to turn the text into an embed!`,
        `you can type in a channel topic \`Next number: 1\` to turn it into a counting-up channel!`,
        `in any text channel, you can include \`[ALTERNATE]\` in the channel topic, so all users have to alternate!`,
        `in any text channel, you can include \`[GLOBAL]\` in the channel topic, so you can chat with all users of the world!`,
        `in any text channel, you can include \`[ONE-WORD]\` in the channel topic, so all users can only type one word per message!`,
        `in any text channel, you can include \`[NO-MEDIA]\` in the channel topic, so nobody can share links/images in the channel!`,
        `in any text channel, you can include \`[NO-NSFW]\` in the channel topic, so every NSFW command is not executable!`,
        `commands usually have aliases? Just execute the command \`${bot.config.prefix}help <command>\` to check them!`,
        `most of the people don't read the helpful tricks that are written here?`
    ];


    const embed = bot.embed()
    .setAuthor(`${bot.user.username} Help`, bot.user.displayAvatarURL())

    if(!args[0]) {
        const table = new asciiTable();
        table.setHeading('category', 'commands')
        .setBorder('█')
        bot.commands.filter(
            c => c.category == 'category' && (bot.checkCategory(c.name, msg) || msg.author.id.isOwner())
        )
        .map(c => [c.name,bot.commands.filter(csub => csub.category == c.name).size])
        .forEach(([cat,cmds]) => table.addRow(cat,cmds))

        embed
        .setDescription(`These are the available commands for ${bot.user.username}\nThe bot prefix is: **${bot.config.prefix}**\n${table.toString().code('c')}`)
        .setFooter(`Based on SpeckyBot | Total Commands: ${bot.commands.size}`, bot.user.displayAvatarURL())
        .addField(
            'Instructions',
            `Simple! Just type \`${bot.config.prefix}<category>\` ||(without <> obviously)|| to get the available commands of the categories!`
        )
        .addField(
            'Did you know that',
            diduknow.pick()
        )

        return msg.channel.send(embed)
    } else {
        const command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase());
        if(!command) return msg.channel.send(invalidcmd(embed,bot.config));

        if(!msg.author.id.isOwner() && !bot.checkCategory(command.category, msg)) return msg.channel.send(invalidcmd(embed,bot.config));

        const cmd = command.name.highFirst();
        const category = command.category || "uncategorized";
        const description = command.description || "No Description provided.";
        const usage = `${command.usage ? `\`${bot.config.prefix}${command.name} ${command.usage}\`` : `\`${bot.config.prefix}${command.name}\``}`;
        const aliases = `${command.aliases ? command.aliases.length > 0 ? command.aliases.join(", ") : '' : ''}`;
        const flags = `${command.flags ? command.flags.length > 0 ? command.flags.join(", ") : '' : ''}`;
        const userPerms = `${command.userPerms ? command.userPerms.length > 0 ? command.userPerms.join(", ") : '' : ''}`;
        const botPerms = `${command.botPerms ? command.botPerms.length > 0 ? command.botPerms.join(", ") : '' : ''}`;

        let commandinfo = "";
        commandinfo += `The bot's prefix is: \`${bot.config.prefix}\`\n\n`;
        commandinfo += `**Command:** ${cmd}\n`;
        commandinfo += `**Category:** ${category}\n`;
        commandinfo += `**Description:** ${description}\n`;
        commandinfo += `**Usage:** ${usage}\n`;
        if(aliases) commandinfo += `**Aliases:** ${aliases}\n`;
        if(flags) commandinfo += `**Available Flags:** ${flags}\n`;
        if(userPerms) commandinfo += `**Required User Permissions:** ${userPerms}\n`;
        if(botPerms) commandinfo += `**Required Bot Permissions:** ${botPerms}\n`;

        embed.setDescription(commandinfo);
        return msg.channel.send(embed);
    }
}

function invalidcmd(embed,config){
    return embed.setTitle("Invalid Command.")
    .setDescription(`Do \`${config.prefix}help\` for the list of the commands.`)
}
