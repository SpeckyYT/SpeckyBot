module.exports.categoryhelp = ({category}) => {
    return function(bot,msg){
        bot.checkCategory(category,msg)
        return msg.channel.send(
            bot.embed()
            .setTitle('Help')
            .setDescription(
                `The bot prefix is: **${bot.config.prefix}**\n\n`+
                `❯ **${category.highFirst()}**\n`+
                bot.commands.filter(c => c.category == category).map(c => `\`${c.name}\`\n`).join(' ')
            )
        );
    }
}
